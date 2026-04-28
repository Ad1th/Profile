"use client";

import { motion } from "framer-motion";

export default function HeroBadge() {
  return (
    <motion.div
      className="absolute flex items-center justify-center gap-4 bg-[#CFDE00]"
      style={{
        width: 230,
        height: 44,
        bottom: 32,
        right: 12,
        rotate: 0,
        border: "4px solid #111",
        boxShadow: "0 0 0 #111",
        zIndex: 30,
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: 1.0 }}
      whileHover={{ scale: 1.04, rotate: 0, y: -2 }}
    >
      <span
        className="text-[#111] text-[33px] font-black uppercase tracking-[-0.04em] leading-none"
        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
      >
        OPEN TO INTERN
      </span>
      <div
        style={{ width: 10, height: 10, background: "#111", flexShrink: 0 }}
      />
    </motion.div>
  );
}
