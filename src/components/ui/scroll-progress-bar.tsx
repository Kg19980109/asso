"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

export function ScrollProgressBar() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // Buttery spring instead of choppy width updates — GPU-only scaleX.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#EC4899] shadow-[0_0_12px_rgba(236,72,153,0.8)]"
        style={{ scaleX, willChange: "transform" }}
      />
    </div>
  );
}
