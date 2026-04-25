"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { PixelCluster, SmallSquare } from "./HeroDecor";
import React from "react";

export default function HeroFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" style={{ width: 820, height: 720, transform: "rotate(-1.2deg)" }}>
      {/* Hard shadow */}
      <div className="absolute inset-0 pointer-events-none bg-[#EEE7DC]" style={{ boxShadow: "10px 10px 0 #111" }} />

      {/* TOP — full width */}
      <motion.div className="absolute top-0 left-0 h-[3px] bg-[#111] origin-left z-10" style={{ width: "100%" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.20, ease: easings.primary }} />

      {/* LEFT — full height */}
      <motion.div className="absolute top-0 left-0 w-[3px] bg-[#111] origin-top z-10" style={{ height: "100%" }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.7, delay: 0.24, ease: easings.primary }} />

      {/* BOTTOM — 85% */}
      <motion.div className="absolute bottom-0 left-0 h-[3px] bg-[#111] origin-left z-10" style={{ width: "85%" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.28, ease: easings.primary }} />

      {/* RIGHT top segment (above notch) */}
      <motion.div className="absolute top-0 right-0 w-[3px] bg-[#111] origin-top z-10" style={{ height: "100px" }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.4, delay: 0.32, ease: easings.primary }} />

      {/* Notch: horizontal INWARD */}
      <motion.div className="absolute right-0 top-[100px] h-[3px] bg-[#111] origin-right z-10" style={{ width: "24px" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.3, delay: 0.36, ease: easings.primary }} />
      
      {/* Notch: vertical DOWN */}
      <motion.div className="absolute right-[21px] top-[100px] w-[3px] bg-[#111] origin-top z-10" style={{ height: "80px" }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.3, delay: 0.40, ease: easings.primary }} />
      
      {/* Notch: horizontal OUTWARD */}
      <motion.div className="absolute right-[0px] top-[180px] h-[3px] bg-[#111] origin-left z-10" style={{ width: "24px" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.3, delay: 0.44, ease: easings.primary }} />

      {/* RIGHT bottom segment (below notch) */}
      <motion.div className="absolute top-[180px] right-0 w-[3px] bg-[#111] origin-top z-10" style={{ height: "calc(100% - 180px)" }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.4, delay: 0.48, ease: easings.primary }} />

      {/* Floating horizontal line at bottom right */}
      <motion.div className="absolute right-[10%] bottom-[-20px] h-[3px] bg-[#111] origin-left z-10" style={{ width: "80px" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.5, ease: easings.primary }} />

      <PixelCluster />
      <SmallSquare />

      {/* Content — counter-rotate */}
      <div className="absolute z-20" style={{ top: 94, left: 58, transform: "rotate(1.2deg)" }}>
        {children}
      </div>
    </div>
  );
}
