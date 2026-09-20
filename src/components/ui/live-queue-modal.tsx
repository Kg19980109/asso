"use client";

import * as React from "react";
import {
  X,
  Store,
  Users,
  Clock,
  QrCode,
  CheckCircle2,
  Bell,
  Sparkles,
  MapPin,
  UtensilsCrossed,
  ArrowRight,
  Share2,
} from "lucide-react";

interface LiveQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRestaurant?: string;
}

const RESTAURANTS = [
  {
    id: "oh-calcutta",
    name: "Oh! Calcutta",
    location: "Silver Spring, EM Bypass",
    cuisine: "Authentic Bengali",
    currentWait: "45 min",
    queueLength: 28,
  },
  {
    id: "peter-cat",
    name: "Peter Cat",
    location: "Park Street",
    cuisine: "Chello Kebab & Continental",
    currentWait: "60 min",
    queueLength: 42,
  },
  {
    id: "arsalan",
    name: "Arsalan",
    location: "Park Circus 7-Point",
    cuisine: "Kolkata Biryani & Mughlai",
    currentWait: "35 min",
    queueLength: 31,
  },
  {
    id: "mocambo",
    name: "Mocambo",
    location: "Park Street",
    cuisine: "Heritage Continental",
    currentWait: "50 min",
    queueLength: 36,
  },
  {
    id: "6-ballygunge",
    name: "6 Ballygunge Place",
    location: "Ballygunge",
    cuisine: "Traditional Bengali Feast",
    currentWait: "40 min",
    queueLength: 24,
  },
];

export function LiveQueueModal({ isOpen, onClose, defaultRestaurant }: LiveQueueModalProps) {
  const [step, setStep] = React.useState<"form" | "ticket">("form");
  const [selectedRest, setSelectedRest] = React.useState(
    defaultRestaurant || RESTAURANTS[0].name
  );
  const [name, setName] = React.useState("Rhitik Sen");
  const [phone, setPhone] = React.useState("+91 98765 43210");
  const [guests, setGuests] = React.useState(4);
  const [queueNumber, setQueueNumber] = React.useState(27);
  const [countdown, setCountdown] = React.useState(2700); // 45 mins in sec

  React.useEffect(() => {
    if (!isOpen) {
      setStep("form");
    }
  }, [isOpen]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "ticket" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => (c > 1 ? c - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isOpen) return null;

  const currentObj = RESTAURANTS.find((r) => r.name === selectedRest) || RESTAURANTS[0];

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s < 10 ? "0" : ""}${s}s`;
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setQueueNumber(Math.floor(Math.random() * 15) + 21);
    setStep("ticket");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0B1226] border border-white/20 rounded-3xl p-6 sm:p-7 text-white shadow-2xl overflow-hidden gold-border-glow">
        {/* Glow Header */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "form" ? (
          <div>
            {/* Modal Title */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-black text-[#38BDF8]">ASSO</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                Demo Preview
              </span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Join Digital Queue
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Sample preview of the diner experience. Restaurant names shown for illustration.
            </p>

            {/* Restaurant Selector */}
            <form onSubmit={handleJoin} className="mt-5 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Select Partner Restaurant
                </label>
                <div className="grid grid-cols-1 gap-2 max-h-36 overflow-y-auto pr-1">
                  {RESTAURANTS.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRest(r.name)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedRest === r.name
                          ? "bg-purple-600/30 border-purple-400 text-white shadow-sm"
                          : "bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.08]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-amber-400" />
                        <div>
                          <p className="text-xs font-bold leading-tight">{r.name}</p>
                          <p className="text-[10px] text-slate-400">{r.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-amber-300 block">
                          ~{r.currentWait} wait
                        </span>
                        <span className="text-[9px] text-slate-400">
                          {r.queueLength} in line
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-400"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Phone (for SMS update)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-400"
                    placeholder="+91 98765..."
                  />
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Number of Guests
                </label>
                <div className="flex items-center justify-between h-10 px-4 rounded-xl bg-white/10 border border-white/15">
                  <span className="text-xs text-slate-300">Party Size</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="w-6 h-6 rounded bg-white/15 hover:bg-white/25 flex items-center justify-center font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="font-bold text-amber-300 text-sm">{guests} People</span>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(20, g + 1))}
                      className="w-6 h-6 rounded bg-white/15 hover:bg-white/25 flex items-center justify-center font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:from-[#6D28D9] hover:to-[#DB2777] text-white font-bold text-xs shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Get Queue Token &amp; Live Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* TICKET CONFIRMATION VIEW */
          <div className="text-center py-2 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              Queue Position Confirmed
            </span>
            <h4 className="text-xl font-black text-white mt-1">{currentObj.name}</h4>
            <p className="text-[11px] text-slate-400">{currentObj.location}</p>

            {/* Glowing Big Token Card */}
            <div className="my-4 p-5 rounded-2xl bg-gradient-to-b from-white/10 to-white/[0.04] border border-white/20 shadow-inner text-center relative overflow-hidden">
              <div className="absolute top-2 right-3 text-[10px] font-mono text-slate-400">
                Token #{queueNumber}
              </div>
              <p className="text-[10px] font-bold text-slate-300 uppercase">You are</p>
              <p className="text-5xl font-black tracking-tight gradient-text-hero my-1">
                #{queueNumber}
              </p>
              <p className="text-xs font-bold text-slate-200">
                {guests} Guests • {name}
              </p>

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-around text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Est. Wait</span>
                  <span className="font-mono font-bold text-amber-300">
                    {formatTime(countdown)}
                  </span>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Tables Ahead</span>
                  <span className="font-bold text-teal-300">5 Groups</span>
                </div>
              </div>
            </div>

            {/* Suggested Activity */}
            <div className="p-3 rounded-xl bg-purple-900/30 border border-purple-500/30 text-left mb-4">
              <p className="text-[11px] font-bold text-purple-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                Nearby Recommendation:
              </p>
              <p className="text-[10px] text-slate-300 mt-1">
                Visit <strong>Santosh Mitra Square (350m away)</strong> or grab a snack. We&apos;ll send an SMS notification when you are #2!
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-colors"
              >
                Done (Keep Active)
              </button>
              <button
                onClick={() => setStep("form")}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors"
              >
                Change
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
