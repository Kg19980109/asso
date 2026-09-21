"use client";

import * as React from "react";
import { Sparkles, UtensilsCrossed, Users, CheckCircle2, X } from "lucide-react";

const LIVE_EVENTS = [
  {
    icon: Users,
    text: "Sayak & 3 friends joined queue #28 at Calcutta Grand Dining",
    loc: "Silver Spring • 2m ago",
    color: "text-blue-400",
  },
  {
    icon: UtensilsCrossed,
    text: "Pre-order placed: 2x Kolkata Biryani + Fish Fry",
    loc: "Royal Biryani House, Park Circus • 4m ago",
    color: "text-amber-400",
  },
  {
    icon: CheckCircle2,
    text: "Table #12 seated for Priya Roy & party",
    loc: "The Heritage Pavilion, Park Street • Just now",
    color: "text-emerald-400",
  },
  {
    icon: Sparkles,
    text: "Sneha saved 48 mins at Sreebhumi pandal",
    loc: "Lake Town • 6m ago",
    color: "text-purple-400",
  },
];

export function LiveActivityTicker({ onOpenQueue }: { onOpenQueue: () => void }) {
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (dismissed) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % LIVE_EVENTS.length);
        setVisible(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const current = LIVE_EVENTS[index];
  const Icon = current.icon;

  return (
    <div
      className={`fixed bottom-5 left-5 z-40 max-w-xs sm:max-w-sm transition-all duration-500 transform ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-[#090F22]/95 backdrop-blur-md border border-white/20 rounded-2xl p-3 shadow-2xl flex items-center gap-3 text-white gold-border-glow">
        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
          <Icon className={`w-4 h-4 ${current.color}`} />
        </div>

        <div className="flex-1 min-w-0 cursor-pointer" onClick={onOpenQueue}>
          <p className="text-[11px] font-bold text-slate-100 leading-snug truncate">
            {current.text}
          </p>
          <p className="text-[9px] text-amber-300/90 font-mono mt-0.5">
            {current.loc}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setDismissed(true);
          }}
          className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
