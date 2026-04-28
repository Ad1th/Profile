"use client";

import { motion } from "framer-motion";

export default function HeroBadge() {
  return (
    <motion.div
      className="absolute z-30 flex items-center justify-center gap-[24px] bg-[#C5D86D] border-[5px] border-[#111] px-[42px]"
      style={{
        width: 340,
        height: 76,
        bottom: 124,
        right: 108,
        rotate: -8,
        boxShadow: "10px 10px 0 #111",
        willChange: "transform",
        borderRadius: "0px",
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.75, rotate: -12 }}
      animate={{ opacity: 1, scale: 1, rotate: -8 }}
      transition={{ type: "spring", stiffness: 240, damping: 20, delay: 0.9 }}
      whileHover={{ scale: 1.06, rotate: -8, rotateX: 2, rotateY: -4, y: -4 }}
    >
      <span
        className="flex-1 text-center text-[28px] font-black leading-none tracking-[-0.06em] text-[#111] uppercase"
        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
      >
        OPEN TO INTERN
      </span>
      <div className="mr-[2px] h-[20px] w-[20px] shrink-0 rounded-none bg-[#111]" />
    </motion.div>
  );
}
