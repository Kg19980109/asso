"use client";

import * as React from "react";

interface Particle {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
  drift: number;
}

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    top: `${(i * 37 + 11) % 95}%`,
    left: `${(i * 53 + 7) % 94}%`,
    size: (i % 3) * 1.5 + 2.5,
    duration: 6 + (i % 5) * 1.6,
    delay: (i % 7) * 0.7,
    color: i % 3 === 0 ? "bg-amber-200" : i % 3 === 1 ? "bg-amber-300" : "bg-orange-400",
    drift: 18 + (i % 4) * 8,
  }));
}

export function FestiveParticles({ density = "auto" }: { density?: "auto" | "low" | "full" }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 640px)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setIsMobile(mqMobile.matches);
      setReduced(mqReduce.matches);
    };
    update();
    mqMobile.addEventListener("change", update);
    mqReduce.addEventListener("change", update);
    return () => {
      mqMobile.removeEventListener("change", update);
      mqReduce.removeEventListener("change", update);
    };
  }, []);

  // Pause work when offscreen — biggest mobile win (was ~90 always-animating nodes).
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const count = React.useMemo(() => {
    if (density === "low") return 5;
    if (density === "full") return 14;
    return isMobile ? 6 : 12;
  }, [density, isMobile]);

  const particles = React.useMemo(() => buildParticles(count), [count]);

  if (reduced) return null;
  if (!visible) return <div ref={ref} className="absolute inset-0 pointer-events-none" aria-hidden />;

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full ${p.color} opacity-60`}
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            // Transform-only animation (compositor thread). No blur / box-shadow per particle.
            animation: `scroll-float-y ${p.duration}s infinite ease-in-out ${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
