"use client";

import * as React from "react";
import Image from "next/image";
import { FestiveParticles } from "@/components/ui/festive-particles";

interface HeroSectionProps {
  onOpenConnect?: () => void;
  onOpenQueue?: () => void;
}

const offerings = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    gradient: "from-purple-500 to-violet-600",
    glow: "shadow-purple-500/40",
    glowColor: "rgba(139,92,246,0.5)",
    badge: "No Token Needed",
    title: "Join Queue via QR",
    desc: "Walk up to any partner restaurant, scan the QR, and your spot is held digitally. No token, no waiting in line.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    gradient: "from-cyan-500 to-teal-500",
    glow: "shadow-cyan-500/40",
    glowColor: "rgba(6,182,212,0.5)",
    badge: "Before You Arrive",
    title: "Pre-Order Your Meal",
    desc: "Pick your biryani, your mishti, your everything — before you even sit down. Food's hot and ready when you walk in.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    gradient: "from-pink-500 to-rose-500",
    glow: "shadow-pink-500/40",
    glowColor: "rgba(236,72,153,0.5)",
    badge: "Puja Time",
    title: "Hop More Pandals",
    desc: "Your wait time is now Puja time. Discover the most iconic Durga Puja installations within walking distance.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
    gradient: "from-amber-400 to-orange-500",
    glow: "shadow-amber-500/40",
    glowColor: "rgba(245,158,11,0.5)",
    badge: "Never Miss It",
    title: "Table Ready Alert",
    desc: "We send you a real-time alert the moment your table is confirmed. Walk back in, sit down, and feast.",
  },
];

export function HeroSection({ onOpenConnect, onOpenQueue }: HeroSectionProps) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="for-diners" className="relative bg-[#060B18] text-white overflow-hidden">
      <FestiveParticles />

      {/* ══════════════════════════════════════════════════
          TOP HERO — Photo shows on right, text on left
          ══════════════════════════════════════════════════ */}
      <div className="relative min-h-[92vh] pt-16 sm:pt-20 flex items-center">

        {/* Full-bleed background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-puja.jpg"
            alt=""
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          {/* Strong left darkening — text reads clearly, photo shines on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060B18] from-[35%] via-[#060B18]/60 via-[58%] to-transparent" />
          {/* Top fade (under header) */}
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#060B18] to-transparent" />
          {/* Bottom fade into offering cards */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060B18] to-transparent" />
          {/* Mobile: stronger center darkening so text pops */}
          <div className="absolute inset-0 sm:hidden bg-gradient-to-b from-[#060B18]/50 via-transparent to-[#060B18]/70" />
          {/* Festive gold glow at bottom on mobile */}
          <div className="absolute bottom-0 inset-x-0 h-40 sm:hidden bg-gradient-to-t from-amber-900/20 to-transparent" />
          {/* Purple ambient glow behind text */}
          <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-purple-600/[0.15] blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.08] blur-3xl pointer-events-none" />
        </div>

        {/* ── "Same Waiting Time. More Puja." sticker ── */}
        <div
          className="absolute z-20 top-[12%] right-4 sm:right-8 lg:right-[5%] xl:right-[9%] text-right pointer-events-none select-none"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          <p className="text-white text-[17px] sm:text-[20px] font-bold italic leading-snug [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">Same</p>
          <p className="text-white text-[17px] sm:text-[20px] font-bold italic leading-snug [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">Waiting Time.</p>
          <p className="text-[#f472b6] text-[19px] sm:text-[22px] font-bold italic leading-snug [text-shadow:0_0_20px_rgba(244,114,182,0.7),0_2px_12px_rgba(0,0,0,0.8)]">More Puja.</p>
          <svg className="ml-auto mt-1" width="105" height="10" viewBox="0 0 105 10">
            <path d="M2 8 Q52 1 103 5" stroke="#f472b6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* ── Left column: text content only ── */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-[520px] lg:max-w-[500px] xl:max-w-[520px] py-12">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-5">
              <span className="text-base">🪔</span>
              <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-amber-400 uppercase">
                Kolkata Durga Puja 2025
              </p>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <p className="text-[10px] sm:text-[11px] font-semibold text-white/40 uppercase tracking-wide">
                Now Live
              </p>
            </div>

            {/* H1 */}
            <h1 className="font-extrabold leading-[1.05] mb-5 sm:mb-6">
              <span className="block text-[2.5rem] sm:text-[3.1rem] xl:text-[3.7rem] text-white [text-shadow:0_0_40px_rgba(139,92,246,0.4),0_4px_40px_rgba(0,0,0,0.6)]">
                This Puja,
              </span>
              <span className="block text-[2.5rem] sm:text-[3.1rem] xl:text-[3.7rem] text-white [text-shadow:0_0_40px_rgba(139,92,246,0.4),0_4px_40px_rgba(0,0,0,0.6)]">
                Don&apos;t Just Wait —
              </span>
              <span className="block text-[2.5rem] sm:text-[3.1rem] xl:text-[3.7rem] bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_20px_rgba(139,92,246,0.5))]">
                Explore More.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[15px] sm:text-base text-white/72 leading-relaxed mb-8 max-w-[420px]">
              ASSO turns restaurant queues into pandal-hopping time. Scan a QR at any
              partner restaurant, grab a digital token, explore Puja nearby — and walk
              back in when your table is hot and your food is ready.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-7 max-w-[430px]">
              <button
                onClick={onOpenQueue}
                className="flex-1 flex items-center justify-center gap-2.5 py-4 px-7 rounded-full font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 shadow-[0_0_40px_rgba(139,92,246,0.55)] hover:shadow-[0_0_60px_rgba(139,92,246,0.75)] hover:brightness-110 active:scale-[0.97] transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0">
                  <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
                Skip the Queue — Try Demo
              </button>
              <button
                onClick={() => scrollTo("pandals")}
                className="flex-1 flex items-center justify-center gap-2.5 py-4 px-7 rounded-full font-semibold text-sm text-white border border-white/25 bg-white/[0.08] backdrop-blur-lg hover:bg-white/[0.16] hover:border-white/40 active:scale-[0.97] transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
                </svg>
                Explore Partner Restaurants
              </button>
            </div>

            {/* Trust marks */}
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {["No app, no install", "Free forever for diners", "Works via WhatsApp"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-[11px] text-white/50">
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-green-400 flex-shrink-0">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          OFFERING CARDS — Full-width glass strip
          Floats at the transition from photo to dark
          ══════════════════════════════════════════════════ */}
      <div className="relative z-10 bg-[#060B18]">
        {/* Subtle top edge glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-10 sm:py-12">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-7">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-white/40 uppercase">
              🪔 &nbsp;How ASSO Works This Puja
            </p>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          {/* 4 cards — horizontal on desktop, 2-col grid on mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {offerings.map((o) => (
              <div
                key={o.title}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl overflow-hidden p-4 sm:p-5 hover:border-white/[0.18] hover:bg-white/[0.08] transition-all duration-300 cursor-default"
              >
                {/* Glow spot in corner */}
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: o.glowColor }}
                />

                {/* Icon pill */}
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${o.gradient} flex items-center justify-center text-white mb-3 sm:mb-4 shadow-lg ${o.glow}`}>
                  {o.icon}
                </div>

                {/* Badge */}
                <span className={`inline-block text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-gradient-to-r ${o.gradient} text-white mb-2`}>
                  {o.badge}
                </span>

                {/* Title */}
                <h3 className="text-sm sm:text-[15px] font-bold text-white mb-1.5 leading-snug">
                  {o.title}
                </h3>

                {/* Desc */}
                <p className="text-[11px] sm:text-xs text-white/50 leading-relaxed">
                  {o.desc}
                </p>

                {/* Bottom gradient border on hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${o.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            ))}
          </div>

          {/* Free for diners pill */}
          <div className="flex justify-center mt-6">
            <span className="flex items-center gap-2 text-[11px] text-white/40 font-medium px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03]">
              <span className="text-green-400 text-xs">✓</span>
              Completely free for diners · No app download required
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          NEON MARQUEE ZONE
          ══════════════════════════════════════════════════ */}
      <div className="relative bg-[#060B18]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero-puja.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060B18]/98 via-[#060B18]/70 to-[#060B18]/90" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
          <div className="flex items-center gap-10 sm:gap-16">
            <div className="flex-shrink-0">
              <p
                className="text-amber-400 font-black text-2xl sm:text-[1.8rem] leading-tight tracking-[0.1em] uppercase"
                style={{
                  textShadow:
                    "0 0 6px rgba(251,191,36,1), 0 0 18px rgba(251,191,36,0.8), 0 0 40px rgba(251,191,36,0.4)",
                }}
              >
                SKIP<br />DINE<br />EXPLORE<br />REPEAT
              </p>
              <p
                className="text-amber-400 text-2xl mt-1"
                style={{ textShadow: "0 0 10px rgba(251,191,36,1)" }}
              >
                ♥
              </p>
            </div>

            <div style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              <p className="text-white text-[1.5rem] sm:text-[2rem] xl:text-[2.2rem] font-bold italic leading-snug [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
                Pandal Hopping
              </p>
              <p className="text-white text-[1.5rem] sm:text-[2rem] xl:text-[2.2rem] font-bold italic leading-snug [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
                Tastes Better
              </p>
              <p className="text-cyan-300 text-[1.5rem] sm:text-[2rem] xl:text-[2.2rem] font-bold italic leading-snug [text-shadow:0_0_25px_rgba(103,232,249,0.5)]">
                With ASSO
              </p>
              <svg className="mt-2" width="190" height="12" viewBox="0 0 190 12">
                <path d="M2 10 Q95 2 188 7" stroke="#67e8f9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="relative z-10 bg-[#060B18] pb-8 flex flex-col items-center gap-2 text-white/25 hover:text-white/50 transition-colors duration-300 cursor-pointer"
        onClick={() => scrollTo("how-it-works")}
      >
        <svg viewBox="0 0 24 42" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-8">
          <rect x="2" y="2" width="20" height="38" rx="10" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" className="animate-bounce" />
        </svg>
        <span className="text-[9px] tracking-[0.28em] uppercase font-semibold">Scroll to Explore</span>
      </div>
    </section>
  );
}
