import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "saffron"
    | "gold"
    | "teal"
    | "rose"
    | "purple"
    | "emerald"
    | "neutral"
    | "white"
    | "festive"
    | "electric"
    | "success";
  size?: "sm" | "md" | "lg";
}

export function Badge({
  className,
  variant = "saffron",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 font-bold rounded-full tracking-wider uppercase select-none transition-all";

  const variants: Record<string, string> = {
    saffron:  "bg-orange-100 text-orange-700 border border-orange-300/60",
    festive:  "bg-orange-100 text-orange-700 border border-orange-300/60",
    gold:     "bg-amber-100  text-amber-700  border border-amber-300/60",
    teal:     "bg-teal-100   text-teal-700   border border-teal-300/60",
    electric: "bg-sky-100    text-sky-700    border border-sky-300/60",
    rose:     "bg-rose-100   text-rose-700   border border-rose-300/60",
    purple:   "bg-violet-100 text-violet-700 border border-violet-300/60",
    emerald:  "bg-emerald-100 text-emerald-700 border border-emerald-300/60",
    success:  "bg-emerald-100 text-emerald-700 border border-emerald-300/60",
    neutral:  "bg-stone-100  text-stone-600  border border-stone-200",
    white:    "bg-white/20 text-white border border-white/40 backdrop-blur-sm",
  };

  const sizes = {
    sm: "text-[10px] px-2.5 py-0.5",
    md: "text-[11px] px-3 py-1",
    lg: "text-xs px-3.5 py-1.5",
  };

  return (
    <span className={cn(base, variants[variant] || variants.saffron, sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
