"use client";

import { motion } from "framer-motion";

export default function HeroBadge() {
  return (
    <motion.div
      className="absolute bottom-[-20px] right-[-30px] z-50 bg-[#F6F0E8] border-[3px] border-[#111] w-[340px] h-[92px] flex items-center gap-[14px] px-[20px] shadow-[7px_7px_0_#111]"
      initial={{ rotate: -8, scale: 0.8, x: 20, opacity: 0 }}
      animate={{ rotate: -2.8, scale: 1, x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.70, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2, rotate: -1.5 }}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="w-[14px] h-[14px] rounded-full bg-[#6E6A2D] shrink-0" />
      <span className="font-[700] text-[16px] text-[#111] uppercase leading-[1.3] tracking-wide">
        Available For<br />Internships — Summer 2026
      </span>
    </motion.div>
  );
}
