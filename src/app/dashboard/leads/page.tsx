"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  LeadRecord,
  LeadStatus,
  LeadMetrics,
  VALID_STATUSES,
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

const PIPELINE_STEPS: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "DEMO_SCHEDULED",
  "PILOT",
  "CONVERTED",
];

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
  const [sortBy, setSortBy] = React.useState("newest");

  // Selected Lead Drawer
  const [selectedLeadId, setSelectedLeadId] = React.useState<string | null>(null);
  const [updating, setUpdating] = React.useState(false);

  // Quick inputs in drawer
  const [newNoteText, setNewNoteText] = React.useState("");
  const [customFollowUpDate, setCustomFollowUpDate] = React.useState("");
  const [quickContactAction, setQuickContactAction] = React.useState("");
  const [quickContactNote, setQuickContactNote] = React.useState("");

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
        setError("Network error while loading leads.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [search, statusFilter, cityFilter, walkinsFilter, outletsFilter, sortBy, router]
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

  // Selected lead object
  const selectedLead = React.useMemo(() => {
    if (!selectedLeadId) return null;
    return leads.find((l) => l.id === selectedLeadId) || null;
  }, [leads, selectedLeadId]);

  // Patch lead handler
  const handleUpdateLead = async (updates: {
    status?: LeadStatus;
    nextFollowUpAt?: string | null;
    newNote?: string;
    contactAction?: string;
    contactNote?: string;
  }) => {
    if (!selectedLeadId) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/admin/leads/${selectedLeadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const data = await res.json();
      if (res.ok && data.success && data.lead) {
        // Update local list
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLeadId ? data.lead : l))
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
    const target = new Date();
    target.setDate(target.getDate() + daysFromNow);
    target.setHours(11, 0, 0, 0); // Default to 11:00 AM
    handleUpdateLead({ nextFollowUpAt: target.toISOString() });
  };

  // Check follow-up status for display
  const getFollowUpStatus = (isoDate?: string | null) => {
    if (!isoDate) return null;
    const target = new Date(isoDate);
    if (isNaN(target.getTime())) return null;

    const now = new Date();
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

    if (target.getTime() < todayStart.getTime()) {
      return {
        label: "FOLLOW UP OVERDUE",
        isOverdue: true,
        isToday: false,
        formatted: target.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
      };
    }
    if (target.getTime() <= todayEnd.getTime()) {
      return {
        label: "FOLLOW UP TODAY",
        isOverdue: false,
        isToday: true,
        formatted: "Today",
      };
    }
    return {
      label: `Follow-up: ${target.toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      })}`,
      isOverdue: false,
      isToday: false,
      formatted: target.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    };
  };

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
                Operator Portal
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Restaurant Partner Enquiries &amp; Pipeline
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchLeads(true)}
            disabled={refreshing}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 text-xs cursor-pointer disabled:opacity-50"
            title="Refresh lead list"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 sm:px-3 rounded-xl bg-white/5 hover:bg-rose-500/15 text-slate-400 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
            title="Log out of operator dashboard"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* ── METRICS OVERVIEW (Step 5) ── */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {PIPELINE_STEPS.map((status) => {
            const count = metrics?.byStatus[status] || 0;
            const cfg = STATUS_CONFIG[status];
            const isSelected = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() =>
                  setStatusFilter(isSelected ? "ALL" : status)
                }
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? `${cfg.bg} ${cfg.border} ring-1 ring-white/20`
                    : "glass-panel-dark hover:border-white/20"
                }`}
              >
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  {cfg.label}
                </span>
                <span className="text-2xl font-black text-white mt-1 block">
                  {count}
                </span>
              </button>
            );
          })}

          {/* Lost counter */}
          <button
            onClick={() =>
              setStatusFilter(statusFilter === "LOST" ? "ALL" : "LOST")
            }
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              statusFilter === "LOST"
                ? "bg-stone-500/20 border-stone-500/40 ring-1 ring-white/20"
                : "glass-panel-dark hover:border-white/20"
            }`}
          >
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Lost
            </span>
            <span className="text-2xl font-black text-slate-300 mt-1 block">
              {metrics?.byStatus.LOST || 0}
            </span>
          </button>
        </section>

        {/* ── OPERATIONAL TIME COUNTERS (Step 5) ── */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">
                Received Today
              </span>
              <div className="text-xl font-black text-white mt-0.5">
                {metrics?.receivedToday ?? 0}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">
                Received This Week
              </span>
              <div className="text-xl font-black text-white mt-0.5">
                {metrics?.receivedThisWeek ?? 0}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div
            className={`p-4 rounded-2xl border flex items-center justify-between transition-colors ${
              (metrics?.overdueFollowUps ?? 0) > 0
                ? "bg-rose-500/10 border-rose-500/30"
                : "glass-panel-dark border-white/10"
            }`}
          >
            <div>
              <span
                className={`text-xs font-medium ${
                  (metrics?.overdueFollowUps ?? 0) > 0
                    ? "text-rose-300"
                    : "text-slate-400"
                }`}
              >
                Overdue Follow-ups
              </span>
              <div
                className={`text-xl font-black mt-0.5 ${
                  (metrics?.overdueFollowUps ?? 0) > 0
                    ? "text-rose-400"
                    : "text-white"
                }`}
              >
                {metrics?.overdueFollowUps ?? 0}
              </div>
            </div>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                (metrics?.overdueFollowUps ?? 0) > 0
                  ? "bg-rose-500/20 border border-rose-500/40 text-rose-400"
                  : "bg-white/5 border border-white/10 text-slate-400"
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </section>

        {/* ── SEARCH & FILTER CONTROLS (Step 7) ── */}
        <section className="glass-panel-dark p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3.5">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search restaurant, owner, phone, city..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
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
                className="px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-purple-400"
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

              {/* City / Area */}
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                aria-label="Filter by City or Area"
                className="px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-purple-400"
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
                className="px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-purple-400"
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

              {/* Outlets */}
              <select
                value={outletsFilter}
                onChange={(e) => setOutletsFilter(e.target.value)}
                aria-label="Filter by Outlet Count"
                className="px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-purple-400"
              >
                <option value="ALL" className="bg-[#080E21] text-white">
                  All Outlets
                </option>
                <option value="1" className="bg-[#080E21] text-white">
                  1 Outlet
                </option>
                <option value="2-5" className="bg-[#080E21] text-white">
                  2-5 Outlets
                </option>
                <option value="6+" className="bg-[#080E21] text-white">
                  6+ Outlets
                </option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort leads by"
                className="w-full md:w-auto px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold focus:outline-none"
              >
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
        </section>

        {/* ── LEADS DISPLAY: RESPONSIVE TABLE & MOBILE CARDS (Step 6) ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Showing <strong className="text-white">{leads.length}</strong>{" "}
              {leads.length === 1 ? "restaurant lead" : "restaurant leads"}
            </span>
          </div>

          {loading ? (
            <div className="glass-panel-dark rounded-2xl p-12 text-center border border-white/10">
              <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs text-slate-400">Loading restaurant enquiries...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="glass-panel-dark rounded-2xl p-12 text-center border border-white/10">
              <Store className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No leads found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                No restaurant enquiries matched your filters. Try clearing search keywords or resetting filters.
              </p>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE (Hidden on mobile < 768px) */}
              <div className="hidden md:block glass-panel-dark rounded-2xl border border-white/10 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Restaurant</th>
                      <th className="py-3 px-4">Owner / Contact</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Walk-ins / Outlets</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Follow-up</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.map((lead) => {
                      const cfg = STATUS_CONFIG[lead.status];
                      const followUp = getFollowUpStatus(lead.nextFollowUpAt);
                      const isSelected = selectedLeadId === lead.id;

                      return (
                        <tr
                          key={lead.id}
                          onClick={() => setSelectedLeadId(lead.id)}
                          className={`hover:bg-white/[0.04] transition-colors cursor-pointer ${
                            isSelected ? "bg-purple-500/10" : ""
                          }`}
                        >
                          {/* Restaurant */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white text-sm">
                              {lead.restaurantName}
                            </div>
                            <span className="text-[11px] text-slate-400">
                              Received{" "}
                              {new Date(lead.createdAt).toLocaleDateString(
                                "en-IN",
                                { month: "short", day: "numeric" }
                              )}
                            </span>
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
                          </td>

                          {/* Follow-up */}
                          <td className="py-3.5 px-4">
                            {followUp ? (
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                  followUp.isOverdue
                                    ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                                    : followUp.isToday
                                    ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                                    : "bg-white/5 text-slate-300 border-white/10"
                                }`}
                              >
                                {followUp.isOverdue && (
                                  <AlertTriangle className="w-2.5 h-2.5" />
                                )}
                                {followUp.label}
                              </span>
                            ) : (
                              <span className="text-slate-600 text-[11px]">
                                None set
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div
                              className="inline-flex items-center gap-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <a
                                href={`tel:${lead.phone}`}
                                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                                title={`Call ${lead.ownerName}`}
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              {lead.email && (
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-colors"
                                  title={`Email ${lead.ownerName}`}
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </a>
                              )}
                              <button
                                onClick={() => setSelectedLeadId(lead.id)}
                                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-1"
                              >
                                <span>Manage</span>
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

              {/* MOBILE CARDS (Shown on mobile < 768px, no horizontal table scroll) */}
              <div className="md:hidden space-y-3">
                {leads.map((lead) => {
                  const cfg = STATUS_CONFIG[lead.status];
                  const followUp = getFollowUpStatus(lead.nextFollowUpAt);

                  return (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLeadId(lead.id)}
                      className="glass-panel-dark rounded-2xl p-4 border border-white/10 space-y-3 active:scale-[0.99] transition-transform"
                    >
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

                      {/* Follow-up badge if set */}
                      {followUp && (
                        <div className="pt-1">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              followUp.isOverdue
                                ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                                : followUp.isToday
                                ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                                : "bg-white/5 text-slate-300 border-white/10"
                            }`}
                          >
                            {followUp.isOverdue && (
                              <AlertTriangle className="w-2.5 h-2.5" />
                            )}
                            {followUp.label}
                          </span>
                        </div>
                      )}

                      {/* Action buttons row */}
                      <div
                        className="flex items-center justify-between pt-2 border-t border-white/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${lead.phone}`}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="px-3 py-1.5 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Email</span>
                            </a>
                          )}
                        </div>

                        <button
                          onClick={() => setSelectedLeadId(lead.id)}
                          className="text-xs text-purple-400 font-semibold flex items-center gap-1"
                        >
                          <span>Manage Lead</span>
                          <ChevronRight className="w-3.5 h-3.5" />
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

      {/* ── LEAD DETAIL SLIDE-OVER DRAWER (Step 8, 9, 10, 11) ── */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          {/* Backdrop click dismiss */}
          <div
            className="flex-1"
            onClick={() => setSelectedLeadId(null)}
          />

          <div className="w-full max-w-xl h-full bg-[#080E21] border-l border-white/10 shadow-2xl flex flex-col overflow-y-auto z-10">
            {/* Drawer Header */}
            <div className="sticky top-0 bg-[#080E21]/95 backdrop-blur-md border-b border-white/10 p-5 flex items-center justify-between z-20">
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">
                  Lead ID: {selectedLead.id}
                </span>
                <h3 className="text-xl font-black text-white">
                  {selectedLead.restaurantName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLeadId(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6 flex-1">
              {/* Quick Communication Actions (Step 8) */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${selectedLead.phone}`}
                  onClick={() => {
                    handleUpdateLead({
                      contactAction: `Called ${selectedLead.ownerName}`,
                      status:
                        selectedLead.status === "NEW"
                          ? "CONTACTED"
                          : undefined,
                    });
                  }}
                  className="py-3 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call {selectedLead.phone}</span>
                </a>

                {selectedLead.email ? (
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="py-3 px-4 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Lead</span>
                  </a>
                ) : (
                  <div className="py-3 px-4 rounded-xl bg-white/5 text-slate-500 border border-white/5 text-xs font-medium flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>No Email Provided</span>
                  </div>
                )}
              </div>

              {/* Status Pipeline Step Picker (Step 11) */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Lead Pipeline Status
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {PIPELINE_STEPS.map((step) => {
                    const isCurrent = selectedLead.status === step;
                    const cfg = STATUS_CONFIG[step];
                    return (
                      <button
                        key={step}
                        disabled={updating}
                        onClick={() => handleUpdateLead({ status: step })}
                        className={`py-2 px-1 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all text-center cursor-pointer disabled:opacity-50 ${
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
                {/* Lost button option */}
                <div className="flex justify-end pt-1">
                  <button
                    disabled={updating}
                    onClick={() =>
                      handleUpdateLead({
                        status: selectedLead.status === "LOST" ? "NEW" : "LOST",
                      })
                    }
                    className={`text-[11px] font-semibold px-3 py-1 rounded-lg border transition-colors cursor-pointer ${
                      selectedLead.status === "LOST"
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                        : "text-slate-500 hover:text-rose-400 border-transparent hover:border-rose-500/20"
                    }`}
                  >
                    {selectedLead.status === "LOST" ? "Marked as Lost (Click to Reactivate)" : "Mark as Lost"}
                  </button>
                </div>
              </div>

              {/* Follow-up Scheduler (Step 10) */}
              <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                    <CalendarClock className="w-4 h-4 text-purple-400" />
                    <span>Next Follow-up</span>
                  </div>
                  {selectedLead.nextFollowUpAt && (
                    <button
                      onClick={() => handleUpdateLead({ nextFollowUpAt: null })}
                      className="text-[10px] text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      Clear follow-up
                    </button>
                  )}
                </div>

                {/* Follow up status badge */}
                {selectedLead.nextFollowUpAt && (
                  <div className="text-xs">
                    {(() => {
                      const f = getFollowUpStatus(selectedLead.nextFollowUpAt);
                      if (!f) return null;
                      return (
                        <div
                          className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                            f.isOverdue
                              ? "bg-rose-500/15 border-rose-500/30 text-rose-300 font-bold"
                              : f.isToday
                              ? "bg-amber-500/15 border-amber-500/30 text-amber-300 font-bold"
                              : "bg-white/5 border-white/10 text-slate-300"
                          }`}
                        >
                          {f.isOverdue ? (
                            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                          ) : (
                            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                          <span>
                            {f.label} •{" "}
                            {new Date(
                              selectedLead.nextFollowUpAt
                            ).toLocaleString("en-IN", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Quick Presets */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => setFollowUpPreset(0)}
                    className="py-1.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setFollowUpPreset(1)}
                    className="py-1.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Tomorrow
                  </button>
                  <button
                    onClick={() => setFollowUpPreset(3)}
                    className="py-1.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    In 3 Days
                  </button>
                  <button
                    onClick={() => setFollowUpPreset(7)}
                    className="py-1.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
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
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
                  />
                  <button
                    disabled={!customFollowUpDate}
                    onClick={() => {
                      if (customFollowUpDate) {
                        handleUpdateLead({
                          nextFollowUpAt: new Date(customFollowUpDate).toISOString(),
                        });
                        setCustomFollowUpDate("");
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold disabled:opacity-40 cursor-pointer"
                  >
                    Set
                  </button>
                </div>
              </div>

              {/* Business & Lead Information (Step 8) */}
              <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-200 border-b border-white/5 pb-2">
                  <Building2 className="w-4 h-4 text-purple-400" />
                  <span>Enquiry Information</span>
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

              {/* Record Contact Activity (Step 9) */}
              <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Record Contact Activity</span>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Called owner",
                      "Spoke with owner",
                      "Left WhatsApp message",
                      "Demo conducted",
                      "Pricing discussed",
                    ].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setQuickContactAction(preset)}
                        className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-[10px] cursor-pointer"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={quickContactAction}
                    onChange={(e) => setQuickContactAction(e.target.value)}
                    placeholder="Activity headline (e.g. Discussed setup requirements)"
                    className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                  />

                  <input
                    type="text"
                    value={quickContactNote}
                    onChange={(e) => setQuickContactNote(e.target.value)}
                    placeholder="Optional details / next steps..."
                    className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                  />

                  <button
                    disabled={!quickContactAction.trim() || updating}
                    onClick={() => {
                      if (quickContactAction.trim()) {
                        handleUpdateLead({
                          contactAction: quickContactAction.trim(),
                          contactNote: quickContactNote.trim() || undefined,
                        });
                        setQuickContactAction("");
                        setQuickContactNote("");
                      }
                    }}
                    className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold disabled:opacity-40 cursor-pointer"
                  >
                    Log Contact Activity
                  </button>
                </div>
              </div>

              {/* Internal Notes Feed (Step 8) */}
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

                {/* Add Note Input */}
                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add an internal operational note (visible only to team)..."
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      disabled={!newNoteText.trim() || updating}
                      onClick={() => {
                        if (newNoteText.trim()) {
                          handleUpdateLead({ newNote: newNoteText.trim() });
                          setNewNoteText("");
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold disabled:opacity-40 cursor-pointer"
                    >
                      Save Note
                    </button>
                  </div>
                </div>

                {/* Notes List */}
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

              {/* Contact History Timeline (Step 9) */}
              <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <History className="w-4 h-4 text-indigo-400" />
                  <span>Timeline &amp; Contact History</span>
                </div>

                <div className="space-y-3 pt-1">
                  {selectedLead.contactHistory.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="relative pl-5 before:absolute before:left-1.5 before:top-2 before:bottom-0 before:w-px before:bg-white/10 last:before:hidden"
                    >
                      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-purple-500/20 border border-purple-400" />
                      <div className="text-xs font-semibold text-slate-200">
                        {item.action}
                      </div>
                      {item.note && (
                        <p className="text-[11px] text-slate-400 mt-0.5">
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
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
