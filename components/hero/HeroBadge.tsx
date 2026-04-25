"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

export default function HeroBadge() {
  return (
    <motion.div
      className="absolute z-30 flex items-center justify-center gap-[12px] bg-[#6E6A2D] border-[3px] border-[#111] px-[24px]"
      style={{
        height: 72,
        bottom: 98,
        right: 44,
        rotate: -3.0,
        boxShadow: "8px 8px 0 #111",
        willChange: "transform",
        borderRadius: "8px",
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: -3.0 }}
      transition={{ duration: 0.6, delay: 0.9, ease: easings.spring }}
      whileHover={{ scale: 1.05, rotate: -2 }}
    >
      <span className="text-[20px] font-[800] tracking-wide text-[#111] uppercase" style={{ fontFamily: "var(--font-archivo), sans-serif" }}>
        OPEN TO INTERN
      </span>
      <div className="w-[12px] h-[12px] rounded-full bg-[#111]" />
    </motion.div>
  );
}
