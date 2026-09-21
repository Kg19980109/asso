import { NextRequest } from "next/server";
import crypto from "crypto";

export const SESSION_COOKIE_NAME = "asso_operator_token";

export function getAdminSecret(): string {
  return process.env.ADMIN_SECRET || "asso_operator_dev_secret_2026";
}

/**
 * Creates a signed session token based on the admin secret.
 */
export function createSessionToken(): string {
  const secret = getAdminSecret();
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`asso_operator::${timestamp}`)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

/**
 * Validates a signed session token.
 * Tokens expire after 7 days.
 */
export function validateSessionToken(token: string): boolean {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestampStr, providedSignature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Max session age: 7 days
  const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > maxAgeMs) return false;

  const secret = getAdminSecret();
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`asso_operator::${timestampStr}`)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(providedSignature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}

/**
 * Server-side authorization check for all internal lead operations.
 * Checks HTTP-only cookie, Bearer authorization header, or x-admin-key header.
 */
export function verifyAdminAuth(req: NextRequest): boolean {
  const secret = getAdminSecret();

  // 1. Direct admin key header check (useful for automated testing or internal CLI scripts)
  const headerKey = req.headers.get("x-admin-key");
  if (headerKey && headerKey === secret) {
    return true;
  }

  // 2. Authorization: Bearer <token>
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const bearer = authHeader.slice(7).trim();
    if (bearer === secret || validateSessionToken(bearer)) {
      return true;
    }
  }

  // 3. HTTP-only session cookie
  const cookieToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (cookieToken && validateSessionToken(cookieToken)) {
    return true;
  }

  return false;
}
