"use client";

import { motion } from "framer-motion";

export function PixelCluster() {
  // 5 scattered squares near top-left, diagonal pattern
  const positions = [
    { x: 24, y: 22 },
    { x: 36, y: 22 },
    { x: 30, y: 34 },
    { x: 42, y: 34 },
    { x: 36, y: 46 },
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute bg-[#111]"
          style={{ width: 8, height: 8, left: pos.x, top: pos.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.42 + i * 0.04, duration: 0.15 }}
        />
      ))}
    </>
  );
}

export function VerticalDots() {
  return (
    <div className="absolute flex flex-col gap-[10px]" style={{ right: -22, top: "calc(50% + 10px)", transform: "translateY(-50%)" }}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-[6px] h-[6px] rounded-full bg-[#111]" />
      ))}
    </div>
  );
}

export function SmallSquare() {
  return (
    <div
      className="absolute border-[2px] border-[#111]"
      style={{ width: 18, height: 18, bottom: 28, left: 20 }}
    />
  );
}
