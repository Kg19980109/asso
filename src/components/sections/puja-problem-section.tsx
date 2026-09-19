"use client";

import * as React from "react";
import Image from "next/image";
import {
  Users,
  Footprints,
  Landmark,
  ShoppingBag,
  Bell,
  UtensilsCrossed,
  Sparkles,
  ArrowRight,
  Clock,
} from "lucide-react";

interface PujaProblemSectionProps {
  onOpenQueue?: () => void;
}

const TIMELINE_STEPS = [
  {
    time: "7:00 PM",
    title: "Join Queue #27",
    desc: "Joined on ASSO app in 5 seconds from phone",
    icon: Users,
    color: "bg-rose-500 text-white",
    border: "border-rose-400",
  },
  {
    time: "7:05 PM",
    title: "Leave Restaurant",
    desc: "Zero waiting at the crowded entrance",
    icon: Footprints,
    color: "bg-teal-500 text-white",
    border: "border-teal-400",
  },
  {
    time: "7:20 PM",
    title: "Pandal #1",
    desc: "Visited Santosh Mitra Square light show",
    icon: Landmark,
    color: "bg-orange-500 text-white",
    border: "border-orange-400",
  },
  {
    time: "7:45 PM",
    title: "Shop / Food Street",
    desc: "Grabbed phuchka & festive souvenirs",
    icon: ShoppingBag,
    color: "bg-purple-500 text-white",
    border: "border-purple-400",
  },
  {
    time: "8:00 PM",
    title: "Pandal #2",
    desc: "Enjoyed College Square illumination reflection",
    icon: Landmark,
    color: "bg-indigo-500 text-white",
    border: "border-indigo-400",
  },
  {
    time: "8:05 PM",
    title: "Get Notified",
    desc: "SMS & app alert: 'Your table is ready in 10 mins!'",
    icon: Bell,
    color: "bg-amber-500 text-white",
    border: "border-amber-400",
  },
  {
    time: "8:15 PM",
    title: "Arrive & Dine",
    desc: "Walk straight to your table. Hot Biryani served!",
    icon: UtensilsCrossed,
    color: "bg-emerald-500 text-white",
    border: "border-emerald-400",
  },
];

export function PujaProblemSection({ onOpenQueue }: PujaProblemSectionProps) {
  const [activeStep, setActiveStep] = React.useState(2);

  return (
    <section className="py-20 sm:py-28 bg-white text-stone-900 border-b border-stone-200 overflow-hidden relative">
      {/* Background festive decorative watermark */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header & Top Right Note */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold mb-3">
              <span>The Festive Dining Dilemma</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900">
              The Puja <span className="text-rose-600">Queue</span> Problem
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-xl leading-relaxed">
              Long queues, lost hours, hungry tempers. You came to celebrate Durga Puja with friends and family — not spend 75 minutes standing by a crowded pavement.
            </p>
          </div>

          <div className="text-right">
            <span className="font-script text-2xl sm:text-3xl font-bold text-stone-900 block">
              Same waiting time. <span className="text-rose-600">More Puja. ♡</span>
            </span>
            <span className="text-xs text-stone-500 font-medium">Turn lost wait time into pandal hopping</span>
          </div>
        </div>

        {/* 2 Comparison Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">

          {/* Left Card: The Problem Photo */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-stone-200 shadow-2xl min-h-[380px] bg-stone-900 group">
            <Image
              src="/images/restaurant-queue.jpg"
              alt="Crowded restaurant queue during Puja"
              fill
              className="object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />

            {/* Red Badge over Crowd */}
            <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-rose-600/95 backdrop-blur-md text-white font-black text-xs shadow-xl flex items-center gap-2 animate-bounce">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span>60+ people waiting outside!</span>
            </div>

            {/* Middle frustrated note */}
            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs space-y-1">
              <p className="font-bold text-rose-300">❌ The Traditional Wait:</p>
              <p className="text-[11px] text-slate-300">
                Stuck on the road for 1+ hour. Feet hurt, phones run out of battery, kids get cranky. Missed the Sreebhumi lighting show.
              </p>
            </div>

            {/* Bottom Tag */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs font-bold">
                So much waiting... 😴
              </div>
              <span className="text-xs text-rose-400 font-mono font-bold">Average wait: 75 min</span>
            </div>
          </div>

          {/* Right Card: Your 1-Hour Wait Could Look Like This */}
          <div className="lg:col-span-7 bg-[#0A1024] rounded-3xl p-6 sm:p-8 border border-white/15 text-white shadow-2xl flex flex-col justify-between gold-border-glow relative overflow-hidden">
            {/* Background ambient lighting */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Your 1-Hour Wait Could Look Like This
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Click any time slot to see what your evening looks like with ASSO
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold self-start sm:self-auto">
                  ✨ 2 Pandals Explored
                </span>
              </div>

              {/* Timeline Items */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 relative">
                {TIMELINE_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isSelected = activeStep === i;
                  return (
                    <div
                      key={step.time}
                      onClick={() => setActiveStep(i)}
                      className={`flex flex-col items-center text-center p-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? "bg-white/15 border border-amber-400/60 shadow-lg scale-105"
                          : "hover:bg-white/[0.06] border border-transparent"
                      }`}
                    >
                      {/* Circle Icon */}
                      <div
                        className={`w-10 h-10 rounded-full ${step.color} border-2 ${
                          isSelected ? "border-amber-300 scale-110 shadow-amber-400/40" : "border-white/20"
                        } flex items-center justify-center shadow-lg mb-2 relative z-10 transition-transform`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Time */}
                      <span className="text-[11px] font-mono font-bold text-amber-300">
                        {step.time}
                      </span>

                      {/* Title */}
                      <span className="text-[11px] font-bold text-slate-200 mt-0.5 leading-snug">
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Active Step Details Box */}
              <div className="mt-5 p-3.5 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <div>
                    <span className="font-bold text-amber-300 font-mono">
                      {TIMELINE_STEPS[activeStep].time}: {TIMELINE_STEPS[activeStep].title}
                    </span>
                    <p className="text-slate-300 text-[11px] mt-0.5">
                      {TIMELINE_STEPS[activeStep].desc}
                    </p>
                  </div>
                </div>
                {onOpenQueue && (
                  <button
                    onClick={onOpenQueue}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
                  >
                    <span>Try ASSO</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Zero waiting at the restaurant door
              </span>
              <span className="font-script text-xl text-amber-200 hidden sm:inline">
                Pandal hopping made easy ♡
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
