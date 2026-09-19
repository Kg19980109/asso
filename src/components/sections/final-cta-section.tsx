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

interface FinalCtaSectionProps {
  onOpenQueue?: () => void;
  onOpenPartner?: () => void;
}

export function FinalCtaSection({ onOpenQueue, onOpenPartner }: FinalCtaSectionProps) {
  return (
    <section id="download" className="relative py-24 sm:py-32 overflow-hidden text-white bg-[#060B18]">
      {/* Floating particles & ambiance */}
      <FestiveParticles />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Background panoramic image of Kolkata */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/kolkata-skyline.jpg"
          alt="Kolkata Howrah Bridge Night Panorama during Durga Puja"
          fill
          className="object-cover object-center opacity-70 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-[#060B18]/60 to-[#060B18]/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Handwritten Tag */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <p className="font-script text-3xl sm:text-4xl font-bold text-amber-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] leading-snug animate-float-slow">
              Same City<br />
              More Pandals<br />
              Happier People ♡
            </p>
          </div>

          {/* Center Call to Action */}
          <div className="lg:col-span-6 text-center space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md leading-tight">
              <span className="block">This Puja,</span>
              <span className="block">Wait Less. <span className="gradient-text-hero">Explore More.</span></span>
            </h2>
            <p className="text-sm sm:text-base font-medium text-slate-200">
              Join millions who choose experiences over queues.
            </p>

            {/* Dual Buttons matching screenshot */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={onOpenQueue}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-black text-xs shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Join the Queue</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>

              <button
                onClick={onOpenPartner}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/25 text-white font-bold text-xs backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>For Restaurants</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column 4 Metrics matching screenshot */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3.5 text-center lg:text-left">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 flex-shrink-0 shadow-sm">
                <Hourglass className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white leading-tight">Less Waiting</span>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 flex-shrink-0 shadow-sm">
                <Heart className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white leading-tight">More Exploration</span>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 flex-shrink-0 shadow-sm">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white leading-tight">Better Dining</span>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 flex-shrink-0 shadow-sm">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white leading-tight">Happier People</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
