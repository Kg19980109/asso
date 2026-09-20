"use client";

import * as React from "react";
import {
  QrCode,
  Smartphone,
  MousePointerClick,
  ChefHat,
  ArrowRight,
  CheckCircle2,
  PlugZap,
  GraduationCap,
  Languages,
  Timer,
  MonitorSmartphone,
  BellRing,
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

interface HassleFreeSetupSectionProps {
  onOpenPartner?: () => void;
}

const STEPS = [
  {
    icon: QrCode,
    step: "Step 1",
    title: "Stick the QR standee",
    desc: "We give you printed standees for your entrance — or print your own in 2 minutes. That's the whole installation.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    ring: "border-blue-200",
  },
  {
    icon: Smartphone,
    step: "Step 2",
    title: "Open the host console",
    desc: "On any phone, tablet or laptop your staff already has. No app install, no new device to buy.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    ring: "border-purple-200",
  },
  {
    icon: MousePointerClick,
    step: "Step 3",
    title: "Tap to call the next party",
    desc: "Guest gets an SMS automatically and walks back. Late? Grace-period reminders go out on their own.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    ring: "border-emerald-200",
  },
  {
    icon: ChefHat,
    step: "Step 4",
    title: "Kitchen gets pre-orders early",
    desc: "Guests order while they wait nearby. Your kitchen fires dishes before they even sit down.",
    color: "text-orange-600",
    bg: "bg-orange-50",
    ring: "border-orange-200",
  },
];

const HASSLE_FREE = [
  { icon: PlugZap, text: "No hardware to buy" },
  { icon: MonitorSmartphone, text: "No POS integration needed" },
  { icon: GraduationCap, text: "Staff learns it in ~15 minutes" },
  { icon: Timer, text: "Live in under a day" },
  { icon: BellRing, text: "Auto grace-period reminders" },
  { icon: Languages, text: "Bengali, Hindi & English support" },
];

export function HassleFreeSetupSection({ onOpenPartner }: HassleFreeSetupSectionProps) {
  return (
    <section
      id="easy-setup"
      className="py-20 sm:py-28 bg-white text-stone-900 border-b border-stone-200 relative overflow-hidden content-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full">
              Hassle-Free by Design
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mt-4 leading-tight">
              Live Before Tonight&apos;s <span className="gradient-text-pink">Dinner Rush.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
              No hardware. No POS changes. No week-long onboarding. If your host can use WhatsApp, they can run ASSO.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 steps with connector */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {/* connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200" />
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <ScrollReveal key={s.title} direction="up" delay={i * 80}>
                <div
                  className={`relative h-full rounded-3xl bg-stone-50 border ${s.ring} p-5 pt-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                >
                  <span className="absolute -top-3 left-5 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-stone-900 text-white shadow">
                    {s.step}
                  </span>
                  <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center ${s.color} shadow-sm mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-black text-stone-900">{s.title}</h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Hassle-free checklist */}
        <ScrollReveal direction="up" delay={120}>
          <div className="max-w-4xl mx-auto mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {HASSLE_FREE.map((h) => {
              return (
                <span
                  key={h.text}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-100 border border-stone-200 text-xs font-bold text-stone-700"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {h.text}
                </span>
              );
            })}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" delay={180}>
          <div className="text-center mt-10">
            <button
              onClick={onOpenPartner}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] text-white font-bold text-xs shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Get Free Demo for Your Outlet</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-stone-500 mt-3">
              Free pilot for early Kolkata partners • We set everything up with you
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
