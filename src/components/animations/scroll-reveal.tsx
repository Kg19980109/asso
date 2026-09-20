"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number; // ms
  y?: number; // override distance, px
  blur?: boolean; // premium blur-in, desktop only
  once?: boolean;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 700,
  y,
  blur = true,
  once = true,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Premium: shorter travel on mobile so it feels snappy, not laggy.
  // Desktop gets a slightly larger, blur-assisted rise.
  const distance = y ?? (isMobile ? 18 : 32);
  // Horizontal reveals become vertical on mobile to avoid x-jank / overflow.
  const dir = isMobile && (direction === "left" || direction === "right") ? "up" : direction;

  const offsets = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }[dir];

  const useBlur = blur && !isMobile;

  return (
    <motion.div
      className={cn(className)}
      initial={{
        opacity: 0,
        x: offsets.x,
        y: offsets.y,
        scale: dir === "none" ? 0.96 : 0.98,
        filter: useBlur ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once, margin: isMobile ? "0px 0px -8% 0px" : "0px 0px -12% 0px", amount: 0.15 }}
      transition={{
        duration: duration / 1000,
        delay: Math.min(delay, isMobile ? 120 : 250) / 1000,
        ease: [0.16, 1, 0.3, 1], // expo-out — premium feel
      }}
      style={{ willChange: "opacity, transform, filter" }}
    >
      {children}
    </motion.div>
  );
}
