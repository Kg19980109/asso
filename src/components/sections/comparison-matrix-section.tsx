"use client";

import * as React from "react";
import { Check, X, Sparkles } from "lucide-react";

const COMPARISONS = [
  {
    feature: "Waiting Experience",
    oldWay: "Standing 45-90 min in heat on congested pavement outside",
    assoWay: "Freely explore 2-3 Durga Puja pandals or enjoy street food",
  },
  {
    feature: "Queue Visibility",
    oldWay: "Zero visibility; constantly asking the restaurant manager",
    assoWay: "Live position (#27) and estimated wait time directly on your phone",
  },
  {
    feature: "Food Ordering",
    oldWay: "Wait another 25+ min for cooking after being seated",
    assoWay: "Pre-order signature dishes so food is served hot right away",
  },
  {
    feature: "Family & Elders Comfort",
    oldWay: "Tired legs, restless children, and ruined festive mood",
    assoWay: "Comfortable stroll and smooth seating without crowd chaos",
  },
  {
    feature: "App Requirement",
    oldWay: "Manual paper token or heavy app download",
    assoWay: "Instant scan with any camera — works seamlessly in mobile browser",
  },
];

export function ComparisonMatrixSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Comparison
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900">
            Why ASSO Beats <span className="text-rose-600">Old School Waiting</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            See the difference between standing outside and smart virtual dining.
          </p>
        </div>

        {/* Table / Card Comparison */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-stone-100 border-b border-stone-200 text-xs font-black uppercase tracking-wider text-stone-700">
            <div className="md:col-span-4 p-5 hidden md:block">
              Experience Dimension
            </div>
            <div className="md:col-span-4 p-5 bg-rose-50/80 text-rose-800 flex items-center gap-2 border-b md:border-b-0 md:border-r border-rose-200">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Without ASSO (Old Way)</span>
            </div>
            <div className="md:col-span-4 p-5 bg-emerald-50/80 text-emerald-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>With ASSO (Smart Way)</span>
            </div>
          </div>

          {/* Body Rows */}
          <div className="divide-y divide-stone-200 text-xs sm:text-sm">
            {COMPARISONS.map((row) => (
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

      </div>
    </section>
  );
}
