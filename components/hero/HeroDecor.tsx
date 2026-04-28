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
          style={{ width: 13, height: 13, left: pos.x, top: pos.y }}
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
      className="absolute flex flex-col gap-[16px]"
      style={{ right: 40, top: 92 }}
    >
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-[18px] w-[18px] rounded-none bg-[#111]" />
      ))}
    </div>
  );
}

export function SmallSquare() {
  return (
    <div
      className="absolute border-[4px] border-[#111]"
      style={{ width: 28, height: 28, bottom: 58, left: 20 }}
    />
  );
}
