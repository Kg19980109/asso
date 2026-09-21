import fs from "fs/promises";
import path from "path";
import {
  LeadStatus,
  LeadPriority,
  VALID_STATUSES,
  InternalNote,
  ContactHistoryEntry,
  LeadRecord,
  LeadFilterParams,
  LeadMetrics,
} from "@/types/leads";

export * from "@/types/leads";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "partner-leads.json");
const LEADS_BACKUP_FILE = path.join(DATA_DIR, "partner-leads.json.bak");

// In-memory write mutex queue to prevent race conditions during concurrent write operations
let writeMutex = Promise.resolve();

function enqueueWrite<T>(op: () => Promise<T>): Promise<T> {
  const next = writeMutex.then(op, op);
  writeMutex = next.then(() => {}, () => {});
  return next;
}

/**
 * Calculates authoritative operational priority for a lead based on status and follow-up timeline.
 */
export function calculateLeadPriority(lead: {
  status: LeadStatus;
  nextFollowUpAt?: string | null;
  lastContactedAt?: string | null;
}): LeadPriority {
  if (lead.status === "LOST" || lead.status === "CONVERTED") {
    return "CLOSED";
  }

  if (lead.nextFollowUpAt) {
    const followUpTime = new Date(lead.nextFollowUpAt).getTime();
    if (!isNaN(followUpTime)) {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime();
      const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

      if (followUpTime < todayStart) {
        return "OVERDUE";
      }
      if (followUpTime <= todayEnd) {
        return "TODAY";
      }
    }
  }

  if (lead.status === "DEMO_SCHEDULED") {
    return "UPCOMING_DEMO";
  }

  if (lead.status === "NEW" && !lead.lastContactedAt) {
    return "NEW_UNCONTACTED";
  }

  return "ACTIVE";
}

/**
 * Normalizes any legacy lead records that may lack operational fields.
 */
function normalizeRecord(raw: any): LeadRecord {
  const createdAt = raw.createdAt || new Date().toISOString();
  const status: LeadStatus = VALID_STATUSES.includes(raw.status) ? raw.status : "NEW";
  const nextFollowUpAt = raw.nextFollowUpAt ?? null;
  const lastContactedAt = raw.lastContactedAt ?? null;

  const record: LeadRecord = {
    id: String(raw.id || `lead_${Date.now()}`),
    restaurantName: String(raw.restaurantName || "Unnamed Restaurant"),
    ownerName: String(raw.ownerName || "Unknown Owner"),
    phone: String(raw.phone || ""),
    email: raw.email ? String(raw.email) : undefined,
    cityArea: String(raw.cityArea || "Unknown Location"),
    outlets: raw.outlets ? String(raw.outlets) : "1",
    dailyWalkins: raw.dailyWalkins ? String(raw.dailyWalkins) : undefined,
    notes: raw.notes ? String(raw.notes) : undefined,
    createdAt,
    updatedAt: raw.updatedAt || createdAt,
    status,
    assignedTo: raw.assignedTo ?? null,
    lastContactedAt,
    nextFollowUpAt,
    internalNotes: Array.isArray(raw.internalNotes) ? raw.internalNotes : [],
    contactHistory: Array.isArray(raw.contactHistory)
      ? raw.contactHistory
      : [
          {
            id: `ch_init_${raw.id || Date.now()}`,
            timestamp: createdAt,
            action: "Lead Submitted",
            note: "Enquiry received via website",
          },
        ],
    pilotChecklist: Array.isArray(raw.pilotChecklist) ? raw.pilotChecklist : [],
    convertedAt: raw.convertedAt ?? null,
    lostReason: raw.lostReason ?? null,
    ip: raw.ip ? String(raw.ip) : undefined,
    userAgent: raw.userAgent ? String(raw.userAgent) : null,
  };

  record.priority = calculateLeadPriority(record);
  return record;
}

/**
 * Safely reads all lead records from disk storage.
 * Automatically attempts recovery from backup if primary storage is malformed.
 */
export async function readAllLeads(): Promise<LeadRecord[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const content = await fs.readFile(LEADS_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeRecord);
  } catch (err: any) {
    if (err?.code === "ENOENT") {
      return [];
    }

    // Attempt backup recovery if main file is unparseable or corrupted
    try {
      const backupContent = await fs.readFile(LEADS_BACKUP_FILE, "utf-8");
      const parsedBackup = JSON.parse(backupContent);
      if (Array.isArray(parsedBackup)) {
        console.warn("Recovered lead storage from backup file.");
        return parsedBackup.map(normalizeRecord);
      }
    } catch {
      // Both files failed or missing
    }

    console.error("Error reading partner leads:", err);
    return [];
  }
}

/**
 * Safely writes all lead records atomically with backup rotation and concurrency serialization.
 */
async function writeAllLeads(leads: LeadRecord[]): Promise<void> {
  return enqueueWrite(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });

    // 1. Create a backup of existing leads before writing new state
    try {
      await fs.copyFile(LEADS_FILE, LEADS_BACKUP_FILE);
    } catch {
      // Ignore if source file doesn't exist yet
    }

    // 2. Write to temporary file first
    const tempPath = `${LEADS_FILE}.${Date.now()}.${Math.random().toString(36).slice(2, 6)}.tmp`;
    await fs.writeFile(tempPath, JSON.stringify(leads, null, 2), "utf-8");

    // 3. Atomically rename temp file to target file
    await fs.rename(tempPath, LEADS_FILE);
  });
}

/**
 * Sync lead to optional Supabase database if configured in environment.
 */
async function syncToSupabase(lead: LeadRecord): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return;

  try {
    await fetch(`${supabaseUrl}/rest/v1/partner_leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({
        id: lead.id,
        restaurant_name: lead.restaurantName,
        owner_name: lead.ownerName,
        phone: lead.phone,
        email: lead.email,
        city_area: lead.cityArea,
        outlets: lead.outlets,
        daily_walkins: lead.dailyWalkins,
        notes: lead.notes,
        status: lead.status,
        created_at: lead.createdAt,
        updated_at: lead.updatedAt,
      }),
    });
  } catch {
    // Non-blocking fallback
  }
}

/**
 * Creates and persists a new lead with default operational state.
 */
export async function createLead(
  payload: {
    restaurantName: string;
    ownerName: string;
    phone: string;
    email?: string;
    cityArea: string;
    outlets?: string;
    dailyWalkins?: string;
    notes?: string;
  },
  meta: {
    ip: string;
    userAgent: string | null;
  }
): Promise<LeadRecord> {
  const now = new Date().toISOString();
  const id = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  const newLead: LeadRecord = {
    id,
    restaurantName: payload.restaurantName,
    ownerName: payload.ownerName,
    phone: payload.phone,
    email: payload.email || undefined,
    cityArea: payload.cityArea,
    outlets: payload.outlets || "1",
    dailyWalkins: payload.dailyWalkins || undefined,
    notes: payload.notes || undefined,
    createdAt: now,
    updatedAt: now,
    status: "NEW",
    priority: "NEW_UNCONTACTED",
    assignedTo: null,
    lastContactedAt: null,
    nextFollowUpAt: null,
    internalNotes: [],
    contactHistory: [
      {
        id: `ch_${Date.now()}`,
        timestamp: now,
        action: "Lead Submitted",
        note: "Initial website enquiry registered",
      },
    ],
    pilotChecklist: [],
    convertedAt: null,
    lostReason: null,
    ip: meta.ip,
    userAgent: meta.userAgent,
  };

  const leads = await readAllLeads();
  leads.push(newLead);
  await writeAllLeads(leads);

  // Sync to Supabase in background if credentials present
  syncToSupabase(newLead).catch(() => {});

  return newLead;
}

/**
 * Fetches a single lead by ID.
 */
export async function getLeadById(id: string): Promise<LeadRecord | null> {
  const leads = await readAllLeads();
  return leads.find((l) => l.id === id) || null;
}

/**
 * Updates a lead with operational changes, notes, follow-up, or status transitions.
 */
export async function updateLead(
  id: string,
  updates: {
    status?: LeadStatus;
    nextFollowUpAt?: string | null;
    assignedTo?: string | null;
    newNote?: string;
    contactAction?: string;
    contactNote?: string;
    operatorName?: string;
    pilotChecklist?: string[];
    lostReason?: string | null;
  }
): Promise<LeadRecord | null> {
  const leads = await readAllLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const current = leads[index];
  const now = new Date().toISOString();
  let statusChanged = false;
  const previousStatus = current.status;

  if (updates.status && updates.status !== current.status) {
    if (!VALID_STATUSES.includes(updates.status)) {
      throw new Error(`Invalid status: ${updates.status}`);
    }
    current.status = updates.status;
    statusChanged = true;

    if (updates.status === "CONVERTED" && !current.convertedAt) {
      current.convertedAt = now;
    }

    if (updates.status === "LOST") {
      current.lostReason = updates.lostReason || "Other";
      current.nextFollowUpAt = null;
    } else if (previousStatus === "LOST") {
      current.lostReason = null;
    }
  }

  if (updates.lostReason !== undefined && current.status === "LOST") {
    current.lostReason = updates.lostReason;
  }

  if (updates.pilotChecklist !== undefined) {
    current.pilotChecklist = updates.pilotChecklist;
  }

  if (updates.nextFollowUpAt !== undefined) {
    current.nextFollowUpAt = updates.nextFollowUpAt;
  }

  if (updates.assignedTo !== undefined) {
    current.assignedTo = updates.assignedTo;
  }

  if (updates.newNote && updates.newNote.trim().length > 0) {
    const noteEntry: InternalNote = {
      id: `note_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      text: updates.newNote.trim().slice(0, 1000),
      createdAt: now,
      author: updates.operatorName || "ASSO Operator",
    };
    current.internalNotes.unshift(noteEntry);
  }

  // Record contact history if contactAction is provided or status changed
  if (updates.contactAction || statusChanged) {
    let actionText = updates.contactAction;
    if (!actionText && statusChanged) {
      if (previousStatus === "LOST") {
        actionText = `Lead reactivated from LOST to ${current.status}`;
      } else if (current.status === "LOST") {
        actionText = `Marked as LOST: ${current.lostReason || "Other"}`;
      } else if (previousStatus === "CONVERTED") {
        actionText = `Partner status transitioned from CONVERTED to ${current.status}`;
      } else {
        actionText = `Status changed from ${previousStatus} to ${current.status}`;
      }
    } else if (!actionText) {
      actionText = "Contact recorded";
    }

    const historyEntry: ContactHistoryEntry = {
      id: `ch_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: now,
      action: actionText,
      note: updates.contactNote?.trim() || undefined,
      previousStatus: statusChanged ? previousStatus : undefined,
      newStatus: statusChanged ? current.status : undefined,
      operator: updates.operatorName || "ASSO Operator",
    };
    current.contactHistory.unshift(historyEntry);
    current.lastContactedAt = now;
  }

  current.updatedAt = now;
  current.priority = calculateLeadPriority(current);
  leads[index] = current;

  await writeAllLeads(leads);
  syncToSupabase(current).catch(() => {});

  return current;
}

/**
 * Computes authoritative operational metrics across all leads.
 */
export async function getLeadMetrics(leadsList?: LeadRecord[]): Promise<LeadMetrics> {
  const leads = leadsList || (await readAllLeads());
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  // Start of this week (Monday)
  const dayOfWeek = now.getDay();
  const diffToMonday = (dayOfWeek + 6) % 7;
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - diffToMonday).getTime();

  const byStatus: Record<LeadStatus, number> = {
    NEW: 0,
    CONTACTED: 0,
    QUALIFIED: 0,
    DEMO_SCHEDULED: 0,
    PILOT: 0,
    CONVERTED: 0,
    LOST: 0,
  };

  let receivedToday = 0;
  let receivedThisWeek = 0;
  let overdueFollowUps = 0;

  for (const lead of leads) {
    if (byStatus[lead.status] !== undefined) {
      byStatus[lead.status]++;
    }

    const createdTime = new Date(lead.createdAt).getTime();
    if (!isNaN(createdTime)) {
      if (createdTime >= startOfToday) {
        receivedToday++;
      }
      if (createdTime >= startOfWeek) {
        receivedThisWeek++;
      }
    }

    // Overdue follow-up check
    if (calculateLeadPriority(lead) === "OVERDUE") {
      overdueFollowUps++;
    }
  }

  return {
    total: leads.length,
    byStatus,
    receivedToday,
    receivedThisWeek,
    overdueFollowUps,
  };
}

const PRIORITY_ORDER: Record<LeadPriority, number> = {
  OVERDUE: 1,
  TODAY: 2,
  UPCOMING_DEMO: 3,
  NEW_UNCONTACTED: 4,
  ACTIVE: 5,
  CLOSED: 6,
};

/**
 * Searches, filters, and sorts leads based on provided parameters.
 */
export async function getFilteredLeads(params: LeadFilterParams): Promise<{
  leads: LeadRecord[];
  metrics: LeadMetrics;
  cities: string[];
}> {
  const allLeads = await readAllLeads();
  const metrics = await getLeadMetrics(allLeads);

  // Extract unique cities/areas for filter dropdown
  const citySet = new Set<string>();
  for (const l of allLeads) {
    if (l.cityArea) citySet.add(l.cityArea.trim());
  }
  const cities = Array.from(citySet).sort();

  let filtered = [...allLeads];

  // 1. Text Search (restaurantName, ownerName, phone, cityArea)
  if (params.search && params.search.trim().length > 0) {
    const q = params.search.trim().toLowerCase();
    filtered = filtered.filter(
      (l) =>
        l.restaurantName.toLowerCase().includes(q) ||
        l.ownerName.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        l.cityArea.toLowerCase().includes(q) ||
        (l.email && l.email.toLowerCase().includes(q))
    );
  }

  // 2. Status Filter
  if (params.status && params.status !== "ALL") {
    filtered = filtered.filter((l) => l.status === params.status);
  }

  // 3. City Filter
  if (params.city && params.city !== "ALL") {
    filtered = filtered.filter((l) => l.cityArea.toLowerCase() === params.city?.toLowerCase());
  }

  // 4. Daily Walkins Filter
  if (params.walkins && params.walkins !== "ALL") {
    filtered = filtered.filter((l) => l.dailyWalkins === params.walkins);
  }

  // 5. Outlets Filter
  if (params.outlets && params.outlets !== "ALL") {
    filtered = filtered.filter((l) => l.outlets === params.outlets);
  }

  // 6. Follow-up Filter (Feature B & F)
  if (params.followUpFilter && params.followUpFilter !== "ALL") {
    filtered = filtered.filter((l) => {
      const p = calculateLeadPriority(l);
      if (params.followUpFilter === "OVERDUE") return p === "OVERDUE";
      if (params.followUpFilter === "TODAY") return p === "TODAY";
      if (params.followUpFilter === "SCHEDULED") return l.nextFollowUpAt !== null && p !== "OVERDUE" && p !== "TODAY";
      if (params.followUpFilter === "NONE") return !l.nextFollowUpAt;
      return true;
    });
  }

  // 7. Sort
  const sort = params.sort || "newest";
  filtered.sort((a, b) => {
    if (sort === "priority") {
      const pA = PRIORITY_ORDER[a.priority || calculateLeadPriority(a)];
      const pB = PRIORITY_ORDER[b.priority || calculateLeadPriority(b)];
      if (pA !== pB) return pA - pB;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sort === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sort === "followup_due") {
      if (!a.nextFollowUpAt && !b.nextFollowUpAt) return 0;
      if (!a.nextFollowUpAt) return 1;
      if (!b.nextFollowUpAt) return -1;
      return new Date(a.nextFollowUpAt).getTime() - new Date(b.nextFollowUpAt).getTime();
    }
    if (sort === "recently_contacted") {
      if (!a.lastContactedAt && !b.lastContactedAt) return 0;
      if (!a.lastContactedAt) return 1;
      if (!b.lastContactedAt) return -1;
      return new Date(b.lastContactedAt).getTime() - new Date(a.lastContactedAt).getTime();
    }
    // Default: newest first
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return {
    leads: filtered,
    metrics,
    cities,
  };
}
