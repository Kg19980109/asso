"use client";

import * as React from "react";
import { Check, X, Sparkles, Store, Utensils, ArrowRight } from "lucide-react";

interface ComparisonMatrixSectionProps {
  onOpenPartner?: () => void;
}

const RESTAURANT_COMPARISONS = [
  {
    feature: "Doorway & Entrance Chaos",
    oldWay: "Anxious crowd blocking entrance; lost walkaways leave out of sheer frustration.",
    assoWay: "Calm, clear entrance. Guests wait virtually anywhere and return only when alerted.",
  },
  {
    feature: "Queue & Waitlist Handling",
    oldWay: "Paper registers, lost names, and staff repeatedly shouting names into noisy crowds.",
    assoWay: "Digital host console on any phone or laptop. 1-tap SMS alerts and automated progression.",
  },
  {
    feature: "Table Turnover & Idle Time",
    oldWay: "Tables sit empty while staff search for walkaways who gave up waiting.",
    assoWay: "Smart table recommendations match party sizes immediately; +35% faster table turns.*",
  },
  {
    feature: "Seating Configuration",
    oldWay: "Rigid seating rules with no flexibility between private parties and rush hours.",
    assoWay: "Choose Simple mode (exclusive tables) or Strict mode (seat optimization) as needed.",
  },
  {
    feature: "Kitchen & Order Velocity",
    oldWay: "Diners wait another 25+ min after sitting down before dishes are taken and fired.",
    assoWay: "Diners can pre-order signature items while waiting; food arrives piping hot upon seating.",
  },
  {
    feature: "Hardware & Upfront Cost",
    oldWay: "Expensive pager buzzers that break or proprietary hardware with steep lock-ins.",
    assoWay: "Zero hardware to buy. Runs on any existing phone, tablet, or browser with 15-min setup.",
  },
];

const DINER_COMPARISONS = [
  {
    feature: "Waiting Experience",
    oldWay: "Standing 45-90 min in heat on congested pavement outside.",
    assoWay: "Freely explore 2-3 Durga Puja pandals or enjoy street food nearby.",
  },
  {
    feature: "Queue Visibility",
    oldWay: "Zero visibility; constantly asking the restaurant manager for updates.",
    assoWay: "Live position (#27) and estimated wait time updated directly on your phone.",
  },
  {
    feature: "Food Ordering",
    oldWay: "Wait another 25+ min for cooking after being seated at the table.",
    assoWay: "Pre-order signature dishes so food is served hot right away.",
  },
  {
    feature: "Family & Elders Comfort",
    oldWay: "Tired legs, restless children, and ruined festive mood.",
    assoWay: "Comfortable stroll and smooth seating without crowd chaos.",
  },
  {
    feature: "App Requirement",
    oldWay: "Manual paper token or heavy app download.",
    assoWay: "Instant scan with any camera — works seamlessly in mobile browser.",
  },
];

export function ComparisonMatrixSection({ onOpenPartner }: ComparisonMatrixSectionProps) {
  const [activeView, setActiveView] = React.useState<"restaurants" | "diners">("restaurants");
  const comparisons = activeView === "restaurants" ? RESTAURANT_COMPARISONS : DINER_COMPARISONS;

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Clear Comparison
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900">
            Why ASSO Beats <span className="text-rose-600">Old School Waiting</span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-stone-600">
            See the measurable difference between legacy queueing and modern virtual dining.
          </p>

          {/* Perspective Switcher */}
          <div className="inline-flex items-center p-1 rounded-full bg-stone-200 border border-stone-300 mt-6 shadow-inner">
            <button
              onClick={() => setActiveView("restaurants")}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === "restaurants"
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>For Restaurants</span>
            </button>
            <button
              onClick={() => setActiveView("diners")}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === "diners"
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>For Diners</span>
            </button>
          </div>
        </div>

        {/* Table / Card Comparison */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-stone-100 border-b border-stone-200 text-xs font-black uppercase tracking-wider text-stone-700">
            <div className="md:col-span-4 p-5 hidden md:block">
              Dimension
            </div>
            <div className="md:col-span-4 p-4 sm:p-5 bg-rose-50/80 text-rose-800 flex items-center gap-2 border-b md:border-b-0 md:border-r border-rose-200">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Without ASSO (Old Way)</span>
            </div>
            <div className="md:col-span-4 p-4 sm:p-5 bg-emerald-50/80 text-emerald-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>With ASSO (Smart Way)</span>
            </div>
          </div>

          {/* Body Rows */}
          <div className="divide-y divide-stone-200 text-xs sm:text-sm">
            {comparisons.map((row) => (
              <div key={row.feature} className="grid grid-cols-1 md:grid-cols-12">
                {/* Feature Name */}
                <div className="md:col-span-4 p-4 sm:p-5 font-bold text-stone-900 bg-stone-50/50 flex items-center">
                  {row.feature}
                </div>

                {/* Old Way */}
                <div className="md:col-span-4 p-4 sm:p-5 bg-rose-50/30 text-stone-600 flex items-start gap-2.5 border-t md:border-t-0 md:border-r border-stone-200">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed">{row.oldWay}</span>
                </div>

                {/* ASSO Way */}
                <div className="md:col-span-4 p-4 sm:p-5 bg-emerald-50/30 text-stone-900 font-medium flex items-start gap-2.5 border-t md:border-t-0">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <span className="leading-relaxed font-semibold text-emerald-950">{row.assoWay}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA & Microcopy */}
        <div className="text-center mt-10">
          {onOpenPartner && (
            <button
              onClick={onOpenPartner}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] text-white font-bold text-xs shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Get Started for Your Restaurant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          <p className="text-[11px] text-stone-500 mt-2.5">
            No hardware required • Free pilot onboarding for Kolkata restaurants
          </p>
        </div>

      </div>
    </section>
  );
}
