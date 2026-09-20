"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AssoLogoProps {
  variant?: "light" | "dark"; // light = for dark backgrounds, dark = for light backgrounds
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

const SIZES = {
  sm: { mark: "h-7", text: "text-2xl", o: "w-7 h-7", tag: "text-[8px]" },
  md: { mark: "h-8", text: "text-3xl", o: "w-8 h-8", tag: "text-[10px]" },
  lg: { mark: "h-10", text: "text-4xl", o: "w-10 h-10", tag: "text-[11px]" },
} as const;

/**
 * ASSO brand lockup recreated from the official logo:
 * - Geometric "A" with teal slash + dot
 * - Bold "SS" wordmark
 * - Gradient-ring "O" with POS-terminal mark inside
 * - Optional "BUSINESS MANAGEMENT & Q" tagline
 */
export function AssoLogo({
  variant = "light",
  size = "md",
  showTagline = false,
  className,
}: AssoLogoProps) {
  const s = SIZES[size];
  const wordColor = variant === "light" ? "text-white" : "text-[#0A1931]";
  const tagColor = variant === "light" ? "text-slate-300" : "text-[#0A1931]/70";
  const lineColor = variant === "light" ? "bg-white/20" : "bg-[#0A1931]/15";

  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className="inline-flex items-center gap-[3px]">
        {/* A mark */}
        <svg
          viewBox="0 0 32 32"
          className={cn(s.mark, "w-auto shrink-0")}
          fill="none"
          aria-hidden
        >
          {/* Main A */}
          <path
            d="M16 3 L28 29 H22.8 L16 13.5 L12.6 20.5 H16.2 L18.4 25 H9.5 L4 29 H0L16 3Z"
            fill={variant === "light" ? "#FFFFFF" : "#0A1931"}
          />
          {/* Teal slash on left leg */}
          <path d="M2.5 21.5 L8.5 21.5 L5 29 H0.5 L2.5 21.5Z" fill="#0EA5C6" />
          {/* Teal dot */}
          <circle cx="13.5" cy="23" r="3" fill="#0EA5C6" />
        </svg>

        {/* SS */}
        <span
          className={cn(
            s.text,
            wordColor,
            "font-black tracking-[-0.06em] -ml-[2px] font-sans"
          )}
        >
          SS
        </span>

        {/* O — gradient ring + POS terminal */}
        <span
          className={cn(
            s.o,
            "relative inline-flex items-center justify-center rounded-full shrink-0 -ml-[1px]"
          )}
          style={{
            background:
              "conic-gradient(from 40deg, #0EA5C6, #2563EB 45%, #7C3AED 75%, #0EA5C6)",
            padding: "2.5px",
          }}
        >
          {/* gap notch like the original */}
          <span className="absolute -top-[1px] -right-[1px] w-[7px] h-[7px] bg-[#060B18] rounded-full" />
          <span
            className={cn(
              "w-full h-full rounded-full flex items-center justify-center",
              variant === "light" ? "bg-[#060B18]" : "bg-white"
            )}
          >
            {/* POS terminal glyph */}
            <svg viewBox="0 0 20 20" className="w-[68%] h-[68%]" fill="none" aria-hidden>
              <rect
                x="4"
                y="2.5"
                width="12"
                height="8.5"
                rx="1.2"
                transform="rotate(-6 10 7)"
                fill={variant === "light" ? "#FFFFFF" : "#0A1931"}
              />
              <rect
                x="5.6"
                y="4.4"
                width="8.8"
                height="5"
                transform="rotate(-6 10 7)"
                fill={variant === "light" ? "#060B18" : "#FFFFFF"}
              />
              <rect x="6.4" y="7.4" width="1.8" height="1.6" fill="#0EA5C6" />
              <rect x="8.8" y="6.6" width="1.8" height="2.4" fill="#2563EB" />
              <rect x="11.2" y="5.6" width="1.8" height="3.4" fill="#38BDF8" />
              <rect x="4.5" y="12" width="11" height="4" rx="1" fill={variant === "light" ? "#FFFFFF" : "#0A1931"} />
              <circle cx="10" cy="14" r="1" fill={variant === "light" ? "#060B18" : "#FFFFFF"} />
            </svg>
          </span>
        </span>
      </span>

      {showTagline && (
        <span className="mt-1.5 flex items-center gap-2">
          <span className={cn("h-px flex-1", lineColor)} />
          <span className={cn(s.tag, tagColor, "font-bold tracking-[0.18em] whitespace-nowrap")}>
            BUSINESS MANAGEMENT <span className="text-[#0EA5C6]">&</span> Q
          </span>
          <span className={cn("h-px flex-1", lineColor)} />
        </span>
      )}
    </span>
  );
}
