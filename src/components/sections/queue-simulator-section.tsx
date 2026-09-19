"use client";

import * as React from "react";
import {
  Sparkles,
  Users,
  Clock,
  Bell,
  CheckCircle2,
  UtensilsCrossed,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

export function QueueSimulatorSection() {
  const [restaurant, setRestaurant] = React.useState("6 Ballygunge Place");
  const [partySize, setPartySize] = React.useState(4);
  const [preorder, setPreorder] = React.useState(true);
  const [status, setStatus] = React.useState<"idle" | "joined" | "notified">("idle");
  const [queueSpot, setQueueSpot] = React.useState(27);
  const [countdown, setCountdown] = React.useState(15);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("joined");
    setQueueSpot(Math.floor(Math.random() * 10) + 18);
    setCountdown(10);
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === "joined" && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
        if (countdown % 3 === 0 && queueSpot > 1) {
          setQueueSpot((prev) => Math.max(1, prev - 1));
        }
      }, 1000);
    } else if (status === "joined" && countdown === 0) {
      setStatus("notified");
    }
    return () => clearTimeout(timer);
  }, [status, countdown, queueSpot]);

  const handleReset = () => {
    setStatus("idle");
    setCountdown(10);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#0B1228] text-white overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Interactive Demo
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Experience ASSO in <span className="gradient-text-hero">10 Seconds</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Try how joining a queue, pre-ordering, and getting called to your table works in real time.
          </p>
        </div>

        {/* Simulator Container */}
        <div className="max-w-4xl mx-auto bg-[#070D1E] rounded-3xl border border-white/15 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

            {/* Left Column: Controls */}
            <div className="md:col-span-6 space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Select Your Dining Plan</span>
              </h3>

              <div className="space-y-4">
                {/* Select Restaurant */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Restaurant
                  </label>
                  <select
                    value={restaurant}
                    onChange={(e) => setRestaurant(e.target.value)}
                    disabled={status !== "idle"}
                    className="w-full h-11 px-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-blue-400 cursor-pointer disabled:opacity-50"
                  >
                    <option value="6 Ballygunge Place" className="bg-slate-900">6 Ballygunge Place (Ballygunge)</option>
                    <option value="Peter Cat" className="bg-slate-900">Peter Cat (Park Street)</option>
                    <option value="Oudh 1590" className="bg-slate-900">Oudh 1590 (Deshapriya Park)</option>
                    <option value="Arsalan" className="bg-slate-900">Arsalan (Park Circus)</option>
                  </select>
                </div>

                {/* Party Size */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Party Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[2, 4, 6].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setPartySize(size)}
                        disabled={status !== "idle"}
                        className={`h-10 rounded-xl font-bold text-xs transition-all ${
                          partySize === size
                            ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/30"
                            : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                        } disabled:opacity-50`}
                      >
                        {size} Guests
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pre-order toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <UtensilsCrossed className="w-4 h-4 text-orange-400" />
                    <div>
                      <p className="text-xs font-bold text-white">Pre-order Signature Dishes</p>
                      <p className="text-[10px] text-slate-400">Plated piping hot upon arrival</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preorder}
                    onChange={(e) => setPreorder(e.target.checked)}
                    disabled={status !== "idle"}
                    className="w-4 h-4 accent-blue-500 cursor-pointer disabled:opacity-50"
                  />
                </div>

                {/* Actions */}
                {status === "idle" ? (
                  <button
                    onClick={handleJoin}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Get My Virtual Spot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Simulator</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Interactive Phone Screen Display */}
            <div className="md:col-span-6 flex justify-center">
              <div className="w-full max-w-xs bg-[#030712] rounded-[2rem] p-3 border-2 border-white/20 shadow-2xl">
                <div className="rounded-[1.6rem] bg-[#0A1024] p-4 border border-white/10 space-y-4">

                  {/* Phone Header */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-white/10 pb-2">
                    <span className="font-mono font-bold">9:41</span>
                    <span className="font-black text-[#38BDF8]">ASSO LIVE</span>
                  </div>

                  {status === "idle" && (
                    <div className="py-8 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto">
                        <Users className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-white">Ready to join?</p>
                      <p className="text-xs text-slate-400">Click &ldquo;Get My Virtual Spot&rdquo; to simulate live queue tracking.</p>
                    </div>
                  )}

                  {status === "joined" && (
                    <div className="space-y-3 animate-in fade-in duration-300">
                      <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
                        <p className="text-[10px] text-blue-300 uppercase font-bold tracking-wider">{restaurant}</p>
                        <p className="text-4xl font-black text-white tracking-tight my-1">#{queueSpot}</p>
                        <p className="text-[11px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Spot secured • Party of {partySize}
                        </p>
                      </div>

                      {preorder && (
                        <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[11px] text-orange-300 flex items-center gap-2">
                          <UtensilsCrossed className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                          <span>Pre-ordered dishes queued in kitchen</span>
                        </div>
                      )}

                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                        <p className="text-[10px] text-slate-400">Simulated Table Notification in</p>
                        <p className="text-lg font-black text-amber-300 font-mono">{countdown}s</p>
                      </div>
                    </div>
                  )}

                  {status === "notified" && (
                    <div className="space-y-3 animate-in zoom-in-95 duration-300">
                      <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center mx-auto mb-2 shadow-lg">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h4 className="text-sm font-black text-white">Table Ready! 🔔</h4>
                        <p className="text-xs text-emerald-300 mt-0.5">Please proceed to {restaurant}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white text-stone-900 text-left shadow-lg">
                        <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold text-indigo-700">
                          <Bell className="w-3.5 h-3.5" />
                          <span>ASSO Notification</span>
                        </div>
                        <p className="text-xs font-bold">Your table for {partySize} is waiting.</p>
                        {preorder && (
                          <p className="text-[10px] text-stone-600 mt-0.5">Food will be served within 2 minutes!</p>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
