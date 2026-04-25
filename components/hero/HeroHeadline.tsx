"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

export default function HeroHeadline() {
  return (
    <div className="flex flex-col select-none uppercase" style={{ fontFamily: "var(--font-archivo), Impact, sans-serif", letterSpacing: "-0.04em", lineHeight: 0.88 }}>
      <div className="overflow-hidden">
        <motion.span className="block text-[148px] text-[#111111]"
          initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.0, ease: easings.primary }}
          style={{ willChange: "transform" }}
        >BACKEND</motion.span>
      </div>
      <div className="overflow-hidden">
        <motion.span className="block text-[138px] text-[#6E6A2D]"
          initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.18, ease: easings.primary }}
          style={{ willChange: "transform" }}
        >WITH</motion.span>
      </div>
      <div className="overflow-visible">
        <motion.span className="block text-[146px] text-[#F05A24]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: [100, -8, 0], opacity: [0, 1, 1] }}
          transition={{ duration: 0.7, delay: 0.34, ease: easings.primary }}
          style={{ willChange: "transform" }}
        >TASTE.</motion.span>
      </div>

      {/* Subtext */}
      <motion.p
        className="mt-[48px] text-[18px] font-mono font-normal max-w-[340px] text-[#111] normal-case tracking-normal"
        style={{ lineHeight: 1.45, opacity: 0.92 }}
        initial={{ opacity: 0 }} animate={{ opacity: 0.92 }}
        transition={{ duration: 0.8, delay: 0.58 }}
      >
        Pressure-tested builds<br />with clean internals.
      </motion.p>
    </div>
  );
}
