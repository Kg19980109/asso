"use client";

import * as React from "react";
import Image from "next/image";
import {
  QrCode,
  UtensilsCrossed,
  Footprints,
  Bell,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Landmark,
  Check,
} from "lucide-react";
import { FestiveParticles } from "@/components/ui/festive-particles";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

interface HeroSectionProps {
  onOpenConnect?: () => void;
  onOpenQueue?: () => void;
}

const POPULAR_PANDALS = [
  {
    name: "Santosh Mitra Square",
    distance: "500 m away",
    image: "/images/hero-crops/pandal-santosh-mitra.png",
  },
  {
    name: "College Square",
    distance: "1.2 km away",
    image: "/images/hero-crops/pandal-college-sq.png",
  },
  {
    name: "Hatibagan",
    distance: "1.5 km away",
    image: "/images/hero-crops/pandal-hatibagan.png",
  },
  {
    name: "Sreebhumi",
    distance: "2.1 km away",
    image: "/images/hero-crops/pandal-sreebhumi.png",
  },
];

export function HeroSection({ onOpenConnect, onOpenQueue }: HeroSectionProps) {
  return (
    <section
      id="for-diners"
      className="relative min-h-screen pt-28 lg:pt-32 pb-16 bg-[#060B18] text-white overflow-hidden"
    >
      {/* Golden Festive Bokeh Particles */}
      <FestiveParticles />

      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(closest-side,rgba(168,85,247,0.18),transparent)] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[radial-gradient(closest-side,rgba(245,158,11,0.16),transparent)] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-[radial-gradient(closest-side,rgba(56,189,248,0.12),transparent)] pointer-events-none" />

      {/* Top Right Couple & Illuminated Pandal Background Visual */}
      <div className="absolute top-0 right-0 w-full lg:w-3/5 h-[650px] sm:h-[750px] lg:h-[820px] pointer-events-none opacity-40 lg:opacity-90 select-none overflow-hidden z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/hero-puja.jpg"
            alt="Durga Puja Kolkata Couple Exploring with ASSO"
            fill
            priority
            className="object-cover object-center lg:object-right"
          />
          {/* Subtle multi-layer gradient vignette to blend seamlessly into dark navy theme */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060B18] via-[#060B18]/85 to-transparent lg:via-[#060B18]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-transparent to-[#060B18]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060B18]/90 via-transparent to-[#060B18]" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">

        {/* ── Top Hero Grid: Left Content + Right Floating Mockup ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">

          {/* ── Left Column: Headline, Flow Circles, CTAs, Trust Points ── */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-7 max-w-2xl">

            {/* Eyebrow Label */}
            <ScrollReveal direction="down" delay={50}>
              <p className="text-xs sm:text-[13px] font-black tracking-widest text-cyan-400 uppercase drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]">
                KOLKATA&apos;S SMART DINING COMPANION
              </p>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal direction="up" delay={100}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.04]">
                <span className="block">Dine Without</span>
                <span className="block">The Wait.</span>
                <span className="block bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(192,132,252,0.35)]">
                  Explore More.
                </span>
              </h1>
            </ScrollReveal>

            {/* Subtitle */}
            <ScrollReveal direction="up" delay={150}>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl">
                Join restaurant queues from your phone, pre-order your food, and explore nearby pandals while we notify you when your table is ready.
              </p>
            </ScrollReveal>

            {/* 4 Circular Steps / Feature Flow */}
            <ScrollReveal direction="up" delay={200}>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-lg pt-1">
                {/* 1. Scan & Join Queue */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-pink-500/50 bg-pink-500/15 text-pink-400 flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
                    <QrCode className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-200 mt-2 leading-tight">
                    Scan &amp;<br />Join Queue
                  </span>
                </div>

                {/* 2. Pre-Order Your Food */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-rose-500/50 bg-rose-500/15 text-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform">
                    <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-200 mt-2 leading-tight">
                    Pre-Order<br />Your Food
                  </span>
                </div>

                {/* 3. Explore Nearby Pandals */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-cyan-500/50 bg-cyan-500/15 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                    <Footprints className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-200 mt-2 leading-tight">
                    Explore<br />Nearby Pandals
                  </span>
                </div>

                {/* 4. Get Notified When Your Table is Ready */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-indigo-500/50 bg-indigo-500/15 text-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                    <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-200 mt-2 leading-tight">
                    Get Notified<br />When Your Table<br />is Ready
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal direction="up" delay={250}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onOpenQueue}
                  className="relative group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#D946EF] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-600/35 transition-all hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />
                  <QrCode className="w-5 h-5" />
                  <span>Join Live Queue Demo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById("pandals");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else if (onOpenConnect) onOpenConnect();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0B1426]/90 hover:bg-[#111F38] border border-cyan-500/40 hover:border-cyan-400 text-white font-semibold text-sm sm:text-base shadow-lg shadow-cyan-500/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Find Restaurants Near You</span>
                </button>
              </div>
            </ScrollReveal>

            {/* 3 Trust Checkmarks */}
            <ScrollReveal direction="up" delay={300}>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs sm:text-sm font-medium text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>No App Download</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>100% Free for Diners</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Quick &amp; Easy</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Illuminated Marquee Sign + Handwritten Callout */}
            <div className="pt-6 hidden sm:flex items-center gap-6">
              {/* Retro Lightbox Sign */}
              <div className="relative rounded-2xl bg-[#0F0C08] border-2 border-amber-800/80 p-3.5 shadow-[0_0_25px_rgba(245,158,11,0.25)] text-center w-36 select-none flex-shrink-0">
                <div className="space-y-0.5 font-black tracking-widest text-amber-100 text-xs drop-shadow-[0_0_6px_rgba(251,191,36,0.9)] font-mono">
                  <p>SKIP</p>
                  <p>DINE</p>
                  <p>EXPLORE</p>
                  <p>REPEAT</p>
                  <p className="text-rose-500 text-sm pt-0.5">❤️</p>
                </div>
              </div>

              {/* Handwritten Brush Note with Pink Underline */}
              <div className="relative">
                <p className="font-script text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] -rotate-3">
                  Pandal Hopping<br />Tastes Better<br />With ASSO
                </p>
                <svg className="w-24 h-4 text-pink-500 mt-0.5 -rotate-3" viewBox="0 0 100 20" fill="none">
                  <path d="M5 12 Q 50 18, 95 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            </div>

          </div>

          {/* ── Right Column: Handwritten Note + Smartphone Mockup ── */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">

            {/* Top Right Handwritten Tag */}
            <div className="hidden lg:block absolute -top-8 right-4 text-right z-20 animate-float-slow">
              <p className="font-script text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] -rotate-6">
                Same Waiting Time.<br />More Puja.
              </p>
              <svg className="w-28 h-4 text-pink-500 ml-auto mt-0.5 -rotate-6" viewBox="0 0 100 20" fill="none">
                <path d="M5 8 Q 50 18, 95 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>

            {/* ── Realistic Smartphone Frame ── */}
            <div className="relative mx-auto max-w-[340px] sm:max-w-[370px] rounded-[42px] border-[4px] border-slate-700/80 bg-slate-950 p-2 shadow-2xl shadow-purple-950/50 backdrop-blur-xl group hover:border-slate-500/80 transition-colors">
              {/* Phone Speaker Notch */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-30" />

              {/* Inside Phone Screen */}
              <div className="relative rounded-[34px] overflow-hidden bg-[#0A0F1D] border border-white/10 p-4 pt-7 space-y-4 text-white">

                {/* Floating Push Notification Banner */}
                <div className="relative rounded-2xl bg-white/95 text-slate-900 shadow-xl border border-white/50 p-3 backdrop-blur-md transition-all hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-[9px] font-black text-white">
                        A
                      </div>
                      <span className="text-xs font-black tracking-tight">ASSO</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">now</span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-900 leading-snug">
                    Good news!
                  </p>
                  <p className="text-[10px] text-slate-600 leading-tight">
                    Your table is almost ready. Please come in 10 minutes.
                  </p>
                </div>

                {/* In-App Restaurant Header */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-xs">
                      🏛️
                    </div>
                    <div>
                      <p className="text-xs font-black text-white leading-tight">
                        Calcutta Grand Dining
                      </p>
                      <p className="text-[9px] text-slate-400">Authentic Bengali Feast</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>

                {/* Queue Spot Box */}
                <div className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-4 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Your Queue Number
                  </p>
                  <div className="text-5xl font-black text-white tracking-tighter my-1 drop-shadow-md">
                    #27
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium">
                    <span className="text-cyan-400 font-bold">4 Guests</span> • Est. Wait: <span className="text-amber-300 font-bold">1 hr</span>
                  </p>

                  {/* Stepper Timeline */}
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <div className="relative flex items-center justify-between">
                      <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-700 -translate-y-1/2 z-0" />
                      <div className="absolute top-1/2 left-4 w-1/3 h-0.5 bg-emerald-500 -translate-y-1/2 z-0" />

                      {/* Step 1: Joined */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-[8px] font-bold text-emerald-400 mt-1">Joined</span>
                      </div>

                      {/* Step 2: In Queue */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-[8px] font-bold text-emerald-400 mt-1">In Queue</span>
                      </div>

                      {/* Step 3: Preparing */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center" />
                        <span className="text-[8px] font-medium text-slate-400 mt-1">Preparing</span>
                      </div>

                      {/* Step 4: Your Table */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center" />
                        <span className="text-[8px] font-medium text-slate-400 mt-1">Your Table</span>
                      </div>
                    </div>
                  </div>

                  {/* View Live Status Button */}
                  <button
                    onClick={onOpenQueue}
                    className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                  >
                    View Live Status
                  </button>
                </div>

                {/* Pre-Order Status Card */}
                <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-800 border border-white/10 flex-shrink-0">
                      <Image
                        src="/images/biryani-plate.jpg"
                        alt="Pre-Ordered Biryani"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-medium">Your Pre-Order</p>
                      <p className="text-xs font-bold text-white">Chicken Biryani x 2</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 rounded-lg">
                    Preparing
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* ── Popular Near You (Horizontal Pandal Cards) ── */}
        <ScrollReveal direction="up" delay={350}>
          <div className="mt-14 max-w-6xl mx-auto rounded-3xl bg-[#091124]/85 border border-white/10 p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <Landmark className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-black tracking-tight text-white">
                  Popular Near You
                </h3>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById("pandals");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                aria-label="View all popular pandals"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {POPULAR_PANDALS.map((pandal) => (
                <div
                  key={pandal.name}
                  onClick={() => {
                    const el = document.getElementById("pandals");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer shadow-md hover:-translate-y-0.5"
                >
                  <div className="relative h-24 sm:h-28 w-full overflow-hidden bg-slate-950">
                    <Image
                      src={pandal.image}
                      alt={pandal.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
                  </div>
                  <div className="p-2.5">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-white truncate">
                      <MapPin className="w-3 h-3 text-purple-400 flex-shrink-0" />
                      <span className="truncate">{pandal.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 pl-4 mt-0.5">{pandal.distance}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Bottom Motto, Howrah Bridge Panorama & Scroll Indicator ── */}
        <div className="mt-14 text-center space-y-4">
          <p className="font-mono text-[11px] font-bold tracking-widest text-slate-300 uppercase">
            GOOD FOOD. &nbsp;A BRIGHTER KOLKATA. &nbsp;TOGETHER &nbsp;♡
          </p>

          <div className="relative w-full max-w-5xl mx-auto h-36 sm:h-48 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#040814]">
            <Image
              src="/images/hero-crops/howrah-bridge.png"
              alt="Illuminated Howrah Bridge reflecting over the Hooghly River at night"
              fill
              className="object-cover object-center select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-transparent to-[#060B18]/30 opacity-70" />
          </div>

          {/* Scroll to Explore indicator */}
          <div className="pt-2 flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-5 h-8 rounded-full border-2 border-slate-400 flex items-start justify-center p-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400">
              SCROLL TO EXPLORE
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
