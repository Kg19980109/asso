"use client";

import * as React from "react";
import Image from "next/image";
import {
  QrCode,
  Utensils,
  Compass,
  Bell,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { FestiveParticles } from "@/components/ui/festive-particles";

interface HeroSectionProps {
  onOpenConnect?: () => void;
  onOpenQueue?: () => void;
}

const FEATURE_BADGES = [
  {
    id: "qr",
    icon: <QrCode className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Scan & Join Queue",
    color: "pink",
    borderClass: "border-pink-500/40 hover:border-pink-400",
    bgClass: "bg-pink-500/10 hover:bg-pink-500/20",
    textClass: "text-pink-300",
    glowClass: "shadow-[0_0_20px_rgba(236,72,153,0.3)]",
  },
  {
    id: "preorder",
    icon: <Utensils className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Pre-Order Your Food",
    color: "rose",
    borderClass: "border-rose-500/40 hover:border-rose-400",
    bgClass: "bg-rose-500/10 hover:bg-rose-500/20",
    textClass: "text-rose-300",
    glowClass: "shadow-[0_0_20px_rgba(244,63,94,0.3)]",
  },
  {
    id: "explore",
    icon: <Compass className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Explore Nearby Pandals",
    color: "cyan",
    borderClass: "border-cyan-500/40 hover:border-cyan-400",
    bgClass: "bg-cyan-500/10 hover:bg-cyan-500/20",
    textClass: "text-cyan-300",
    glowClass: "shadow-[0_0_20px_rgba(6,182,212,0.3)]",
  },
  {
    id: "notify",
    icon: <Bell className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Get Notified When Table is Ready",
    color: "purple",
    borderClass: "border-purple-500/40 hover:border-purple-400",
    bgClass: "bg-purple-500/10 hover:bg-purple-500/20",
    textClass: "text-purple-300",
    glowClass: "shadow-[0_0_20px_rgba(168,85,247,0.3)]",
  },
];

export function HeroSection({ onOpenConnect, onOpenQueue }: HeroSectionProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (onOpenConnect) {
      onOpenConnect();
    }
  };

  return (
    <section
      id="for-diners"
      className="relative bg-[#060B18] text-white overflow-hidden selection:bg-purple-500 selection:text-white"
    >
      {/* Floating festive particles */}
      <FestiveParticles />

      {/* Top ambient glow blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/[0.12] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] rounded-full bg-amber-500/[0.08] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.08] blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-16 sm:pb-24">
        
        {/* Top Floating Script Sticker (Exact poster reproduction: "Same Waiting Time. More Puja.") */}
        <div className="flex justify-end mb-3 sm:mb-6 pr-2 sm:pr-8">
          <div className="relative text-right inline-block transform hover:scale-105 transition-transform duration-300 select-none">
            <p className="font-script text-2xl sm:text-3xl text-stone-100 font-bold leading-tight -rotate-2">
              Same Waiting Time.
            </p>
            <p className="font-script text-2xl sm:text-3xl text-[#F43F5E] font-bold leading-tight -rotate-2 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]">
              More Puja.
            </p>
            <svg
              className="ml-auto -mt-1 w-24 sm:w-28 text-[#F43F5E]"
              viewBox="0 0 120 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M3 9C35 2 85 2 117 7" />
            </svg>
          </div>
        </div>

        {/* 2-Column Responsive Layout (PC Side-by-Side, Mobile Clean Stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* ════════════════════════════════════════════════════
              LEFT COLUMN: High-impact Content & Actions
              ════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 w-fit mb-5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-cyan-300">
                Kolkata&apos;s Smart Dining Companion
              </span>
            </div>

            {/* Poster Headline */}
            <h1 className="text-[2.6rem] sm:text-[3.5rem] md:text-[4.2rem] xl:text-[4.6rem] font-extrabold tracking-tight leading-[1.05] mb-5 sm:mb-6">
              <span className="block text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                Dine Without
              </span>
              <span className="block text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                The Wait.
              </span>
              <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.5)]">
                Explore More.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-300/90 max-w-[540px] leading-relaxed mb-8 font-normal">
              Join restaurant queues from your phone, pre-order your food, and explore
              nearby pandals while we notify you when your table is ready.
            </p>

            {/* 4 Feature Circular Badges (Direct from poster) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-9 max-w-[620px]">
              {FEATURE_BADGES.map((b) => (
                <div
                  key={b.id}
                  className="flex flex-col items-center text-center p-2.5 rounded-xl transition-all duration-200 hover:-translate-y-1"
                >
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 ${b.borderClass} ${b.bgClass} ${b.textClass} ${b.glowClass} flex items-center justify-center mb-2.5 transition-all duration-300 backdrop-blur-md`}
                  >
                    {b.icon}
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-stone-200 leading-snug">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 max-w-[540px] mb-6">
              {/* Primary Gradient Pill Button */}
              <button
                type="button"
                onClick={onOpenQueue}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#D946EF] via-[#8B5CF6] to-[#3B82F6] shadow-[0_0_35px_rgba(217,70,239,0.45)] hover:shadow-[0_0_50px_rgba(217,70,239,0.7)] hover:brightness-110 active:scale-[0.98] transition-all duration-200"
              >
                <div className="p-1.5 rounded-full bg-white/20">
                  <QrCode className="w-4 h-4 text-white" />
                </div>
                <span>Join Live Queue Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Glass Pill Button */}
              <button
                type="button"
                onClick={() => scrollTo("pandals")}
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-semibold text-sm sm:text-base text-stone-100 bg-[#0A1024]/80 hover:bg-[#121B38] border border-white/15 hover:border-cyan-400/40 shadow-lg shadow-black/40 backdrop-blur-xl active:scale-[0.98] transition-all duration-200"
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Find Restaurants Near You</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-stone-300/80 mb-10">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                No App Download
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                100% Free for Diners
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Quick &amp; Easy
              </span>
            </div>

            {/* Bottom Lightbox Sign + Calligraphy (from poster) */}
            <div className="flex items-center gap-6 sm:gap-8 pt-4 border-t border-white/10 max-w-[540px]">
              {/* Retro Lightbox Marquee Sign */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-black/75 border border-amber-400/50 shadow-[0_0_20px_rgba(251,191,36,0.25)] flex flex-col items-center justify-center min-w-[96px]">
                <div
                  className="font-black text-xs sm:text-sm tracking-[0.18em] text-amber-400 text-center leading-tight uppercase"
                  style={{
                    textShadow:
                      "0 0 5px rgba(251,191,36,0.9), 0 0 15px rgba(251,191,36,0.5)",
                  }}
                >
                  SKIP
                  <br />
                  DINE
                  <br />
                  EXPLORE
                  <br />
                  REPEAT
                </div>
                <div
                  className="text-amber-400 text-base mt-1"
                  style={{ textShadow: "0 0 8px rgba(251,191,36,1)" }}
                >
                  ♥
                </div>
              </div>

              {/* Handwritten Script */}
              <div className="select-none">
                <p className="font-script text-2xl sm:text-3xl text-white font-bold leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  Pandal Hopping
                </p>
                <p className="font-script text-2xl sm:text-3xl text-stone-100 font-bold leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  Tastes Better
                </p>
                <p className="font-script text-2xl sm:text-3xl text-cyan-300 font-bold leading-tight drop-shadow-[0_0_20px_rgba(103,232,249,0.6)]">
                  With ASSO
                </p>
                <svg
                  className="mt-1 w-32 text-[#F43F5E]"
                  viewBox="0 0 140 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M2 9C45 1 95 3 138 7" />
                </svg>
              </div>
            </div>

          </div>

          {/* ════════════════════════════════════════════════════
              RIGHT COLUMN: Living Festival Couple & Interactive
              Phone Queue Interface (Pixel-perfect to poster)
              ════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 xl:col-span-5 relative">
            
            {/* Visual Backplate: Bengali couple in front of glowing golden pandal */}
            <div className="relative w-full max-w-[460px] mx-auto rounded-3xl overflow-hidden p-2 sm:p-3 bg-gradient-to-b from-white/10 via-white/5 to-white/0 border border-white/15 shadow-2xl shadow-black/80">
              
              {/* Couple & Golden Pandal Background Photo */}
              <div className="relative h-[320px] sm:h-[380px] w-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/hero-couple-pandal.jpg"
                  alt="Happy Bengali couple pandal hopping during Durga Puja in Kolkata"
                  fill
                  priority
                  className="object-cover object-center scale-105 transition-transform duration-700 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 460px"
                />
                {/* Subtle dark vignette gradient overlays so the image blends with dark theme */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-transparent to-black/30" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060B18] to-transparent" />
                
                {/* Top-right subtle badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 text-[10px] font-semibold text-amber-300">
                  ✨ Kolkata Puja Vibes
                </div>
              </div>

              {/* ────────────────────────────────────────────────
                  INTERACTIVE SMARTPHONE INTERFACE (Overlaid cleanly)
                  ──────────────────────────────────────────────── */}
              <div className="relative -mt-24 sm:-mt-28 px-2 sm:px-4 z-20">
                
                {/* Floating iOS Notification Banner */}
                <div className="mb-3 rounded-2xl bg-white/95 text-stone-900 p-3 sm:p-3.5 shadow-2xl shadow-black/90 border border-white/60 backdrop-blur-xl animate-bounce-short">
                  <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium mb-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-md bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center font-bold text-[9px]">
                        A
                      </div>
                      <span className="font-bold text-stone-800 tracking-wide">ASSO</span>
                    </div>
                    <span>now</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                    Good news! 🎉
                  </div>
                  <div className="text-[11px] sm:text-xs text-stone-600 leading-snug mt-0.5">
                    Your table is almost ready. Please come in 10 minutes.
                  </div>
                </div>

                {/* Smartphone Screen Card */}
                <div className="rounded-3xl bg-[#0B1124]/95 border-2 border-slate-700/60 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-4 sm:p-5 backdrop-blur-2xl">
                  
                  {/* Phone Speaker Notch & Status Bar */}
                  <div className="flex items-center justify-between text-[10px] text-stone-400 mb-3 px-1">
                    <span className="font-semibold text-white">8:42 PM</span>
                    <div className="w-16 h-1 rounded-full bg-stone-700" />
                    <span>5G • 94%</span>
                  </div>

                  {/* Restaurant Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-sm">
                        🍲
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">
                          Oh! Calcutta
                        </h4>
                        <p className="text-[10px] text-stone-400">
                          Silver Spring, EM Bypass
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-bold text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>

                  {/* Queue Number Ticket */}
                  <div className="text-center py-2 sm:py-3 mb-4 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10">
                    <p className="text-[10px] uppercase font-semibold tracking-wider text-stone-400">
                      Your Queue Number
                    </p>
                    <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-sky-300 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)] my-0.5">
                      #27
                    </div>
                    <p className="text-[11px] text-stone-300 font-medium">
                      4 Guests &nbsp;•&nbsp; Est. Wait: <span className="text-cyan-300 font-bold">18 mins</span>
                    </p>
                  </div>

                  {/* Queue Journey Stepper */}
                  <div className="mb-4 px-1">
                    <div className="flex items-center justify-between relative">
                      {/* Connecting Line */}
                      <div className="absolute top-2.5 left-3 right-3 h-0.5 bg-stone-700 z-0">
                        <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 w-2/3" />
                      </div>

                      {/* Step 1: Joined */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md shadow-emerald-900/50">
                          ✓
                        </div>
                        <span className="text-[9px] text-emerald-400 font-medium mt-1">
                          Joined
                        </span>
                      </div>

                      {/* Step 2: In Queue */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center text-[10px] font-bold shadow-md shadow-cyan-900/50">
                          ✓
                        </div>
                        <span className="text-[9px] text-cyan-300 font-bold mt-1">
                          In Queue
                        </span>
                      </div>

                      {/* Step 3: Preparing */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center text-[10px] font-bold animate-pulse">
                          ●
                        </div>
                        <span className="text-[9px] text-amber-300 font-medium mt-1">
                          Preparing
                        </span>
                      </div>

                      {/* Step 4: Your Table */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-stone-800 border-2 border-stone-600 flex items-center justify-center" />
                        <span className="text-[9px] text-stone-500 mt-1">
                          Your Table
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* View Live Status Button */}
                  <button
                    type="button"
                    onClick={onOpenQueue}
                    className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/40 active:scale-[0.98] transition-all mb-3"
                  >
                    View Live Status
                  </button>

                  {/* Pre-Order Preview Card */}
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg relative overflow-hidden flex-shrink-0">
                        <Image
                          src="/images/biryani-plate.jpg"
                          alt="Chicken Biryani"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] text-stone-400 uppercase tracking-wide block">
                          Your Pre-Order
                        </span>
                        <span className="text-xs font-semibold text-white leading-tight block">
                          Chicken Biryani × 2
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md">
                      Preparing ⏳
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Bottom subtle divider line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
