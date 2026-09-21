"use client";

import * as React from "react";
import Image from "next/image";
import { FestiveParticles } from "@/components/ui/festive-particles";

interface HeroSectionProps {
  onOpenConnect?: () => void;
  onOpenQueue?: () => void;
}

export function HeroSection({ onOpenConnect, onOpenQueue }: HeroSectionProps) {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="for-diners"
      className="relative min-h-screen pt-16 sm:pt-20 pb-16 bg-[#060B18] text-white overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Golden Festive Bokeh Particles */}
      <FestiveParticles />

      {/* Ambient background glows to blend seamless with dark navy theme */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(closest-side,rgba(168,85,247,0.22),transparent)] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[650px] h-[650px] bg-[radial-gradient(closest-side,rgba(245,158,11,0.18),transparent)] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[550px] h-[550px] bg-[radial-gradient(closest-side,rgba(56,189,248,0.16),transparent)] pointer-events-none" />

      {/* Exact Design Canvas */}
      <div className="relative z-10 w-full max-w-[470px] sm:max-w-[490px] mx-auto px-3 sm:px-0">
        <div className="relative rounded-[36px] overflow-hidden shadow-2xl shadow-purple-950/60 border border-white/10 bg-[#060B18]">
          
          {/* Exact Artwork provided by user */}
          <Image
            src="/images/hero-exact-showcase.png"
            alt="ASSO — Dine Without The Wait. Explore More. Kolkata's Smart Dining Companion"
            width={470}
            height={1024}
            priority
            className="w-full h-auto select-none pointer-events-none block"
          />

          {/* ── Interactive Hotspot Overlays (Matched 1:1 to artwork buttons) ── */}

          {/* 1. Header: For Diners Switcher */}
          <button
            type="button"
            onClick={() => handleScrollTo("for-diners")}
            aria-label="For Diners"
            className="absolute left-[41.5%] top-[1.8%] w-[18%] h-[3.2%] rounded-full cursor-pointer transition-opacity hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* 2. Header: For Restaurants Switcher */}
          <button
            type="button"
            onClick={() => {
              if (onOpenConnect) onOpenConnect();
              else handleScrollTo("for-restaurants");
            }}
            aria-label="For Restaurants"
            className="absolute left-[60%] top-[1.8%] w-[24%] h-[3.2%] rounded-full cursor-pointer transition-opacity hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          {/* 3. Primary CTA Button: Join Live Queue Demo ➔ */}
          <button
            type="button"
            onClick={onOpenQueue}
            aria-label="Join Live Queue Demo"
            className="absolute left-[5.2%] top-[39.2%] w-[50%] h-[4.2%] rounded-full cursor-pointer transition-all hover:brightness-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* 4. Secondary CTA Button: Find Restaurants Near You */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("pandals");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else if (onOpenConnect) onOpenConnect();
            }}
            aria-label="Find Restaurants Near You"
            className="absolute left-[5.2%] top-[44%] w-[50%] h-[4.2%] rounded-full cursor-pointer transition-all hover:bg-white/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* 5. Smartphone Screen: View Live Status Button */}
          <button
            type="button"
            onClick={onOpenQueue}
            aria-label="View Live Status"
            className="absolute left-[62.8%] top-[55.7%] w-[27.6%] h-[3.3%] rounded-xl cursor-pointer transition-all hover:brightness-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* 6. Popular Near You — Card 1: Santosh Mitra Square */}
          <button
            type="button"
            onClick={() => handleScrollTo("pandals")}
            aria-label="Santosh Mitra Square"
            className="absolute left-[6.8%] top-[72.8%] w-[21.5%] h-[8.5%] rounded-2xl cursor-pointer transition-all hover:ring-2 hover:ring-cyan-400/80"
          />

          {/* 7. Popular Near You — Card 2: College Square */}
          <button
            type="button"
            onClick={() => handleScrollTo("pandals")}
            aria-label="College Square"
            className="absolute left-[29.8%] top-[72.8%] w-[21.5%] h-[8.5%] rounded-2xl cursor-pointer transition-all hover:ring-2 hover:ring-cyan-400/80"
          />

          {/* 8. Popular Near You — Card 3: Hatibagan */}
          <button
            type="button"
            onClick={() => handleScrollTo("pandals")}
            aria-label="Hatibagan"
            className="absolute left-[52.8%] top-[72.8%] w-[21.5%] h-[8.5%] rounded-2xl cursor-pointer transition-all hover:ring-2 hover:ring-cyan-400/80"
          />

          {/* 9. Popular Near You — Card 4: Sreebhumi */}
          <button
            type="button"
            onClick={() => handleScrollTo("pandals")}
            aria-label="Sreebhumi"
            className="absolute left-[75.8%] top-[72.8%] w-[19%] h-[8.5%] rounded-2xl cursor-pointer transition-all hover:ring-2 hover:ring-cyan-400/80"
          />

          {/* 10. Scroll to Explore Indicator */}
          <button
            type="button"
            onClick={() => handleScrollTo("how-it-works")}
            aria-label="Scroll to explore"
            className="absolute left-[38%] top-[93%] w-[24%] h-[5%] rounded-full cursor-pointer hover:opacity-80 transition-opacity"
          />

        </div>
      </div>
    </section>
  );
}
