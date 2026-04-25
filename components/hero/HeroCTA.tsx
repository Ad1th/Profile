"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";

export default function HeroCTA() {
  return (
    <motion.button
      className="group flex items-center justify-center gap-[16px] bg-[#111] text-white border-[3px] border-[#111] w-[320px] h-[78px] mt-[36px] cursor-pointer"
      style={{ boxShadow: "8px 8px 0 #000", willChange: "transform, box-shadow" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.82, ease: easings.primary }}
      whileHover={{ x: -2, y: -2, boxShadow: "12px 12px 0 #000" }}
      whileTap={{ x: 2, y: 2, boxShadow: "2px 2px 0 #000" }}
    >
      <span className="text-[24px] font-[800] uppercase tracking-wide">
        View Work
      </span>
      <ArrowUpRight
        className="text-[#F05A24] transition-transform group-hover:translate-x-[6px]"
        size={28}
        strokeWidth={3}
      />
    </motion.button>
  );
}
