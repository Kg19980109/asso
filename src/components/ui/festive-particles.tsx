"use client";

import * as React from "react";

export function FestiveParticles() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate 18 floating golden firefly particles with random positions & delays
  const particles = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    top: `${(i * 17) % 95}%`,
    left: `${(i * 23 + 7) % 94}%`,
    size: (i % 3) * 2 + 3,
    duration: 5 + (i % 5) * 2,
    delay: (i % 7) * 0.8,
    color: i % 2 === 0 ? "bg-amber-300" : "bg-orange-400",
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${p.color} blur-[1px] shadow-[0_0_8px_rgba(251,191,36,0.8)]`}
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `firefly ${p.duration}s infinite ease-in-out ${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
