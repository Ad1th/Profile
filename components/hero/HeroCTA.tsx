"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";

export default function HeroCTA() {
  return (
    <motion.button
      className="group flex items-center justify-center gap-[12px] bg-[#111] text-white border-[3px] border-[#111] w-[260px] h-[64px] mt-[36px] cursor-pointer"
      style={{ boxShadow: "6px 6px 0 #000", willChange: "transform, box-shadow" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.82, ease: easings.primary }}
      whileHover={{ x: -2, y: -2, boxShadow: "10px 10px 0 #000" }}
      whileTap={{ x: 2, y: 2, boxShadow: "2px 2px 0 #000" }}
    >
      <span className="text-[20px] font-[800] uppercase tracking-wide">
        View Work
      </span>
      <ArrowUpRight
        className="text-[#F05A24] transition-transform group-hover:translate-x-[6px]"
        size={24}
        strokeWidth={3}
      />
    </motion.button>
  );
}
