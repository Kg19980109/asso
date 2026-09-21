"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Hourglass,
  Heart,
  BarChart3,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { FestiveParticles } from "@/components/ui/festive-particles";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

interface FinalCtaSectionProps {
  onOpenQueue?: () => void;
  onOpenPartner?: () => void;
}

export function FinalCtaSection({ onOpenQueue, onOpenPartner }: FinalCtaSectionProps) {
  return (
    <section id="download" className="relative py-24 sm:py-32 overflow-hidden text-white bg-[#060B18] content-auto">
      {/* Floating particles & ambiance */}
      <FestiveParticles />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(closest-side,rgba(124,58,237,0.20),transparent)] pointer-events-none" />

      {/* Background panoramic image of Kolkata */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/kolkata-skyline.jpg"
          alt="Kolkata Howrah Bridge Night Panorama during Durga Puja"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-70 scale-105 transition-transform duration-1000 select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-[#060B18]/60 to-[#060B18]/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Handwritten Tag */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <ScrollReveal direction="left">
              <p className="font-script text-3xl sm:text-4xl font-bold text-amber-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] leading-snug animate-float-slow">
                Same City<br />
                More Pandals<br />
                Happier People ♡
              </p>
            </ScrollReveal>
          </div>

          {/* Center Call to Action — unified B2B message */}
          <div className="lg:col-span-6 text-center space-y-4">
            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md leading-tight">
                <span className="block">Ready to make your</span>
                <span className="block"><span className="gradient-text-hero">restaurant queue</span> simpler?</span>
              </h2>
              <p className="text-sm sm:text-base font-medium text-slate-200 mt-2 max-w-lg mx-auto">
                Give your guests a better waiting experience while giving your team a simpler way to manage the queue — no hardware, live in minutes.
              </p>

              {/* Primary: restaurant; Secondary: diner */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={onOpenPartner}
                  className="relative group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-black text-xs shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/40 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Get Started for Your Restaurant</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>

                <a
                  href="#for-diners"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/25 text-white font-bold text-xs backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Explore the Diner Experience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-[11px] text-slate-400 pt-2 text-center">
                No hardware required • Built for busy restaurants • Set up in minutes
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column 4 Metrics matching screenshot */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3.5 text-center lg:text-left">
            <ScrollReveal direction="right" delay={150}>
              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm shadow-sm hover:border-blue-400/40 transition-colors">
                <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 flex-shrink-0 shadow-sm">
                  <Hourglass className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white leading-tight">Less Waiting</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm shadow-sm hover:border-rose-400/40 transition-colors">
                <div className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 flex-shrink-0 shadow-sm">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white leading-tight">More Exploration</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={250}>
              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm shadow-sm hover:border-emerald-400/40 transition-colors">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 flex-shrink-0 shadow-sm">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white leading-tight">Better Dining</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={300}>
              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm shadow-sm hover:border-teal-400/40 transition-colors">
                <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 flex-shrink-0 shadow-sm">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white leading-tight">Happier People</span>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
