"use client";

import * as React from "react";
import Image from "next/image";
import {
  Hourglass,
  Landmark,
  UtensilsCrossed,
  Smile,
  ArrowRight,
  CheckCircle2,
  Store,
} from "lucide-react";
import { FestiveParticles } from "@/components/ui/festive-particles";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

export function HeroSection() {
  const [restaurantName, setRestaurantName] = React.useState("");
  const [ownerName, setOwnerName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="for-diners"
      className="relative min-h-[94vh] pt-28 lg:pt-32 pb-16 bg-[#060B18] overflow-hidden flex items-center"
    >
      {/* Floating Golden Festive Bokeh Particles */}
      <FestiveParticles />

      {/* Radial festive ambient spotlights */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Background illustration with smooth subtle blend */}
      <div className="absolute inset-0 z-0 opacity-40 lg:opacity-100 lg:left-1/3 transition-opacity duration-700">
        <div className="relative w-full h-full">
          <Image
            src="/images/hero-puja.jpg"
            alt="Durga Puja Kolkata Couple Exploring with ASSO App"
            fill
            priority
            className="object-cover object-center lg:object-right select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060B18] via-[#060B18]/90 to-transparent lg:via-[#060B18]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-transparent to-[#060B18]/50" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-6 max-w-2xl">

            {/* Honest launch tag — no fake partner counts */}
            <ScrollReveal direction="down" delay={50}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] border border-white/20 backdrop-blur-md text-slate-200 text-xs font-semibold shadow-inner transition-colors">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                </span>
                <span className="text-amber-300 font-bold">Kolkata Durga Puja 2026</span>
                <span className="text-slate-400">•</span>
                <span>Now onboarding partner restaurants</span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal direction="up" delay={100}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.06]">
                <span className="block">This Puja,</span>
                <span className="block">Don&apos;t Just Wait.</span>
                <span className="block gradient-text-hero drop-shadow-[0_4px_24px_rgba(232,121,249,0.3)]">
                  Explore More.
                </span>
              </h1>
            </ScrollReveal>

            {/* Subheading */}
            <ScrollReveal direction="up" delay={150}>
              <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal max-w-xl">
                ASSO lets diners join your queue from their phone and pre-order food while they visit pandals nearby — you get calmer entrances and fuller tables.
              </p>
            </ScrollReveal>

            {/* Restaurant early-access form */}
            <ScrollReveal direction="up" delay={200}>
              <div className="max-w-xl rounded-3xl bg-white/[0.06] border border-white/15 backdrop-blur-md p-5 sm:p-6 shadow-2xl">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Store className="w-4 h-4 text-amber-300" />
                      <p className="text-sm font-bold text-white">
                        Own a restaurant? Get free early access
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        placeholder="Restaurant name & area"
                        aria-label="Restaurant name and area"
                        className="h-11 px-3.5 rounded-xl bg-white/10 border border-white/15 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-400"
                      />
                      <input
                        type="text"
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="Your name"
                        aria-label="Your name"
                        className="h-11 px-3.5 rounded-xl bg-white/10 border border-white/15 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number"
                        aria-label="Phone number"
                        className="flex-1 h-11 px-3.5 rounded-xl bg-white/10 border border-white/15 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-400"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-7 h-11 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs shadow-xl shadow-white/15 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap"
                      >
                        <span>Request Free Demo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Currently onboarding in Kolkata • No hardware needed • Free pilot for early partners
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className="text-base font-black text-white">Thanks{restaurantName ? `, ${restaurantName}` : ""}!</p>
                    <p className="text-xs text-slate-300 mt-1">
                      We&apos;ll contact you shortly to schedule your free demo.
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* 4 Feature Badges with staggered reveals */}
            <ScrollReveal direction="up" delay={250}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4">
                {/* 1. Shorter Waiting Time */}
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-blue-400/50 backdrop-blur-md transition-all duration-300 group hover:-translate-y-1 cursor-default shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#1E3A8A]/90 border border-blue-400/50 flex items-center justify-center text-blue-300 mb-2 shadow-md group-hover:scale-110 transition-transform">
                    <Hourglass className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-white leading-tight">
                    Shorter<br />Waiting Time
                  </span>
                </div>

                {/* 2. Explore More Pandals */}
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-purple-400/50 backdrop-blur-md transition-all duration-300 group hover:-translate-y-1 cursor-default shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#581C87]/90 border border-purple-400/50 flex items-center justify-center text-purple-300 mb-2 shadow-md group-hover:scale-110 transition-transform">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-white leading-tight">
                    Explore<br />More Pandals
                  </span>
                </div>

                {/* 3. Food Ready When You Arrive */}
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-orange-400/50 backdrop-blur-md transition-all duration-300 group hover:-translate-y-1 cursor-default shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#C2410C]/90 border border-orange-400/50 flex items-center justify-center text-orange-300 mb-2 shadow-md group-hover:scale-110 transition-transform">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-white leading-tight">
                    Food Ready<br />When You Arrive
                  </span>
                </div>

                {/* 4. Happier Dining Experience */}
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-teal-400/50 backdrop-blur-md transition-all duration-300 group hover:-translate-y-1 cursor-default shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#0F766E]/90 border border-teal-400/50 flex items-center justify-center text-teal-300 mb-2 shadow-md group-hover:scale-110 transition-transform">
                    <Smile className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-white leading-tight">
                    Happier<br />Dining Experience
                  </span>
                </div>
              </div>
            </ScrollReveal>

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
