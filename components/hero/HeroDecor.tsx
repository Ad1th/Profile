"use client";

import { motion } from "framer-motion";

export function PixelCluster() {
  return (
    <div className="absolute top-[20px] left-[20px] grid grid-cols-3 gap-[2px]">
      {[...Array(4)].map((_, i) => (
        <motion.div 
          key={i}
          className="w-[8px] h-[8px] bg-[#111]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.42 + (i * 0.05), duration: 0.2 }}
          style={{
            gridColumn: i === 0 ? 1 : i === 1 ? 2 : i === 2 ? 3 : 2,
            gridRow: i < 2 ? 1 : i < 3 ? 2 : 3
          }}
        />
      ))}
    </div>
  );
}

export function VerticalDots() {
  return (
    <div className="hidden md:flex absolute right-[-40px] top-1/2 -translate-y-1/2 flex-col gap-[10px]">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-[6px] h-[6px] rounded-full bg-[#111]" />
      ))}
    </div>
  );
}

export function SmallSquare() {
  return (
    <div className="hidden md:block absolute bottom-[20px] left-[20px] w-[18px] h-[18px] border-[2px] border-[#111] bg-[#EEE7DC]" />
  );
}
