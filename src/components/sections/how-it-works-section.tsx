"use client";

import * as React from "react";
import Image from "next/image";
import {
  QrCode,
  Users,
  Clock,
  Bell,
  UtensilsCrossed,
  CheckCircle2,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  Wifi,
  Battery,
} from "lucide-react";
import { FestiveParticles } from "@/components/ui/festive-particles";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

interface HowItWorksSectionProps {
  onOpenQueue?: () => void;
  onOpenDownload?: () => void;
}

export function HowItWorksSection({ onOpenQueue, onOpenDownload }: HowItWorksSectionProps) {
  const [filter, setFilter] = React.useState<"all" | "join" | "pandal">("all");
  const [step1Guests, setStep1Guests] = React.useState(4);
  const [step4Items, setStep4Items] = React.useState({
    biryani: 1,
    fishFry: 2,
    kosha: 1,
  });

  const step4Total =
    step4Items.biryani * 320 +
    step4Items.fishFry * 180 +
    step4Items.kosha * 450;

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#080E21] text-white border-y border-white/10 relative overflow-hidden content-auto">
      {/* Floating particles & ambient glow */}
      <FestiveParticles />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[radial-gradient(closest-side,rgba(124,58,237,0.15),transparent)] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[radial-gradient(closest-side,rgba(37,99,235,0.15),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold mb-3 shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Simple, Seamless Journey</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                How <span className="gradient-text-hero">ASSO</span> Works
              </h2>
            </div>

            <div className="text-left md:text-right">
              <span className="text-base sm:text-lg font-semibold text-slate-300 tracking-tight block">
                8 simple steps. A better Puja experience.
              </span>
              <span className="font-script text-2xl text-amber-200 font-bold hidden sm:inline">
                Smart dining for Durga Puja ♡
              </span>
            </div>
          </div>

          {/* Quick Step Category Filter */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-white text-slate-950 shadow-lg shadow-white/10"
                  : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              All 8 Steps
            </button>
            <button
              onClick={() => setFilter("join")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === "join"
                  ? "bg-white text-slate-950 shadow-lg shadow-white/10"
                  : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              Steps 1–4: Digital Queue &amp; Pre-Order
            </button>
            <button
              onClick={() => setFilter("pandal")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === "pandal"
                  ? "bg-white text-slate-950 shadow-lg shadow-white/10"
                  : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              Steps 5–8: Pandal Hopping &amp; Hot Feast
            </button>
          </div>
        </ScrollReveal>

        {/* 8 Phone Mockup Cards Grid in Dark Aesthetic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">

          {/* =========================================================================
              STEP 1: Scan QR & Join
             ========================================================================= */}
          {(filter === "all" || filter === "join") && (
            <ScrollReveal direction="up" delay={50}>
              <div className="flex flex-col bg-white/[0.04] hover:bg-white/[0.08] rounded-[28px] p-4 sm:p-5 border border-white/10 hover:border-blue-400/50 backdrop-blur-md shadow-2xl transition-all duration-300 group hover:-translate-y-1.5">
                {/* Step Header */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#3B82F6] text-white flex items-center justify-center font-black text-sm shadow-md shadow-blue-500/30 flex-shrink-0 group-hover:scale-110 transition-transform">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      Scan the QR and Join
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Takes just a few seconds! No app download needed.
                    </p>
                  </div>
                </div>

                {/* Smartphone Frame */}
                <div className="mt-4 relative rounded-[26px] border-[3px] border-slate-700 bg-slate-950 p-1.5 shadow-2xl overflow-hidden group-hover:border-slate-500 transition-colors">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20" />

                  {/* Screen Canvas */}
                  <div className="bg-[#0D152E] rounded-[20px] p-3 pt-5 text-white flex flex-col justify-between min-h-[300px] border border-white/10 phone-glass-reflection">
                    <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 pb-2 border-b border-white/10 px-1">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-2.5 h-2.5" />
                        <Battery className="w-3 h-3" />
                      </div>
                    </div>

                    {/* App Screen Content */}
                    <div className="flex flex-col items-center text-center py-2">
                      <span className="text-xs font-black text-[#38BDF8]">ASSO</span>
                      <div className="w-28 h-28 bg-white rounded-2xl flex flex-col items-center justify-center p-2 my-2 shadow-lg relative overflow-hidden border-2 border-blue-400">
                        <QrCode className="w-18 h-18 text-slate-900" />
                        {/* Animated Scanning Laser Line */}
                        <div className="absolute inset-x-2 h-0.5 bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,1)] animate-[laser-scan_2.5s_infinite_ease-in-out]" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-300 leading-tight">
                        Point camera at restaurant QR
                      </span>
                    </div>

                    {/* Join Button */}
                    <button
                      onClick={onOpenQueue}
                      className="w-full h-8 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white font-bold text-[11px] shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    >
                      <span>Join Queue</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}


          {/* =========================================================================
              STEP 2: Enter Your Details
             ========================================================================= */}
          {(filter === "all" || filter === "join") && (
            <ScrollReveal direction="up" delay={100}>
              <div className="flex flex-col bg-white/[0.04] hover:bg-white/[0.08] rounded-[28px] p-4 sm:p-5 border border-white/10 hover:border-rose-400/50 backdrop-blur-md shadow-2xl transition-all duration-300 group hover:-translate-y-1.5">
                {/* Step Header */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E11D48] to-[#F43F5E] text-white flex items-center justify-center font-black text-sm shadow-md shadow-rose-500/30 flex-shrink-0 group-hover:scale-110 transition-transform">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      Enter Your Details
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Tell us your name, phone number and number of guests.
                    </p>
                  </div>
                </div>

                {/* Smartphone Frame */}
                <div className="mt-4 relative rounded-[26px] border-[3px] border-slate-700 bg-slate-950 p-1.5 shadow-2xl overflow-hidden group-hover:border-slate-500 transition-colors">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20" />

                  {/* Screen Canvas */}
                  <div className="bg-[#0D152E] rounded-[20px] p-3 pt-5 text-white flex flex-col justify-between min-h-[300px] border border-white/10 phone-glass-reflection">
                    <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 pb-2 border-b border-white/10 px-1">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-2.5 h-2.5" />
                        <Battery className="w-3 h-3" />
                      </div>
                    </div>

                    {/* App Screen Content */}
                    <div className="space-y-2 py-1">
                      <div className="text-center">
                        <span className="text-xs font-black tracking-tight text-[#38BDF8]">ASSO</span>
                        <p className="text-[10px] font-bold text-slate-200">Join the Queue</p>
                      </div>

                      <div className="space-y-1.5 text-[10px]">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase">Full Name</span>
                          <div className="h-7 px-2 rounded-lg bg-white/10 border border-white/15 flex items-center text-slate-100 font-semibold shadow-xs">
                            Rahul Sen
                          </div>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase">Phone Number</span>
                          <div className="h-7 px-2 rounded-lg bg-white/10 border border-white/15 flex items-center text-slate-100 font-semibold shadow-xs">
                            +91 98765 43210
                          </div>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase">Number of Guests</span>
                          <div className="h-7 px-2.5 rounded-lg bg-white/10 border border-white/15 flex items-center justify-between font-bold text-slate-200 shadow-xs">
                            <button
                              onClick={() => setStep1Guests((g) => Math.max(1, g - 1))}
                              className="w-4 h-4 rounded bg-white/15 hover:bg-white/25 flex items-center justify-center text-slate-200 text-xs cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-mono text-amber-300 font-bold">{step1Guests} Guests</span>
                            <button
                              onClick={() => setStep1Guests((g) => Math.min(15, g + 1))}
                              className="w-4 h-4 rounded bg-white/15 hover:bg-white/25 flex items-center justify-center text-slate-200 text-xs cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={onOpenQueue}
                      className="w-full h-8 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:from-[#4338CA] hover:to-[#4F46E5] text-white font-bold text-[11px] shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    >
                      <span>Submit</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}


          {/* =========================================================================
              STEP 3: You're in Queue!
             ========================================================================= */}
          {(filter === "all" || filter === "join") && (
            <ScrollReveal direction="up" delay={150}>
              <div className="flex flex-col bg-white/[0.04] hover:bg-white/[0.08] rounded-[28px] p-4 sm:p-5 border border-white/10 hover:border-teal-400/50 backdrop-blur-md shadow-2xl transition-all duration-300 group hover:-translate-y-1.5">
                {/* Step Header */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0D9488] to-[#14B8A6] text-white flex items-center justify-center font-black text-sm shadow-md shadow-teal-500/30 flex-shrink-0 group-hover:scale-110 transition-transform">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      You&apos;re in Queue!
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Get your queue number instantly.
                    </p>
                  </div>
                </div>

                {/* Smartphone Frame */}
                <div className="mt-4 relative rounded-[26px] border-[3px] border-slate-700 bg-slate-950 p-1.5 shadow-2xl overflow-hidden group-hover:border-slate-500 transition-colors">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20" />

                  {/* Screen Canvas */}
                  <div className="bg-gradient-to-b from-[#0B2528] to-[#08181D] rounded-[20px] p-3 pt-5 text-white flex flex-col justify-between min-h-[300px] border border-teal-500/30 phone-glass-reflection">
                    <div className="flex items-center justify-between text-[9px] font-bold text-teal-300/80 pb-2 border-b border-teal-500/20 px-1">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-2.5 h-2.5 text-teal-300" />
                        <Battery className="w-3 h-3 text-teal-300" />
                      </div>
                    </div>

                    {/* App Screen Content */}
                    <div className="text-center py-2 space-y-1.5">
                      <span className="text-xs font-black text-teal-300">ASSO</span>
                      <div>
                        <p className="text-[10px] font-bold text-teal-200 uppercase tracking-wide">You&apos;re</p>
                        <p className="text-4xl font-black text-[#38BDF8] tracking-tighter my-0.5 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">#27</p>
                        <p className="text-xs font-bold text-slate-300">in queue</p>
                      </div>

                      <div className="p-2 rounded-xl bg-white/10 border border-teal-400/30 flex items-center justify-center gap-1.5 shadow-sm">
                        <Clock className="w-3.5 h-3.5 text-teal-300" />
                        <span className="text-[10px] font-bold text-slate-200">
                          Estimated wait: <strong className="text-amber-300 font-mono">~ 1 hr</strong>
                        </span>
                      </div>
                    </div>

                    {/* Subtitle tag */}
                    <div className="p-2 rounded-xl bg-teal-500/20 border border-teal-400/30 text-center">
                      <p className="text-[9px] text-teal-200 font-bold leading-tight">
                        We&apos;ll notify you when your table is ready! ❤️
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}


          {/* =========================================================================
              STEP 4: Pre-Order Your Food
             ========================================================================= */}
          {(filter === "all" || filter === "join") && (
            <ScrollReveal direction="up" delay={200}>
              <div className="flex flex-col bg-white/[0.04] hover:bg-white/[0.08] rounded-[28px] p-4 sm:p-5 border border-white/10 hover:border-orange-400/50 backdrop-blur-md shadow-2xl transition-all duration-300 group hover:-translate-y-1.5">
                {/* Step Header */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#EA580C] to-[#F97316] text-white flex items-center justify-center font-black text-sm shadow-md shadow-orange-500/30 flex-shrink-0 group-hover:scale-110 transition-transform">
                    4
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      Pre-Order Your Food
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Browse the menu &amp; order now so it&apos;s ready when you arrive.
                    </p>
                  </div>
                </div>

                {/* Smartphone Frame */}
                <div className="mt-4 relative rounded-[26px] border-[3px] border-slate-700 bg-slate-950 p-1.5 shadow-2xl overflow-hidden group-hover:border-slate-500 transition-colors">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20" />

                  {/* Screen Canvas */}
                  <div className="bg-gradient-to-b from-[#2A1408] to-[#170C05] rounded-[20px] p-3 pt-5 text-white flex flex-col justify-between min-h-[300px] border border-orange-500/30 phone-glass-reflection">
                    <div className="flex items-center justify-between text-[9px] font-bold text-orange-300/80 pb-2 border-b border-orange-500/20 px-1">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-2.5 h-2.5 text-orange-400" />
                        <Battery className="w-3 h-3 text-orange-400" />
                      </div>
                    </div>

                    {/* App Screen Content */}
                    <div className="space-y-1.5 py-1">
                      <div className="flex justify-between items-center text-[9px] font-bold">
                        <span className="text-orange-400">Menu</span>
                        <span className="bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full font-mono border border-orange-500/30">
                          Subtotal: ₹{step4Total}
                        </span>
                      </div>

                      <div className="space-y-1 text-[10px]">
                        <div className="p-1.5 rounded-lg bg-white/10 border border-white/15 flex justify-between items-center shadow-xs">
                          <div>
                            <p className="font-bold text-white leading-none">Chicken Biryani</p>
                            <p className="text-[9px] text-slate-400 mt-0.5">₹320</p>
                          </div>
                          <div className="flex items-center gap-1 font-bold text-orange-300">
                            <button
                              onClick={() => setStep4Items((s) => ({ ...s, biryani: Math.max(0, s.biryani - 1) }))}
                              className="w-4 h-4 rounded bg-white/15 hover:bg-white/25 flex items-center justify-center text-[10px] cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-[10px] font-mono">{step4Items.biryani}x</span>
                            <button
                              onClick={() => setStep4Items((s) => ({ ...s, biryani: s.biryani + 1 }))}
                              className="w-4 h-4 rounded bg-white/15 hover:bg-white/25 flex items-center justify-center text-[10px] cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="p-1.5 rounded-lg bg-white/10 border border-white/15 flex justify-between items-center shadow-xs">
                          <div>
                            <p className="font-bold text-white leading-none">Fish Fry</p>
                            <p className="text-[9px] text-slate-400 mt-0.5">₹180</p>
                          </div>
                          <div className="flex items-center gap-1 font-bold text-orange-300">
                            <button
                              onClick={() => setStep4Items((s) => ({ ...s, fishFry: Math.max(0, s.fishFry - 1) }))}
                              className="w-4 h-4 rounded bg-white/15 hover:bg-white/25 flex items-center justify-center text-[10px] cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-[10px] font-mono">{step4Items.fishFry}x</span>
                            <button
                              onClick={() => setStep4Items((s) => ({ ...s, fishFry: s.fishFry + 1 }))}
                              className="w-4 h-4 rounded bg-white/15 hover:bg-white/25 flex items-center justify-center text-[10px] cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pre-order action */}
                    <button
                      onClick={onOpenQueue}
                      className="w-full h-8 rounded-xl bg-gradient-to-r from-[#059669] to-[#10B981] hover:from-[#047857] hover:to-[#059669] text-white font-bold text-[10px] shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    >
                      <span>Place Pre-Order (₹{step4Total})</span>
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}


          {/* =========================================================================
              STEP 5: Check Your Position Anytime
             ========================================================================= */}
          {(filter === "all" || filter === "pandal") && (
            <ScrollReveal direction="up" delay={50}>
              <div className="flex flex-col bg-white/[0.04] hover:bg-white/[0.08] rounded-[28px] p-4 sm:p-5 border border-white/10 hover:border-blue-400/50 backdrop-blur-md shadow-2xl transition-all duration-300 group hover:-translate-y-1.5">
                {/* Step Header */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#60A5FA] text-white flex items-center justify-center font-black text-sm shadow-md shadow-blue-500/30 flex-shrink-0 group-hover:scale-110 transition-transform">
                    5
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      Check Position Anytime
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      See live updates on your queue status.
                    </p>
                  </div>
                </div>

                {/* Smartphone Frame */}
                <div className="mt-4 relative rounded-[26px] border-[3px] border-slate-700 bg-slate-950 p-1.5 shadow-2xl overflow-hidden group-hover:border-slate-500 transition-colors">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20" />

                  {/* Screen Canvas */}
                  <div className="bg-[#0B1530] rounded-[20px] p-3 pt-5 text-white flex flex-col justify-between min-h-[300px] border border-blue-500/30 phone-glass-reflection">
                    <div className="flex items-center justify-between text-[9px] font-bold text-blue-300/80 pb-2 border-b border-blue-500/20 px-1">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-2.5 h-2.5 text-blue-400" />
                        <Battery className="w-3 h-3 text-blue-400" />
                      </div>
                    </div>

                    {/* App Screen Content */}
                    <div className="text-center py-2 space-y-2">
                      <span className="text-xs font-black text-[#38BDF8]">ASSO</span>
                      <p className="text-base font-black text-white">Queue #27</p>

                      {/* Connected Step Milestones */}
                      <div className="flex items-center justify-center gap-1.5 my-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500 text-white text-[8px] flex items-center justify-center font-bold shadow-xs">✓</div>
                        <div className="w-4 h-0.5 bg-blue-500" />
                        <div className="w-4 h-4 rounded-full bg-blue-500 text-white text-[8px] flex items-center justify-center font-bold shadow-xs">✓</div>
                        <div className="w-4 h-0.5 bg-blue-400/50" />
                        <div className="w-4 h-4 rounded-full bg-blue-500/30 text-blue-300 text-[8px] flex items-center justify-center font-bold">3</div>
                        <div className="w-4 h-0.5 bg-blue-500/30" />
                        <div className="w-4 h-4 rounded-full bg-blue-500/30 text-blue-300 text-[8px] flex items-center justify-center font-bold">4</div>
                      </div>

                      <div className="p-2 rounded-xl bg-white/10 border border-white/15 shadow-xs">
                        <p className="text-[9px] text-slate-400">Estimated wait time</p>
                        <p className="text-sm font-black text-amber-300 font-mono">~ 1 hr</p>
                      </div>
                    </div>

                    {/* View Live Status CTA */}
                    <button
                      onClick={onOpenQueue}
                      className="w-full h-8 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white font-bold text-[11px] shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    >
                      <span>View Live Status</span>
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}


          {/* =========================================================================
              STEP 6: Exploring Pandals
             ========================================================================= */}
          {(filter === "all" || filter === "pandal") && (
            <ScrollReveal direction="up" delay={100}>
              <div className="flex flex-col bg-white/[0.04] hover:bg-white/[0.08] rounded-[28px] p-4 sm:p-5 border border-white/10 hover:border-purple-400/50 backdrop-blur-md shadow-2xl transition-all duration-300 group hover:-translate-y-1.5">
                {/* Step Header */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D946EF] to-[#EC4899] text-white flex items-center justify-center font-black text-sm shadow-md shadow-pink-500/30 flex-shrink-0 group-hover:scale-110 transition-transform">
                    6
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      Exploring Pandals
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Cholo ro kota pandel dekhe asi... ♡
                    </p>
                  </div>
                </div>

                {/* Smartphone Frame */}
                <div className="mt-4 relative rounded-[26px] border-[3px] border-slate-700 bg-slate-950 p-1.5 shadow-2xl overflow-hidden group-hover:border-slate-500 transition-colors">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20" />

                  {/* Screen Canvas with Pandal Image */}
                  <div className="relative rounded-[20px] overflow-hidden min-h-[300px] flex flex-col justify-between p-3 pt-5 text-white border border-white/10 phone-glass-reflection">
                    <Image
                      src="/images/hero-puja.jpg"
                      alt="Exploring Pandals"
                      fill
                      sizes="300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

                    {/* Top Status */}
                    <div className="relative z-10 flex items-center justify-between text-[9px] font-bold text-slate-300 pb-2 px-1">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-2.5 h-2.5" />
                        <Battery className="w-3 h-3" />
                      </div>
                    </div>

                    {/* Bottom Overlay Features */}
                    <div className="relative z-10 space-y-1 pt-4">
                      <div className="flex items-center gap-1.5 text-emerald-300 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Visit Pandals</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-300 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Shop &amp; Food Street</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-yellow-300 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Enjoy the festive vibe</span>
                      </div>
                      <p className="font-script text-base font-bold text-amber-200 pt-1">
                        No More Waiting Around! ❤️
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}


          {/* =========================================================================
              STEP 7: Get Notified When Table is Ready
             ========================================================================= */}
          {(filter === "all" || filter === "pandal") && (
            <ScrollReveal direction="up" delay={150}>
              <div className="flex flex-col bg-white/[0.04] hover:bg-white/[0.08] rounded-[28px] p-4 sm:p-5 border border-white/10 hover:border-indigo-400/50 backdrop-blur-md shadow-2xl transition-all duration-300 group hover:-translate-y-1.5">
                {/* Step Header */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#8B5CF6] text-white flex items-center justify-center font-black text-sm shadow-md shadow-purple-500/30 flex-shrink-0 group-hover:scale-110 transition-transform">
                    7
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      Get Notified When Ready
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Just head back!
                    </p>
                  </div>
                </div>

                {/* Smartphone Frame */}
                <div className="mt-4 relative rounded-[26px] border-[3px] border-slate-700 bg-slate-950 p-1.5 shadow-2xl overflow-hidden group-hover:border-slate-500 transition-colors">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20" />

                  {/* iOS Lockscreen Canvas */}
                  <div className="bg-gradient-to-b from-[#1E1B4B] to-[#0F0E2A] rounded-[20px] p-3 pt-5 text-white flex flex-col justify-between min-h-[300px] border border-indigo-500/30 phone-glass-reflection">
                    {/* Lockscreen clock */}
                    <div className="text-center pt-2">
                      <p className="text-3xl font-bold tracking-tight text-slate-100">9:41</p>
                      <p className="text-[10px] text-indigo-300 font-medium">Mon, 1 Oct</p>
                    </div>

                    {/* Frosted iOS Push Notification Card */}
                    <div className="bg-white/95 backdrop-blur-md text-stone-900 p-2.5 rounded-2xl shadow-2xl border border-white/40 my-auto">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded bg-[#7C3AED] text-white flex items-center justify-center font-black text-[8px]">
                            A
                          </div>
                          <span className="text-[10px] font-black text-[#7C3AED] tracking-wider">ASSO</span>
                        </div>
                        <span className="text-[8px] text-stone-400 font-mono">now</span>
                      </div>
                      <p className="text-[11px] font-black leading-tight text-stone-900">
                        Your table is almost ready! 🔔
                      </p>
                      <p className="text-[9px] text-stone-600 mt-0.5 leading-snug">
                        Come to <strong>Calcutta Grand Dining</strong> in 10 mins. Your food is ready! See you soon! ❤️
                      </p>
                    </div>

                    {/* Lockscreen bottom bar */}
                    <div className="w-20 h-1 bg-white/30 rounded-full mx-auto" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}


          {/* =========================================================================
              STEP 8: Arrive, Dine & Enjoy
             ========================================================================= */}
          {(filter === "all" || filter === "pandal") && (
            <ScrollReveal direction="up" delay={200}>
              <div className="flex flex-col bg-white/[0.04] hover:bg-white/[0.08] rounded-[28px] p-4 sm:p-5 border border-white/10 hover:border-emerald-400/50 backdrop-blur-md shadow-2xl transition-all duration-300 group hover:-translate-y-1.5">
                {/* Step Header */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#059669] to-[#10B981] text-white flex items-center justify-center font-black text-sm shadow-md shadow-emerald-500/30 flex-shrink-0 group-hover:scale-110 transition-transform">
                    8
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      Arrive, Dine &amp; Enjoy
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Your food is ready after you arrive. No more waiting!
                    </p>
                  </div>
                </div>

                {/* Smartphone Frame */}
                <div className="mt-4 relative rounded-[26px] border-[3px] border-slate-700 bg-slate-950 p-1.5 shadow-2xl overflow-hidden group-hover:border-slate-500 transition-colors">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20" />

                  {/* Screen Canvas with Feast Photo */}
                  <div className="relative rounded-[20px] overflow-hidden min-h-[300px] flex flex-col justify-between p-3 pt-5 text-white border border-white/10 phone-glass-reflection">
                    <Image
                      src="/images/bengali-food.jpg"
                      alt="Bengali Feast Spread"
                      fill
                      sizes="300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />

                    {/* Top Status */}
                    <div className="relative z-10 flex items-center justify-between text-[9px] font-bold text-amber-200 pb-2 px-1">
                      <span>Calcutta Grand Dining</span>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-2.5 h-2.5" />
                        <Battery className="w-3 h-3" />
                      </div>
                    </div>

                    {/* Center Script Quote */}
                    <div className="relative z-10 text-center py-4">
                      <p className="font-script text-2xl font-bold text-amber-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-tight">
                        Good Food<br />
                        Happier People ❤️
                      </p>
                    </div>

                    {/* Bottom Tag */}
                    <div className="relative z-10 bg-black/60 backdrop-blur-md p-1.5 rounded-xl border border-white/20 text-center">
                      <span className="text-[10px] font-bold text-emerald-300">
                        ✨ Table Seated &amp; Served Instantly
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

        </div>

      </div>
    </section>
  );
}
