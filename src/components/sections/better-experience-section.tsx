"use client";

import * as React from "react";
import Image from "next/image";
import {
  Smartphone,
  UtensilsCrossed,
  Landmark,
  Bell,
  Smile,
  Sparkles,
} from "lucide-react";
import { FestiveParticles } from "@/components/ui/festive-particles";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const FIVE_FEATURES = [
  {
    icon: Smartphone,
    title: "Live Queue Updates",
    desc: "Check your position in real-time without standing at the gate",
    iconColor: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "group-hover:border-blue-400/60",
  },
  {
    icon: UtensilsCrossed,
    title: "Pre-Order Food",
    desc: "Get your food ready while you walk from pandal to pandal",
    iconColor: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    glow: "group-hover:border-orange-400/60",
  },
  {
    icon: Landmark,
    title: "Explore Nearby Pandals",
    desc: "Discover award-winning pandals, food streets and lighting shows",
    iconColor: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    glow: "group-hover:border-purple-400/60",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    desc: "Know exactly when your table is 10 minutes away from seating",
    iconColor: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    glow: "group-hover:border-indigo-400/60",
  },
  {
    icon: Smile,
    title: "More Quality Time",
    desc: "Enjoy genuine moments with your friends, family and loved ones",
    iconColor: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    glow: "group-hover:border-teal-400/60",
  },
];

export function BetterExperienceSection() {
  return (
    <section id="our-story" className="py-20 sm:py-28 bg-[#080E21] text-white overflow-hidden border-b border-white/10 relative">
      {/* Floating particles & spotlight */}
      <FestiveParticles />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: 5 Feature Items */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="left">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold mb-3 shadow-inner">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>The ASSO Advantage</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  <span className="block text-white">More Than a Queue.</span>
                  <span className="block gradient-text-pink">A Better Puja Experience.</span>
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
                  Spend less time in queues, more time in what matters.
                </p>
              </div>
            </ScrollReveal>

            {/* 5 Feature Rows/Pills */}
            <div className="space-y-3 pt-2">
              {FIVE_FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <ScrollReveal key={f.title} direction="left" delay={i * 60}>
                    <div
                      className={`p-4 rounded-2xl ${f.bg} border ${f.border} ${f.glow} backdrop-blur-md flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.09] group cursor-default shadow-sm`}
                    >
                      <div className={`w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center ${f.iconColor} flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white leading-tight">{f.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Right Column: Bengali Girl Portrait with Cursive Tag */}
          <div className="lg:col-span-6 relative flex justify-center">
            <ScrollReveal direction="right" delay={150} className="w-full max-w-md">
              <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl w-full h-[480px] sm:h-[520px] gold-border-glow group">
                <Image
                  src="/images/bengali-girl.jpg"
                  alt="Joyful Bengali Girl enjoying Puja"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

                {/* Yellow Handwritten Script Note */}
                <div className="absolute top-6 right-6 left-6 text-right animate-float-slow">
                  <p className="font-script text-2xl sm:text-3xl font-bold text-amber-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] leading-tight">
                    Pandal hopping<br />
                    tastes better<br />
                    when you&apos;re<br />
                    not hungry! ♡
                  </p>
                </div>

                {/* Bottom tag */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                    ✨ Kolkata Festivities
                  </span>
                  <span className="font-script text-xl text-amber-300">
                    Anondo baruk ♡
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
