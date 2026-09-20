"use client";

import * as React from "react";
import { Star, Quote, CheckCircle2, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const TESTIMONIALS = [
  {
    name: "Ananya D.",
    location: "Salt Lake, Kolkata",
    text: "We explored 2 pandals while waiting for our table at Oh! Calcutta. Such a smart and easy experience!",
    avatar: "AD",
    avatarBg: "bg-gradient-to-tr from-pink-500 to-rose-400",
    date: "Ashtami Night",
  },
  {
    name: "Ritwick S.",
    location: "Park Street, Kolkata",
    text: "Pre-ordering is a complete game changer. Food was served piping hot 5 minutes after sitting down. No more hungry waiting!",
    avatar: "RS",
    avatarBg: "bg-gradient-to-tr from-blue-500 to-indigo-600",
    date: "Navami Evening",
  },
  {
    name: "Sneha M.",
    location: "Gariahat, Kolkata",
    text: "Finally a solution for chaotic restaurant queues in Kolkata during Durga Puja. Must-have app for every foodie!",
    avatar: "SM",
    avatarBg: "bg-gradient-to-tr from-teal-500 to-emerald-400",
    date: "Saptami Dinner",
  },
];

export function TestimonialsSection() {
  const [activeDot, setActiveDot] = React.useState(1);

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white text-stone-900 border-b border-stone-200 relative overflow-hidden content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold mb-3 shadow-xs">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Loved by 45,000+ Kolkata Diners</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900">
              What Diners Say
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              Real stories from real Puja food lovers across Kolkata.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.name} direction="up" delay={i * 80}>
              <div
                onClick={() => setActiveDot(i)}
                className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer h-full ${
                  activeDot === i
                    ? "border-purple-400 shadow-2xl scale-[1.03] ring-2 ring-purple-400/20"
                    : "border-stone-200 shadow-sm hover:shadow-lg hover:border-stone-300"
                }`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-full ${t.avatarBg} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
                        {t.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-stone-900">{t.name}</h3>
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                        </div>
                        <p className="text-[10px] text-stone-500">{t.location}</p>
                      </div>
                    </div>
                    <Quote className="w-5 h-5 text-purple-200" />
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                    <span className="text-[10px] font-bold text-stone-400 ml-1.5">{t.date}</span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed font-normal">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-orange-600">— {t.name}</span>
                  <span className="text-[10px] text-stone-400">Verified Diner</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveDot(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeDot === i ? "w-7 bg-[#2563EB]" : "w-2 bg-stone-300 hover:bg-stone-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
