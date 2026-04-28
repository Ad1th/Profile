"use client";

import { motion } from "framer-motion";

// Pixel cluster — small decorative group of squares
export function PixelCluster() {
  const positions = [
    { x: 0, y: 0 },
    { x: 16, y: 8 },
    { x: 0, y: 16 },
    { x: 24, y: 16 },
    { x: 8, y: 24 },
  ];
  return (
    <div className="relative" style={{ width: 40, height: 40 }}>
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute bg-[#555]"
          style={{ width: 10, height: 10, left: pos.x, top: pos.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.44 + i * 0.04, duration: 0.15 }}
        />
      ))}
    </div>
  );
}

// Vertical dot column — used in portrait panel
export function VerticalDots({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(count)].map((_, i) => (
        <div key={i} style={{ width: 10, height: 10, background: "#111" }} />
      ))}
    </div>
  );
}

// Small hollow square accent
export function SmallSquare() {
  return (
    <div
      style={{
        width: 22,
        height: 22,
        border: "3px solid #555",
      }}
    />
  );
}
