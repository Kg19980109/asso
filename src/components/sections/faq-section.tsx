"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Minus, ArrowRight, Search, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

interface FAQItem {
  q: string;
  a: string;
}

const DINER_FAQS: { left: FAQItem[]; right: FAQItem[] } = {
  left: [
    {
      q: "Do I need to download the app?",
      a: "No! You can simply scan the ASSO QR standee with any smartphone camera and join the queue directly in your browser. The app is optional for power users who want faster saved preferences and instant push alerts.",
    },
    {
      q: "Can I leave the restaurant after joining the queue?",
      a: "Yes! That's the entire purpose of ASSO. Your spot is held virtually. You can visit pandals, shop, or grab street food while your table gets ready.",
    },
    {
      q: "How will I know when my table is ready?",
      a: "You'll receive an active SMS and push notification when your table is 10 minutes away, and another final alert when your table is ready for seating.",
    },
  ],
  right: [
    {
      q: "Can I pre-order food?",
      a: "Yes! Many partner restaurants allow you to pre-order signature dishes like Biryani, Fish Fry, and Kebabs so they are served piping hot right when you sit down.",
    },
    {
      q: "Can I see my live queue position?",
      a: "Yes. Your mobile screen updates in real time showing your exact queue number (#27), estimated wait time, and queue progress.",
    },
    {
      q: "Is ASSO free to use?",
      a: "Yes, ASSO is 100% free for diners. No hidden booking charges or convenience fees.",
    },
  ],
};

const RESTAURANT_FAQS: { left: FAQItem[]; right: FAQItem[] } = {
  left: [
    {
      q: "How do restaurant staff manage queues?",
      a: "Host staff use the ASSO Host Console on any tablet, phone, or laptop to view waiting parties, call next guests, and manage table turnover with a single tap.",
    },
    {
      q: "How fast can my restaurant go live?",
      a: "Setup takes under 24 hours. Our Kolkata team delivers your custom standees and configures your digital host console.",
    },
    {
      q: "Does ASSO work during peak festive rushes?",
      a: "Yes, ASSO is engineered specifically to handle high-concurrency peak dining crowds during Durga Puja and weekend rushes.",
    },
  ],
  right: [
    {
      q: "Can we configure grace periods for late guests?",
      a: "Yes. You can configure custom grace periods (e.g. 5–10 minutes) and automated re-notifying according to your seating policy.",
    },
    {
      q: "Do we need special hardware?",
      a: "No. Any existing tablet, computer, or smartphone with an internet connection works seamlessly.",
    },
    {
      q: "How do pre-orders reach our kitchen?",
      a: "Pre-orders show up directly on your host dashboard and can be printed or integrated with your existing kitchen order workflow.",
    },
  ],
};

export function FaqSection() {
  const [tab, setTab] = React.useState<"diners" | "restaurants">("diners");
  const [openQ, setOpenQ] = React.useState<string | null>("Do I need to download the app?");
  const [searchQuery, setSearchQuery] = React.useState("");

  const currentFaqs = tab === "diners" ? DINER_FAQS : RESTAURANT_FAQS;

  const toggle = (q: string) => {
    setOpenQ(openQ === q ? null : q);
  };

  const filterList = (items: FAQItem[]) =>
    items.filter(
      (item) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const leftFiltered = filterList(currentFaqs.left);
  const rightFiltered = filterList(currentFaqs.right);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#FBFBFB] text-stone-900 border-b border-stone-200 relative overflow-hidden content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header & Right Cursive Note */}
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
                  onClick={() => { setTab("diners"); setOpenQ(null); }}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    tab === "diners"
                      ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/25"
                      : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  For Diners
                </button>
                <button
                  onClick={() => { setTab("restaurants"); setOpenQ(null); }}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    tab === "restaurants"
                      ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/25"
                      : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  For Restaurants
                </button>
              </div>
            </div>

            {/* Right Cursive Help Note & Button */}
            <div className="flex flex-col items-start md:items-end gap-2">
              <span className="font-script text-2xl font-bold text-stone-800 leading-tight">
                Still have questions?<br />
                We&apos;re here to help! ♡
              </span>
              <Link
                href="#download"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-xs font-bold text-stone-900 shadow-xs transition-colors"
              >
                <span>View All FAQs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* 2-Column Accordion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">

          {/* Column 1 */}
          <div className="space-y-3">
            {leftFiltered.map((item, i) => {
              const isOpen = openQ === item.q;
              return (
                <ScrollReveal key={item.q} direction="up" delay={i * 50}>
                  <div
                    className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden transition-all hover:border-blue-300"
                  >
                    <button
                      onClick={() => toggle(item.q)}
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
            {rightFiltered.map((item, i) => {
              const isOpen = openQ === item.q;
              return (
                <ScrollReveal key={item.q} direction="up" delay={i * 50 + 40}>
                  <div
                    className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden transition-all hover:border-blue-300"
                  >
                    <button
                      onClick={() => toggle(item.q)}
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
