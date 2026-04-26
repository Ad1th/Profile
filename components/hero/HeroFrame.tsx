"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { PixelCluster, SmallSquare } from "./HeroDecor";
import React from "react";

export default function HeroFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" style={{ width: 784, height: 820, transform: "rotate(-2.1deg)" }}>
      {/* Hard shadow */}
      <div className="absolute inset-0 pointer-events-none bg-[#EEE7DC]" style={{ boxShadow: "10px 10px 0 #111" }} />

      {/* TOP — full width */}
      <motion.div className="absolute top-0 left-0 h-[3px] bg-[#111] origin-left z-10" style={{ width: "94%" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.20, ease: easings.primary }} />

      {/* LEFT — full height */}
      <motion.div className="absolute top-0 left-0 w-[3px] bg-[#111] origin-top z-10" style={{ height: "100%" }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.7, delay: 0.24, ease: easings.primary }} />

      {/* BOTTOM — 85% */}
      <motion.div className="absolute bottom-0 left-0 h-[3px] bg-[#111] origin-left z-10" style={{ width: "86%" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.28, ease: easings.primary }} />

      {/* RIGHT top segment (above notch) */}
      <motion.div className="absolute top-0 right-[47px] w-[3px] bg-[#111] origin-top z-10" style={{ height: "164px" }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.4, delay: 0.32, ease: easings.primary }} />

      {/* Notch: horizontal INWARD */}
      <motion.div className="absolute right-0 top-[164px] h-[3px] bg-[#111] origin-right z-10" style={{ width: "50px" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.3, delay: 0.36, ease: easings.primary }} />
      
      {/* Notch: vertical DOWN */}
      <motion.div className="absolute right-0 top-[164px] w-[3px] bg-[#111] origin-top z-10" style={{ height: "138px" }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.3, delay: 0.40, ease: easings.primary }} />
      
      {/* Notch: horizontal OUTWARD */}
      <motion.div className="absolute right-0 top-[302px] h-[3px] bg-[#111] origin-left z-10" style={{ width: "37px" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.3, delay: 0.44, ease: easings.primary }} />

      {/* RIGHT bottom segment (below notch) */}
      <motion.div className="absolute top-[302px] right-[37px] w-[3px] bg-[#111] origin-top z-10" style={{ height: "calc(100% - 302px)" }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.4, delay: 0.48, ease: easings.primary }} />

      {/* Floating horizontal line at bottom right */}
      <motion.div className="absolute right-[142px] bottom-[20px] h-[4px] bg-[#111] origin-left z-10" style={{ width: "144px", transform: "rotate(-3deg)" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.5, ease: easings.primary }} />

      <PixelCluster />
      <SmallSquare />

      {/* Content — counter-rotate */}
      <div className="absolute z-20" style={{ top: 118, left: 82, transform: "rotate(2.1deg)" }}>
        {children}
      </div>
    </div>
  );
}
