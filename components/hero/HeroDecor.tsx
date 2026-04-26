"use client";

import { motion } from "framer-motion";

export function PixelCluster() {
  const positions = [
    { x: 62, y: 63 },
    { x: 70, y: 70 },
    { x: 62, y: 78 },
    { x: 78, y: 78 },
    { x: 54, y: 87 },
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute bg-[#111]"
          style={{ width: 9, height: 9, left: pos.x, top: pos.y }}
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
    <div
      className="absolute flex flex-col gap-[18px]"
      style={{ right: 48, top: 104 }}
    >
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-[13px] w-[13px] rounded-full bg-[#111]" />
      ))}
    </div>
  );
}

export function SmallSquare() {
  return (
    <div
      className="absolute border-[2px] border-[#111]"
      style={{ width: 20, height: 20, bottom: 64, left: 24 }}
    />
  );
}
