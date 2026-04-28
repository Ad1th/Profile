"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { PixelCluster, SmallSquare } from "./HeroDecor";
import React from "react";

// ─── TUNING KNOBS ────────────────────────────────────────────────────────────
// Adjust W to control where the right border lands vs the purple slab.
// Decrease W → right border moves left (less overlap with purple).
// Increase W → right border moves right (more overlap).
// At left:50 in Hero.tsx, the right border sits at (50 + W)px from the viewport left.
const W = 890; // <── tweak this first if the join is off
const H = 785;
// RIGHT EDGE TILT: top leans left, bottom leans right (toward left border).
// Increase TILT_OFFSET for a more dramatic lean.
const TILT_OFFSET = 60; // px difference between top-x and bottom-x of the right edge line
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative"
      style={{ width: W, height: H, transform: "rotate(-1.2deg)" }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-[#EEE7DC]"
        style={{
          clipPath: `polygon(0 0, ${W - TILT_OFFSET - 20}px 0, ${W - 12}px 100%, 0 100%)`,
        }}
      />

      {/* TOP border line */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] bg-[#111] origin-left z-10"
        style={{ width: W - TILT_OFFSET - 10 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: easings.primary }}
      />

      {/* LEFT border line */}
      <motion.div
        className="absolute top-0 left-0 w-[3px] bg-[#111] origin-top z-10"
        style={{ height: "100%" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.7, delay: 0.24, ease: easings.primary }}
      />

      {/* BOTTOM border line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-[#111] origin-left z-10"
        style={{ width: "84%" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.28, ease: easings.primary }}
      />

      {/* RIGHT edge — tilted SVG line.
          top-left (x=0) → bottom-right (x=TILT_OFFSET): leans toward left border. */}
      <motion.svg
        className="absolute top-0 z-10 overflow-visible pointer-events-none"
        style={{ right: 0, width: TILT_OFFSET + 20, height: H }}
        viewBox={`0 0 ${TILT_OFFSET + 10} ${H}`}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: easings.primary }}
      >
        {/* Top cap — connects to TOP border (which ends at 90% of W) */}
        <line x1="0" y1="0" x2="0" y2="0" stroke="#111" strokeWidth="3" />
        {/* Tilted right edge */}
        <line
          x1="0"
          y1="0" //increase height of right line of left slab by changing this to -20 or smthng like dat
          x2={TILT_OFFSET}
          y2={H}
          stroke="#111"
          strokeWidth="3"
        />
        {/* Bottom cap — connects to BOTTOM border */}
        <line
          x1="0"
          y1={H}
          x2={TILT_OFFSET}
          y2={H}
          stroke="#111"
          strokeWidth="3"
        />
      </motion.svg>

      {/* Filled right-edge notch, matching the small box in the reference.
      <motion.div
        className="absolute z-20 pointer-events-none bg-[#EEE7DC] border-[3px] border-[#111]"
        style={{
          right: 12,
          top: 150,
          width: 48,
          height: 118,
          transform: "skewY(-2deg)",
        }}
        initial={{ opacity: 0, scaleX: 0.7 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.35, delay: 0.38, ease: easings.primary }}
      /> */}

      {/* Floating accent line */}
      <motion.div
        className="absolute h-[4px] bg-[#111] origin-left z-10"
        style={{
          left: 520,
          bottom: 54,
          width: 120,
          transform: "rotate(-13deg)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: easings.primary }}
      />

      <PixelCluster />
      <SmallSquare />

      {/* Content — counter-rotate to stay upright */}
      <div
        className="absolute z-20"
        style={{ top: 80, left: 108, transform: "rotate(0.8deg)" }}
      >
        {children}
      </div>
    </div>
  );
}
