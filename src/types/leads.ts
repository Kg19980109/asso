export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "DEMO_SCHEDULED"
  | "PILOT"
  | "CONVERTED"
  | "LOST";

export const VALID_STATUSES: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "DEMO_SCHEDULED",
  "PILOT",
  "CONVERTED",
  "LOST",
];

export type LeadPriority =
  | "OVERDUE"
  | "TODAY"
  | "UPCOMING_DEMO"
  | "NEW_UNCONTACTED"
  | "ACTIVE"
  | "CLOSED";

export const CONTACT_ACTIVITY_PRESETS = [
  "Called owner",
  "WhatsApp conversation",
  "Email sent",
  "Demo scheduled",
  "Demo conducted",
  "Follow-up completed",
  "Owner requested callback",
  "Other",
] as const;

export type ContactActivityPreset = (typeof CONTACT_ACTIVITY_PRESETS)[number];

export const PILOT_CHECKLIST_ITEMS = [
  "Restaurant onboarding discussed",
  "Tables configured",
  "QR setup discussed",
  "Staff walkthrough completed",
  "First live service completed",
  "Feedback collected",
] as const;

export type PilotChecklistItem = (typeof PILOT_CHECKLIST_ITEMS)[number];

export const LOST_REASONS = [
  "Price",
  "Not interested",
  "Timing",
  "Already using another system",
  "No response",
  "Location",
  "Other",
] as const;

export type LostReason = (typeof LOST_REASONS)[number];

export interface InternalNote {
  id: string;
  text: string;
  createdAt: string;
  author?: string;
}

export interface ContactHistoryEntry {
  id: string;
  timestamp: string;
  action: string;
  note?: string;
  previousStatus?: LeadStatus;
  newStatus?: LeadStatus;
  operator?: string;
}

export interface LeadRecord {
  id: string;
  restaurantName: string;
  ownerName: string;
  phone: string;
  email?: string;
  cityArea: string;
  outlets?: string;
  dailyWalkins?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  status: LeadStatus;
  priority?: LeadPriority;
  assignedTo?: string | null;
  lastContactedAt?: string | null;
  nextFollowUpAt?: string | null;
  internalNotes: InternalNote[];
  contactHistory: ContactHistoryEntry[];
  pilotChecklist?: string[];
  convertedAt?: string | null;
  lostReason?: string | null;
  ip?: string;
  userAgent?: string | null;
}

export interface LeadFilterParams {
  search?: string;
  status?: string;
  city?: string;
  walkins?: string;
  outlets?: string;
  followUpFilter?: "ALL" | "OVERDUE" | "TODAY" | "SCHEDULED" | "NONE";
  sort?: "newest" | "oldest" | "followup_due" | "recently_contacted" | "priority";
}

export interface LeadMetrics {
  total: number;
  byStatus: Record<LeadStatus, number>;
  receivedToday: number;
  receivedThisWeek: number;
  overdueFollowUps: number;
}

/**
 * Presentation-only helper determining the operational next-action label from authoritative fields.
 */
export function getNextActionLabel(lead: {
  status: LeadStatus;
  priority?: LeadPriority;
  lastContactedAt?: string | null;
}): string {
  if (lead.priority === "OVERDUE") return "Follow up now";
  if (lead.priority === "TODAY") return "Follow up today";
  if (lead.status === "NEW" && !lead.lastContactedAt) return "Contact this lead";
  if (lead.status === "DEMO_SCHEDULED") return "Prepare for demo";
  if (lead.status === "PILOT") return "Check pilot progress";
  if (lead.status === "CONVERTED") return "No action required";
  if (lead.status === "LOST") return "No active follow-up";
  return "Follow up lead";
}

export const CALL_OUTCOMES = [
  "Connected",
  "No answer",
  "Callback requested",
  "Interested",
  "Not interested",
  "Other",
] as const;

export type CallOutcome = (typeof CALL_OUTCOMES)[number];

export type TimelineCategory = "CONTACT" | "SALES" | "FOLLOW_UP" | "OTHER";

export function getTimelineCategory(action: string): TimelineCategory {
  const lower = action.toLowerCase();
  if (
    lower.startsWith("call") ||
    lower.includes("whatsapp") ||
    lower.includes("email") ||
    lower.includes("contacted")
  ) {
    return "CONTACT";
  }
  if (
    lower.includes("demo") ||
    lower.includes("pilot") ||
    lower.includes("converted") ||
    lower.includes("lost") ||
    lower.includes("qualified") ||
    lower.includes("reactivated")
  ) {
    return "SALES";
  }
  if (lower.includes("follow-up") || lower.includes("callback")) {
    return "FOLLOW_UP";
  }
  return "OTHER";
}

/**
 * Pure helper generating stage-aware professional WhatsApp outreach messages.
 * Never invents discounts, revenue promises, or false SLA guarantees.
 */
export function getLeadWhatsAppMessage(lead: {
  status: LeadStatus;
  restaurantName: string;
  ownerName: string;
  cityArea?: string;
  nextFollowUpAt?: string | null;
}): string {
  const owner = lead.ownerName?.trim() || "there";
  const restaurant = lead.restaurantName?.trim() || "your restaurant";
  const area = lead.cityArea?.trim() || "your area";

  switch (lead.status) {
    case "NEW":
      return `Hi ${owner}, this is ASSO. We received your partnership enquiry for ${restaurant} in ${area}. When would be a good time to connect about your table, queue, and ordering operations?`;

    case "CONTACTED":
      return `Hi ${owner}, following up on our conversation regarding ASSO for ${restaurant}. Let me know if you have any questions or if you'd like a brief walkthrough of how it works.`;

    case "QUALIFIED":
      return `Hi ${owner}, hope service is going well at ${restaurant}. We'd love to give you a quick 10-minute walkthrough of how ASSO handles live queues and guest seating. Would later today or tomorrow work for you?`;

    case "DEMO_SCHEDULED": {
      if (lead.nextFollowUpAt) {
        try {
          const date = new Date(lead.nextFollowUpAt);
          if (!isNaN(date.getTime())) {
            const formatted = date.toLocaleString("en-IN", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            return `Hi ${owner}, confirming our scheduled ASSO product walkthrough for ${restaurant} on ${formatted}. Looking forward to speaking!`;
          }
        } catch {}
      }
      return `Hi ${owner}, confirming our upcoming ASSO product walkthrough for ${restaurant}. Looking forward to speaking with you!`;
    }

    case "PILOT":
      return `Hi ${owner}, checking in on how the ASSO pilot is going at ${restaurant}. How are your team and guests finding the table and queue flow so far?`;

    case "LOST":
    case "CONVERTED":
    default:
      return "";
  }
}

/**
 * Normalizes phone number into an official WhatsApp wa.me direct URL.
 */
export function getWhatsAppUrl(phone: string, text: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  const normalizedDigits = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${normalizedDigits}?text=${encodeURIComponent(text)}`;
}
