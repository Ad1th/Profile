"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";

export default function HeroCTA() {
  return (
    <motion.button
      className="group relative flex items-center justify-center gap-[12px] bg-[#111] text-white w-[260px] h-[64px] mt-[48px] cursor-pointer outline-none"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.82, ease: easings.primary }}
      whileHover={{ x: -4, y: -4 }}
      whileTap={{ x: 2, y: 2 }}
    >
      {/* The hollow shadow box */}
      <div className="absolute inset-0 border-[3px] border-[#111] translate-x-[8px] translate-y-[8px] pointer-events-none transition-transform duration-200 group-hover:translate-x-[12px] group-hover:translate-y-[12px] group-active:translate-x-[4px] group-active:translate-y-[4px]" />
      
      {/* The main button body */}
      <div className="absolute inset-0 bg-[#111] border-[3px] border-[#111]" />
      
      <span className="relative z-10 text-[20px] font-[800] uppercase tracking-wide">
        View Work
      </span>
      <ArrowUpRight
        className="relative z-10 text-[#F05A24] transition-transform group-hover:translate-x-[6px]"
        size={24}
        strokeWidth={3}
      />
    </motion.button>
  );
}
