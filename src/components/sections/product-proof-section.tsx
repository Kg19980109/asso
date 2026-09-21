"use client";

import * as React from "react";
import {
  Smartphone,
  Monitor,
  QrCode,
  Clock,
  Bell,
  UtensilsCrossed,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/animations/fade-in";

// ── Guest phone mock (Light Theme) ──────────────────────────
function GuestPhoneMock() {
  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="rounded-[2.4rem] bg-gradient-to-b from-stone-200 to-stone-300 p-2.5 shadow-2xl shadow-stone-400/40 border border-white">
        <div className="rounded-[1.9rem] bg-white overflow-hidden border border-stone-100 shadow-inner">
          {/* Status bar */}
          <div className="flex justify-between items-center px-6 py-2.5 bg-stone-50 border-b border-stone-100">
            <span className="text-[11px] text-stone-600 font-mono font-bold">9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-widest text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                ASSO
              </span>
            </div>
          </div>
          {/* Header */}
          <div className="px-5 pt-4 pb-3 border-b border-stone-100 bg-gradient-to-r from-teal-50/50 to-amber-50/50">
            <p className="text-[10px] text-teal-700 font-bold uppercase tracking-widest">Active Queue</p>
            <h3 className="text-base font-black text-stone-900 mt-0.5">Ballygunge Heritage Kitchen</h3>
            <p className="text-[11px] text-stone-500">Ballygunge, Kolkata</p>
          </div>
          {/* Queue ticket */}
          <div className="mx-4 my-4 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-amber-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] text-amber-800 uppercase tracking-widest font-bold">Your Queue Spot</p>
                <p className="text-5xl font-black text-stone-900 tracking-tighter leading-none mt-1">#27</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-amber-800 uppercase tracking-widest font-bold">Est. Wait</p>
                <div className="flex items-center gap-1 justify-end mt-1">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <p className="text-2xl font-black text-orange-600 font-mono">~45m</p>
                </div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-amber-900">
                <span>Queue moving</span>
                <span>72%</span>
              </div>
              <div className="h-2 bg-amber-200/60 rounded-full overflow-hidden">
                <div className="h-full w-[72%] bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
              </div>
            </div>
          </div>
          {/* Status bar */}
          <div className="mx-4 mb-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-stone-900">Spot confirmed digitally</p>
              <p className="text-[11px] text-stone-500">Free to explore • Push alert at ~5 min</p>
            </div>
          </div>
          {/* Notification preview */}
          <div className="mx-4 mb-4 rounded-2xl bg-amber-50 border border-amber-200 p-3.5 flex items-start gap-3 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 flex-shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">Table almost ready!</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Please head back towards the entrance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Host dashboard mock (Light Theme) ───────────────────────
function HostDashboardMock() {
  const rows = [
    { num: "#21", name: "Anirban S.", party: "2", wait: "12m", status: "Waiting", badge: "text-sky-700 bg-sky-100 border-sky-300" },
    { num: "#22", name: "Priya R.",  party: "4", wait: "18m", status: "Called",  badge: "text-emerald-800 bg-emerald-100 border-emerald-300 font-bold" },
    { num: "#23", name: "Soham D.", party: "2", wait: "24m", status: "Waiting", badge: "text-sky-700 bg-sky-100 border-sky-300" },
    { num: "#24", name: "Nisha M.", party: "3", wait: "31m", status: "Waiting", badge: "text-sky-700 bg-sky-100 border-sky-300" },
  ];
  return (
    <div className="rounded-3xl bg-white border border-stone-200 shadow-2xl shadow-stone-300/50 overflow-hidden">
      {/* Chrome */}
      <div className="flex items-center gap-2 px-5 py-3 bg-stone-50 border-b border-stone-100">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 mx-2 h-6 rounded-md bg-white border border-stone-200 flex items-center justify-center">
          <span className="text-[10px] text-stone-500 font-mono">asso.io/host/ballygunge</span>
        </div>
        <Monitor className="w-3.5 h-3.5 text-stone-400" />
      </div>
      {/* Dashboard */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <p className="text-sm font-black text-stone-900">Host Console</p>
            <p className="text-xs text-stone-500">Ballygunge Heritage Kitchen</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Queue
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { l: "Waiting", v: "27", c: "text-stone-900", bg: "bg-stone-50" },
            { l: "Serving", v: "12", c: "text-amber-700", bg: "bg-amber-50" },
            { l: "Seated", v: "48", c: "text-emerald-700", bg: "bg-emerald-50" },
          ].map((s) => (
            <div key={s.l} className={`${s.bg} rounded-2xl p-3 text-center border border-stone-100 shadow-xs`}>
              <p className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">{s.l}</p>
              <p className={`text-2xl font-black mt-0.5 ${s.c}`}>{s.v}</p>
            </div>
          ))}
        </div>
        {/* Queue list */}
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.num} className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200/70 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-black text-stone-900 font-mono text-sm">{r.num}</span>
                <span className="text-stone-800 font-semibold">{r.name}</span>
                <span className="text-stone-500 font-medium">({r.party} pax)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-stone-500 font-mono text-[11px]">{r.wait}</span>
                <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wide ${r.badge}`}>
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductProofSection() {
  return (
    <section
      id="product-proof"
      className="relative overflow-hidden bg-[#F2FBF9] py-24 sm:py-36 border-b border-teal-100/80"
    >
      {/* Ambient soft glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-teal-200/30 blur-3xl pointer-events-none"
      />

      <Container size="wide" className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <FadeIn delay={0.05}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 border border-teal-300/80 text-teal-800 text-xs font-bold uppercase tracking-widest mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              See ASSO in Action
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <h2
              className="font-black text-stone-900 tracking-tighter leading-[0.92] mb-5"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", letterSpacing: "-0.03em" }}
            >
              <span className="block">What does ASSO</span>
              <span className="block gradient-text-teal">actually look like?</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-base sm:text-xl text-stone-600 leading-relaxed max-w-xl mx-auto">
              Two clean interfaces. One effortless dining experience for both guests and hosts.
            </p>
          </FadeIn>
        </div>

        {/* Dual mockup: phone + dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-5xl mx-auto mb-16 sm:mb-20">

          {/* Guest view — phone */}
          <FadeIn delay={0.15}>
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-2xl bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-700 shadow-xs">
                  <Smartphone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-teal-800">Guest View</p>
                  <p className="text-xs text-stone-500">Mobile browser • Zero app download</p>
                </div>
              </div>
              <div className="max-w-xs mx-auto lg:max-w-none">
                <GuestPhoneMock />
              </div>
            </div>
          </FadeIn>

          {/* Host dashboard */}
          <FadeIn delay={0.25}>
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 shadow-xs">
                  <Monitor className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-purple-800">Restaurant View</p>
                  <p className="text-xs text-stone-500">Host console • Tablet / Laptop / Mobile</p>
                </div>
              </div>
              <HostDashboardMock />
            </div>
          </FadeIn>
        </div>

        {/* Key feature callouts */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {[
              { icon: QrCode,         label: "QR Scan Join",      sub: "No app download needed",   color: "text-teal-700",   bg: "bg-teal-50",   border: "border-teal-200" },
              { icon: Clock,          label: "Live Queue Track",   sub: "Real-time spot in line",   color: "text-sky-700",    bg: "bg-sky-50",    border: "border-sky-200" },
              { icon: Bell,           label: "Smart Alerts",      sub: "Table-ready notification", color: "text-amber-700",  bg: "bg-amber-50",  border: "border-amber-200" },
              { icon: UtensilsCrossed, label: "Host Console",     sub: "Simple 1-tap seating",     color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  className={`p-5 rounded-3xl ${f.bg} border ${f.border} shadow-xs flex flex-col items-center text-center gap-2`}
                >
                  <Icon className={`w-6 h-6 ${f.color}`} />
                  <p className="text-sm font-bold text-stone-900">{f.label}</p>
                  <p className="text-xs text-stone-500 leading-snug">{f.sub}</p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
