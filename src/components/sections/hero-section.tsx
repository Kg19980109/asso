"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Hourglass,
  Landmark,
  UtensilsCrossed,
  Smile,
  ArrowRight,
  Sparkles,
  Flame,
} from "lucide-react";
import { FestiveParticles } from "@/components/ui/festive-particles";

interface HeroSectionProps {
  onOpenQueue?: () => void;
  onOpenPartner?: () => void;
}

export function HeroSection({ onOpenQueue, onOpenPartner }: HeroSectionProps) {
  return (
    <section
      id="for-diners"
      className="relative min-h-[92vh] pt-28 lg:pt-32 pb-16 bg-[#060B18] overflow-hidden flex items-center"
    >
      {/* Floating Golden Festive Bokeh Particles */}
      <FestiveParticles />

      {/* Radial festive ambient spotlight */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Background illustration on desktop */}
      <div className="absolute inset-0 z-0 opacity-40 lg:opacity-100 lg:left-1/3 transition-opacity duration-700">
        <div className="relative w-full h-full">
          <Image
            src="/images/hero-puja.jpg"
            alt="Durga Puja Kolkata Couple Exploring with ASSO App"
            fill
            priority
            className="object-cover object-center lg:object-right"
          />
          {/* Subtle gradient vignette to blend seamlessly into dark navy background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060B18] via-[#060B18]/85 to-transparent lg:via-[#060B18]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-transparent to-[#060B18]/50" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-6 max-w-2xl">
            {/* Festive Live Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md text-slate-200 text-xs font-semibold shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span className="text-amber-300 font-bold">Kolkata Durga Puja 2026</span>
              <span className="text-slate-400">•</span>
              <span>140+ Partner Restaurants</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.06]">
              <span className="block">This Puja,</span>
              <span className="block">Don&apos;t Just Wait.</span>
              <span className="block gradient-text-hero">Explore More.</span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal max-w-xl">
              Join the queue from your phone, pre-order your favorite food, and visit 1, 2 or more pandals while we hold your table and keep your food ready!
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenQueue}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-black text-xs shadow-xl shadow-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Join the Queue</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>

              <button
                onClick={onOpenPartner}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/25 text-white font-bold text-xs backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>For Restaurants</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4">
              {/* 1. Shorter Waiting Time */}
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-blue-400/40 backdrop-blur-md transition-all duration-300 group hover:-translate-y-1">
                <div className="w-10 h-10 rounded-full bg-[#1E3A8A]/90 border border-blue-400/50 flex items-center justify-center text-blue-300 mb-2 shadow-md group-hover:scale-110 transition-transform">
                  <Hourglass className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-white leading-tight">
                  Shorter<br />Waiting Time
                </span>
              </div>

              {/* 2. Explore More Pandals */}
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-purple-400/40 backdrop-blur-md transition-all duration-300 group hover:-translate-y-1">
                <div className="w-10 h-10 rounded-full bg-[#581C87]/90 border border-purple-400/50 flex items-center justify-center text-purple-300 mb-2 shadow-md group-hover:scale-110 transition-transform">
                  <Landmark className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-white leading-tight">
                  Explore<br />More Pandals
                </span>
              </div>

              {/* 3. Food Ready When You Arrive */}
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-orange-400/40 backdrop-blur-md transition-all duration-300 group hover:-translate-y-1">
                <div className="w-10 h-10 rounded-full bg-[#C2410C]/90 border border-orange-400/50 flex items-center justify-center text-orange-300 mb-2 shadow-md group-hover:scale-110 transition-transform">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-white leading-tight">
                  Food Ready<br />When You Arrive
                </span>
              </div>

              {/* 4. Happier Dining Experience */}
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-teal-400/40 backdrop-blur-md transition-all duration-300 group hover:-translate-y-1">
                <div className="w-10 h-10 rounded-full bg-[#0F766E]/90 border border-teal-400/50 flex items-center justify-center text-teal-300 mb-2 shadow-md group-hover:scale-110 transition-transform">
                  <Smile className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-white leading-tight">
                  Happier<br />Dining Experience
                </span>
              </div>
            </div>
          </div>

          {/* Right Column Floating Stickers & Graphic Elements */}
          <div className="lg:col-span-5 relative hidden lg:block h-[460px]">
            {/* Top Right Handwritten Script Tag */}
            <div className="absolute top-2 right-2 -rotate-6 animate-float-slow">
              <span className="font-script text-2xl font-bold text-amber-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                Cholo ro kota pandel dekhe asi... ♡
              </span>
            </div>

            {/* Sticky Note Sticker */}
            <div className="absolute top-20 left-6 -rotate-3 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-stone-200 max-w-[190px] text-center animate-float-reverse">
              <p className="font-script text-xl font-bold text-stone-900 leading-snug">
                More Pandals<br />
                More Good Food<br />
                More Memories ♡
              </p>
            </div>

            {/* Bottom Right Handwritten note */}
            <div className="absolute bottom-6 right-4 rotate-2 animate-float-slow">
              <span className="font-script text-2xl font-bold text-amber-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                Kolkata Feels Better Together ♡
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
