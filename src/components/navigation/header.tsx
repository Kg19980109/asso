"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Sparkles, Flame } from "lucide-react";
import { AssoLogo } from "@/components/brand/asso-logo";

interface HeaderProps {
  onOpenDownload?: () => void;
  onOpenQueue?: () => void;
}

export function Header({ onOpenDownload, onOpenQueue }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060B18]/95 backdrop-blur-xl border-b border-white/15 shadow-xl shadow-black/40 py-2.5"
          : "bg-[#060B18]/80 backdrop-blur-md border-b border-white/10 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo — official ASSO brand mark (white variant for dark header).
            To use the exact PNG you shared, save it as public/images/asso-logo.png
            and swap <AssoLogo> for <Image src="/images/asso-logo.png" ... className="brightness-0 invert" /> */}
        <Link href="/" className="flex flex-col group" aria-label="ASSO home">
          <div className="flex items-center gap-2">
            <AssoLogo variant="light" size="sm" className="group-hover:opacity-90 transition-opacity" />
            <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Flame className="w-2.5 h-2.5 text-rose-400 fill-rose-400" />
              Puja 2026 Live
            </span>
          </div>
          <span className="text-[10px] text-slate-300 font-medium tracking-tight -mt-0.5">
            Skip the queue. Enjoy more.
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="#for-diners"
            className="text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors"
          >
            For Diners
          </Link>
          <Link
            href="#how-it-works"
            className="text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#pandals"
            className="text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors"
          >
            Pandals &amp; Food
          </Link>
          <Link
            href="#for-restaurants"
            className="text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors"
          >
            For Restaurants
          </Link>
          <Link
            href="#testimonials"
            className="text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors"
          >
            Diner Stories
          </Link>
          <Link
            href="#faq"
            className="text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* Right CTA Button - Primary Join Queue */}
        <div className="hidden md:flex items-center">
          {onOpenQueue && (
            <button
              onClick={onOpenQueue}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#6D28D9] hover:to-[#7C3AED] text-white font-bold text-xs shadow-lg shadow-purple-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Join Queue</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/10 text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#060B18]/98 backdrop-blur-2xl border-b border-white/15 px-5 pt-4 pb-6 space-y-3.5 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="#for-diners"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-200 hover:text-amber-300 py-1"
          >
            For Diners
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-200 hover:text-amber-300 py-1"
          >
            How It Works
          </Link>
          <Link
            href="#pandals"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-200 hover:text-amber-300 py-1"
          >
            Pandals &amp; Food
          </Link>
          <Link
            href="#for-restaurants"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-200 hover:text-amber-300 py-1"
          >
            For Restaurants
          </Link>
          <Link
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-200 hover:text-amber-300 py-1"
          >
            Diner Stories
          </Link>
          <Link
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-200 hover:text-amber-300 py-1"
          >
            FAQ
          </Link>

          <div className="pt-2">
            {onOpenQueue && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQueue();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white font-bold text-xs shadow-lg shadow-purple-500/30 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Join Live Queue</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
