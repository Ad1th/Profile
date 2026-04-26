"use client";

import { motion } from "framer-motion";

export default function HeroBadge() {
  return (
    <motion.div
      className="absolute z-30 flex items-center justify-center gap-[18px] bg-[#77742D] border-[5px] border-[#111] px-[32px]"
      style={{
        width: 340,
        height: 78,
        bottom: 136,
        right: 24,
        rotate: -4.8,
        boxShadow: "13px 12px 0 #111",
        willChange: "transform",
        borderRadius: "8px",
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: -4.8 }}
      transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.9 }}
      whileHover={{ scale: 1.04, rotate: -4.8, rotateX: 2, rotateY: -4, y: -2 }}
    >
      <span className="flex-1 text-center text-[27px] font-black leading-none tracking-[-0.04em] text-[#111] uppercase" style={{ fontFamily: "var(--font-archivo), sans-serif" }}>
        OPEN TO INTERN
      </span>
      <div className="mr-[2px] h-[14px] w-[14px] shrink-0 rounded-full bg-[#111]" />
    </motion.div>
  );
}
