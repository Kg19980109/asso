"use client";

import * as React from "react";
import Image from "next/image";
import { X, MapPin, Sparkles, Camera, Users, Clock, Navigation } from "lucide-react";

export interface PandalItem {
  name: string;
  distance: string;
  badge: string;
  badgeColor: string;
  image: string;
  zone?: string;
  theme?: string;
  bestTime?: string;
  crowdLevel?: string;
}

interface PandalDetailModalProps {
  pandal: PandalItem | null;
  onClose: () => void;
  onJoinQueue: () => void;
}

export function PandalDetailModal({ pandal, onClose, onJoinQueue }: PandalDetailModalProps) {
  if (!pandal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0B1226] border border-white/20 rounded-3xl overflow-hidden text-white shadow-2xl gold-border-glow">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image header */}
        <div className="relative h-56 w-full">
          <Image
            src={pandal.image}
            alt={pandal.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1226] via-[#0B1226]/40 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${pandal.badgeColor} inline-block mb-1`}>
              {pandal.badge}
            </span>
            <h3 className="text-2xl font-black text-white">{pandal.name}</h3>
            <p className="text-xs text-amber-300 font-medium flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
              {pandal.distance} • {pandal.zone || "North Kolkata Hub"}
            </p>
          </div>
        </div>

        {/* Modal content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10">
              <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block">Best Time</span>
              <span className="font-bold text-slate-200">{pandal.bestTime || "6:30 PM - 8 PM"}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10">
              <Users className="w-4 h-4 text-rose-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block">Crowd Level</span>
              <span className="font-bold text-rose-300">{pandal.crowdLevel || "Moderate (Fast moving)"}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10">
              <Camera className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block">Photo Spot</span>
              <span className="font-bold text-purple-300">Front Mandap</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 space-y-1">
            <p className="font-bold text-white flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              ASSO Puja Tip:
            </p>
            <p className="text-[11px] leading-relaxed">
              Join the restaurant queue on ASSO first before entering the pandal queue. By the time you complete your darshan and photos, your dining table will be ready!
            </p>
          </div>

          <div className="flex gap-2.5 pt-2">
            <button
              onClick={() => {
                onClose();
                onJoinQueue();
              }}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:from-[#6D28D9] hover:to-[#DB2777] text-white font-bold text-xs shadow-lg transition-all"
            >
              Join Nearby Restaurant Queue
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
