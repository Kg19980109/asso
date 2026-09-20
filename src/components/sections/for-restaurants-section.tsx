"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users,
  UtensilsCrossed,
  TrendingUp,
  RotateCw,
  Smile,
  Zap,
  ArrowRight,
  Store,
  CheckCircle2,
  Bell,
  Sparkles,
  Activity,
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

interface ForRestaurantsSectionProps {
  onOpenPartner?: () => void;
}

const RESTAURANT_FEATURES = [
  {
    icon: Users,
    title: "Digital Queue Management",
    desc: "Reduce crowd & chaos at your entrance. Zero lost customers",
    iconColor: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: UtensilsCrossed,
    title: "Pre-Order System",
    desc: "Get orders in advance so your kitchen preps before diners sit",
    iconColor: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: TrendingUp,
    title: "Real-time Dashboard",
    desc: "Monitor live queue, tables & revenue from any mobile or tablet",
    iconColor: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: RotateCw,
    title: "Better Table Turnover",
    desc: "Seat more covers by calling the next party the moment a table frees up",
    iconColor: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Smile,
    title: "Happier Customers",
    desc: "Serve timely. Eliminate long frustrating pavement queues",
    iconColor: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Zap,
    title: "Easy Setup",
    desc: "Go live in 20 mins. Zero expensive POS hardware needed",
    iconColor: "text-amber-600",
    bg: "bg-amber-50",
  },
];

export function ForRestaurantsSection({ onOpenPartner }: ForRestaurantsSectionProps) {
  const [queueRows, setQueueRows] = React.useState([
    { id: "#25", name: "Sayak Sen", phone: "98190 12345", guests: 2, wait: "28 min", status: "Call In", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    { id: "#26", name: "Priya Roy", phone: "98354 56789", guests: 3, wait: "40 min", status: "Calling", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
    { id: "#27", name: "Rahul Sen", phone: "98765 43210", guests: 4, wait: "1 hr", status: "In Queue", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
    { id: "#28", name: "Arpan Roy", phone: "98210 45656", guests: 3, wait: "1 hr 10 min", status: "Waiting", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  ]);

  const [tablesOccupied, setTablesOccupied] = React.useState(12);
  const [totalGuests, setTotalGuests] = React.useState(34);

  const handleToggleStatus = (index: number) => {
    setQueueRows((prev) => {
      const next = [...prev];
      const current = next[index];
      if (current.status === "Call In") {
        current.status = "Seated";
        current.color = "bg-teal-500/20 text-teal-300 border-teal-500/30";
        setTablesOccupied((t) => Math.min(18, t + 1));
      } else if (current.status === "Calling") {
        current.status = "Call In";
        current.color = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      } else if (current.status === "In Queue") {
        current.status = "Calling";
        current.color = "bg-amber-500/20 text-amber-300 border-amber-500/30";
      } else if (current.status === "Waiting") {
        current.status = "In Queue";
        current.color = "bg-orange-500/20 text-orange-300 border-orange-500/30";
      } else {
        current.status = "Call In";
        current.color = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      }
      return next;
    });
  };

  return (
    <section id="for-restaurants" className="py-20 sm:py-28 bg-[#F8FAFF] text-stone-900 border-b border-stone-200 relative overflow-hidden content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Header & Right Cursive Tag */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-700 bg-purple-100 px-3.5 py-1 rounded-full shadow-xs">
                For Restaurants
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900 mt-3 leading-tight">
                A Smarter Way to Handle <span className="gradient-text-pink">Puja Rush.</span>
              </h2>
              <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-xl leading-relaxed">
                Manage queues digitally, accept pre-orders and create happier customers — even during peak Saptami to Dashami dinner rush.
              </p>
            </div>

            <div className="text-right">
              <span className="font-script text-2xl sm:text-3xl font-bold text-stone-800 block">
                100 guests outside. 1 dashboard inside. ♡
              </span>
              <span className="text-xs text-stone-500 font-medium">Turn lost pavement walkouts into confirmed bills</span>
            </div>
          </div>
        </ScrollReveal>

        {/* 2-col Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Column: 6 Features + CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {RESTAURANT_FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <ScrollReveal key={f.title} direction="left" delay={i * 60}>
                    <div
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-stone-200 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all duration-300 group"
                    >
                      <div className={`w-9 h-9 rounded-xl ${f.bg} flex items-center justify-center ${f.iconColor} flex-shrink-0 mt-0.5 shadow-xs group-hover:scale-110 transition-transform`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-stone-900 leading-snug">{f.title}</h3>
                        <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal direction="up" delay={250}>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={onOpenPartner}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] text-white font-bold text-xs shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>List Your Restaurant</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Full ASSO Host Dashboard UI Console */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delay={150}>
              <div className="bg-[#070E20] rounded-3xl p-5 sm:p-6 text-white border border-white/15 shadow-2xl overflow-hidden gold-border-glow">
                {/* Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-[#38BDF8]">ASSO</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Store className="w-3.5 h-3.5 text-amber-400" />
                      Oh! Calcutta Restaurant
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Host Console
                  </div>
                </div>

                {/* 4 Stat Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
                  <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                    <p className="text-[10px] text-slate-400">Total Queue</p>
                    <p className="text-lg font-black text-white">{totalGuests} Guests</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                    <p className="text-[10px] text-slate-400">Avg Wait Time</p>
                    <p className="text-lg font-black text-amber-300 font-mono">28 min</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                    <p className="text-[10px] text-slate-400">Tables Occupied</p>
                    <p className="text-lg font-black text-teal-300 font-mono">{tablesOccupied} / 18</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                    <p className="text-[10px] text-slate-400">Pre-Orders</p>
                    <p className="text-lg font-black text-purple-300">8 Kitchen Ready</p>
                  </div>
                </div>

                {/* Queue Table */}
                <div className="overflow-x-auto text-[11px]">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-[10px] uppercase font-bold text-slate-400">
                        <th className="pb-2">ID</th>
                        <th className="pb-2">Customer</th>
                        <th className="pb-2">Phone</th>
                        <th className="pb-2">Guests</th>
                        <th className="pb-2">Wait Time</th>
                        <th className="pb-2 text-right">Action (Click)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-medium">
                      {queueRows.map((row, i) => (
                        <tr key={row.id} className="hover:bg-white/[0.04] transition-colors">
                          <td className="py-2.5 font-mono font-bold text-white">{row.id}</td>
                          <td className="py-2.5 text-slate-200">{row.name}</td>
                          <td className="py-2.5 text-slate-400 font-mono">{row.phone}</td>
                          <td className="py-2.5">{row.guests}</td>
                          <td className="py-2.5 text-emerald-400 font-mono">{row.wait}</td>
                          <td className="py-2.5 text-right">
                            <button
                              onClick={() => handleToggleStatus(i)}
                              className={`px-2.5 py-1 rounded-md border text-[10px] font-bold cursor-pointer transition-all hover:scale-105 active:scale-95 ${row.color}`}
                            >
                              {row.status}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bottom Full Dashboard link */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Click table status to test interactive seating simulation
                  </span>
                  <button
                    onClick={onOpenPartner}
                    className="text-xs font-bold text-[#38BDF8] hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Partner Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
