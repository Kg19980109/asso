"use client";

import * as React from "react";
import { X, QrCode, Smartphone, Apple, Play, Send, CheckCircle2, Star } from "lucide-react";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [sent, setSent] = React.useState(false);

  if (!isOpen) return null;

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length >= 10) {
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#090F22] border border-white/20 rounded-3xl p-6 sm:p-7 text-white shadow-2xl overflow-hidden gold-border-glow">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[11px] font-bold mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Available on iOS &amp; Android</span>
          </div>

          <h3 className="text-2xl font-black text-white tracking-tight">
            Download <span className="gradient-text-hero">ASSO</span> App
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
            Scan QR code with your phone camera or get the direct download link via SMS.
          </p>

          {/* QR Code Container */}
          <div className="my-5 p-4 bg-white rounded-2xl inline-block shadow-xl border-4 border-purple-500/20">
            <div className="w-36 h-36 relative flex flex-col items-center justify-center bg-stone-900 rounded-xl p-2 text-white">
              <QrCode className="w-28 h-28 text-white" />
              <span className="text-[9px] font-bold text-amber-300 tracking-wider uppercase mt-1">
                Scan to Install
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 text-xs text-amber-400 font-bold mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-slate-200 ml-1">4.9/5 • 45,000+ Kolkata Diners</span>
          </div>

          {/* SMS Link Form */}
          <form onSubmit={handleSendLink} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                className="flex-1 h-10 px-3.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-400"
              />
              <button
                type="submit"
                className="px-4 h-10 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
            {sent && (
              <p className="text-[11px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Link sent successfully via SMS!
              </p>
            )}
          </form>

          {/* Store Buttons */}
          <div className="grid grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer text-left transition-all">
              <Apple className="w-6 h-6 text-white" />
              <div>
                <p className="text-[9px] text-slate-400 leading-none">Download on</p>
                <p className="text-xs font-bold text-white leading-tight mt-0.5">App Store</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 cursor-pointer text-left transition-all">
              <Play className="w-5 h-5 text-emerald-400 fill-emerald-400" />
              <div>
                <p className="text-[9px] text-slate-400 leading-none">Get it on</p>
                <p className="text-xs font-bold text-white leading-tight mt-0.5">Google Play</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
