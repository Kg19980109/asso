"use client";

import * as React from "react";
import { Plus, Minus, ArrowRight, Sparkles, Store, Utensils } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

interface FAQItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  onOpenPartner?: () => void;
}

const RESTAURANT_FAQS: { left: FAQItem[]; right: FAQItem[] } = {
  left: [
    {
      q: "What is ASSO and how does it work for restaurants?",
      a: "ASSO is a digital queue and table management system for busy restaurants. Diners scan a QR standee at your entrance to join your virtual waitlist from their phones. Your host staff manages the queue from our simple web console, receives smart table recommendations, and notifies guests with one tap when their table is ready.",
    },
    {
      q: "Do we need new hardware or POS integration?",
      a: "No. Zero hardware to purchase and zero mandatory POS changes. The ASSO Host Console runs in any standard web browser on smartphones, tablets, or laptops your staff already owns.",
    },
    {
      q: "How fast can our restaurant get started?",
      a: "Setup takes under 20 minutes. We help configure your dining floor plan, seating preferences, and provide digital or printed QR standees for your entrance.",
    },
    {
      q: "Can we choose how tables are assigned or shared?",
      a: "Yes. ASSO supports two clear seating configurations: Simple mode keeps tables strictly exclusive to each private party, while Strict mode optimizes seat capacity when your restaurant allows shared seating during peak rush.",
    },
    {
      q: "How does pricing and onboarding work?",
      a: "Joining our Kolkata pilot is 100% free with zero setup fees. We set up your dashboard and entrance standees directly with your team. Ongoing commercial plans and tailored volume options are discussed transparently during onboarding based on your outlet size.",
    },
  ],
  right: [
    {
      q: "Can customers wait outside without crowding our entrance?",
      a: "Yes! That is the core advantage of ASSO. Guests are free to explore nearby shops, pandals, or street food. Their spot is held virtually on their mobile screen, eliminating crowded doorways.",
    },
    {
      q: "How do customers know when their table is ready?",
      a: "Diners receive automated SMS notifications and real-time live browser alerts when their table is almost ready, followed by a final call alert so they return promptly.",
    },
    {
      q: "Can ASSO recommend open tables to staff?",
      a: "Yes. The host console monitors real-time party sizes and table occupancy, suggesting the optimal open table as soon as dining parties finish.",
    },
    {
      q: "What happens during peak festival rushes?",
      a: "ASSO is engineered specifically to handle high-concurrency peak dining crowds during Durga Puja, festive seasons, and busy weekends without crashing or dropping waitlist spots.",
    },
    {
      q: "Can guests pre-order signature food while waiting?",
      a: "Yes. If your restaurant enables pre-ordering, waiting guests can choose signature dishes from your digital menu so your kitchen can fire them early and serve immediately upon seating.",
    },
  ],
};

const DINER_FAQS: { left: FAQItem[]; right: FAQItem[] } = {
  left: [
    {
      q: "Do I need to download an app to join the queue?",
      a: "No! Simply scan the ASSO QR standee with any smartphone camera and join the queue directly in your mobile browser. No app install required.",
    },
    {
      q: "Can I leave the restaurant while waiting?",
      a: "Yes! That's the entire purpose of ASSO. Your spot is held virtually. You can visit pandals, shop, or relax nearby while your table gets ready.",
    },
    {
      q: "How will I know when my table is ready?",
      a: "You'll receive an active SMS and browser alert when your table is 5–10 minutes away, and another final alert when your table is ready for seating.",
    },
  ],
  right: [
    {
      q: "Can I pre-order food while in the queue?",
      a: "Yes! Participating partner restaurants allow you to pre-order signature dishes so they are prepared and served hot right when you sit down.",
    },
    {
      q: "Can I see my live queue spot in real time?",
      a: "Yes. Your mobile screen updates in real time showing your exact queue number (#27), estimated wait time, and queue progress.",
    },
    {
      q: "Is ASSO free to use for diners?",
      a: "Yes, ASSO is 100% free for diners. No hidden booking charges or convenience fees.",
    },
  ],
};

export function FaqSection({ onOpenPartner }: FaqSectionProps) {
  const [tab, setTab] = React.useState<"restaurants" | "diners">("restaurants");
  const [openQ, setOpenQ] = React.useState<string | null>("What is ASSO and how does it work for restaurants?");

  const currentFaqs = tab === "restaurants" ? RESTAURANT_FAQS : DINER_FAQS;

  const toggle = (q: string) => {
    setOpenQ(openQ === q ? null : q);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#FBFBFB] text-stone-900 border-b border-stone-200 relative overflow-hidden content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header & Right Help Note */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900">
                Got Questions? We&apos;ve Got Answers.
              </h2>

              {/* Tabs */}
              <div className="flex items-center gap-2 mt-5">
                <button
                  onClick={() => { setTab("restaurants"); setOpenQ(null); }}
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    tab === "restaurants"
                      ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/25"
                      : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>For Restaurants</span>
                </button>
                <button
                  onClick={() => { setTab("diners"); setOpenQ(null); }}
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    tab === "diners"
                      ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/25"
                      : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>For Diners</span>
                </button>
              </div>
            </div>

            {/* Right Cursive Help Note & Button */}
            <div className="flex flex-col items-start md:items-end gap-2">
              <span className="font-script text-2xl font-bold text-stone-800 leading-tight">
                Still have questions?<br />
                We&apos;re here to help! ♡
              </span>
              {onOpenPartner && (
                <button
                  onClick={onOpenPartner}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-xs font-bold text-stone-900 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Talk to ASSO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* 2-Column Accordion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">

          {/* Column 1 */}
          <div className="space-y-3">
            {currentFaqs.left.map((item, i) => {
              const isOpen = openQ === item.q;
              return (
                <ScrollReveal key={item.q} direction="up" delay={i * 40}>
                  <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden transition-all hover:border-blue-300">
                    <button
                      onClick={() => toggle(item.q)}
                      aria-expanded={isOpen}
                      className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left font-bold text-xs sm:text-sm text-stone-900 cursor-pointer"
                    >
                      <span>{item.q}</span>
                      <span className="w-6 h-6 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 flex-shrink-0">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50 animate-in fade-in duration-200">
                        {item.a}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            {currentFaqs.right.map((item, i) => {
              const isOpen = openQ === item.q;
              return (
                <ScrollReveal key={item.q} direction="up" delay={i * 40 + 20}>
                  <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden transition-all hover:border-blue-300">
                    <button
                      onClick={() => toggle(item.q)}
                      aria-expanded={isOpen}
                      className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left font-bold text-xs sm:text-sm text-stone-900 cursor-pointer"
                    >
                      <span>{item.q}</span>
                      <span className="w-6 h-6 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 flex-shrink-0">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50 animate-in fade-in duration-200">
                        {item.a}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
