"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";

export default function HeroCTA() {
  const scrollToProjects = () => {
    const el = document.querySelector('[data-section="projects"]');
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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
          background: "#E8420A",
          border: "4px solid #111",
          zIndex: 0,
        }}
      />

      {/* Main button */}
      <motion.button
        className="absolute inset-0 flex items-center justify-center gap-5 bg-[#CFDE00] cursor-pointer"
        onClick={scrollToProjects}
        style={{
          border: "4px solid #111",
          zIndex: 1,
        }}
        whileHover={{ x: -4, y: -4 }}
        whileTap={{ x: 2, y: 2 }}
        transition={{ duration: 0.16, ease: easings.editorial }}
      >
        <span
          className="text-[#111] text-[22px] font-black uppercase tracking-[-0.03em]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          VIEW WORK
        </span>
        <ArrowUpRight className="text-[#111]" size={28} strokeWidth={3.5} />
      </motion.button>
    </motion.div>
  );
}
