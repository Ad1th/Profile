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
// The cream frame overlaps the purple slab by a fixed amount to create depth.
const FRAME_OVERLAP = 38;
const FRAME_SHADOW = 14;

export default function HeroFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative"
      style={{ width: W, height: H, transform: "rotate(-1.2deg)" }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-[#EEE7DC]"
        style={{
          clipPath: `polygon(0 0, ${W - 22}px 0, ${W - 12}px 100%, 0 100%)`,
        }}
      />

      {/* TOP border line */}
      <motion.div
        className="absolute top-0 left-0 h-[5px] bg-[#111] origin-left z-10"
        style={{ width: W - 10 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: easings.primary }}
      />

      {/* LEFT border line */}
      <motion.div
        className="absolute top-0 left-0 w-[5px] bg-[#111] origin-top z-10"
        style={{ height: "100%" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.7, delay: 0.24, ease: easings.primary }}
      />

      {/* BOTTOM border line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[5px] bg-[#111] origin-left z-10"
        style={{ width: "84%" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.28, ease: easings.primary }}
      />

      <motion.div
        aria-hidden
        className="absolute z-20 pointer-events-none"
        style={{
          top: 0,
          right: 0,
          width: FRAME_OVERLAP,
          height: H,
          background: "#EEE7DC",
          borderTop: "5px solid #111",
          borderBottom: "5px solid #111",
          boxShadow: "10px 10px 0 #111",
        }}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.3, ease: easings.primary }}
      />

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
