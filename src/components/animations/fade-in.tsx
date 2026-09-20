"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // seconds (kept backwards-compatible)
  duration?: number; // seconds
  direction?: "up" | "down" | "left" | "right" | "none";
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const directionOffsets = {
    up: { y: 22, x: 0 },
    down: { y: -22, x: 0 },
    left: { x: 22, y: 0 },
    right: { x: -22, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: directionOffsets[direction].x,
        y: directionOffsets[direction].y,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px", amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [...EASE],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({
  children,
  className,
  staggerChildren = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px", amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({
  children,
  className,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const offsets = {
    up: { y: 18, x: 0 },
    down: { y: -18, x: 0 },
    left: { x: 18, y: 0 },
    right: { x: -18, y: 0 },
    none: { x: 0, y: 0 },
  }[direction];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...offsets },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.6, ease: [...EASE] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
