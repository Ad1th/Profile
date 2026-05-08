"use client";

import { motion } from "framer-motion";

export default function HeroBadge() {
  return (
    <motion.div
      className="absolute flex items-center justify-center gap-4 bg-[#D7F205]"
      style={{
        width: 252,
        height: 48,
        bottom: 102,
        right: 24,
        rotate: "-4deg",
        border: "5px solid #050505",
        boxShadow: "10px 10px 0 #F24A05",
        zIndex: 35,
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: "-8deg" }}
      animate={{ opacity: 1, scale: 1, rotate: "-5deg" }}
      transition={{ duration: 0.42, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: "-7deg", y: -2 }}
    >
      <span
        className="text-[#050505] text-[14px] font-black uppercase tracking-[0.04em] leading-none"
        style={{
          fontFamily: "var(--font-archivo), sans-serif",
          whiteSpace: "nowrap",
        }}
      >
        OPEN TO INTERN
      </span>
      <div
        style={{ width: 12, height: 12, background: "#050505", flexShrink: 0 }}
      />
    </motion.div>
  );
}
