import * as React from "react";

// Remove dark ambient orbs — use decorative colorful shapes instead on sections
export function BackgroundMesh() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* Very subtle warm cream tint */}
      <div
        className="absolute inset-0"
        style={{ background: "#FFFCF5" }}
      />
    </div>
  );
}
