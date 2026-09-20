"use client";

import * as React from "react";
import {
  Megaphone,
  ClipboardList,
  Footprints,
  Star,
  TimerOff,
  QrCode,
  BellRing,
  UtensilsCrossed,
  DoorOpen,
  ArrowRight,
} from "lucide-react";
import { FestiveParticles } from "@/components/ui/festive-particles";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const WITHOUT_ASSO = [
  {
    icon: Megaphone,
    title: "Host shouting names into the crowd",
    desc: "Nobody hears, everybody pushes closer to the door.",
  },
  {
    icon: ClipboardList,
    title: "Paper list, cuttings and confusion",
    desc: "Who came first? Who left? The register can't tell you.",
  },
  {
    icon: Footprints,
    title: "Parties wander off — tables sit empty",
    desc: "A table frees up but the next party is nowhere to be found.",
  },
  {
    icon: TimerOff,
    title: "Walkouts when the wait looks endless",
    desc: "No position, no estimate — so they leave for the next place.",
  },
  {
    icon: Star,
    title: "1-star reviews about the wait",
    desc: "\"Waited 1 hour outside\" hurts more than any food review.",
  },
];

const WITH_ASSO = [
  {
    icon: QrCode,
    title: "QR standee at the entrance",
    desc: "Guests join the queue in seconds and move away from your door.",
  },
  {
    icon: DoorOpen,
    title: "Your entrance stays clear",
    desc: "No pavement crowd, no blocked doorway, no chaos for staff.",
  },
  {
    icon: BellRing,
    title: "One tap calls the next party",
    desc: "Guest gets an SMS automatically. No shouting, no searching.",
  },
  {
    icon: TimerOff,
    title: "Grace period + auto-reminders",
    desc: "Late parties get reminded, not lost. Your policy, automated.",
  },
  {
    icon: UtensilsCrossed,
    title: "Pre-orders reach the kitchen early",
    desc: "Start dishes before guests sit — turn tables faster.",
  },
];

export function RestaurantChaosSection() {
  return (
    <section
      id="restaurant-chaos"
      className="py-20 sm:py-28 bg-[#080E21] text-white border-b border-white/10 relative overflow-hidden"
    >
      <FestiveParticles />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-300 bg-rose-500/15 border border-rose-500/30 px-3.5 py-1 rounded-full">
              For Restaurant Owners
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mt-4 leading-tight">
              The 8 PM Crowd Isn&apos;t the Problem.{" "}
              <span className="gradient-text-hero">Managing It on Paper Is.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              A typical peak-hour scene every owner recognises — and what changes when the queue runs itself.
            </p>
          </div>
        </ScrollReveal>

        {/* Before / After */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto items-stretch">
          {/* WITHOUT */}
          <ScrollReveal direction="left" delay={80} className="h-full">
            <div className="h-full rounded-3xl bg-rose-950/40 border border-rose-500/25 p-6 sm:p-7 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  Without ASSO
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Saturday, 8:00 PM</span>
              </div>
              <h3 className="text-xl font-black text-white mb-5">
                40 people at your gate. 3 tables about to free up.
              </h3>
              <div className="space-y-3">
                {WITHOUT_ASSO.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/30 border border-rose-500/15 hover:border-rose-400/40 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-300 flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-snug">{item.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* WITH */}
          <ScrollReveal direction="right" delay={140} className="h-full">
            <div className="h-full rounded-3xl bg-emerald-950/30 border border-emerald-500/25 p-6 sm:p-7 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-1 relative">
                <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  With ASSO
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Same Saturday, 8:00 PM</span>
              </div>
              <h3 className="text-xl font-black text-white mb-5 relative">
                Same crowd. Calm entrance. Full tables.
              </h3>
              <div className="space-y-3 relative">
                {WITH_ASSO.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.05] border border-emerald-500/20 hover:border-emerald-400/50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-snug">{item.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Outcome strip — honest, no fake percentages */}
        <ScrollReveal direction="up" delay={150}>
          <div className="max-w-6xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            {["Calmer entrance", "Fewer walkouts", "Faster table turns"].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/15 text-xs font-bold text-slate-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {chip}
              </span>
            ))}
          </div>
          <p className="text-center text-[11px] text-slate-500 mt-4">
            Outcomes vary by outlet — pilot it free during your next rush and measure it yourself.{" "}
            <a href="#for-restaurants" className="text-[#38BDF8] font-bold hover:text-white transition-colors inline-flex items-center gap-1">
              See the host console <ArrowRight className="w-3 h-3" />
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
