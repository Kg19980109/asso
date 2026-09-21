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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <path d="M14 14h7v7h-7z" rx="1.5" />
      </svg>
    ),
    color: "from-purple-500 to-violet-600",
    glow: "rgba(139,92,246,0.35)",
    badge: "Live Now",
    title: "Skip the Queue",
    desc: "Scan a QR code, join a virtual queue instantly. No waiting in line — explore while we hold your spot.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    color: "from-cyan-500 to-teal-500",
    glow: "rgba(6,182,212,0.35)",
    badge: "Pre-Order",
    title: "Order Food Ahead",
    desc: "Choose your meal before arriving. Your biryani hits the table the moment you sit down.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <circle cx="12" cy="10" r="4" />
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      </svg>
    ),
    color: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.35)",
    badge: "Near You",
    title: "Explore Pandals",
    desc: "Discover illuminated pandals within walking distance. Turn waiting time into puja-hopping time.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
        <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.35)",
    badge: "Instant Alert",
    title: "Get Notified",
    desc: "Receive a ping the moment your table is ready. Zero anxiety, maximum freedom.",
  },
];

export function HeroSection({ onOpenConnect, onOpenQueue }: HeroSectionProps) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="for-diners"
      className="relative bg-[#060B18] text-white overflow-hidden"
    >
      <FestiveParticles />

      {/* ═══════════════════════════════════════
          HERO — Full-bleed photo + content overlay
          ═══════════════════════════════════════ */}
      <div className="relative min-h-screen pt-16 sm:pt-20">

        {/* Full-bleed background photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-puja.jpg"
            alt=""
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          {/* Left: heavy darkening for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060B18] via-[#060B18]/80 to-[#060B18]/20" />
          {/* Top: fade from header */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#060B18] to-transparent" />
          {/* Bottom: fade into marquee */}
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#060B18] to-transparent" />
          {/* Ambient glows */}
          <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[radial-gradient(closest-side,rgba(139,92,246,0.18),transparent)] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(closest-side,rgba(56,189,248,0.10),transparent)] pointer-events-none" />
        </div>

        {/* Floating handwritten sticker */}
        <div
          className="absolute z-20 top-[13%] sm:top-[11%] right-4 sm:right-8 lg:right-[6%] xl:right-[10%] text-right pointer-events-none select-none"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          <p className="text-white text-[18px] sm:text-[21px] font-bold leading-snug drop-shadow-xl italic">Same</p>
          <p className="text-white text-[18px] sm:text-[21px] font-bold italic leading-snug drop-shadow-xl">Waiting Time.</p>
          <p className="text-[#f472b6] text-[20px] sm:text-[23px] font-bold italic leading-snug drop-shadow-xl">More Puja.</p>
          <svg className="ml-auto mt-1" width="110" height="10" viewBox="0 0 110 10">
            <path d="M2 8 Q55 1 108 5" stroke="#f472b6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="flex flex-col lg:flex-row lg:items-start gap-10 xl:gap-16 py-10 lg:py-16 xl:py-20">

            {/* ── LEFT: Headline + CTAs ── */}
            <div className="flex-shrink-0 lg:w-[46%] xl:w-[44%]">
              <p className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-cyan-400 uppercase mb-3 sm:mb-4">
                Kolkata&apos;s Smart Dining Companion
              </p>

              <h1 className="font-extrabold leading-[1.06] mb-4 sm:mb-5">
                <span className="block text-[2.4rem] sm:text-5xl xl:text-[3.5rem] text-white drop-shadow-lg">Dine Without</span>
                <span className="block text-[2.4rem] sm:text-5xl xl:text-[3.5rem] text-white drop-shadow-lg">The Wait.</span>
                <span className="block text-[2.4rem] sm:text-5xl xl:text-[3.5rem] bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Explore More.
                </span>
              </h1>

              <p className="text-sm sm:text-[15px] text-white/70 leading-relaxed mb-7 max-w-[360px]">
                Join restaurant queues from your phone, pre-order your food, and
                explore nearby pandals — we&apos;ll notify you the moment your table is ready.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-[420px]">
                <button
                  onClick={onOpenQueue}
                  className="flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 text-white font-bold text-sm shadow-[0_8px_32px_rgba(139,92,246,0.45)] hover:shadow-[0_8px_40px_rgba(139,92,246,0.65)] hover:brightness-110 active:scale-95 transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0">
                    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h7v7h-7z" />
                  </svg>
                  Join Live Queue Demo →
                </button>
                <button
                  onClick={() => scrollTo("pandals")}
                  className="flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-md text-white font-semibold text-sm hover:bg-white/[0.12] hover:border-white/35 active:scale-95 transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
                  </svg>
                  Find Restaurants Near You
                </button>
              </div>

              {/* Trust marks */}
              <div className="flex gap-4 sm:gap-6 flex-wrap">
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

            {/* ── RIGHT: What We Offer — 4 glass feature cards ── */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 pt-2 lg:pt-4">
              {offerings.map((o) => (
                <div
                  key={o.title}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl overflow-hidden p-4 lg:p-5 hover:border-white/20 hover:bg-white/[0.09] transition-all duration-300 cursor-default"
                  style={{ boxShadow: `0 4px 32px ${o.glow}` }}
                >
                  {/* Corner glow */}
                  <div
                    className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-50"
                    style={{ background: `linear-gradient(135deg, ${o.glow.replace('0.35', '1')}, transparent)` }}
                  />

                  {/* Icon + badge row */}
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${o.color} flex items-center justify-center text-white shadow-lg`}
                      style={{ boxShadow: `0 6px 20px ${o.glow}` }}
                    >
                      {o.icon}
                    </div>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${o.color} text-white tracking-wide`}
                    >
                      {o.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-[15px] font-bold text-white mb-1.5 leading-snug">
                    {o.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-[11px] sm:text-xs text-white/55 leading-relaxed">
                    {o.desc}
                  </p>

                  {/* Bottom shimmer line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r ${o.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </div>
              ))}

              {/* "Free for diners" bottom pill */}
              <div className="sm:col-span-2 flex items-center justify-center gap-3 mt-1">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <span className="text-[11px] text-white/40 font-medium px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm whitespace-nowrap">
                  🎉 Completely free for diners · No app download required
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MARQUEE ZONE — Neon sign + handwritten
          ═══════════════════════════════════════ */}
      <div className="relative bg-[#060B18]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero-puja.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060B18]/95 via-[#060B18]/65 to-[#060B18]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060B18]/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
          <div className="flex items-center gap-10 sm:gap-16">
            <div className="flex-shrink-0">
              <div
                className="text-amber-400 font-black text-2xl sm:text-[1.75rem] leading-tight tracking-[0.12em] uppercase"
                style={{
                  textShadow: "0 0 8px rgba(251,191,36,1), 0 0 20px rgba(251,191,36,0.7), 0 0 45px rgba(251,191,36,0.35)",
                }}
              >
                SKIP<br />DINE<br />EXPLORE<br />REPEAT
              </div>
              <div className="text-amber-400 text-2xl mt-1.5" style={{ textShadow: "0 0 8px rgba(251,191,36,1)" }}>♥</div>
            </div>

            <div style={{ fontFamily: "'Georgia', serif" }}>
              <p className="text-white text-[1.5rem] sm:text-[2rem] xl:text-[2.4rem] font-bold italic leading-snug drop-shadow-xl">
                Pandal Hopping
              </p>
              <p className="text-white text-[1.5rem] sm:text-[2rem] xl:text-[2.4rem] font-bold italic leading-snug drop-shadow-xl">
                Tastes Better
              </p>
              <p className="text-cyan-300 text-[1.5rem] sm:text-[2rem] xl:text-[2.4rem] font-bold italic leading-snug drop-shadow-xl">
                With ASSO
              </p>
              <svg className="mt-2" width="200" height="12" viewBox="0 0 200 12">
                <path d="M2 10 Q100 2 198 7" stroke="#67e8f9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 bg-[#060B18] pb-8 flex flex-col items-center gap-2 text-white/25 hover:text-white/50 transition-colors cursor-pointer"
        onClick={() => scrollTo("how-it-works")}
      >
        <svg viewBox="0 0 24 42" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-8">
          <rect x="2" y="2" width="20" height="38" rx="10" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" className="animate-bounce" />
        </svg>
        <span className="text-[9px] tracking-[0.28em] uppercase font-medium">Scroll to Explore</span>
      </div>
    </section>
  );
}
