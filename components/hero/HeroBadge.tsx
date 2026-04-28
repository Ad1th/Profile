"use client";

import { motion } from "framer-motion";

export default function HeroBadge() {
  return (
    <motion.div
      className="absolute flex items-center justify-center gap-4 bg-[#CFDE00]"
      style={{
        width: 250,
        height: 46,
        bottom: 84,
        right: -15,
        rotate: "-5deg",
        border: "5px solid #111",
        boxShadow: "12px 12px 0 #E8420A",
        zIndex: 35,
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: "-8deg" }}
      animate={{ opacity: 1, scale: 1, rotate: "-5deg" }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: 1.1 }}
      whileHover={{ scale: 1.06, rotate: "-5deg", y: -3 }}
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
