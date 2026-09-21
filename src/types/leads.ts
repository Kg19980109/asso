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
  assignedTo?: string | null;
  lastContactedAt?: string | null;
  nextFollowUpAt?: string | null;
  internalNotes: InternalNote[];
  contactHistory: ContactHistoryEntry[];
  ip?: string;
  userAgent?: string | null;
}

export interface LeadFilterParams {
  search?: string;
  status?: string;
  city?: string;
  walkins?: string;
  outlets?: string;
  sort?: "newest" | "oldest" | "followup_due" | "recently_contacted";
}

export interface LeadMetrics {
  total: number;
  byStatus: Record<LeadStatus, number>;
  receivedToday: number;
  receivedThisWeek: number;
  overdueFollowUps: number;
}
