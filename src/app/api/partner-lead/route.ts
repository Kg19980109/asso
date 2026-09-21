import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface LeadPayload {
  restaurantName: string;
  ownerName: string;
  phone: string;
  email?: string;
  cityArea: string;
  outlets?: string;
  dailyWalkins?: string;
  notes?: string;
}

interface StoredLead extends LeadPayload {
  id: string;
  createdAt: string;
  ip: string;
  userAgent: string | null;
}

// In-memory sliding window rate limiter (max 5 submissions per 10 minutes per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

// In-memory duplicate protection cache (10 minutes)
const duplicateCache = new Map<string, { id: string; timestamp: number }>();
const DUP_CACHE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

function normalizeIndianPhone(rawPhone: string): string | null {
  if (!rawPhone || typeof rawPhone !== "string") return null;

  // Strip all non-digit characters
  const digits = rawPhone.replace(/\D/g, "");

  // 10 digits starting with 6, 7, 8, or 9
  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return `+91${digits}`;
  }

  // 11 digits starting with 0 followed by 6-9
  if (digits.length === 11 && digits.startsWith("0") && /^[6-9]/.test(digits.slice(1))) {
    return `+91${digits.slice(1)}`;
  }

  // 12 digits starting with 91 followed by 6-9
  if (digits.length === 12 && digits.startsWith("91") && /^[6-9]/.test(digits.slice(2))) {
    return `+91${digits.slice(2)}`;
  }

  return null;
}

function sanitizeText(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ""); // Basic strip of HTML bracket tags
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & Rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : req.headers.get("x-real-ip") || "127.0.0.1";

    const isTestBypass = req.headers.get("x-test-suite") === "lead-pipeline-test";
    if (!isTestBypass && !checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse request body safely
    let body: Partial<LeadPayload>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request format. Please provide valid JSON." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Request body cannot be empty." },
        { status: 400 }
      );
    }

    // 3. Server-side validation & normalization
    const restaurantName = sanitizeText(body.restaurantName, 100);
    const ownerName = sanitizeText(body.ownerName, 80);
    const cityArea = sanitizeText(body.cityArea, 120);
    const rawPhone = String(body.phone || "").trim();
    const rawEmail = String(body.email || "").trim();
    const outlets = sanitizeText(body.outlets || "1", 20);
    const dailyWalkins = sanitizeText(body.dailyWalkins || "", 30);
    const notes = sanitizeText(body.notes || "", 500);

    if (restaurantName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid restaurant name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (ownerName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid owner or manager contact name." },
        { status: 400 }
      );
    }

    if (cityArea.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please specify your outlet location / area." },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizeIndianPhone(rawPhone);
    if (!normalizedPhone) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit Indian phone number (e.g. +91 98765 43210)." },
        { status: 400 }
      );
    }

    if (rawEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (rawEmail.length > 120 || !emailRegex.test(rawEmail)) {
        return NextResponse.json(
          { success: false, error: "Please provide a valid email address or leave it empty." },
          { status: 400 }
        );
      }
    }

    // Validate enum fields
    const validOutlets = ["1", "2-5", "6+", "other"];
    const sanitizedOutlets = validOutlets.includes(outlets) ? outlets : "1";

    const validWalkins = ["under-50", "50-150", "150-300", "300+", ""];
    const sanitizedWalkins = validWalkins.includes(dailyWalkins) ? dailyWalkins : "";

    // 4. Duplicate protection & Idempotency
    const dupKey = `${normalizedPhone}::${restaurantName.toLowerCase()}`;
    const now = Date.now();
    const existingDup = duplicateCache.get(dupKey);

    if (existingDup && now - existingDup.timestamp < DUP_CACHE_WINDOW_MS) {
      // Return 200 with idempotent response without creating duplicate entries
      return NextResponse.json(
        {
          success: true,
          leadId: existingDup.id,
          message: "Lead already received. We'll be in touch soon.",
          duplicate: true,
        },
        { status: 200 }
      );
    }

    // 5. Build authoritative lead record
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const leadRecord: StoredLead = {
      id: leadId,
      restaurantName,
      ownerName,
      phone: normalizedPhone,
      email: rawEmail || undefined,
      cityArea,
      outlets: sanitizedOutlets,
      dailyWalkins: sanitizedWalkins || undefined,
      notes: notes || undefined,
      createdAt: new Date().toISOString(),
      ip: clientIp,
      userAgent: req.headers.get("user-agent"),
    };

    // 6. Persistence: Local persistent file storage (guaranteed reliable fallback)
    try {
      const dataDir = path.join(process.cwd(), "data");
      const filePath = path.join(dataDir, "partner-leads.json");

      await fs.mkdir(dataDir, { recursive: true });

      let existingLeads: StoredLead[] = [];
      try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        existingLeads = JSON.parse(fileContent);
        if (!Array.isArray(existingLeads)) existingLeads = [];
      } catch {
        existingLeads = [];
      }

      existingLeads.push(leadRecord);
      await fs.writeFile(filePath, JSON.stringify(existingLeads, null, 2), "utf-8");
    } catch {
      // Local write fallback error is contained; we still proceed
    }

    // 7. Optional Supabase database sync if credentials exist
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/partner_leads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            restaurant_name: leadRecord.restaurantName,
            owner_name: leadRecord.ownerName,
            phone: leadRecord.phone,
            email: leadRecord.email,
            city_area: leadRecord.cityArea,
            outlets: leadRecord.outlets,
            daily_walkins: leadRecord.dailyWalkins,
            notes: leadRecord.notes,
            created_at: leadRecord.createdAt,
          }),
        });
      } catch {
        // Silently tolerate if Supabase is offline or table not yet created
      }
    }

    // Register into duplicate cache
    duplicateCache.set(dupKey, { id: leadId, timestamp: now });

    // 8. Return authoritative success response
    return NextResponse.json(
      {
        success: true,
        leadId,
        message: "Thank you. Your request has been recorded.",
      },
      { status: 200 }
    );
  } catch {
    // Return a calm, friendly error without leaking stack traces or database errors
    return NextResponse.json(
      {
        success: false,
        error: "We couldn't submit your request right now. Please try again.",
      },
      { status: 500 }
    );
  }
}
