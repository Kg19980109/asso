"use client";

import * as React from "react";
import Image from "next/image";
import { FestiveParticles } from "@/components/ui/festive-particles";

interface HeroSectionProps {
  onOpenConnect?: () => void;
  onOpenQueue?: () => void;
}

function PhoneMockup({ onOpenQueue }: { onOpenQueue?: () => void }) {
  return (
    <div className="relative w-[200px] sm:w-[220px] lg:w-[250px] xl:w-[270px] flex-shrink-0">
      {/* Phone shell */}
      <div className="relative rounded-[32px] bg-[#0d0d1a] border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <span className="text-[8px] text-white/60 font-medium">9:41 AM</span>
          <div className="w-12 h-1.5 bg-white/20 rounded-full" />
          <div className="flex gap-1 items-center">
            <div className="w-2 h-1.5 bg-white/60 rounded-[1px]" />
            <div className="w-2 h-1.5 bg-white/60 rounded-[1px]" />
          </div>
        </div>

        {/* App header bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#0a0a1f]">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
              <span className="text-[6px] font-black text-white">AS</span>
            </div>
            <span className="text-[9px] font-bold text-white">ASSO</span>
          </div>
          <span className="text-[7px] text-white/40">now</span>
        </div>

        {/* Notification card */}
        <div className="mx-2 mb-1 p-2.5 rounded-xl bg-[#111128] border border-purple-500/20">
          <p className="text-[7.5px] font-semibold text-green-400 mb-0.5">Good news! 🎉</p>
          <p className="text-[7px] text-white/70 leading-snug">
            Your table is almost ready. Please come in 10 minutes.
          </p>
        </div>

        {/* Divider */}
        <div className="mx-3 border-t border-white/8 my-1" />

        {/* Restaurant row */}
        <div className="px-3 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <span className="text-[7px] font-bold text-white">OC</span>
            </div>
            <span className="text-[9px] font-semibold text-white">Oh! Calcutta</span>
          </div>
          <span className="text-[7px] font-bold text-green-400 bg-green-400/15 border border-green-400/30 px-1.5 py-0.5 rounded-full">
            LIVE
          </span>
        </div>

        {/* Queue number hero */}
        <div className="px-3 pb-1">
          <p className="text-[7px] text-white/40 tracking-wider uppercase font-medium">Your Queue Number</p>
          <p className="text-5xl font-black text-white leading-none tracking-tight">#27</p>
          <p className="text-[7px] text-white/50 mt-0.5">4 Guests &nbsp;•&nbsp; Est. Wait: 1 hr</p>
        </div>

        {/* Progress bar */}
        <div className="px-3 pb-2">
          <div className="relative h-1 bg-white/10 rounded-full mt-2">
            <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-green-400 to-cyan-400 rounded-full" />
            <div className="absolute top-1/2 left-[60%] -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-cyan-400 rounded-full border-2 border-[#0d0d1a] shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
          </div>
          <div className="flex justify-between mt-1.5">
            {["Joined", "In Queue", "Preparing", "Your Table"].map((s) => (
              <span key={s} className="text-[6px] text-white/40 leading-tight text-center">{s}</span>
            ))}
          </div>
        </div>

        {/* View Live Status button */}
        <div className="px-3 pb-2">
          <button
            onClick={onOpenQueue}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white text-[8px] font-bold tracking-wide hover:brightness-110 transition-all"
          >
            View Live Status
          </button>
        </div>

        {/* Pre-order row */}
        <div className="mx-3 mb-3 p-2 rounded-xl bg-[#111128] flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-[9px]">🍛</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[7px] font-semibold text-white/80 truncate">Your Pre-Order</p>
            <p className="text-[6.5px] text-white/40">Chicken Biryani x 2</p>
          </div>
          <span className="text-[6.5px] font-bold text-amber-400 bg-amber-400/15 border border-amber-400/30 px-1.5 py-0.5 rounded-full flex-shrink-0">
            Preparing
          </span>
        </div>
      </div>
    </div>
  );
}

export function HeroSection({ onOpenConnect, onOpenQueue }: HeroSectionProps) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const steps = [
    { icon: "⊞", label: "Scan &", sub: "Join Queue" },
    { icon: "🍴", label: "Pre-Order", sub: "Your Food" },
    { icon: "🚶", label: "Explore", sub: "Nearby Pandals" },
    { icon: "🔔", label: "Get Notified", sub: "When Your Table Is Ready" },
  ];

  return (
    <section
      id="for-diners"
      className="relative bg-[#060B18] text-white overflow-hidden"
    >
      <FestiveParticles />

      {/* ═══════════════════════════════════════════
          HERO TOP — Full-bleed photo background
          ═══════════════════════════════════════════ */}
      <div className="relative min-h-screen pt-16 sm:pt-20">

        {/* ── Full-bleed background: couple + pandal photo ── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-puja.jpg"
            alt=""
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          {/* Heavy left gradient so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060B18] via-[#060B18]/75 to-[#060B18]/10" />
          {/* Top fade from nav */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#060B18] to-transparent" />
          {/* Bottom fade into marquee section */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060B18] to-transparent" />
          {/* Ambient glow behind text */}
          <div className="absolute top-1/4 left-0 w-[480px] h-[480px] bg-[radial-gradient(closest-side,rgba(139,92,246,0.20),transparent)] pointer-events-none" />
        </div>

        {/* ── "Same Waiting Time. More Puja." floating sticker ── */}
        <div
          className="absolute z-20 top-[14%] sm:top-[12%] right-4 sm:right-6 lg:right-[8%] xl:right-[12%] text-right pointer-events-none select-none"
          style={{ fontFamily: "'Dancing Script', cursive, Georgia, serif" }}
        >
          <p className="text-white text-[18px] sm:text-[22px] font-bold leading-snug drop-shadow-xl">Same</p>
          <p className="text-white text-[18px] sm:text-[22px] font-bold italic leading-snug drop-shadow-xl">Waiting Time.</p>
          <p className="text-[#f472b6] text-[20px] sm:text-[24px] font-bold italic leading-snug drop-shadow-xl">More Puja.</p>
          <svg className="ml-auto mt-1" width="100" height="10" viewBox="0 0 100 10">
            <path d="M2 8 Q50 1 98 5" stroke="#f472b6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* ── Content layer ── */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 h-full flex items-center">
          <div className="w-full flex flex-col lg:flex-row lg:items-center gap-8 xl:gap-12 py-12 lg:py-16 xl:py-20">

            {/* LEFT: text content */}
            <div className="flex-1 min-w-0">
              {/* Eyebrow */}
              <p className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase mb-3 sm:mb-4">
                Kolkata&apos;s Smart Dining Companion
              </p>

              {/* H1 */}
              <h1 className="font-extrabold leading-[1.06] mb-4 sm:mb-5">
                <span className="block text-4xl sm:text-5xl xl:text-[3.6rem] text-white drop-shadow-lg">Dine Without</span>
                <span className="block text-4xl sm:text-5xl xl:text-[3.6rem] text-white drop-shadow-lg">The Wait.</span>
                <span className="block text-4xl sm:text-5xl xl:text-[3.6rem] bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                  Explore More.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-6 sm:mb-8 max-w-[340px] lg:max-w-[360px]">
                Join restaurant queues from your phone, pre-order your food, and
                explore nearby pandals while we notify you when your table is ready.
              </p>

              {/* 4-step icons */}
              <div className="flex gap-4 sm:gap-6 mb-7 sm:mb-8">
                {steps.map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-cyan-400/40 bg-white/8 backdrop-blur-sm flex items-center justify-center text-base sm:text-lg">
                      {s.icon}
                    </div>
                    <span className="text-[8px] sm:text-[9px] text-white/60 text-center leading-tight max-w-[50px]">
                      {s.label}
                      <br />
                      {s.sub}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5 max-w-[380px] sm:max-w-[400px]">
                <button
                  onClick={onOpenQueue}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 sm:py-4 px-5 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-purple-900/50 hover:brightness-110 active:scale-95 transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <path d="M14 14h7v7h-7z" />
                  </svg>
                  Join Live Queue Demo →
                </button>
                <button
                  onClick={() => scrollTo("pandals")}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 sm:py-4 px-5 rounded-full border border-white/25 bg-white/6 backdrop-blur-sm text-white font-semibold text-sm hover:bg-white/15 active:scale-95 transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                  </svg>
                  Find Restaurants Near You
                </button>
              </div>

              {/* Trust marks */}
              <div className="flex gap-4 flex-wrap">
                {["No App Download", "100% Free for Diners", "Quick & Easy"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-green-400 flex-shrink-0">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT: Phone mockup */}
            <div className="flex justify-center lg:justify-end lg:pr-4">
              <PhoneMockup onOpenQueue={onOpenQueue} />
            </div>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          HERO BOTTOM — Neon marquee + handwritten
          ═══════════════════════════════════════════ */}
      <div className="relative bg-[#060B18]">
        {/* Background: crowd / pandal street scene */}
        <div className="absolute inset-0 overflow-hidden opacity-60">
          <Image
            src="/images/hero-puja.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060B18]/95 via-[#060B18]/60 to-[#060B18]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060B18]/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
          <div className="flex items-center gap-8 sm:gap-12">
            {/* Neon sign */}
            <div className="flex-shrink-0">
              <div
                className="text-amber-400 font-black text-2xl sm:text-3xl leading-tight tracking-[0.15em] uppercase"
                style={{
                  textShadow:
                    "0 0 10px rgba(251,191,36,0.9), 0 0 25px rgba(251,191,36,0.6), 0 0 50px rgba(251,191,36,0.3)",
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
              {/* heart */}
              <div
                className="text-amber-400 text-xl mt-1"
                style={{ textShadow: "0 0 10px rgba(251,191,36,0.9)" }}
              >
                ♥
              </div>
            </div>

            {/* Handwritten text */}
            <div
              className="flex-1"
              style={{ fontFamily: "'Dancing Script', cursive, Georgia, serif" }}
            >
              <p className="text-white text-2xl sm:text-3xl xl:text-4xl font-bold italic leading-snug drop-shadow-xl">
                Pandal Hopping
              </p>
              <p className="text-white text-2xl sm:text-3xl xl:text-4xl font-bold italic leading-snug drop-shadow-xl">
                Tastes Better
              </p>
              <p className="text-cyan-300 text-2xl sm:text-3xl xl:text-4xl font-bold italic leading-snug drop-shadow-xl">
                With ASSO
              </p>
              {/* Underline flourish */}
              <svg className="mt-1" width="180" height="12" viewBox="0 0 180 12">
                <path d="M2 10 Q90 2 178 7" stroke="#67e8f9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 bg-[#060B18] pb-6 flex flex-col items-center gap-2 text-white/30">
        <svg viewBox="0 0 24 42" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-8 animate-bounce">
          <rect x="2" y="2" width="20" height="38" rx="10" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        </svg>
        <span className="text-[9px] tracking-[0.25em] uppercase">Scroll to Explore</span>
      </div>
    </section>
  );
}
