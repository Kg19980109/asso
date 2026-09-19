"use client";

import * as React from "react";
import {
  Clock, Hourglass, Users, Sparkles, Bell, CheckCircle2,
  Coffee, MapPin, Camera, ShoppingBag,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/animations/fade-in";

export function ProblemSolutionSection() {
  return (
    <section className="relative overflow-hidden">

      {/* ─────────────────────────── PROBLEM ─────────────────────────── */}
      <div className="relative bg-[#FFF1F2] py-24 sm:py-32">
        {/* Decorative rose blob */}
        <div aria-hidden="true" className="absolute top-0 right-0 w-96 h-96 bg-rose-200/40 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/40 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl pointer-events-none" />

        <Container size="wide" className="relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <FadeIn delay={0.05}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-300/60 text-rose-700 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                The Problem
              </span>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h2
                className="font-black text-stone-900 tracking-tighter leading-[0.92] mb-5"
                style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", letterSpacing: "-0.03em" }}
              >
                Your Puja <span className="gradient-text-saffron">shouldn&apos;t be</span> spent in a queue.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-bengali font-semibold text-lg text-rose-600">
                &ldquo;লাইনে দাঁড়িয়ে পূজোর রাত কাটাবেন?&rdquo;
              </p>
              <p className="text-sm text-stone-400 mt-1 italic">Are you really going to spend Puja night standing in a queue?</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Hourglass, stat: "45+", unit: "minutes", title: "Standing Outside",
                desc: "A crowd at the door. No visibility into how long you're waiting.",
                gradient: "from-rose-500 to-orange-500", light: "bg-rose-50", border: "border-rose-200/80",
                iconBg: "bg-rose-100 text-rose-600",
              },
              {
                icon: Clock, stat: "0", unit: "queue info", title: "Zero Visibility",
                desc: "Constantly asking the host. No live position. No ETA. Just guessing.",
                gradient: "from-amber-500 to-yellow-400", light: "bg-amber-50", border: "border-amber-200/80",
                iconBg: "bg-amber-100 text-amber-600",
              },
              {
                icon: Users, stat: "∞", unit: "frustration", title: "Group Misery",
                desc: "Children bored. Friends restless. The Puja pandals are right there.",
                gradient: "from-purple-500 to-pink-500", light: "bg-purple-50", border: "border-purple-200/80",
                iconBg: "bg-purple-100 text-purple-600",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={0.12 + i * 0.08}>
                  <div className={`relative rounded-3xl p-7 sm:p-8 bg-white border ${item.border} shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col group`}>
                    {/* Gradient top bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} rounded-t-3xl`} />
                    {/* Big faded number */}
                    <div className="absolute -top-2 right-4 font-black text-8xl text-stone-100 leading-none select-none pointer-events-none">
                      {item.stat}
                    </div>
                    <div className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center mb-5`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className={`text-5xl font-black bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>{item.stat}</span>
                      <span className="text-sm text-stone-400 font-medium">{item.unit}</span>
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </div>

      {/* ─────────────────────────── BRIDGE ──────────────────────────── */}
      <div className="relative bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 py-14 sm:py-16 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent" />
        </div>
        <div className="flex flex-col items-center gap-5 text-center px-4 relative z-10">
          <div className="h-10 w-px bg-gradient-to-b from-transparent via-orange-400/50 to-orange-400" />
          <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white border border-orange-200 shadow-lg shadow-orange-100 text-orange-700 font-bold text-base sm:text-lg">
            <Sparkles className="w-5 h-5 text-amber-500" />
            There&apos;s a better way.
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
          <div className="h-10 w-px bg-gradient-to-b from-orange-400 via-orange-300/50 to-transparent" />
        </div>
      </div>

      {/* ─────────────────────────── SOLUTION ────────────────────────── */}
      <div className="relative bg-[#F0FDFA] py-24 sm:py-32">
        <div aria-hidden="true" className="absolute top-0 left-0 w-96 h-96 bg-teal-200/30 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200/30 rounded-full translate-x-1/4 translate-y-1/3 blur-3xl pointer-events-none" />

        <Container size="wide" className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <FadeIn delay={0.05}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300/60 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6">
                <CheckCircle2 className="w-3.5 h-3.5" />
                The ASSO Way
              </span>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h2
                className="font-black text-stone-900 tracking-tighter leading-[0.92] mb-5"
                style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", letterSpacing: "-0.03em" }}
              >
                Your place in the queue stays.{" "}
                <span className="gradient-text-teal">You don&apos;t have to.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base sm:text-xl text-stone-500 leading-relaxed mb-4">
                Go explore. Go pandal hopping. Go grab a coffee.
              </p>
              <p className="font-bengali text-teal-700 font-bold text-xl sm:text-2xl">
                &ldquo;চলো, একটু ঘুরে আসি।&rdquo;
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* WITHOUT */}
            <FadeIn delay={0.18}>
              <div className="card-rose rounded-3xl p-7 sm:p-8 h-full flex flex-col space-y-5">
                <div className="flex items-center gap-2 pb-4 border-b border-rose-200/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-rose-600">Without ASSO</span>
                  <span className="ml-auto text-[11px] text-stone-400">The old way</span>
                </div>
                <div className="space-y-3 flex-1">
                  {[
                    { label: "Standing at the door", detail: "45+ min on the pavement, going nowhere" },
                    { label: "Zero queue visibility", detail: "Constantly asking: \"Are we next?\"" },
                    { label: "Missing Puja", detail: "Pandals are right there. You're stuck here." },
                  ].map((item) => (
                    <div key={item.label} className="p-3.5 rounded-2xl bg-white/60 border border-rose-200/50 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                        <span className="text-sm font-semibold text-stone-800">{item.label}</span>
                      </div>
                      <p className="text-xs text-stone-500 pl-3.5">{item.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-rose-500 italic pt-3 border-t border-rose-200/60">&ldquo;Why are we still standing here?&rdquo;</p>
              </div>
            </FadeIn>

            {/* WITH ASSO */}
            <FadeIn delay={0.28}>
              <div className="card-emerald rounded-3xl p-7 sm:p-8 h-full flex flex-col space-y-5">
                <div className="flex items-center gap-2 pb-4 border-b border-emerald-200/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">With ASSO</span>
                  <span className="ml-auto text-[11px] text-stone-400">Smart Dining</span>
                </div>
                <div className="space-y-3 flex-1">
                  {[
                    { label: "Virtual spot secured", detail: "#27 in queue • ~45 min remaining", icon: CheckCircle2, color: "text-emerald-600" },
                    { label: "Go enjoy the festival", detail: "Pandals, coffee, photos, shopping...", icon: MapPin, color: "text-teal-600" },
                    { label: "Get notified when ready", detail: "Live alert to your phone when it's your turn", icon: Bell, color: "text-amber-600" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="p-3.5 rounded-2xl bg-white/60 border border-emerald-200/50 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-3.5 h-3.5 ${item.color} flex-shrink-0`} />
                          <span className="text-sm font-semibold text-stone-800">{item.label}</span>
                        </div>
                        <p className="text-xs text-stone-500 pl-5">{item.detail}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {[
                    { icon: MapPin, label: "🛕 Pandal hop" },
                    { icon: Camera, label: "📸 Reel it" },
                    { icon: Coffee, label: "☕ Street chai" },
                    { icon: ShoppingBag, label: "🛍️ Shopping" },
                  ].map((a) => {
                    const Icon = a.icon;
                    return (
                      <div key={a.label} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 border border-emerald-200/40 text-xs text-stone-600 font-medium">
                        <Icon className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                        <span>{a.label}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-sm font-bold text-emerald-700 pt-2 border-t border-emerald-200/60">More Puja. Less waiting. ✨</p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </div>
    </section>
  );
}
