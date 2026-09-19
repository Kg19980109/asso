"use client";

import * as React from "react";
import { Clock, Store, Landmark, Star, Sparkles } from "lucide-react";

const STATS = [
  {
    icon: Clock,
    value: "50,000+",
    label: "Hours Saved",
    sub: "Free from standing in queues",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: Store,
    value: "120+",
    label: "Top Restaurants",
    sub: "Across Kolkata & Howrah",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
  {
    icon: Landmark,
    value: "350,000+",
    label: "Pandals Hopped",
    sub: "Explored while waiting",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: Star,
    value: "4.9 ★",
    label: "Diner Rating",
    sub: "15,000+ app reviews",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

export function FestiveStatsBanner() {
  return (
    <section className="relative bg-[#070D1E] py-12 border-b border-white/10 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Bengali top strip */}
        <div className="flex items-center justify-center gap-2 mb-8 text-center">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="font-bengali font-bold text-amber-200 text-sm sm:text-base tracking-wide">
            পুজোর ভিড়ে কলকাতার প্রিয় ডাইনিং সঙ্গী
          </span>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            — Kolkata&apos;s trusted festive dining companion
          </span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="p-5 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all hover:scale-[1.02] flex flex-col items-center text-center shadow-lg"
              >
                <div className={`w-10 h-10 rounded-2xl ${s.bg} border ${s.border} flex items-center justify-center ${s.color} mb-3 shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {s.value}
                </p>
                <p className="text-xs font-bold text-slate-200 mt-1 uppercase tracking-wider">
                  {s.label}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {s.sub}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
