"use client";

import * as React from "react";
import {
  Bell,
  Sparkles,
  QrCode,
  Users,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Outer glow halo */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 bg-gradient-to-tr from-orange-400/20 via-pink-400/20 to-amber-300/30 rounded-[3rem] blur-2xl pointer-events-none"
      />

      {/* Phone-frame wrapper */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-b from-stone-200 to-stone-300 p-2 shadow-2xl shadow-stone-500/20 border border-white">

        {/* Phone screen interior */}
        <div className="rounded-[2.1rem] bg-white overflow-hidden border border-stone-100 shadow-inner">

          {/* Status bar */}
          <div className="flex items-center justify-between px-6 py-3 bg-stone-50 border-b border-stone-100">
            <span className="text-[11px] font-bold text-stone-700 font-mono">9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-wider text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                ASSO
              </span>
            </div>
          </div>

          {/* App header */}
          <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-stone-100 bg-gradient-to-r from-orange-50/60 to-amber-50/60">
            <div>
              <p className="text-[10px] font-black tracking-widest text-orange-600 uppercase">Live Queue</p>
              <h2 className="text-sm font-bold text-stone-900 mt-0.5">Ballygunge Heritage Kitchen</h2>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </div>
          </div>

          {/* Queue position card */}
          <div className="mx-4 mt-4 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-amber-200/80 p-5 relative overflow-hidden shadow-xs">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[10px] text-amber-800 uppercase tracking-widest font-bold">Your Queue Spot</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-5xl font-black text-stone-900 tracking-tighter leading-none">#27</span>
                  <span className="text-xs text-amber-700 font-bold">of 31</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-amber-800 uppercase tracking-widest font-bold">Est. Wait</p>
                <div className="flex items-center gap-1 mt-1 justify-end">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-2xl font-black text-orange-600 font-mono tracking-tight">~45m</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-[10px] font-bold text-amber-900 mb-1">
                <span>Queue moving</span>
                <span>72%</span>
              </div>
              <div className="h-2 w-full bg-amber-200/60 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 animate-pulse"
                  style={{ width: "72%" }}
                />
              </div>
            </div>

            {/* Party info */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-amber-200/60">
              <div className="flex items-center gap-1.5 text-stone-600 font-medium">
                <Users className="w-3.5 h-3.5 text-orange-600" />
                <span>Party of 4 • Dine-in</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-700 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Spot secured</span>
              </div>
            </div>
          </div>

          {/* Free time banner */}
          <div className="mx-4 mt-3 rounded-2xl bg-sky-50 border border-sky-200 p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-700 flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">You&apos;re free to explore!</p>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                Pandal hopping, food, photos...
              </p>
            </div>
          </div>

          {/* Notification alert */}
          <div className="mx-4 mt-3 mb-4 rounded-2xl bg-amber-50 border border-amber-200 p-3.5 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 flex-shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-xs font-bold text-stone-900">Table almost ready</p>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Head back in ~5 min. Your table for 4 is being prepared.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom brand badge */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white border border-stone-200 rounded-full px-4 py-1.5 shadow-lg">
        <QrCode className="w-3.5 h-3.5 text-orange-600" />
        <span className="text-[11px] font-bold text-stone-800 whitespace-nowrap">Scan QR to join instantly</span>
        <Sparkles className="w-3 h-3 text-amber-500" />
      </div>
    </div>
  );
}
