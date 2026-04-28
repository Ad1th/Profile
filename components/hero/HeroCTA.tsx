"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";

export default function HeroCTA() {
  return (
    <motion.div
      className="relative mt-[36px]"
      style={{ width: 300, height: 68 }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.72, ease: easings.primary }}
    >
      {/* Hard offset shadow block */}
      <div
        className="absolute inset-0"
        style={{
          transform: "translate(6px, 6px)",
          background: "#CFDE00",
          border: "4px solid #111",
          zIndex: 0,
        }}
      />

      {/* Main button */}
      <motion.button
        className="absolute inset-0 flex items-center justify-center gap-5 bg-[#F0EBE0] cursor-pointer outline-none"
        style={{
          border: "4px solid #111",
          zIndex: 1,
        }}
        whileHover={{ x: -4, y: -4 }}
        whileTap={{ x: 2, y: 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <span
          className="text-[#111] text-[22px] font-black uppercase tracking-[-0.03em]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          VIEW WORK
        </span>
        <ArrowUpRight className="text-[#E8420A]" size={28} strokeWidth={3.5} />
      </motion.button>
    </motion.div>
  );
}
