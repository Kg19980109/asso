"use client";

import * as React from "react";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Users,
  CheckCircle2,
  Bell,
  UtensilsCrossed,
  Landmark,
  QrCode,
  Store,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { FestiveParticles } from "@/components/ui/festive-particles";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

interface HeroSectionProps {
  onOpenConnect?: () => void;
  onOpenQueue?: () => void;
}

export function HeroSection({ onOpenConnect, onOpenQueue }: HeroSectionProps) {
  const [activePersona, setActivePersona] = React.useState<"diner" | "restaurant">("diner");
  const [selectedRestIdx, setSelectedRestIdx] = React.useState(0);

  const RESTAURANT_PREVIEWS = [
    {
      name: "6 Ballygunge Place",
      area: "Ballygunge, Kolkata",
      ticket: "#27",
      ofTotal: "of 34",
      wait: "~35m",
      progress: 78,
      party: "Party of 4 • Table 8",
      alert: "Table ready in ~5 min • Head back now",
      dish: "2x Mutton Kosha, 1x Daab Chingri",
    },
    {
      name: "Peter Cat",
      area: "Park Street, Kolkata",
      ticket: "#42",
      ofTotal: "of 50",
      wait: "~45m",
      progress: 65,
      party: "Party of 2 • AC Hall",
      alert: "Order being fired • 15 min remaining",
      dish: "2x Chelo Kebab Platter",
    },
    {
      name: "Arsalan",
      area: "Park Circus, Kolkata",
      ticket: "#18",
      ofTotal: "of 28",
      wait: "~20m",
      progress: 90,
      party: "Party of 5 • Family Room",
      alert: "Your table is ready! Host waiting at door",
      dish: "3x Special Mutton Biryani",
    },
  ];

  const currentPreview = RESTAURANT_PREVIEWS[selectedRestIdx];

  return (
    <section
      id="for-diners"
      className="relative min-h-[92vh] pt-28 sm:pt-32 pb-16 sm:pb-24 bg-[#060B18] overflow-hidden flex items-center justify-center"
    >
      {/* Background Floating Festive Bokeh Particles */}
      <FestiveParticles />

      {/* Modern Grid Background Texture */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Atmospheric High-End Radial Lighting */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 sm:left-1/4 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-[radial-gradient(closest-side,rgba(124,58,237,0.22),transparent)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-[radial-gradient(closest-side,rgba(245,158,11,0.18),transparent)] pointer-events-none blur-3xl" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-[radial-gradient(closest-side,rgba(56,189,248,0.15),transparent)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

            {/* Top Row: Event Announcement Tag & Audience Switcher */}
            <ScrollReveal direction="down" delay={50}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                {/* Event Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-amber-400/30 backdrop-blur-md text-slate-200 text-xs font-semibold shadow-sm">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span className="text-amber-300 font-bold">Durga Puja 2026</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300">Kolkata Virtual Dining Network</span>
                </div>

                {/* Persona Switcher Pill */}
                <div className="inline-flex p-1 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md text-xs">
                  <button
                    onClick={() => setActivePersona("diner")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      activePersona === "diner"
                        ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    🍽️ For Diners
                  </button>
                  <button
                    onClick={() => setActivePersona("restaurant")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      activePersona === "restaurant"
                        ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    🏪 For Restaurants
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal direction="up" delay={100}>
              {activePersona === "diner" ? (
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
                  <span className="block">This Puja,</span>
                  <span className="block text-slate-100">Don&apos;t Just Wait.</span>
                  <span className="block gradient-text-hero drop-shadow-[0_4px_30px_rgba(232,121,249,0.35)]">
                    Explore More.
                  </span>
                </h1>
              ) : (
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
                  <span className="block">Control The Rush.</span>
                  <span className="block text-slate-100">Zero Door Chaos.</span>
                  <span className="block bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(245,158,11,0.3)]">
                    35% More Table Turns.
                  </span>
                </h1>
              )}
            </ScrollReveal>

            {/* Subheading */}
            <ScrollReveal direction="up" delay={150}>
              {activePersona === "diner" ? (
                <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                  Join restaurant queues from your phone, pre-order signature food, and visit nearby pandals. Walk in right when your table is hot and ready.
                </p>
              ) : (
                <>
                  <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                    Turn packed Kolkata pavements into smooth virtual queues and faster table turns. Zero hardware to buy, zero POS integration needed. Live in 15 minutes.
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">*Target metric from pilot projections — measure your own results in the free pilot.</p>
                </>
              )}
            </ScrollReveal>

            {/* Action CTA Buttons */}
            <ScrollReveal direction="up" delay={200}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                {activePersona === "diner" ? (
                  <>
                    <button
                      onClick={onOpenQueue}
                      className="relative group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-purple-600/30 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                      <span>Join Live Queue Demo</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={onOpenConnect}
                      className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Store className="w-4 h-4 text-amber-300" />
                      <span>For Restaurants</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-full sm:w-auto">
                      <button
                        onClick={onOpenConnect}
                        className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
                      >
                        <Sparkles className="w-4 h-4 text-slate-950" />
                        <span>Get Started for Your Restaurant</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <p className="text-[11px] text-slate-400 mt-2 text-center lg:text-left">
                        No hardware required • Set up in minutes • Free pilot
                      </p>
                    </div>

                    <a
                      href="#for-restaurants"
                      className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>Explore Host Console</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </>
                )}
              </div>
            </ScrollReveal>

            {/* Quick Value Metrics Ribbon */}
            <ScrollReveal direction="up" delay={250}>
              <div className="pt-3">
                {activePersona === "diner" ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 max-w-xl mx-auto lg:mx-0">
                    {/* Metric 1 */}
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 flex-shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-white leading-tight">0 min</p>
                        <p className="text-[10px] text-slate-400">At Doorstep</p>
                      </div>
                    </div>

                    {/* Metric 2 */}
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 flex-shrink-0">
                        <Landmark className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-white leading-tight">Hop More</p>
                        <p className="text-[10px] text-slate-400">Pandals Nearby</p>
                      </div>
                    </div>

                    {/* Metric 3 */}
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-400/40 flex items-center justify-center text-orange-400 flex-shrink-0">
                        <UtensilsCrossed className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-white leading-tight">Pre-Order</p>
                        <p className="text-[10px] text-slate-400">Food Ready</p>
                      </div>
                    </div>

                    {/* Metric 4 */}
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-white leading-tight">No App</p>
                        <p className="text-[10px] text-slate-400">Scan &amp; Go</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 max-w-xl mx-auto lg:mx-0">
                    {/* Metric 1 - Restaurant */}
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 flex-shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-white leading-tight">Virtual Queue</p>
                        <p className="text-[10px] text-slate-400">Zero Door Chaos</p>
                      </div>
                    </div>

                    {/* Metric 2 - Restaurant */}
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 flex-shrink-0">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-white leading-tight">Fast Turns</p>
                        <p className="text-[10px] text-slate-400">+35% Table Turns*</p>
                      </div>
                    </div>

                    {/* Metric 3 - Restaurant */}
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 flex-shrink-0">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-white leading-tight">Ready Alerts</p>
                        <p className="text-[10px] text-slate-400">SMS &amp; Live Web</p>
                      </div>
                    </div>

                    {/* Metric 4 - Restaurant */}
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-white leading-tight">15-Min Setup</p>
                        <p className="text-[10px] text-slate-400">Zero Hardware</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Trust Guarantee / Script Note */}
                <div className="mt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
                  {activePersona === "diner" ? (
                    <>
                      <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        100% Free for Diners
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="font-script text-lg text-amber-200/90 hidden sm:inline">
                        &ldquo;Cholo ro kota pandal ghure asi... ♡&rdquo;
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Free Pilot for Kolkata Restaurants
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400 hidden sm:inline">
                        Zero POS changes needed • Run on existing devices
                      </span>
                    </>
                  )}
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column: Sleek Interactive Phone / Live Pass Preview */}
          <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none">
            <ScrollReveal direction="right" delay={180}>
              {/* Outer Glow Halo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/30 via-pink-600/20 to-amber-400/30 rounded-[3rem] blur-2xl pointer-events-none" />

              {/* Smartphone Frame Wrapper */}
              <div className="relative rounded-[2.6rem] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 p-2.5 shadow-2xl shadow-purple-950/50 border border-white/20">

                {/* Speaker notch & camera */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-2 z-30 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-slate-700" />
                  <div className="w-8 h-1 rounded-full bg-slate-800" />
                </div>

                {/* Inner Screen */}
                <div className="relative rounded-[2.1rem] bg-[#0A1024] overflow-hidden border border-white/10 text-white">

                  {/* Top Status Bar */}
                  <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-black/40 text-[11px] font-mono text-slate-300">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black tracking-widest text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 rounded-full">
                        ASSO LIVE
                      </span>
                    </div>
                  </div>

                  {/* Restaurant Quick Tabs */}
                  <div className="px-4 pt-3 pb-2 bg-white/[0.02] border-b border-white/10">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Kolkata Partner Outlets
                    </p>
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                      {RESTAURANT_PREVIEWS.map((r, idx) => (
                        <button
                          key={r.name}
                          onClick={() => setSelectedRestIdx(idx)}
                          className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                            selectedRestIdx === idx
                              ? "bg-purple-600 text-white shadow-sm"
                              : "bg-white/5 text-slate-400 hover:bg-white/10"
                          }`}
                        >
                          {r.name.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Ticket Card */}
                  <div className="p-4 space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-black text-white">{currentPreview.name}</h3>
                        <p className="text-[11px] text-slate-400">{currentPreview.area}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Queue Active
                      </span>
                    </div>

                    {/* Big Ticket Spot Box */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/30 via-indigo-900/20 to-black/40 border border-purple-500/30 relative overflow-hidden shadow-inner">
                      <div className="flex items-baseline justify-between mb-2">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                            Your Queue Spot
                          </p>
                          <div className="flex items-baseline gap-2 mt-0.5">
                            <span className="text-4xl font-black text-white font-mono tracking-tight">
                              {currentPreview.ticket}
                            </span>
                            <span className="text-xs text-slate-400 font-bold">{currentPreview.ofTotal}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                            Est. Wait Time
                          </p>
                          <div className="flex items-center justify-end gap-1 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-2xl font-black text-amber-400 font-mono">
                              {currentPreview.wait}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Moving Progress Bar */}
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[10px] font-bold text-slate-300">
                          <span>Queue Progress</span>
                          <span className="text-emerald-400">{currentPreview.progress}% Complete</span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 rounded-full transition-all duration-500"
                            style={{ width: `${currentPreview.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300 font-medium">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-purple-400" />
                          {currentPreview.party}
                        </span>
                        <span className="text-emerald-300 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Spot Verified
                        </span>
                      </div>
                    </div>

                    {/* Live Smart Alert */}
                    <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300 flex-shrink-0">
                        <Bell className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-amber-200">Table Almost Ready!</p>
                        <p className="text-[10px] text-slate-300 mt-0.5 leading-tight">
                          {currentPreview.alert}
                        </p>
                      </div>
                    </div>

                    {/* Pre-ordered Dish Preview */}
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-left">
                      <div className="flex items-center gap-2">
                        <UtensilsCrossed className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400">Pre-ordered Food</p>
                          <p className="text-xs font-bold text-slate-200 truncate max-w-[180px]">
                            {currentPreview.dish}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        Fired 🔥
                      </span>
                    </div>

                    {/* Interactive Action on Screen */}
                    <button
                      onClick={onOpenQueue}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Simulate Your Live Queue Ticket</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>

              {/* Decorative handwritten note floating beside the phone (Desktop only) */}
              <div className="hidden xl:block absolute -bottom-6 -left-10 -rotate-6 bg-white/95 text-stone-900 p-3.5 rounded-2xl shadow-xl border border-stone-200 max-w-[170px] text-center pointer-events-none animate-float-slow">
                <p className="font-script text-lg font-bold leading-tight">
                  No queue outside.<br />
                  Full tables inside! ♡
                </p>
              </div>

              {/* Decorative top right badge */}
              <div className="hidden xl:block absolute -top-4 -right-4 rotate-3 bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-full font-black text-xs shadow-lg pointer-events-none">
                ⚡ 100% Web App
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
