"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

export default function HeroHeadline() {
  return (
    <div className="flex flex-col select-none uppercase font-archivo font-[900]" style={{ letterSpacing: "-0.04em", lineHeight: 0.88 }}>
      <div className="overflow-hidden pb-1 -mb-1">
        <motion.h1 
          className="text-[72px] md:text-[148px] text-[#111111]"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.0, ease: easings.primary }}
          style={{ willChange: "transform, opacity" }}
        >
          BACKEND
        </motion.h1>
      </div>
      <div className="overflow-hidden pb-1 -mb-1">
        <motion.h1 
          className="text-[64px] md:text-[138px] text-[#6E6A2D]"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.18, ease: easings.primary }}
          style={{ willChange: "transform, opacity" }}
        >
          WITH
        </motion.h1>
      </div>
      <div className="overflow-visible pb-1 -mb-1 flex items-end">
        <motion.h1 
          className="text-[72px] md:text-[146px] text-[#F05A24]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: [-8, 0], opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.34, ease: easings.primary }}
          style={{ willChange: "transform, opacity" }}
        >
          TASTE
        </motion.h1>
        <motion.div 
          className="w-[28px] h-[28px] bg-[#F05A24] rounded-full ml-2 mb-[16px]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
        />
      </div>
      
      {/* Decorative Line above subtext */}
      <motion.div 
        className="h-[2px] bg-[#111] mt-[28px] mb-[12px] opacity-20 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ width: "380px" }}
        transition={{ duration: 0.6, delay: 0.5, ease: easings.primary }}
      />

      {/* Subtext */}
      <motion.p 
        className="text-[18px] text-[#111] w-[340px] font-mono opacity-90"
        style={{ lineHeight: 1.45, letterSpacing: "normal" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.92 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Pressure-tested builds<br />
        with clean internals.
      </motion.p>
    </div>
  );
}
