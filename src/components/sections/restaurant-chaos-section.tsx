"use client";

import * as React from "react";
import Image from "next/image";
import {
  Users,
  Clock,
  Frown,
  Link2Off,
  TrendingDown,
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const PROBLEMS = [
  {
    icon: Users,
    title: "Long Queues Outside",
    desc: "Crowded entrances, frustrated customers and poor first impressions.",
  },
  {
    icon: Clock,
    title: "Manual Queue Management",
    desc: "Staff tied up managing tokens, calls and walk-ins instead of focusing on service.",
  },
  {
    icon: Frown,
    title: "Angry & Impatient Customers",
    desc: "People leave due to long waiting time, leading to lost revenue.",
  },
  {
    icon: Link2Off,
    title: "No Real-time Visibility",
    desc: "Hard to track queue status, table availability and customer flow.",
  },
  {
    icon: TrendingDown,
    title: "Lower Table Turnover",
    desc: "Tables sit idle or are poorly managed, reducing your earning potential.",
  },
];

const BUBBLES = [
  { text: "How long will it take?", className: "top-6 left-6 -rotate-3" },
  { text: "Still waiting? 😡", className: "top-16 right-8 rotate-2" },
  { text: "No seats yet?", className: "top-40 left-10 rotate-1" },
  { text: "This is taking forever... 😩", className: "top-52 right-6 -rotate-2" },
];

export function RestaurantChaosSection() {
  return (
    <section
      id="restaurant-chaos"
      className="relative bg-[#070D1E] text-white overflow-hidden content-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 sm:pt-28 pb-24 sm:pb-32">
        {/* Top eyebrow row */}
        <ScrollReveal direction="up">
          <div className="flex items-start justify-between gap-4 mb-6">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-200">
              For Restaurant Owners
            </span>
            <span className="font-script text-xl sm:text-2xl font-bold text-amber-200 text-right leading-tight -rotate-2">
              Great Food<br />Brings People<br />Together ♡
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: headline + problems */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.08]">
                <span className="block text-white">Puja Rush?</span>
                <span className="block text-rose-500">Same Old Problems?</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-md">
                During peak seasons, managing queues can be chaotic. It affects your staff, your customers, and your revenue.
              </p>
            </ScrollReveal>

            <div className="mt-7 space-y-3">
              {PROBLEMS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <ScrollReveal key={p.title} direction="up" delay={i * 60}>
                    <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-rose-400/40 transition-colors">
                      <div className="w-11 h-11 rounded-full bg-rose-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-rose-500/30">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white">{p.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Right: crowd photo with speech bubbles + chalkboard + brush badge */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delay={120} className="h-full">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl min-h-[420px] lg:min-h-full">
                <Image
                  src="/images/restaurant-queue.jpg"
                  alt="Crowd waiting outside a restaurant during peak hours"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

                {/* Speech bubbles */}
                {BUBBLES.map((b) => (
                  <div
                    key={b.text}
                    className={`absolute ${b.className} max-w-[150px] bg-white text-stone-900 text-[11px] font-bold px-3 py-2 rounded-2xl rounded-bl-md shadow-xl animate-float-slow`}
                  >
                    {b.text}
                  </div>
                ))}

                {/* Chalkboard */}
                <div className="absolute bottom-24 left-6 -rotate-2 bg-[#101418]/95 border-4 border-amber-100/20 rounded-lg px-4 py-3 shadow-2xl">
                  <p className="font-mono text-[11px] font-bold tracking-[0.18em] text-slate-200 leading-relaxed text-center">
                    MANUAL<br />TOKENS<br />CALLS<br />CONFUSION
                  </p>
                </div>

                {/* Red brush badge */}
                <div className="absolute bottom-8 right-6 rotate-3">
                  <div className="bg-rose-600 px-5 py-3 rounded-lg shadow-2xl -rotate-3 border-y-4 border-rose-700/60">
                    <p className="font-script text-2xl font-bold text-white leading-tight text-center">
                      It shouldn&apos;t be<br />this hard.
                    </p>
                  </div>
                </div>

                {/* Script note */}
                <p className="absolute bottom-6 left-6 font-script text-2xl font-bold text-amber-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] -rotate-2">
                  Good Food Deserves a<br />Better Experience
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Wave divider into the light ASSO Way section */}
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[54px] sm:h-[72px]"
        aria-hidden
      >
        <path
          d="M0,60 C240,95 420,10 720,35 C1020,60 1200,90 1440,45 L1440,90 L0,90 Z"
          fill="#F8FAFF"
        />
      </svg>
    </section>
  );
}
