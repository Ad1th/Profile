"use client";

import { motion } from "framer-motion";

export default function HeroBadge() {
  return (
    <motion.div
      className="absolute flex items-center justify-center gap-4 bg-[#CFDE00]"
      style={{
        width: 252,
        height: 48,
        bottom: 102,
        right: 24,
        rotate: "-4deg",
        border: "5px solid #111",
        boxShadow: "10px 10px 0 #E8420A",
        zIndex: 35,
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: "-8deg" }}
      animate={{ opacity: 1, scale: 1, rotate: "-4deg" }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: 1.1 }}
      whileHover={{ scale: 1.05, rotate: "-4deg", y: -3 }}
    >
      <span
        className="text-[#111] text-[14px] font-black uppercase tracking-[0.04em] leading-none"
        style={{
          fontFamily: "var(--font-archivo), sans-serif",
          whiteSpace: "nowrap",
        }}
      >
        OPEN TO INTERN
      </span>
      <div
        style={{ width: 12, height: 12, background: "#111", flexShrink: 0 }}
      />
    </motion.div>
  );
}
