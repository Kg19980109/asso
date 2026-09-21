"use client";

import * as React from "react";
import Image from "next/image";
import {
  Users,
  Clock,
  ConciergeBell,
  BarChart3,
  Heart,
  Settings,
  ArrowRight,
  LayoutDashboard,
  ClipboardList,
  Table2,
  BookOpenText,
  ChartNoAxesColumn,
  UtensilsCrossed,
  TrendingUp,
  Star,
  IndianRupee,
  Store,
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

interface ForRestaurantsSectionProps {
  onOpenPartner?: () => void;
}

const FEATURES = [
  {
    icon: Users,
    title: "Digital Queue Management",
    desc: "Let customers join the queue via QR. No more crowd or door chaos at your entrance.",
    iconColor: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    icon: Clock,
    title: "Live Queue & Table Status",
    desc: "See real-time wait times, table availability, and automated SMS alerts.",
    iconColor: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    icon: Table2,
    title: "Flexible Seating Modes",
    desc: "Simple mode (exclusive tables for each party) or Strict mode (seat optimization during rush).",
    iconColor: "text-indigo-600",
    bg: "bg-indigo-100",
  },
  {
    icon: ConciergeBell,
    title: "Pre-Orders Made Easy",
    desc: "Customers can order while waiting. Food ready piping hot when they sit.",
    iconColor: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: BarChart3,
    title: "Better Table Turnover",
    desc: "Reduce idle table minutes between parties and turn tables faster during peak rush.",
    iconColor: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    icon: Settings,
    title: "Zero Hardware & Quick Onboarding",
    desc: "Host staff runs it on any phone or tablet in 15 minutes. No POS changes needed.",
    iconColor: "text-emerald-600",
    bg: "bg-emerald-100",
  },
];

const SIDEBAR = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Live Queue", active: false },
  { icon: ClipboardList, label: "Orders", active: false },
  { icon: Table2, label: "Tables", active: false },
  { icon: BookOpenText, label: "Menu Management", active: false },
  { icon: Users, label: "Customers", active: false },
  { icon: ChartNoAxesColumn, label: "Analytics", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const STAT_CHIPS = [
  { icon: TrendingUp, value: "+35%", label: "Higher Table Turnover", color: "text-emerald-600" },
  { icon: Users, value: "+50%", label: "More Customers Served", color: "text-blue-600" },
  { icon: Star, value: "4.8", label: "Better Customer Ratings", color: "text-amber-500" },
  { icon: IndianRupee, value: "+28%", label: "Increase in Revenue", color: "text-stone-900" },
];

const TODAYS_ORDERS = [
  { name: "Chicken Biryani × 2", status: "Preparing", hot: true },
  { name: "Fish Fry × 1", status: "Ready", hot: false },
  { name: "Paneer Tikka × 1", status: "Preparing", hot: true },
  { name: "Mutton Kosha × 2", status: "Ready", hot: false },
];

const BOTTOM_STRIP = [
  { icon: Users, label: "More Customers" },
  { icon: Settings, label: "Smoother Operations" },
  { icon: BarChart3, label: "Higher Revenue" },
  { icon: Heart, label: "Happier Guests" },
];

export function ForRestaurantsSection({ onOpenPartner }: ForRestaurantsSectionProps) {
  const [queueRows, setQueueRows] = React.useState([
    { id: "#25", name: "Sayan Das", guests: 2, wait: "15 min", status: "Waiting", color: "bg-sky-500/20 text-sky-300" },
    { id: "#26", name: "Priyanka Roy", guests: 4, wait: "28 min", status: "Waiting", color: "bg-sky-500/20 text-sky-300" },
    { id: "#27", name: "Rahul Sen", guests: 4, wait: "1 hr", status: "In Queue", color: "bg-orange-500/25 text-orange-300" },
    { id: "#28", name: "Arjun Roy", guests: 3, wait: "1 hr 10 min", status: "Waiting", color: "bg-sky-500/20 text-sky-300" },
  ]);
  const [tablesOccupied, setTablesOccupied] = React.useState(12);

  const handleCall = (index: number) => {
    setQueueRows((prev) =>
      prev.map((row, i) =>
        i === index
          ? { ...row, status: "Called", color: "bg-emerald-500/25 text-emerald-300" }
          : row
      )
    );
    setTablesOccupied((t) => Math.min(16, t + 1));
  };

  return (
    <section id="for-restaurants" className="bg-[#F8FAFF] text-stone-900 relative overflow-hidden content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-14 sm:pt-20 pb-16">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
                The{" "}
                <span className="bg-gradient-to-r from-[#0EA5C6] to-[#2563EB] bg-clip-text text-transparent">
                  ASSO
                </span>{" "}
                Way
              </h2>
              <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-xl leading-relaxed">
                A smarter, simpler and more efficient way to manage your restaurant — even during the busiest days.
              </p>
            </div>
            <span className="font-script text-2xl sm:text-3xl font-bold text-indigo-900 rotate-2 text-right leading-tight">
              More Customers<br />Higher Revenue<br />Happier You ♡
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: 6 features */}
          <div className="lg:col-span-4 space-y-3">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <ScrollReveal key={f.title} direction="left" delay={i * 50}>
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:shadow-md transition-all">
                    <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center ${f.iconColor} flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-stone-900">{f.title}</h3>
                      <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}

            <ScrollReveal direction="up" delay={200}>
              <div className="pt-3">
                <button
                  onClick={onOpenPartner}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] text-white font-black text-xs shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <span>Get Started for Your Restaurant</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-stone-500 font-medium mt-2 text-center">
                  No hardware required • Set up in minutes
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: dashboard console */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="right" delay={120}>
              <div className="bg-[#070E20] rounded-3xl text-white border border-cyan-400/30 shadow-2xl overflow-hidden">
                {/* Top bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black tracking-tight">
                      <span className="text-white">A</span>
                      <span className="text-white">SS</span>
                      <span className="text-[#38BDF8]">O</span>
                    </span>
                    <span className="text-slate-500 text-xs">|</span>
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Store className="w-3.5 h-3.5 text-amber-400" />
                      Oh! Calcutta Restaurant
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 bg-white/10 px-2.5 py-1 rounded-lg">
                    Today ▾
                  </span>
                </div>

                <div className="grid grid-cols-12">
                  {/* Sidebar */}
                  <div className="hidden sm:block col-span-3 border-r border-white/10 p-3 space-y-1">
                    {SIDEBAR.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[11px] font-bold ${
                            item.active
                              ? "bg-blue-600/80 text-white shadow"
                              : "text-slate-400 hover:bg-white/5"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {item.label}
                        </div>
                      );
                    })}
                  </div>

                  {/* Main panel */}
                  <div className="col-span-12 sm:col-span-9 p-3 sm:p-4">
                    {/* Stat tiles */}
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 mb-3">
                      <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                        <p className="text-[9px] text-slate-400 flex items-center justify-center gap-1">
                          <Users className="w-3 h-3 text-cyan-400" /> Active Queue
                        </p>
                        <p className="text-base font-black">24 <span className="text-[9px] font-medium text-slate-400">Groups</span></p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                        <p className="text-[9px] text-slate-400 flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3 text-purple-400" /> Avg Wait Time
                        </p>
                        <p className="text-base font-black">18 mins</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                        <p className="text-[9px] text-slate-400 flex items-center justify-center gap-1">
                          <Table2 className="w-3 h-3 text-cyan-400" /> Tables Occupied
                        </p>
                        <p className="text-base font-black text-cyan-300 font-mono">{tablesOccupied} / 16</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                        <p className="text-[9px] text-slate-400 flex items-center justify-center gap-1">
                          <UtensilsCrossed className="w-3 h-3 text-amber-400" /> Pre-Orders
                        </p>
                        <p className="text-base font-black">8</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-3">
                      {/* Queue table */}
                      <div className="xl:col-span-3 overflow-x-auto">
                        <table className="w-full text-left text-[11px]">
                          <thead>
                            <tr className="text-[9px] uppercase font-bold text-slate-500 border-b border-white/10">
                              <th className="pb-1.5 pr-2">#</th>
                              <th className="pb-1.5 pr-2">Name</th>
                              <th className="pb-1.5 pr-2">Guests</th>
                              <th className="pb-1.5 pr-2">Wait</th>
                              <th className="pb-1.5 pr-2">Status</th>
                              <th className="pb-1.5 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 font-medium">
                            {queueRows.map((row, i) => (
                              <tr key={row.id}>
                                <td className="py-2 pr-2 font-mono font-bold">{row.id}</td>
                                <td className="py-2 pr-2 text-slate-200">{row.name}</td>
                                <td className="py-2 pr-2">{row.guests}</td>
                                <td className="py-2 pr-2 text-slate-400 font-mono">{row.wait}</td>
                                <td className="py-2 pr-2">
                                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${row.color}`}>
                                    {row.status}
                                  </span>
                                </td>
                                <td className="py-2 text-right">
                                  <button
                                    onClick={() => handleCall(i)}
                                    disabled={row.status === "Called"}
                                    className="px-2.5 py-1 rounded-md bg-blue-600/80 hover:bg-blue-500 text-white text-[10px] font-bold transition-all active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-default"
                                  >
                                    {row.status === "Called" ? "Called ✓" : "Call"}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="flex gap-2 mt-2">
                          <span className="flex-1 text-center text-[10px] font-bold text-cyan-300 border border-cyan-500/40 rounded-lg py-1.5">View All Queues →</span>
                          <span className="flex-1 text-center text-[10px] font-bold text-cyan-300 border border-cyan-500/40 rounded-lg py-1.5">Manage Tables →</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">Tap Call to try the live host console demo</p>
                      </div>

                      {/* Today's orders */}
                      <div className="xl:col-span-2 rounded-2xl bg-white/[0.04] border border-white/10 p-3">
                        <p className="text-[11px] font-black mb-2">Today&apos;s Orders</p>
                        <div className="space-y-1.5">
                          {TODAYS_ORDERS.map((o) => (
                            <div key={o.name} className="flex items-center justify-between gap-2 text-[10px]">
                              <span className="flex items-center gap-1.5 text-slate-200 font-medium truncate">
                                <UtensilsCrossed className="w-3 h-3 text-amber-400 flex-shrink-0" />
                                {o.name}
                              </span>
                              <span className={`px-2 py-0.5 rounded-md font-bold flex-shrink-0 ${o.hot ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300"}`}>
                                {o.status}
                              </span>
                            </div>
                          ))}
                        </div>
                        <span className="block text-center text-[10px] font-bold text-cyan-300 border border-cyan-500/40 rounded-lg py-1.5 mt-2.5">
                          View All Orders →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Stat chips */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 mt-4">
              {STAT_CHIPS.map((c, i) => {
                const Icon = c.icon;
                return (
                  <ScrollReveal key={c.label} direction="up" delay={i * 60}>
                    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-3.5 text-center">
                      <p className={`text-xl font-black flex items-center justify-center gap-1 ${c.color}`}>
                        <Icon className="w-4 h-4" />
                        {c.value}
                      </p>
                      <p className="text-[10px] font-bold text-stone-500 mt-1">{c.label}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
            <p className="text-[10px] text-stone-400 text-center mt-2">
              Illustrative targets — measure your own numbers in the free pilot.
            </p>

            {/* Owner photo + invite bubble — photo overlaps upward like the flyer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 items-start">
              <ScrollReveal direction="left" delay={80}>
                <div className="relative h-full min-h-[180px] bg-white rounded-2xl border border-stone-200/80 shadow-xs p-5 flex flex-col justify-center">
                  <span className="font-script text-4xl text-stone-300 leading-none">&ldquo;</span>
                  <p className="text-xs text-stone-600 leading-relaxed italic -mt-2">
                    Join our Kolkata pilot and see the difference in your own outlet — calmer entrances, faster turns, happier guests.
                  </p>
                  <p className="text-[11px] font-black text-stone-900 mt-3">— Your restaurant could be next</p>
                  <button
                    onClick={onOpenPartner}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-black text-[#2563EB] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                  >
                    <span>Become a pilot partner</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={120}>
                <div className="relative h-full min-h-[260px] md:min-h-[300px] md:-mt-24 lg:-mt-28 rounded-2xl overflow-hidden border border-stone-200/80 shadow-xl z-10">
                  <Image
                    src="/images/restaurant-owner.jpg"
                    alt="Smiling restaurant owner in his outlet"
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <p className="absolute bottom-3 right-4 font-script text-2xl font-bold text-white rotate-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-right leading-tight">
                    Control your rush.<br />Grow your business.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom dark strip */}
      <div className="bg-[#070D1E] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {BOTTOM_STRIP.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.label} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon className="w-5 h-5 text-slate-300" />
                  <span className="text-[11px] font-bold text-slate-200">{b.label}</span>
                </div>
              );
            })}
          </div>
          <div className="hidden md:block w-px h-10 bg-white/15" />
          <p className="font-script text-2xl font-bold text-amber-200 rotate-1 text-center md:text-right leading-tight">
            For a Better<br />Dining Tomorrow ♡
          </p>
        </div>
      </div>

    </section>
  );
}
