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
        letterSpacing: "-0.07em",
        lineHeight: 0.88,
        textRendering: "geometricPrecision",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        fontSynthesisWeight: "none",
      }}
    >
      {/* clip-path allows right overflow (for scaleX) while masking bottom (for slide-up anim) */}
      <div style={{ clipPath: "inset(0 -30% 0 0)" }}>
        <motion.span
          className="block text-[184px] text-[#111111] origin-left"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1, scaleX: 1.08 }}
          transition={{ duration: 0.7, delay: 0.0, ease: easings.primary }}
          style={{ willChange: "transform" }}
        >
          BACKEND
        </motion.span>
      </div>
      <div style={{ clipPath: "inset(0 -30% 0 0)" }}>
        <motion.span
          className="block text-[176px] text-[#6E6A2D] origin-left"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: -4, opacity: 1, scaleX: 1.06 }}
          transition={{ duration: 0.7, delay: 0.18, ease: easings.primary }}
          style={{ willChange: "transform" }}
        >
          WITH
        </motion.span>
      </div>
      <div style={{ clipPath: "inset(0 -30% 0 0)" }}>
        <motion.span
          className="block text-[180px] text-[#F45113] origin-left"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: [100, -10, -6], opacity: [0, 1, 1], scaleX: 1.06 }}
          transition={{ duration: 0.7, delay: 0.34, ease: easings.primary }}
          style={{ willChange: "transform" }}
        >
          TASTE.
        </motion.span>
      </div>

      {/* Subtext */}
      <div className="mt-[6px]">
        <motion.div
          className="mb-[18px] h-[4px] w-[74px] bg-[#111]"
          style={{ originX: 0 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.p
          className="max-w-[360px] font-mono text-[26px] font-bold normal-case tracking-[-0.05em] text-[#111]"
          style={{ lineHeight: 1.22, opacity: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.92 }}
          transition={{ duration: 0.8, delay: 0.58 }}
        >
          Pressure-tested builds
          <br />
          with clean internals.
        </motion.p>
      </div>
    </div>
  );
}
