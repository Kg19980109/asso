"use client";

import * as React from "react";
import Image from "next/image";
import { FestiveParticles } from "@/components/ui/festive-particles";

interface HeroSectionProps {
  onOpenConnect?: () => void;
  onOpenQueue?: () => void;
}

const steps = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 14h.01M14 17h.01M17 14h.01M20 14h.01M20 17h.01M17 20h.01M20 20h.01" strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
    label: "Scan &",
    label2: "Join Queue",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 10h8M8 14h4" strokeLinecap="round" />
        <path d="M15 6l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Pre-Order",
    label2: "Your Food",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
        <path d="M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" strokeLinecap="round" />
      </svg>
    ),
    label: "Explore",
    label2: "Nearby Pandals",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    label: "Get Notified",
    label2: "When Your Table Is Ready",
  },
];

export function HeroSection({ onOpenConnect, onOpenQueue }: HeroSectionProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="for-diners"
      className="relative min-h-screen pt-16 sm:pt-20 bg-[#060B18] text-white overflow-hidden"
    >
      {/* Bokeh particles */}
      <FestiveParticles />

      {/* ── MOBILE layout: full-bleed background photo, content stacked ── */}
      <div className="lg:hidden relative min-h-screen flex flex-col">
        {/* Full-bleed background: pandal photo fading to dark */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-puja.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Strong gradient overlays to blend into dark theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060B18]/60 via-[#060B18]/20 to-[#060B18]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060B18]/80 via-transparent to-[#060B18]/30" />
        </div>

        {/* Floating handwritten sticker — top right */}
        <div
          className="absolute top-[10%] right-4 z-20 text-right pointer-events-none select-none"
          style={{ fontFamily: "cursive" }}
        >
          <p className="text-white text-[15px] font-bold leading-tight drop-shadow-lg">
            Same
          </p>
          <p className="text-white text-[15px] font-bold leading-tight drop-shadow-lg italic">
            Waiting Time.
          </p>
          <p className="text-[#ff6fe8] text-[17px] font-bold leading-tight drop-shadow-lg italic">
            More Puja.
          </p>
          {/* Underline flourish */}
          <svg className="ml-auto mt-0.5" width="80" height="8" viewBox="0 0 80 8">
            <path d="M2 6 Q40 0 78 4" stroke="#ff6fe8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* Content block */}
        <div className="relative z-10 flex flex-col flex-1 px-5 pt-12 pb-8">
          {/* Eyebrow */}
          <p className="text-xs font-semibold tracking-[0.18em] text-cyan-400 uppercase mb-3">
            Kolkata&apos;s Smart Dining Companion
          </p>

          {/* Headline */}
          <h1 className="font-extrabold leading-[1.08] mb-3">
            <span className="block text-[2.6rem] text-white drop-shadow-lg">Dine Without</span>
            <span className="block text-[2.6rem] text-white drop-shadow-lg">The Wait.</span>
            <span className="block text-[2.8rem] bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              Explore More.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-sm text-white/80 leading-relaxed mb-6 max-w-[280px]">
            Join restaurant queues from your phone, pre-order your food, and explore nearby
            pandals while we notify you when your table is ready.
          </p>

          {/* 4-step icons */}
          <div className="flex gap-4 mb-7">
            {steps.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm flex items-center justify-center text-cyan-300">
                  {s.icon}
                </div>
                <span className="text-[9px] text-white/70 text-center leading-tight">
                  {s.label}
                  <br />
                  {s.label2}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <button
            onClick={onOpenQueue}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-purple-800/40 hover:brightness-110 active:scale-95 transition-all mb-3"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
            Join Live Queue Demo →
          </button>
          <button
            onClick={() => scrollTo("pandals")}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full border border-white/25 bg-white/8 backdrop-blur-sm text-white font-semibold text-sm hover:bg-white/15 active:scale-95 transition-all mb-5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>
            Find Restaurants Near You
          </button>

          {/* Trust marks */}
          <div className="flex gap-4 flex-wrap">
            {["No App Download", "100% Free for Diners", "Quick & Easy"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-[10px] text-white/60">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-green-400 flex-shrink-0">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom section: Marquee neon sign + phone mockup */}
        <div className="relative z-10 mt-auto">
          {/* Neon marquee sign */}
          <div className="relative mx-5 mb-4 rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <Image src="/images/hero-puja.jpg" alt="" fill sizes="90vw" className="object-cover object-bottom opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
            </div>
            <div className="relative z-10 p-4 flex items-center justify-between">
              <div
                className="text-amber-400 font-black text-xl leading-none tracking-widest uppercase"
                style={{ textShadow: "0 0 20px rgba(251,191,36,0.8), 0 0 40px rgba(251,191,36,0.4)" }}
              >
                SKIP<br />DINE<br />EXPLORE<br />REPEAT
              </div>
              <div
                className="text-right"
                style={{ fontFamily: "cursive" }}
              >
                <p className="text-white text-base font-bold leading-snug italic drop-shadow">
                  Pandal Hopping
                </p>
                <p className="text-cyan-300 text-base font-bold leading-snug italic drop-shadow">
                  Tastes Better
                </p>
                <p className="text-white text-base font-bold leading-snug italic drop-shadow">
                  With ASSO
                </p>
              </div>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative mx-auto w-[65vw] max-w-[260px] drop-shadow-2xl pb-8">
            <Image
              src="/images/hero-exact-showcase.png"
              alt="ASSO App — Live Queue Screen"
              width={260}
              height={560}
              priority
              className="w-full h-auto rounded-[28px] ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>

      {/* ── DESKTOP layout: two-column, full-width ── */}
      <div className="hidden lg:flex relative min-h-screen items-center">

        {/* Right side: photo + gradient bleeds to dark bg */}
        <div className="absolute inset-0 z-0">
          {/* Pandal / couple photo fills the right ~60% */}
          <div className="absolute inset-y-0 right-0 w-[62%]">
            <Image
              src="/images/hero-puja.jpg"
              alt=""
              fill
              priority
              className="object-cover object-top"
              sizes="62vw"
            />
            {/* Fade left edge into dark bg */}
            <div className="absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-[#060B18] to-transparent" />
            {/* Fade top */}
            <div className="absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-[#060B18] to-transparent" />
            {/* Fade bottom */}
            <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#060B18] to-transparent" />
            {/* Darken right edge slightly */}
            <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-[#060B18]/60 to-transparent" />
          </div>
          {/* Left side base color */}
          <div className="absolute inset-y-0 left-0 w-[45%] bg-[#060B18]" />
          {/* Ambient purple glow behind left content */}
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[radial-gradient(closest-side,rgba(139,92,246,0.18),transparent)] pointer-events-none" />
          <div className="absolute bottom-1/4 left-[10%] w-[400px] h-[400px] bg-[radial-gradient(closest-side,rgba(56,189,248,0.12),transparent)] pointer-events-none" />
        </div>

        {/* Left column — text content */}
        <div className="relative z-10 flex flex-col justify-center w-[46%] xl:w-[44%] px-10 xl:px-16 2xl:px-24 py-24">
          {/* Eyebrow */}
          <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase mb-4">
            Kolkata&apos;s Smart Dining Companion
          </p>

          {/* Headline */}
          <h1 className="font-extrabold leading-[1.07] mb-5">
            <span className="block text-5xl xl:text-6xl text-white">Dine Without</span>
            <span className="block text-5xl xl:text-6xl text-white">The Wait.</span>
            <span className="block text-5xl xl:text-6xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Explore More.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base text-white/75 leading-relaxed mb-8 max-w-[380px]">
            Join restaurant queues from your phone, pre-order your food, and explore
            nearby pandals while we notify you when your table is ready.
          </p>

          {/* 4-step icons */}
          <div className="flex gap-6 mb-9">
            {steps.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <div className="w-11 h-11 rounded-full border border-white/20 bg-white/8 backdrop-blur-sm flex items-center justify-center text-cyan-300">
                  {s.icon}
                </div>
                <span className="text-[10px] text-white/65 text-center leading-tight">
                  {s.label}
                  <br />
                  {s.label2}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-7 max-w-[420px]">
            <button
              onClick={onOpenQueue}
              className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-purple-800/40 hover:brightness-110 active:scale-95 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
              Join Live Queue Demo →
            </button>
            <button
              onClick={() => scrollTo("pandals")}
              className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full border border-white/25 bg-white/6 backdrop-blur-sm text-white font-semibold text-sm hover:bg-white/15 active:scale-95 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
              Find Restaurants Near You
            </button>
          </div>

          {/* Trust marks */}
          <div className="flex gap-5 flex-wrap">
            {["No App Download", "100% Free for Diners", "Quick & Easy"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-white/55">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-green-400 flex-shrink-0">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right column — phone mockup floats over the photo */}
        <div className="relative z-10 flex-1 flex items-end justify-center pb-8 pt-24 pr-8 xl:pr-16">
          {/* Floating "Same Waiting Time. More Puja." sticker — top right of the photo */}
          <div
            className="absolute top-[18%] right-[5%] xl:right-[8%] text-right pointer-events-none select-none z-20"
            style={{ fontFamily: "cursive" }}
          >
            <p className="text-white text-[22px] font-black leading-tight drop-shadow-xl">Same</p>
            <p className="text-white text-[22px] font-black leading-tight italic drop-shadow-xl">Waiting Time.</p>
            <p className="text-[#ff6fe8] text-[24px] font-black leading-tight italic drop-shadow-xl">More Puja.</p>
            <svg className="ml-auto mt-1" width="110" height="10" viewBox="0 0 110 10">
              <path d="M2 8 Q55 1 108 5" stroke="#ff6fe8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {/* Phone mockup */}
          <div className="relative w-[200px] xl:w-[240px] 2xl:w-[270px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.7)]">
            <Image
              src="/images/hero-exact-showcase.png"
              alt="ASSO App — Live Queue Screen"
              width={270}
              height={580}
              priority
              className="w-full h-auto rounded-[32px] ring-1 ring-white/10"
            />
          </div>

          {/* Neon marquee sign — bottom left of the right column */}
          <div
            className="absolute bottom-[8%] left-[2%] rounded-2xl overflow-hidden min-w-[180px] xl:min-w-[220px]"
          >
            <div className="relative">
              <div className="absolute inset-0">
                <Image src="/images/hero-puja.jpg" alt="" fill sizes="260px" className="object-cover object-bottom opacity-80" />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <div className="relative z-10 px-5 py-4 flex items-center gap-6">
                <div
                  className="text-amber-400 font-black text-lg leading-tight tracking-widest uppercase"
                  style={{ textShadow: "0 0 16px rgba(251,191,36,0.9), 0 0 32px rgba(251,191,36,0.5)" }}
                >
                  SKIP<br />DINE<br />EXPLORE<br />REPEAT
                </div>
                <div style={{ fontFamily: "cursive" }}>
                  <p className="text-white text-sm font-bold italic leading-snug">Pandal Hopping</p>
                  <p className="text-cyan-300 text-sm font-bold italic leading-snug">Tastes Better</p>
                  <p className="text-white text-sm font-bold italic leading-snug">With ASSO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo("how-it-works")}
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
      >
        <svg viewBox="0 0 24 42" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-8">
          <rect x="2" y="2" width="20" height="38" rx="10" />
          <circle cx="12" cy="12" r="2" fill="currentColor" className="animate-bounce" />
        </svg>
        <span className="text-[10px] tracking-widest uppercase">Scroll to Explore</span>
      </button>
    </section>
  );
}
