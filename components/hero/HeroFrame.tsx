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

// RIGHT EDGE PATH: Simple clean boundary line between frame and purple slab
// const RIGHT_EDGE =
//   "M 0 0 " + // Start top left (slightly above top border) -10 for that, i changed it back to 0 for now
//   "L 25 140 " + // Straight down for notch
//   "L 55 140 " + // Step right for notch
//   "L 42 305" +
//   TILT_OFFSET +
//   " " +
//   H; // Diagonal line to bottom right

// ─── TUNING KNOBS ──────────────────────────────────────────────────────────
const W2 = W - 825;
const H2 = 785;
const TILT_OFFSET2 = 60;
const X = W2 - TILT_OFFSET2; // Starting X position for the zig-zag pattern on the right edge

// This path creates the "tab" and the long diagonal lean
// const RIGHT_EDGE =
//   `M ${W2 - TILT_OFFSET2} 0 ` + // Start at the top right (accounting for tilt)
//   `L ${W2 - TILT_OFFSET2} 140 ` + // Go straight down to the start of the notch
//   `L ${W2 - TILT_OFFSET2 + 30} 140 ` + // Jut OUT to the right (the 'tab')
//   `L ${W2 - TILT_OFFSET2 + 30} 280 ` + // Go down while inside the tab
//   `L ${W2 - TILT_OFFSET2} 280 ` + // Move back LEFT to the main line
//   `L ${W2} ${H2}`; // Long diagonal lean to the bottom right corner

// Zig-zag pattern: Out at 35px, In at 0px
const RIGHT_EDGE =
  `M ${X} 0 ` +
  // Tooth 1 (0-140)
  `L ${X} 80 L ${X + 35} 80 L ${X + 35} 140 L ${X} 140 ` +
  // Tooth 2 (200-260)
  `L ${X} 200 L ${X + 35} 200 L ${X + 35} 260 L ${X} 260 ` +
  // Tooth 3 (320-380)
  `L ${X} 320 L ${X + 35} 320 L ${X + 35} 380 L ${X} 380 ` +
  // Tooth 4 (440-500)
  `L ${X} 440 L ${X + 35} 440 L ${X + 35} 500 L ${X} 500 ` +
  // Tooth 5 (560-620)
  `L ${X} 560 L ${X + 35} 560 L ${X + 35} 620 L ${X} 620 ` +
  // Tooth 6 (680-740)
  `L ${X} 680 L ${X + 35} 680 L ${X + 35} 740 L ${X} 740 ` +
  // Final stretch to the bottom corner
  `L ${W2} ${H2}`;
// ─────────────────────────────────────────────────────────────────────────────
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

      {/* RIGHT edge — complex SVG path line */}
      <motion.svg
        className="absolute top-0 z-10 overflow-visible pointer-events-none"
        style={{ right: 0, width: TILT_OFFSET + 20, height: H }}
        viewBox={`0 0 ${TILT_OFFSET + 10} ${H}`}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: easings.primary }}
      >
        {/* Complex tilted right edge path */}
        <path d={RIGHT_EDGE} stroke="#111" strokeWidth="3" fill="none" />
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
