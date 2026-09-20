"use client";

import * as React from "react";

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          if (totalHeight > 0) {
            setScrollProgress(Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#EC4899] shadow-[0_0_12px_rgba(236,72,153,0.8)] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%`, willChange: "width" }}
      />
    </div>
  );
}
