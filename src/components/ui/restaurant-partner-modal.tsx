"use client";

import * as React from "react";
import {
  X,
  Store,
  Calculator,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface RestaurantPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RestaurantPartnerModal({ isOpen, onClose }: RestaurantPartnerModalProps) {
  const [restaurantName, setRestaurantName] = React.useState("");
  const [ownerName, setOwnerName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [tables, setTables] = React.useState(25);
  const [avgTicket, setAvgTicket] = React.useState(1200);
  const [submitted, setSubmitted] = React.useState(false);

  if (!isOpen) return null;

  // Calculation: Turning 2 extra tables per evening during 6 days of Durga Puja
  const extraTablesPerDay = tables * 1.5;
  const extraPujaRevenue = Math.round(extraTablesPerDay * avgTicket * 6);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#090F22] border border-white/20 rounded-3xl p-6 sm:p-7 text-white shadow-2xl overflow-hidden gold-border-glow max-h-[90vh] overflow-y-auto">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold uppercase tracking-wider">
                Restaurant Partner Program
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              List Your Restaurant for <span className="gradient-text-pink">Puja 2026</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Zero hardware required. Go live in 20 minutes with our smart host console.
            </p>

            {/* Interactive Puja Revenue Calculator Card */}
            <div className="my-5 p-4 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  Estimated Puja Revenue Gain
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Illustrative estimate
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">
                    Number of Dining Tables: <span className="text-white">{tables}</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    value={tables}
                    onChange={(e) => setTables(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">
                    Avg Bill Per Table: <span className="text-white">₹{avgTicket}</span>
                  </label>
                  <input
                    type="range"
                    min="400"
                    max="4000"
                    step="100"
                    value={avgTicket}
                    onChange={(e) => setAvgTicket(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-300">Illustrative extra earnings (not a guarantee):</span>
                <span className="text-xl font-black text-emerald-400 font-mono">
                  +₹{extraPujaRevenue.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Restaurant Name &amp; Area
                </label>
                <input
                  type="text"
                  required
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  placeholder="e.g. Aminia, Golpark"
                  className="w-full h-10 px-3.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Manager / Owner Name
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Your name"
                    className="w-full h-10 px-3.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Direct Contact Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98..."
                    className="w-full h-10 px-3.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Includes dedicated onboarding executive on-site for Saptami to Dashami.</span>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Request Free Demo &amp; Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* SUCCESS VIEW */
          <div className="text-center py-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-black text-white">Application Received!</h4>
            <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto">
              Our Kolkata onboarding team will contact you within <strong>2 business hours</strong> to set up your restaurant dashboard and send promotional QR tent cards.
            </p>
            <div className="my-5 p-4 rounded-xl bg-white/10 text-left text-xs space-y-1">
              <p><strong className="text-slate-400">Restaurant:</strong> {restaurantName || "Oh! Calcutta"}</p>
              <p><strong className="text-slate-400">Contact:</strong> {phone || "+91 98765 43210"}</p>
              <p><strong className="text-slate-400">Estimated Puja Boost:</strong> <span className="text-emerald-400 font-bold">+₹{extraPujaRevenue.toLocaleString("en-IN")}</span></p>
            </div>
            <button
              onClick={onClose}
              className="px-8 py-2.5 rounded-xl bg-[#6366F1] text-white font-bold text-xs hover:bg-[#4F46E5] transition-colors"
            >
              Back to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
