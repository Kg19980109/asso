"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  LeadRecord,
  LeadStatus,
  LeadPriority,
  LeadMetrics,
  VALID_STATUSES,
  CONTACT_ACTIVITY_PRESETS,
  PILOT_CHECKLIST_ITEMS,
  LOST_REASONS,
  CALL_OUTCOMES,
  CallOutcome,
  getNextActionLabel,
  getLeadWhatsAppMessage,
  getWhatsAppUrl,
  getTimelineCategory,
} from "@/types/leads";
import {
  Phone,
  Mail,
  Calendar,
  Clock,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  Building2,
  User,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  X,
  Plus,
  ArrowRight,
  Sparkles,
  PhoneCall,
  CalendarClock,
  FileText,
  History,
  Store,
  Check,
  UserCheck,
  Flame,
  RotateCcw,
  CheckSquare,
  Square,
  PartyPopper,
  XCircle,
  HelpCircle,
  ListTodo,
  MessageSquare,
  ClipboardList,
  Send,
  PhoneOff,
} from "lucide-react";

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; bg: string; text: string; border: string; glow: string }
> = {
  NEW: {
    label: "New",
    bg: "bg-blue-500/15",
    text: "text-blue-400",
    border: "border-blue-500/30",
    glow: "shadow-blue-500/10",
  },
  CONTACTED: {
    label: "Contacted",
    bg: "bg-purple-500/15",
    text: "text-purple-300",
    border: "border-purple-500/30",
    glow: "shadow-purple-500/10",
  },
  QUALIFIED: {
    label: "Qualified",
    bg: "bg-indigo-500/15",
    text: "text-indigo-300",
    border: "border-indigo-500/30",
    glow: "shadow-indigo-500/10",
  },
  DEMO_SCHEDULED: {
    label: "Demo Scheduled",
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-500/30",
    glow: "shadow-amber-500/10",
  },
  PILOT: {
    label: "Pilot",
    bg: "bg-cyan-500/15",
    text: "text-cyan-300",
    border: "border-cyan-500/30",
    glow: "shadow-cyan-500/10",
  },
  CONVERTED: {
    label: "Converted",
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/10",
  },
  LOST: {
    label: "Lost",
    bg: "bg-stone-500/15",
    text: "text-stone-400",
    border: "border-stone-500/30",
    glow: "shadow-stone-500/10",
  },
};

const PRIORITY_CONFIG: Record<
  LeadPriority,
  { label: string; bg: string; text: string; border: string; icon: any }
> = {
  OVERDUE: {
    label: "FOLLOW UP OVERDUE",
    bg: "bg-rose-500/15",
    text: "text-rose-300",
    border: "border-rose-500/30",
    icon: AlertTriangle,
  },
  TODAY: {
    label: "FOLLOW UP TODAY",
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-500/30",
    icon: Clock,
  },
  UPCOMING_DEMO: {
    label: "DEMO SCHEDULED",
    bg: "bg-purple-500/15",
    text: "text-purple-300",
    border: "border-purple-500/30",
    icon: CalendarClock,
  },
  NEW_UNCONTACTED: {
    label: "NEW • NOT CONTACTED",
    bg: "bg-blue-500/15",
    text: "text-blue-300",
    border: "border-blue-500/30",
    icon: Sparkles,
  },
  ACTIVE: {
    label: "ACTIVE IN PIPELINE",
    bg: "bg-white/5",
    text: "text-slate-300",
    border: "border-white/10",
    icon: TrendingUp,
  },
  CLOSED: {
    label: "CLOSED / ARCHIVED",
    bg: "bg-stone-500/10",
    text: "text-stone-400",
    border: "border-stone-500/20",
    icon: CheckCircle2,
  },
};

const PIPELINE_STEPS: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "DEMO_SCHEDULED",
  "PILOT",
  "CONVERTED",
];

function formatTimeAgo(isoString: string): string {
  const diffMs = Date.now() - new Date(isoString).getTime();
  if (isNaN(diffMs)) return "Recent";
  const mins = Math.floor(diffMs / (60 * 1000));
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function LeadsDashboardPage() {
  const router = useRouter();

  // State
  const [leads, setLeads] = React.useState<LeadRecord[]>([]);
  const [metrics, setMetrics] = React.useState<LeadMetrics | null>(null);
  const [cities, setCities] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Filters & Search
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("ALL");
  const [cityFilter, setCityFilter] = React.useState("ALL");
  const [walkinsFilter, setWalkinsFilter] = React.useState("ALL");
  const [outletsFilter, setOutletsFilter] = React.useState("ALL");
  const [followUpFilter, setFollowUpFilter] = React.useState("ALL");
  const [sortBy, setSortBy] = React.useState("priority");

  // Selected Lead Drawer
  const [selectedLeadId, setSelectedLeadId] = React.useState<string | null>(null);
  const [updating, setUpdating] = React.useState(false);

  // Quick inputs in drawer
  const [newNoteText, setNewNoteText] = React.useState("");
  const [customFollowUpDate, setCustomFollowUpDate] = React.useState("");
  const [quickContactAction, setQuickContactAction] = React.useState<string>("");
  const [quickContactNote, setQuickContactNote] = React.useState("");
  const [editingAssignee, setEditingAssignee] = React.useState(false);
  const [assignedToInput, setAssignedToInput] = React.useState("");

  // Lost Reason Modal State
  const [showLostModal, setShowLostModal] = React.useState(false);
  const [selectedLostReason, setSelectedLostReason] = React.useState<string>("Not interested");
  const [lostNoteInput, setLostNoteInput] = React.useState("");

  // Demo Schedule Input
  const [demoDateTime, setDemoDateTime] = React.useState("");
  const [demoNote, setDemoNote] = React.useState("");

  // Phase 1G: WhatsApp Modal & Verification Flow State
  const [showWhatsAppModal, setShowWhatsAppModal] = React.useState(false);
  const [whatsAppMessageDraft, setWhatsAppMessageDraft] = React.useState("");
  const [whatsAppConfirmationStep, setWhatsAppConfirmationStep] = React.useState(false);
  const [whatsAppNote, setWhatsAppNote] = React.useState("");

  // Phase 1G: Call Outcome Modal State
  const [showCallModal, setShowCallModal] = React.useState(false);
  const [selectedCallOutcome, setSelectedCallOutcome] = React.useState<CallOutcome | "">("");
  const [callCallbackDate, setCallCallbackDate] = React.useState("");
  const [callNoteInput, setCallNoteInput] = React.useState("");

  // Phase 1G: Email Confirmation Modal State
  const [showEmailConfirmModal, setShowEmailConfirmModal] = React.useState(false);
  const [emailNoteInput, setEmailNoteInput] = React.useState("");

  // Phase 1G: Demo Conducted Modal State
  const [showDemoConductedModal, setShowDemoConductedModal] = React.useState(false);
  const [demoConductedNotes, setDemoConductedNotes] = React.useState("");

  // Keyboard accessibility: Escape closes drawer & modals
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showLostModal) {
          setShowLostModal(false);
        } else if (showWhatsAppModal) {
          setShowWhatsAppModal(false);
        } else if (showCallModal) {
          setShowCallModal(false);
        } else if (showEmailConfirmModal) {
          setShowEmailConfirmModal(false);
        } else if (showDemoConductedModal) {
          setShowDemoConductedModal(false);
        } else if (selectedLeadId) {
          setSelectedLeadId(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    showLostModal,
    showWhatsAppModal,
    showCallModal,
    showEmailConfirmModal,
    showDemoConductedModal,
    selectedLeadId,
  ]);

  // Fetch leads from server
  const fetchLeads = React.useCallback(
    async (isBackground = false) => {
      if (!isBackground) setLoading(true);
      else setRefreshing(true);
      setError(null);

      try {
        const query = new URLSearchParams();
        if (search.trim()) query.set("search", search.trim());
        if (statusFilter !== "ALL") query.set("status", statusFilter);
        if (cityFilter !== "ALL") query.set("city", cityFilter);
        if (walkinsFilter !== "ALL") query.set("walkins", walkinsFilter);
        if (outletsFilter !== "ALL") query.set("outlets", outletsFilter);
        if (followUpFilter !== "ALL") query.set("followUpFilter", followUpFilter);
        if (sortBy !== "newest") query.set("sort", sortBy);

        const res = await fetch(`/api/admin/leads?${query.toString()}`);
        if (res.status === 401) {
          router.replace("/dashboard/login");
          return;
        }

        const data = await res.json();
        if (res.ok && data.success) {
          setLeads(data.leads || []);
          setMetrics(data.metrics || null);
          setCities(data.cities || []);
        } else {
          setError(data.error || "Failed to load leads.");
        }
      } catch {
        setError("Network connection issue. Please check your connection.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [search, statusFilter, cityFilter, walkinsFilter, outletsFilter, followUpFilter, sortBy, router]
  );

  React.useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.replace("/dashboard/login");
    } catch {
      router.replace("/dashboard/login");
    }
  };

  // Reset all active filters
  const resetFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setCityFilter("ALL");
    setWalkinsFilter("ALL");
    setOutletsFilter("ALL");
    setFollowUpFilter("ALL");
    setSortBy("priority");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    statusFilter !== "ALL" ||
    cityFilter !== "ALL" ||
    walkinsFilter !== "ALL" ||
    outletsFilter !== "ALL" ||
    followUpFilter !== "ALL";

  // Selected lead object
  const selectedLead = React.useMemo(() => {
    if (!selectedLeadId) return null;
    return leads.find((l) => l.id === selectedLeadId) || null;
  }, [leads, selectedLeadId]);

  // Patch lead handler
  const handleUpdateLead = async (
    targetLeadId: string,
    updates: {
      status?: LeadStatus;
      nextFollowUpAt?: string | null;
      assignedTo?: string | null;
      newNote?: string;
      contactAction?: string;
      contactNote?: string;
      pilotChecklist?: string[];
      lostReason?: string | null;
    }
  ) => {
    setUpdating(true);

    try {
      const res = await fetch(`/api/admin/leads/${targetLeadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const data = await res.json();
      if (res.ok && data.success && data.lead) {
        setLeads((prev) =>
          prev.map((l) => (l.id === targetLeadId ? data.lead : l))
        );
        // Refresh metrics in background
        fetchLeads(true);
      } else {
        alert(data.error || "Failed to update lead.");
      }
    } catch {
      alert("Network error updating lead.");
    } finally {
      setUpdating(false);
    }
  };

  // Quick follow-up presets
  const setFollowUpPreset = (daysFromNow: number) => {
    if (!selectedLeadId) return;
    const target = new Date();
    target.setDate(target.getDate() + daysFromNow);
    target.setHours(11, 0, 0, 0); // Default to 11:00 AM
    handleUpdateLead(selectedLeadId, { nextFollowUpAt: target.toISOString() });
  };

  // Pilot Checklist toggle
  const togglePilotItem = (item: string) => {
    if (!selectedLead) return;
    const currentList = selectedLead.pilotChecklist || [];
    const isCompleted = currentList.includes(item);
    const updated = isCompleted
      ? currentList.filter((i) => i !== item)
      : [...currentList, item];

    handleUpdateLead(selectedLead.id, {
      pilotChecklist: updated,
      contactAction: isCompleted
        ? `Pilot item unchecked: ${item}`
        : `Pilot milestone reached: ${item}`,
    });
  };

  // ── Phase 1G: Unified Contact Action Handlers ──

  // Call Handler: opens native dialer and presents outcome picker prompt
  const handleCallAction = (lead: LeadRecord) => {
    setSelectedLeadId(lead.id);
    window.location.href = `tel:${lead.phone}`;
    setSelectedCallOutcome("");
    setCallCallbackDate("");
    setCallNoteInput("");
    setShowCallModal(true);
  };

  const handleConfirmCallOutcome = async () => {
    if (!selectedLead || !selectedCallOutcome) return;

    const actionText = `Call — ${selectedCallOutcome}`;
    const updates: any = {
      contactAction: actionText,
      contactNote: callNoteInput.trim() || undefined,
    };

    if (
      selectedLead.status === "NEW" &&
      ["Connected", "Callback requested", "Interested"].includes(selectedCallOutcome)
    ) {
      updates.status = "CONTACTED";
    }

    if (selectedCallOutcome === "Callback requested" && callCallbackDate) {
      updates.nextFollowUpAt = new Date(callCallbackDate).toISOString();
    }

    await handleUpdateLead(selectedLead.id, updates);
    setShowCallModal(false);
  };

  // WhatsApp Handler: generates pre-filled message, opens wa.me, and prompts confirmation
  const handleOpenWhatsAppModal = (lead: LeadRecord) => {
    setSelectedLeadId(lead.id);
    const defaultMsg = getLeadWhatsAppMessage(lead);
    setWhatsAppMessageDraft(defaultMsg);
    setWhatsAppConfirmationStep(false);
    setWhatsAppNote("");
    setShowWhatsAppModal(true);
  };

  const handleSendWhatsApp = (lead: LeadRecord) => {
    const url = getWhatsAppUrl(lead.phone, whatsAppMessageDraft);
    window.open(url, "_blank", "noopener,noreferrer");
    setWhatsAppConfirmationStep(true);
  };

  const handleConfirmWhatsAppSent = async (lead: LeadRecord) => {
    await handleUpdateLead(lead.id, {
      contactAction: "WhatsApp conversation",
      contactNote: whatsAppNote.trim() || undefined,
      status: lead.status === "NEW" ? "CONTACTED" : undefined,
    });
    setShowWhatsAppModal(false);
    setWhatsAppConfirmationStep(false);
    setWhatsAppNote("");
  };

  // Email Handler: opens mailto and prompts confirmation
  const handleInitiateEmail = (lead: LeadRecord) => {
    if (!lead.email) return;
    setSelectedLeadId(lead.id);
    window.location.href = `mailto:${lead.email}`;
    setEmailNoteInput("");
    setShowEmailConfirmModal(true);
  };

  const handleConfirmEmailSent = async (lead: LeadRecord) => {
    await handleUpdateLead(lead.id, {
      contactAction: "Email sent",
      contactNote: emailNoteInput.trim() || undefined,
      status: lead.status === "NEW" ? "CONTACTED" : undefined,
    });
    setShowEmailConfirmModal(false);
  };

  // Demo Conducted Handler
  const handleConfirmDemoConducted = async (lead: LeadRecord) => {
    await handleUpdateLead(lead.id, {
      contactAction: "Demo conducted",
      contactNote: demoConductedNotes.trim() || undefined,
    });
    setShowDemoConductedModal(false);
    setDemoConductedNotes("");
  };

  // Today's Work actionable leads (Feature H)
  const todayWorklist = React.useMemo(() => {
    return leads.filter(
      (l) =>
        l.priority === "OVERDUE" ||
        l.priority === "TODAY" ||
        l.priority === "NEW_UNCONTACTED" ||
        l.priority === "UPCOMING_DEMO"
    );
  }, [leads]);

  // Phase 1G: 4 Authoritative Work Queues Counts
  const overdueLeadsCount = React.useMemo(() => {
    return metrics?.overdueFollowUps ?? leads.filter((l) => l.priority === "OVERDUE").length;
  }, [metrics, leads]);

  const todayLeadsCount = React.useMemo(() => {
    return leads.filter((l) => l.priority === "TODAY").length;
  }, [leads]);

  const newUncontactedCount = React.useMemo(() => {
    return leads.filter((l) => l.status === "NEW" && !l.lastContactedAt).length;
  }, [leads]);

  const scheduledDemosCount = React.useMemo(() => {
    return metrics?.byStatus?.["DEMO_SCHEDULED"] ?? leads.filter((l) => l.status === "DEMO_SCHEDULED").length;
  }, [metrics, leads]);

  return (
    <div className="min-h-screen bg-[#060B18] text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white pb-20">
      {/* ── TOP NAV BAR ── */}
      <header className="sticky top-0 z-30 bg-[#060B18]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-amber-500 flex items-center justify-center font-black text-white text-xs tracking-wider shadow-md shadow-purple-600/20">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-white">
                ASSO
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Conversion Workspace
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Restaurant Partner Conversion &amp; Follow-up Pipeline
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchLeads(true)}
            disabled={refreshing}
            className="min-h-[44px] min-w-[44px] px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-1.5 text-xs cursor-pointer disabled:opacity-50"
            title="Refresh lead list"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={handleLogout}
            className="min-h-[44px] min-w-[44px] px-3 rounded-xl bg-white/5 hover:bg-rose-500/15 text-slate-400 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 transition-colors flex items-center justify-center gap-1.5 text-xs cursor-pointer"
            title="Log out of operator dashboard"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* ── INTERACTIVE PIPELINE VISUALIZATION (Feature I) ── */}
        <section className="glass-panel-dark p-4 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              <span>Conversion Pipeline</span>
            </span>
            <span className="text-[11px] text-slate-500">
              Click stage to filter table
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {PIPELINE_STEPS.map((step, idx) => {
              const count = metrics?.byStatus[step] || 0;
              const cfg = STATUS_CONFIG[step];
              const isSelected = statusFilter === step;
              return (
                <button
                  key={step}
                  onClick={() => setStatusFilter(isSelected ? "ALL" : step)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? `${cfg.bg} ${cfg.border} ring-1 ring-white/30 shadow-md`
                      : "bg-white/[0.02] hover:bg-white/[0.05] border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {idx + 1}. {cfg.label}
                    </span>
                  </div>
                  <div className="text-xl font-black text-white mt-1">
                    {count}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── TODAY'S SALES WORKLIST (Feature H: Actionable Queue) ── */}
        <section className="glass-panel-dark p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                {todayWorklist.length}
              </div>
              <h2 className="text-sm font-black text-white tracking-tight uppercase">
                Today's Action Queue
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Restaurants requiring attention today
            </span>
          </div>

          {/* 4 Actionable Work Queues (Phase 1G Section 12) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            {/* 1. OVERDUE */}
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex flex-col justify-between gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                  Overdue
                </span>
                <span className="text-sm font-black text-rose-300 font-mono">
                  {overdueLeadsCount}
                </span>
              </div>
              <button
                onClick={() => {
                  setStatusFilter("ALL");
                  setFollowUpFilter("OVERDUE");
                }}
                className="min-h-[36px] w-full py-1.5 px-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30 text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Contact now
              </button>
            </div>

            {/* 2. DUE TODAY */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col justify-between gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  Due Today
                </span>
                <span className="text-sm font-black text-amber-300 font-mono">
                  {todayLeadsCount}
                </span>
              </div>
              <button
                onClick={() => {
                  setStatusFilter("ALL");
                  setFollowUpFilter("TODAY");
                }}
                className="min-h-[36px] w-full py-1.5 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Contact
              </button>
            </div>

            {/* 3. NEW UNCONTACTED */}
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col justify-between gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                  New Uncontacted
                </span>
                <span className="text-sm font-black text-blue-300 font-mono">
                  {newUncontactedCount}
                </span>
              </div>
              <button
                onClick={() => {
                  setFollowUpFilter("ALL");
                  setStatusFilter("NEW");
                }}
                className="min-h-[36px] w-full py-1.5 px-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-500/30 text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Start outreach
              </button>
            </div>

            {/* 4. SCHEDULED DEMOS */}
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex flex-col justify-between gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                  Scheduled Demos
                </span>
                <span className="text-sm font-black text-purple-300 font-mono">
                  {scheduledDemosCount}
                </span>
              </div>
              <button
                onClick={() => {
                  setFollowUpFilter("ALL");
                  setStatusFilter("DEMO_SCHEDULED");
                }}
                className="min-h-[36px] w-full py-1.5 px-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/30 text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Prepare
              </button>
            </div>
          </div>

          {todayWorklist.length === 0 ? (
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>All caught up! Zero overdue follow-ups or pending urgent actions for today.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {todayWorklist.map((lead) => {
                const priorityCfg = PRIORITY_CONFIG[lead.priority || "ACTIVE"];
                const nextAction = getNextActionLabel(lead);

                return (
                  <div
                    key={lead.id}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-3 ${priorityCfg.bg} ${priorityCfg.border}`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${priorityCfg.text}`}
                        >
                          {priorityCfg.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {formatTimeAgo(lead.createdAt)}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white truncate">
                        {lead.restaurantName}
                      </h3>
                      <p className="text-xs text-slate-300 truncate">
                        {lead.ownerName} • {lead.cityArea}
                      </p>
                      <div className="mt-2 text-[11px] text-slate-200 font-medium flex items-center gap-1.5">
                        <ArrowRight className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>{nextAction}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10 gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCallAction(lead)}
                          className="min-h-[36px] px-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </button>
                        <button
                          onClick={() => handleOpenWhatsAppModal(lead)}
                          className="min-h-[36px] px-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WA</span>
                        </button>
                      </div>

                      <button
                        onClick={() => setSelectedLeadId(lead.id)}
                        className="min-h-[36px] px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Workspace</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── SEARCH & FILTER CONTROLS (Feature J) ── */}
        <section className="glass-panel-dark p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3.5">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search restaurant, owner, phone, area..."
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
              {/* Status */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter by Status"
                className="px-2.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-purple-400"
              >
                <option value="ALL" className="bg-[#080E21] text-white">
                  All Statuses
                </option>
                {VALID_STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-[#080E21] text-white">
                    {STATUS_CONFIG[s].label}
                  </option>
                ))}
              </select>

              {/* Follow-up State */}
              <select
                value={followUpFilter}
                onChange={(e) => setFollowUpFilter(e.target.value)}
                aria-label="Filter by Follow-up Status"
                className="px-2.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-purple-400"
              >
                <option value="ALL" className="bg-[#080E21] text-white">
                  All Follow-ups
                </option>
                <option value="OVERDUE" className="bg-[#080E21] text-rose-300 font-semibold">
                  ⚠️ Overdue Only
                </option>
                <option value="TODAY" className="bg-[#080E21] text-amber-300 font-semibold">
                  🕒 Today Only
                </option>
                <option value="SCHEDULED" className="bg-[#080E21] text-white">
                  📅 Scheduled Future
                </option>
                <option value="NONE" className="bg-[#080E21] text-white">
                  No Follow-up Set
                </option>
              </select>

              {/* City / Area */}
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                aria-label="Filter by City or Area"
                className="px-2.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-purple-400"
              >
                <option value="ALL" className="bg-[#080E21] text-white">
                  All Areas
                </option>
                {cities.map((city) => (
                  <option
                    key={city}
                    value={city}
                    className="bg-[#080E21] text-white"
                  >
                    {city}
                  </option>
                ))}
              </select>

              {/* Walk-in volume */}
              <select
                value={walkinsFilter}
                onChange={(e) => setWalkinsFilter(e.target.value)}
                aria-label="Filter by Daily Walk-ins"
                className="px-2.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-purple-400"
              >
                <option value="ALL" className="bg-[#080E21] text-white">
                  All Traffic
                </option>
                <option value="under-50" className="bg-[#080E21] text-white">
                  Under 50 / day
                </option>
                <option value="50-150" className="bg-[#080E21] text-white">
                  50-150 / day
                </option>
                <option value="150-300" className="bg-[#080E21] text-white">
                  150-300 / day
                </option>
                <option value="300+" className="bg-[#080E21] text-white">
                  300+ / day
                </option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort leads by"
                className="w-full md:w-auto px-3 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold focus:outline-none"
              >
                <option value="priority" className="bg-[#080E21] text-amber-300 font-semibold">
                  Sort: Urgent Priority
                </option>
                <option value="newest" className="bg-[#080E21] text-white">
                  Sort: Newest First
                </option>
                <option value="oldest" className="bg-[#080E21] text-white">
                  Sort: Oldest First
                </option>
                <option value="followup_due" className="bg-[#080E21] text-white">
                  Sort: Follow-up Due
                </option>
                <option
                  value="recently_contacted"
                  className="bg-[#080E21] text-white"
                >
                  Sort: Recently Contacted
                </option>
              </select>
            </div>
          </div>

          {/* Active Filter Strip with Clear Option */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-slate-500 font-medium">Active Filters:</span>
                {search && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px]">
                    Search: "{search}"
                  </span>
                )}
                {statusFilter !== "ALL" && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px]">
                    Status: {STATUS_CONFIG[statusFilter as LeadStatus]?.label || statusFilter}
                  </span>
                )}
                {followUpFilter !== "ALL" && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
                    Follow-up: {followUpFilter}
                  </span>
                )}
                {cityFilter !== "ALL" && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px]">
                    Area: {cityFilter}
                  </span>
                )}
              </div>
              <button
                onClick={resetFilters}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </section>

        {/* ── ALL LEADS DATA TABLE & MOBILE CARDS ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Showing <strong className="text-white">{leads.length}</strong>{" "}
              {leads.length === 1 ? "restaurant lead" : "restaurant leads"}
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-purple-400 hover:text-purple-300 cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          {loading ? (
            <div className="glass-panel-dark rounded-2xl p-12 text-center border border-white/10">
              <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs text-slate-400">Loading restaurant enquiries...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="glass-panel-dark rounded-2xl p-12 text-center border border-white/10">
              <Store className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">
                {hasActiveFilters ? "No matching leads found" : "No restaurant leads recorded yet"}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                {hasActiveFilters
                  ? "Try loosening your search keywords or clearing active filters."
                  : "Incoming restaurant partnership enquiries from the website will automatically appear here."}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold cursor-pointer"
                >
                  Reset Active Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE */}
              <div className="hidden md:block glass-panel-dark rounded-2xl border border-white/10 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Priority / Restaurant</th>
                      <th className="py-3 px-4">Owner / Contact</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Scale</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Next Action</th>
                      <th className="py-3 px-4 text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.map((lead) => {
                      const cfg = STATUS_CONFIG[lead.status];
                      const priorityCfg = PRIORITY_CONFIG[lead.priority || "ACTIVE"];
                      const isSelected = selectedLeadId === lead.id;
                      const nextAction = getNextActionLabel(lead);

                      return (
                        <tr
                          key={lead.id}
                          onClick={() => setSelectedLeadId(lead.id)}
                          className={`hover:bg-white/[0.04] transition-colors cursor-pointer ${
                            isSelected ? "bg-purple-500/10" : ""
                          }`}
                        >
                          {/* Restaurant & Priority */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${priorityCfg.bg} ${priorityCfg.text} ${priorityCfg.border}`}
                              >
                                {priorityCfg.label}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                {formatTimeAgo(lead.createdAt)}
                              </span>
                            </div>
                            <div className="font-bold text-white text-sm">
                              {lead.restaurantName}
                            </div>
                          </td>

                          {/* Owner & Phone */}
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-slate-200">
                              {lead.ownerName}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                              <span>{lead.phone}</span>
                            </div>
                          </td>

                          {/* Location */}
                          <td className="py-3.5 px-4 text-slate-300">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                              <span className="truncate max-w-[140px]">
                                {lead.cityArea}
                              </span>
                            </div>
                          </td>

                          {/* Business Scale */}
                          <td className="py-3.5 px-4 text-slate-300">
                            <div>
                              {lead.dailyWalkins ? `${lead.dailyWalkins} / day` : "—"}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {lead.outlets === "1"
                                ? "1 Outlet"
                                : `${lead.outlets} Outlets`}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}
                            >
                              {cfg.label}
                            </span>
                            {lead.status === "LOST" && lead.lostReason && (
                              <span className="block text-[10px] text-slate-500 mt-0.5">
                                Reason: {lead.lostReason}
                              </span>
                            )}
                          </td>

                          {/* Next Action */}
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-slate-200">
                              {nextAction}
                            </div>
                            {lead.nextFollowUpAt && (
                              <span className="text-[10px] text-slate-400 block">
                                {new Date(lead.nextFollowUpAt).toLocaleDateString("en-IN", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            )}
                          </td>

                          {/* Quick Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div
                              className="inline-flex items-center gap-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {lead.status === "NEW" && (
                                <button
                                  onClick={() =>
                                    handleUpdateLead(lead.id, {
                                      status: "CONTACTED",
                                      contactAction: "Called owner",
                                    })
                                  }
                                  className="px-2 py-1 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-[10px] font-bold transition-colors cursor-pointer"
                                  title="Fast mark as contacted"
                                >
                                  Mark Contacted
                                </button>
                              )}

                              <a
                                href={`tel:${lead.phone}`}
                                onClick={() => {
                                  handleUpdateLead(lead.id, {
                                    contactAction: "Called owner",
                                    status: lead.status === "NEW" ? "CONTACTED" : undefined,
                                  });
                                }}
                                className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                                title={`Call ${lead.ownerName}`}
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>

                              {lead.email && (
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-colors"
                                  title={`Email ${lead.ownerName}`}
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </a>
                              )}

                              <button
                                onClick={() => setSelectedLeadId(lead.id)}
                                className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <span>Workspace</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS */}
              <div className="md:hidden space-y-3">
                {leads.map((lead) => {
                  const cfg = STATUS_CONFIG[lead.status];
                  const priorityCfg = PRIORITY_CONFIG[lead.priority || "ACTIVE"];
                  const nextAction = getNextActionLabel(lead);

                  return (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLeadId(lead.id)}
                      className="glass-panel-dark rounded-2xl p-4 border border-white/10 space-y-3 active:scale-[0.99] transition-transform"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${priorityCfg.bg} ${priorityCfg.text} ${priorityCfg.border}`}
                        >
                          {priorityCfg.label}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {formatTimeAgo(lead.createdAt)}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-base font-bold text-white">
                            {lead.restaurantName}
                          </h4>
                          <span className="text-xs text-slate-400">
                            {lead.ownerName} • {lead.cityArea}
                          </span>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}
                        >
                          {cfg.label}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 flex items-center gap-1.5 pt-0.5">
                        <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="font-semibold text-white">{nextAction}</span>
                      </div>

                      <div
                        className="flex items-center justify-between pt-2 border-t border-white/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${lead.phone}`}
                            className="min-h-[44px] px-3.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5"
                          >
                            <Phone className="w-4 h-4" />
                            <span>Call</span>
                          </a>

                          {lead.status === "NEW" && (
                            <button
                              onClick={() =>
                                handleUpdateLead(lead.id, {
                                  status: "CONTACTED",
                                  contactAction: "Called owner",
                                })
                              }
                              className="min-h-[44px] px-3 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold"
                            >
                              Mark Contacted
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => setSelectedLeadId(lead.id)}
                          className="min-h-[44px] px-2 text-xs text-purple-400 font-semibold flex items-center gap-1"
                        >
                          <span>Workspace</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </main>

      {/* ── SALES WORKSPACE SLIDE-OVER DRAWER (Feature A, B, C, D, E, F, G) ── */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="flex-1"
            onClick={() => setSelectedLeadId(null)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-restaurant-title"
            className="w-full max-w-xl h-full bg-[#080E21] border-l border-white/10 shadow-2xl flex flex-col overflow-y-auto z-10"
          >
            {/* 1. TOP HEADER (Feature A: Restaurant, Status, Priority, Owner, Location) */}
            <div className="sticky top-0 bg-[#080E21]/95 backdrop-blur-md border-b border-white/10 p-5 flex items-center justify-between z-20">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      STATUS_CONFIG[selectedLead.status].bg
                    } ${STATUS_CONFIG[selectedLead.status].text} ${
                      STATUS_CONFIG[selectedLead.status].border
                    }`}
                  >
                    {STATUS_CONFIG[selectedLead.status].label}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${
                      PRIORITY_CONFIG[selectedLead.priority || "ACTIVE"].bg
                    } ${PRIORITY_CONFIG[selectedLead.priority || "ACTIVE"].text} ${
                      PRIORITY_CONFIG[selectedLead.priority || "ACTIVE"].border
                    }`}
                  >
                    {PRIORITY_CONFIG[selectedLead.priority || "ACTIVE"].label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Age: {formatTimeAgo(selectedLead.createdAt)}
                  </span>
                </div>
                <h2 id="drawer-restaurant-title" className="text-xl font-black text-white">
                  {selectedLead.restaurantName}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedLead.ownerName} • {selectedLead.cityArea}
                </p>
              </div>

              <button
                onClick={() => setSelectedLeadId(null)}
                className="min-h-[44px] min-w-[44px] rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                title="Close drawer (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6 flex-1">
              {/* 2. NEXT ACTION MODULE (Placed right at the top so operator sees next step immediately!) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/30 via-indigo-950/20 to-transparent border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Next Action Recommended</span>
                  </span>
                  {selectedLead.nextFollowUpAt && (
                    <span className="text-[11px] text-amber-300 font-semibold">
                      Due: {new Date(selectedLead.nextFollowUpAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>

                <div className="text-base font-bold text-white">
                  {getNextActionLabel(selectedLead)}
                </div>

                {/* Unified Contact Actions (Call, WhatsApp, Email, Log Activity) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <button
                    onClick={() => handleCallAction(selectedLead)}
                    className="min-h-[44px] py-2 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    title="Call Owner"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call</span>
                  </button>

                  <button
                    onClick={() => handleOpenWhatsAppModal(selectedLead)}
                    className="min-h-[44px] py-2 px-3 rounded-xl bg-emerald-600/25 hover:bg-emerald-600/35 text-emerald-200 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    title="WhatsApp Outreach"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>

                  {selectedLead.email ? (
                    <button
                      onClick={() => handleInitiateEmail(selectedLead)}
                      className="min-h-[44px] py-2 px-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      title="Email Owner"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </button>
                  ) : (
                    <div className="min-h-[44px] py-2 px-3 rounded-xl bg-white/5 text-slate-500 border border-white/5 text-xs font-medium flex items-center justify-center gap-1.5">
                      <Mail className="w-4 h-4" />
                      <span>No Email</span>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      const el = document.getElementById("quick-activity-section");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="min-h-[44px] py-2 px-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    title="Log Manual Activity"
                  >
                    <ClipboardList className="w-4 h-4" />
                    <span>Log Activity</span>
                  </button>
                </div>
              </div>

              {/* 3. PIPELINE STAGE PICKER (Feature E) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Pipeline Stage
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Click to transition lead
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {PIPELINE_STEPS.map((step) => {
                    const isCurrent = selectedLead.status === step;
                    const cfg = STATUS_CONFIG[step];
                    return (
                      <button
                        key={step}
                        disabled={updating}
                        onClick={() => handleUpdateLead(selectedLead.id, { status: step })}
                        className={`min-h-[44px] py-2 px-1 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all text-center cursor-pointer disabled:opacity-50 ${
                          isCurrent
                            ? `${cfg.bg} ${cfg.text} ${cfg.border} ring-1 ring-white/30 shadow-md`
                            : "bg-white/5 text-slate-400 border-white/5 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-1">
                  {selectedLead.status === "LOST" ? (
                    <button
                      disabled={updating}
                      onClick={() => handleUpdateLead(selectedLead.id, { status: "NEW" })}
                      className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-pointer"
                    >
                      Reactivate Lead
                    </button>
                  ) : (
                    <button
                      disabled={updating}
                      onClick={() => setShowLostModal(true)}
                      className="text-[11px] font-semibold px-3 py-1 rounded-lg text-slate-500 hover:text-rose-400 border border-transparent hover:border-rose-500/20 cursor-pointer transition-colors"
                    >
                      Mark as Lost...
                    </button>
                  )}
                </div>
              </div>

              {/* 4. WORKFLOW: DEMO SCHEDULED (Phase 1G Section 9) */}
              {selectedLead.status === "DEMO_SCHEDULED" && (
                <div className="glass-panel-dark p-4 rounded-2xl border border-amber-500/30 space-y-3.5 bg-amber-500/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <CalendarClock className="w-4 h-4 text-amber-400" />
                      <span>Demo Scheduled</span>
                    </div>
                    <span className="text-[10px] text-amber-400 font-medium px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      Active Walkthrough
                    </span>
                  </div>

                  {/* Scheduled Summary Details */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1 text-amber-200">
                    <div className="font-semibold text-white">
                      Restaurant: <span className="text-amber-300">{selectedLead.restaurantName}</span>
                    </div>
                    {selectedLead.nextFollowUpAt ? (
                      <div>
                        <strong>Scheduled Date &amp; Time:</strong>{" "}
                        {new Date(selectedLead.nextFollowUpAt).toLocaleString("en-IN", {
                          dateStyle: "full",
                          timeStyle: "short",
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-amber-300/80">
                        Date &amp; time not yet finalized. Pick a time below:
                      </p>
                    )}
                  </div>

                  {/* 4 Dedicated Demo Actions: [ Call ] [ WhatsApp ] [ Mark demo conducted ] [ Reschedule ] */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <button
                      onClick={() => handleCallAction(selectedLead)}
                      className="min-h-[40px] py-1.5 px-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </button>

                    <button
                      onClick={() => handleOpenWhatsAppModal(selectedLead)}
                      className="min-h-[40px] py-1.5 px-2.5 rounded-xl bg-emerald-600/25 hover:bg-emerald-600/35 text-emerald-200 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={() => {
                        setDemoConductedNotes("");
                        setShowDemoConductedModal(true);
                      }}
                      className="min-h-[40px] py-1.5 px-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Conducted</span>
                    </button>

                    <button
                      onClick={() => {
                        const el = document.getElementById("demo-reschedule-input");
                        el?.focus();
                      }}
                      className="min-h-[40px] py-1.5 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Reschedule</span>
                    </button>
                  </div>

                  {/* Move to Pilot explicit button */}
                  <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Walkthrough completed successfully?
                    </span>
                    <button
                      disabled={updating}
                      onClick={() =>
                        handleUpdateLead(selectedLead.id, {
                          status: "PILOT",
                          contactAction: "Moved to Pilot by operator",
                        })
                      }
                      className="min-h-[38px] px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                    >
                      <span>Move to Pilot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Reschedule Date/Time Picker */}
                  <div className="pt-2 border-t border-amber-500/20 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-amber-300/80">
                      Set / Change Demo Timing
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        id="demo-reschedule-input"
                        type="datetime-local"
                        value={demoDateTime}
                        onChange={(e) => setDemoDateTime(e.target.value)}
                        className="flex-1 min-h-[44px] px-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                      />
                      <button
                        disabled={!demoDateTime || updating}
                        onClick={() => {
                          if (demoDateTime) {
                            handleUpdateLead(selectedLead.id, {
                              nextFollowUpAt: new Date(demoDateTime).toISOString(),
                              contactAction: "Demo scheduled with owner",
                            });
                            setDemoDateTime("");
                          }
                        }}
                        className="min-h-[44px] px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold disabled:opacity-40 cursor-pointer"
                      >
                        Save Timing
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. WORKFLOW: PILOT CHECKLIST (Feature E: Persisted Operational Steps) */}
              {selectedLead.status === "PILOT" && (
                <div className="glass-panel-dark p-4 rounded-2xl border border-cyan-500/30 space-y-3 bg-cyan-500/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                      <ListTodo className="w-4 h-4 text-cyan-400" />
                      <span>Pilot Operational Checklist</span>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-mono">
                      {(selectedLead.pilotChecklist || []).length} of {PILOT_CHECKLIST_ITEMS.length} completed
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    {PILOT_CHECKLIST_ITEMS.map((item) => {
                      const isDone = (selectedLead.pilotChecklist || []).includes(item);
                      return (
                        <button
                          key={item}
                          disabled={updating}
                          onClick={() => togglePilotItem(item)}
                          className={`w-full min-h-[40px] p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2.5 cursor-pointer ${
                            isDone
                              ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-200 line-through opacity-80"
                              : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
                          }`}
                        >
                          {isDone ? (
                            <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-500 shrink-0" />
                          )}
                          <span>{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 6. WORKFLOW: CONVERTED MILESTONE (Feature F) */}
              {selectedLead.status === "CONVERTED" && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-emerald-400">
                    <PartyPopper className="w-4 h-4" />
                    <span>Restaurant Partner Converted</span>
                  </div>
                  <p className="text-emerald-200/90 leading-relaxed">
                    This restaurant is an active ASSO partner.
                    {selectedLead.convertedAt && (
                      <span className="block text-[11px] text-emerald-400 mt-1 font-mono">
                        Converted on:{" "}
                        {new Date(selectedLead.convertedAt).toLocaleDateString("en-IN", {
                          dateStyle: "long",
                        })}
                      </span>
                    )}
                  </p>
                </div>
              )}

              {/* 7. WORKFLOW: LOST STATE (Feature G) */}
              {selectedLead.status === "LOST" && (
                <div className="p-4 rounded-2xl bg-stone-500/10 border border-stone-500/20 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>Marked as Lost</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-stone-300 font-mono text-[11px]">
                      Reason: {selectedLead.lostReason || "Unspecified"}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    No active follow-up scheduled. Click "Reactivate Lead" above if restaurant reaches back out.
                  </p>
                </div>
              )}

              {/* 8. FOLLOW-UP SCHEDULER (Active for non-closed stages) */}
              {selectedLead.status !== "LOST" && selectedLead.status !== "CONVERTED" && (
                <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                      <CalendarClock className="w-4 h-4 text-purple-400" />
                      <span>Next Follow-up</span>
                    </div>
                    {selectedLead.nextFollowUpAt && (
                      <button
                        onClick={() => handleUpdateLead(selectedLead.id, { nextFollowUpAt: null })}
                        className="text-[10px] text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        Clear follow-up
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => setFollowUpPreset(0)}
                      className="min-h-[44px] py-2 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Today
                    </button>
                    <button
                      onClick={() => setFollowUpPreset(1)}
                      className="min-h-[44px] py-2 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Tomorrow
                    </button>
                    <button
                      onClick={() => setFollowUpPreset(3)}
                      className="min-h-[44px] py-2 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      In 3 Days
                    </button>
                    <button
                      onClick={() => setFollowUpPreset(7)}
                      className="min-h-[44px] py-2 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Next Week
                    </button>
                  </div>

                  {/* Custom Date Input */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="datetime-local"
                      value={customFollowUpDate}
                      onChange={(e) => setCustomFollowUpDate(e.target.value)}
                      className="flex-1 min-h-[44px] px-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
                    />
                    <button
                      disabled={!customFollowUpDate}
                      onClick={() => {
                        if (customFollowUpDate) {
                          handleUpdateLead(selectedLead.id, {
                            nextFollowUpAt: new Date(customFollowUpDate).toISOString(),
                          });
                          setCustomFollowUpDate("");
                        }
                      }}
                      className="min-h-[44px] px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold disabled:opacity-40 cursor-pointer"
                    >
                      Set
                    </button>
                  </div>
                </div>
              )}

              {/* 9. FAST CONTACT ACTIVITY LOGGING (Feature C & D: Standardized 8 Presets) */}
              <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Log Contact Activity</span>
                </div>

                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {CONTACT_ACTIVITY_PRESETS.map((preset) => {
                      const isSelected = quickContactAction === preset;
                      return (
                        <button
                          key={preset}
                          onClick={() => setQuickContactAction(preset)}
                          className={`min-h-[40px] px-2 py-1.5 rounded-xl border text-[11px] font-medium transition-all text-center cursor-pointer ${
                            isSelected
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 ring-1 ring-emerald-400"
                              : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10"
                          }`}
                        >
                          {preset}
                        </button>
                      );
                    })}
                  </div>

                  {quickContactAction && (
                    <div className="space-y-2 pt-1 animate-in fade-in">
                      <input
                        type="text"
                        value={quickContactNote}
                        onChange={(e) => setQuickContactNote(e.target.value)}
                        placeholder="Optional details or discussion summary..."
                        className="w-full min-h-[44px] px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                      />

                      <div className="flex items-center gap-2">
                        <button
                          disabled={updating}
                          onClick={() => {
                            handleUpdateLead(selectedLead.id, {
                              contactAction: quickContactAction,
                              contactNote: quickContactNote.trim() || undefined,
                              status:
                                selectedLead.status === "NEW"
                                  ? "CONTACTED"
                                  : undefined,
                            });
                            setQuickContactAction("");
                            setQuickContactNote("");
                          }}
                          className="min-h-[44px] flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
                        >
                          Confirm &amp; Log Activity
                        </button>
                        <button
                          onClick={() => {
                            setQuickContactAction("");
                            setQuickContactNote("");
                          }}
                          className="min-h-[44px] px-3 rounded-xl bg-white/5 text-slate-400 hover:text-white text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 10. BUSINESS CONTEXT & ASSIGNED OPERATOR */}
              <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2 font-bold text-slate-200">
                    <Building2 className="w-4 h-4 text-purple-400" />
                    <span>Business Details</span>
                  </div>
                  {/* Assigned Operator */}
                  <div className="flex items-center gap-1.5">
                    {editingAssignee ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={assignedToInput}
                          onChange={(e) => setAssignedToInput(e.target.value)}
                          placeholder="Operator name"
                          className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-xs text-white"
                        />
                        <button
                          onClick={() => {
                            handleUpdateLead(selectedLead.id, {
                              assignedTo: assignedToInput.trim() || null,
                            });
                            setEditingAssignee(false);
                          }}
                          className="text-[10px] text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-white/5"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setAssignedToInput(selectedLead.assignedTo || "");
                          setEditingAssignee(true);
                        }}
                        className="text-[11px] text-slate-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                      >
                        <UserCheck className="w-3 h-3 text-purple-400" />
                        <span>
                          {selectedLead.assignedTo
                            ? `Assigned: ${selectedLead.assignedTo}`
                            : "Assign operator"}
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">
                      Contact Person
                    </span>
                    <span className="font-semibold text-slate-200">
                      {selectedLead.ownerName}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">
                      Location / Area
                    </span>
                    <span className="font-semibold text-slate-200">
                      {selectedLead.cityArea}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">
                      Outlet Count
                    </span>
                    <span className="font-semibold text-slate-200">
                      {selectedLead.outlets || "1"}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">
                      Daily Walk-ins
                    </span>
                    <span className="font-semibold text-slate-200">
                      {selectedLead.dailyWalkins || "Not specified"}
                    </span>
                  </div>
                </div>

                {selectedLead.notes && (
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase mb-1">
                      Original Enquiry Note
                    </span>
                    <p className="p-3 rounded-xl bg-white/5 border border-white/5 text-slate-300 italic text-[11px] leading-relaxed">
                      "{selectedLead.notes}"
                    </p>
                  </div>
                )}
              </div>

              {/* 11. INTERNAL NOTES FEED */}
              <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span>Internal Team Notes</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-normal">
                    {selectedLead.internalNotes.length} notes
                  </span>
                </div>

                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add an internal operational note..."
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      disabled={!newNoteText.trim() || updating}
                      onClick={() => {
                        if (newNoteText.trim()) {
                          handleUpdateLead(selectedLead.id, { newNote: newNoteText.trim() });
                          setNewNoteText("");
                        }
                      }}
                      className="min-h-[38px] px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold disabled:opacity-40 cursor-pointer"
                    >
                      Save Note
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {selectedLead.internalNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-semibold text-purple-300">
                          {note.author || "Operator"}
                        </span>
                        <span>
                          {new Date(note.createdAt).toLocaleString("en-IN", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                      <p className="text-slate-200 text-[11px] leading-relaxed">
                        {note.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 12. CONTACT HISTORY TIMELINE */}
              <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <History className="w-4 h-4 text-indigo-400" />
                  <span>Timeline &amp; Contact History</span>
                </div>

                <div className="space-y-3 pt-1">
                  {selectedLead.contactHistory.map((item, idx) => {
                    const category = getTimelineCategory(item.action);
                    const catBadge = {
                      CONTACT: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
                      SALES: "bg-purple-500/15 text-purple-300 border-purple-500/30",
                      FOLLOW_UP: "bg-amber-500/15 text-amber-300 border-amber-500/30",
                      OTHER: "bg-slate-500/15 text-slate-300 border-slate-500/30",
                    }[category];

                    return (
                      <div
                        key={item.id || idx}
                        className="relative pl-5 before:absolute before:left-1.5 before:top-2 before:bottom-0 before:w-px before:bg-white/10 last:before:hidden"
                      >
                        <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-purple-500/20 border border-purple-400" />
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-slate-200">
                            {item.action}
                          </span>
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${catBadge}`}
                          >
                            {category.replace("_", " ")}
                          </span>
                          {item.operator && (
                            <span className="text-[10px] text-slate-400 font-mono">
                              • {item.operator}
                            </span>
                          )}
                        </div>
                        {item.note && (
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                            {item.note}
                          </p>
                        )}
                        <div className="text-[10px] text-slate-500 mt-1">
                          {new Date(item.timestamp).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── LOST REASON MODAL (Feature G: Reason Requirement) ── */}
      {showLostModal && selectedLead && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="glass-panel-dark rounded-2xl p-6 border border-white/15 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <XCircle className="w-5 h-5" />
                <span>Mark Lead as Lost</span>
              </div>
              <button
                onClick={() => setShowLostModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Why did <strong>{selectedLead.restaurantName}</strong> decide not to move forward?
            </p>

            <div className="space-y-1.5">
              {LOST_REASONS.map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                    selectedLostReason === reason
                      ? "bg-rose-500/15 border-rose-500/30 text-rose-200 font-semibold"
                      : "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="radio"
                    name="lostReason"
                    value={reason}
                    checked={selectedLostReason === reason}
                    onChange={() => setSelectedLostReason(reason)}
                    className="accent-rose-500"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <input
              type="text"
              value={lostNoteInput}
              onChange={(e) => setLostNoteInput(e.target.value)}
              placeholder="Optional notes or context..."
              className="w-full min-h-[40px] px-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowLostModal(false)}
                className="min-h-[40px] px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={updating}
                onClick={() => {
                  handleUpdateLead(selectedLead.id, {
                    status: "LOST",
                    lostReason: selectedLostReason,
                    contactNote: lostNoteInput.trim() || undefined,
                  });
                  setShowLostModal(false);
                  setLostNoteInput("");
                }}
                className="min-h-[40px] px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
              >
                Confirm Lost
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── WHATSAPP OUTREACH & CONFIRMATION MODAL (Phase 1G Section 1 & 2) ── */}
      {showWhatsAppModal && selectedLead && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="glass-panel-dark rounded-2xl p-6 border border-emerald-500/30 max-w-md w-full shadow-2xl space-y-4 bg-[#080E21]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <MessageSquare className="w-5 h-5" />
                <span>
                  {whatsAppConfirmationStep ? "Did You Send This WhatsApp Message?" : "WhatsApp Outreach"}
                </span>
              </div>
              <button
                onClick={() => {
                  setShowWhatsAppModal(false);
                  setWhatsAppConfirmationStep(false);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!whatsAppConfirmationStep ? (
              <>
                <div className="text-xs text-slate-300 space-y-1">
                  <p>
                    Target: <strong className="text-white">{selectedLead.ownerName}</strong> ({selectedLead.restaurantName})
                  </p>
                  <p className="text-emerald-300 font-mono text-[11px]">
                    Phone: {selectedLead.phone}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Message Draft (Stage: {selectedLead.status})
                  </label>
                  <textarea
                    rows={4}
                    value={whatsAppMessageDraft}
                    onChange={(e) => setWhatsAppMessageDraft(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 resize-none leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowWhatsAppModal(false)}
                    className="min-h-[44px] px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSendWhatsApp(selectedLead)}
                    className="min-h-[44px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Open WhatsApp</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 space-y-2">
                  <p className="font-bold text-emerald-300">
                    Did you send this message to {selectedLead.ownerName}?
                  </p>
                  <p className="text-[11px] text-slate-300 italic bg-black/30 p-2.5 rounded-lg border border-white/5">
                    "{whatsAppMessageDraft}"
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Opening WhatsApp is not the same as sending. Activity will only be recorded if you confirm.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <input
                    type="text"
                    value={whatsAppNote}
                    onChange={(e) => setWhatsAppNote(e.target.value)}
                    placeholder="Optional conversation note or summary..."
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setShowWhatsAppModal(false);
                      setWhatsAppConfirmationStep(false);
                      setWhatsAppNote("");
                    }}
                    className="min-h-[44px] px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs cursor-pointer"
                  >
                    No, Dismiss
                  </button>
                  <button
                    disabled={updating}
                    onClick={() => handleConfirmWhatsAppSent(selectedLead)}
                    className="min-h-[44px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Yes, Log Activity</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── CALL OUTCOME MODAL (Phase 1G Section 3) ── */}
      {showCallModal && selectedLead && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="glass-panel-dark rounded-2xl p-6 border border-emerald-500/30 max-w-md w-full shadow-2xl space-y-4 bg-[#080E21]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <PhoneCall className="w-5 h-5" />
                <span>Log Call Outcome</span>
              </div>
              <button
                onClick={() => setShowCallModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              How did the call with <strong>{selectedLead.ownerName}</strong> ({selectedLead.restaurantName}) go?
            </p>

            {/* Quick Outcomes Grid */}
            <div className="grid grid-cols-2 gap-2">
              {CALL_OUTCOMES.map((outcome) => (
                <button
                  key={outcome}
                  type="button"
                  onClick={() => setSelectedCallOutcome(outcome)}
                  className={`min-h-[44px] p-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer flex items-center justify-between ${
                    selectedCallOutcome === outcome
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-200 ring-1 ring-emerald-400 font-bold"
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span>{outcome}</span>
                  {selectedCallOutcome === outcome && (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </button>
              ))}
            </div>

            {/* If Callback Requested: prompt follow-up date/time */}
            {selectedCallOutcome === "Callback requested" && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                  <CalendarClock className="w-3.5 h-3.5" />
                  <span>Schedule Callback Date &amp; Time</span>
                </span>
                <input
                  type="datetime-local"
                  value={callCallbackDate}
                  onChange={(e) => setCallCallbackDate(e.target.value)}
                  className="w-full min-h-[44px] px-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>
            )}

            {/* If Not Interested: notice */}
            {selectedCallOutcome === "Not interested" && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-300 space-y-1">
                <p>Outcome will be logged as "Call — Not interested".</p>
                <p className="text-slate-400">
                  Lead status will NOT be changed to LOST automatically. You can mark it as LOST separately if needed.
                </p>
              </div>
            )}

            <input
              type="text"
              value={callNoteInput}
              onChange={(e) => setCallNoteInput(e.target.value)}
              placeholder="Optional notes from the call..."
              className="w-full min-h-[44px] px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCallModal(false)}
                className="min-h-[44px] px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs cursor-pointer"
              >
                Dismiss
              </button>
              <button
                disabled={!selectedCallOutcome || updating}
                onClick={handleConfirmCallOutcome}
                className="min-h-[44px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer disabled:opacity-40"
              >
                Log Call Outcome
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EMAIL CONFIRMATION MODAL (Phase 1G Section 4) ── */}
      {showEmailConfirmModal && selectedLead && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="glass-panel-dark rounded-2xl p-6 border border-blue-500/30 max-w-md w-full shadow-2xl space-y-4 bg-[#080E21]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Mail className="w-5 h-5" />
                <span>Confirm Email Outreach</span>
              </div>
              <button
                onClick={() => setShowEmailConfirmModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Did you send an email to <strong>{selectedLead.ownerName}</strong> ({selectedLead.email})?
            </p>

            <input
              type="text"
              value={emailNoteInput}
              onChange={(e) => setEmailNoteInput(e.target.value)}
              placeholder="Optional subject or summary of email..."
              className="w-full min-h-[44px] px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowEmailConfirmModal(false)}
                className="min-h-[44px] px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs cursor-pointer"
              >
                No, Dismiss
              </button>
              <button
                disabled={updating}
                onClick={() => handleConfirmEmailSent(selectedLead)}
                className="min-h-[44px] px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
              >
                Yes, Log Email Sent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DEMO CONDUCTED MODAL (Phase 1G Section 9) ── */}
      {showDemoConductedModal && selectedLead && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="glass-panel-dark rounded-2xl p-6 border border-amber-500/30 max-w-md w-full shadow-2xl space-y-4 bg-[#080E21]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Mark Demo Conducted</span>
              </div>
              <button
                onClick={() => setShowDemoConductedModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Record discussion outcome for product walkthrough with <strong>{selectedLead.restaurantName}</strong>:
            </p>

            <textarea
              rows={3}
              value={demoConductedNotes}
              onChange={(e) => setDemoConductedNotes(e.target.value)}
              placeholder="Summary of demo, key interest points, questions, feedback..."
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDemoConductedModal(false)}
                className="min-h-[44px] px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={updating}
                onClick={() => handleConfirmDemoConducted(selectedLead)}
                className="min-h-[44px] px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold cursor-pointer"
              >
                Log Demo Conducted
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
