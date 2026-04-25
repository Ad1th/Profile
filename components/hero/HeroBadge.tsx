"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

export default function HeroBadge() {
  return (
    <motion.div
      className="absolute z-50 bg-[#F6F0E8] border-[3px] border-[#111] flex items-center gap-[14px] px-[20px]"
      style={{
        width: 340,
        height: 92,
        bottom: 80,
        right: 30,
        rotate: -2.8,
        boxShadow: "7px 7px 0 #111",
        willChange: "transform",
      }}
      initial={{ rotate: -8, scale: 0.8, x: 20, opacity: 0 }}
      animate={{ rotate: -2.8, scale: 1, x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.70, ease: easings.primary }}
      whileHover={{ y: -3, rotate: -1.5 }}
    >
      <div className="w-[14px] h-[14px] rounded-full bg-[#6E6A2D] shrink-0" />
      <span className="font-[700] text-[16px] text-[#111] uppercase leading-[1.3] tracking-[0.02em]">
        Available For
        <br />
        Internships — Summer 2026
      </span>
    </motion.div>
  );
}
