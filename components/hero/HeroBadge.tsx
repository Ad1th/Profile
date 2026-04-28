"use client";

import { motion } from "framer-motion";

export default function HeroBadge() {
  return (
    <motion.div
      className="absolute flex items-center justify-center gap-4 bg-[#CFDE00]"
      style={{
        width: 260,
        height: 62,
        bottom: 72, // sit just above the ticker bar
        right: 28,
        rotate: -4,
        border: "4px solid #111",
        boxShadow: "6px 6px 0 #111",
        zIndex: 20,
      }}
      initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: 1.0 }}
      whileHover={{ scale: 1.06, rotate: -4, y: -4 }}
    >
      <span
        className="text-[#111] text-[20px] font-black uppercase tracking-[-0.04em] leading-none"
        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
      >
        OPEN TO INTERN
      </span>
      <div
        style={{ width: 14, height: 14, background: "#111", flexShrink: 0 }}
      />
    </motion.div>
  );
}
