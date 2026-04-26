"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { PixelCluster, SmallSquare } from "./HeroDecor";
import React from "react";

export default function HeroFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" style={{ width: 858, height: 852, transform: "rotate(-2.25deg)" }}>
      {/* Hard shadow */}
      <div className="absolute inset-0 pointer-events-none bg-[#EEE7DC]" style={{ boxShadow: "10px 10px 0 #111" }} />

      {/* TOP — full width */}
      <motion.div className="absolute top-0 left-0 h-[3px] bg-[#111] origin-left z-10" style={{ width: "96%" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.20, ease: easings.primary }} />

      {/* LEFT — full height */}
      <motion.div className="absolute top-0 left-0 w-[3px] bg-[#111] origin-top z-10" style={{ height: "100%" }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.7, delay: 0.24, ease: easings.primary }} />

      {/* BOTTOM — 85% */}
      <motion.div className="absolute bottom-0 left-0 h-[3px] bg-[#111] origin-left z-10" style={{ width: "86%" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.28, ease: easings.primary }} />

      {/* RIGHT top segment (above notch) */}
      <motion.div className="absolute top-0 right-[56px] w-[3px] bg-[#111] origin-top z-10" style={{ height: "172px" }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.4, delay: 0.32, ease: easings.primary }} />

      {/* Notch: horizontal INWARD */}
      <motion.div className="absolute right-0 top-[172px] h-[3px] bg-[#111] origin-right z-10" style={{ width: "59px" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.3, delay: 0.36, ease: easings.primary }} />
      
      {/* Notch: vertical DOWN */}
      <motion.div className="absolute right-0 top-[172px] w-[3px] bg-[#111] origin-top z-10" style={{ height: "146px" }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.3, delay: 0.40, ease: easings.primary }} />
      
      {/* Notch: horizontal OUTWARD */}
      <motion.div className="absolute right-0 top-[318px] h-[3px] bg-[#111] origin-left z-10" style={{ width: "45px" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.3, delay: 0.44, ease: easings.primary }} />

      {/* RIGHT bottom segment (below notch) */}
      <motion.div className="absolute top-[318px] right-[45px] w-[3px] bg-[#111] origin-top z-10" style={{ height: "calc(100% - 318px)" }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.4, delay: 0.48, ease: easings.primary }} />

      {/* Floating horizontal line at bottom right */}
      <motion.div className="absolute right-[142px] bottom-[20px] h-[4px] bg-[#111] origin-left z-10" style={{ width: "144px", transform: "rotate(-3deg)" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.5, ease: easings.primary }} />

      <PixelCluster />
      <SmallSquare />

      {/* Content — counter-rotate */}
      <div className="absolute z-20" style={{ top: 98, left: 108, transform: "rotate(2.25deg)" }}>
        {children}
      </div>
    </div>
  );
}
