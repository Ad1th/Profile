"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";

export default function HeroCTA() {
  return (
    <motion.div
      className="relative"
      style={{ width: 306, height: 70, marginTop: 2 }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.56, ease: easings.primary }}
    >
      {/* Hard offset shadow block */}
      <div
        className="absolute inset-0"
        style={{
          transform: "translate(9px, 9px)",
          background: "#F24A05",
          border: "4px solid #050505",
          zIndex: 0,
        }}
      />

      {/* Main button */}
      <motion.button
        className="absolute inset-0 flex items-center justify-center gap-5 bg-[#D7F205] cursor-pointer outline-none"
        style={{
          border: "4px solid #050505",
          zIndex: 1,
        }}
        whileHover={{ x: -4, y: -4 }}
        whileTap={{ x: 2, y: 2 }}
        transition={{ duration: 0.16, ease: easings.primary }}
      >
        <span
          className="text-[#050505] text-[22px] font-black uppercase tracking-[-0.03em]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          VIEW WORK
        </span>
        <ArrowUpRight className="text-[#050505]" size={28} strokeWidth={3.5} />
      </motion.button>
    </motion.div>
  );
}
