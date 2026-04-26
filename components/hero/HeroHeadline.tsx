"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

export default function HeroHeadline() {
  return (
    <div
      className="flex flex-col select-none uppercase"
      style={{
        fontFamily: "var(--font-anton), 'Arial Black', Impact, sans-serif",
        fontWeight: 900,
        letterSpacing: "-0.05em",
        lineHeight: 0.755,
        textRendering: "geometricPrecision",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        fontSynthesisWeight: "none",
      }}
    >
      <div className="overflow-hidden">
        <motion.span className="block text-[151px] text-[#111111] origin-left"
          initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1, scaleX: 1.05 }}
          transition={{ duration: 0.7, delay: 0.0, ease: easings.primary }}
          style={{ willChange: "transform" }}
        >BACKEND</motion.span>
      </div>
      <div className="overflow-hidden">
        <motion.span className="block text-[147px] text-[#6E6A2D] origin-left"
          initial={{ x: -40, opacity: 0 }} animate={{ x: -4, opacity: 1, scaleX: 1.04 }}
          transition={{ duration: 0.7, delay: 0.18, ease: easings.primary }}
          style={{ willChange: "transform" }}
        >WITH</motion.span>
      </div>
      <div className="overflow-visible">
        <motion.span className="block text-[150px] text-[#F45113] origin-left"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: [100, -12, -7], opacity: [0, 1, 1], scaleX: 1.035 }}
          transition={{ duration: 0.7, delay: 0.34, ease: easings.primary }}
          style={{ willChange: "transform" }}
        >TASTE.</motion.span>
      </div>

      {/* Subtext */}
      <div className="mt-[14px]">
        {/* Decorative line above subtext */}
        <motion.div 
          className="mb-[15px] h-[2px] w-[62px] bg-[#111]"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} originX={0}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.p
          className="max-w-[360px] font-mono text-[23px] font-normal normal-case tracking-[-0.04em] text-[#111]"
          style={{ lineHeight: 1.28, opacity: 0.92 }}
          initial={{ opacity: 0 }} animate={{ opacity: 0.92 }}
          transition={{ duration: 0.8, delay: 0.58 }}
        >
          Pressure-tested builds<br />with clean internals.
        </motion.p>
      </div>
    </div>
  );
}
