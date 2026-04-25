"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { PixelCluster, SmallSquare } from "./HeroDecor";
import React from "react";

export default function HeroFrame({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      className="relative w-full md:w-[720px] h-[620px] mt-[32px] md:-rotate-[1.2deg]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Shadow Box */}
      <div className="hidden md:block absolute inset-0 bg-transparent shadow-[10px_10px_0_#111] pointer-events-none -z-10" />

      {/* Borders drawing in - Custom open editorial frame */}
      <motion.div 
        className="hidden md:block absolute top-0 left-0 h-[3px] bg-[#111] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: easings.primary }}
        style={{ width: "100%" }}
      />
      <motion.div 
        className="hidden md:block absolute top-0 left-0 w-[3px] bg-[#111] origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.25, ease: easings.primary }}
        style={{ height: "100%" }}
      />
      <motion.div 
        className="hidden md:block absolute bottom-0 left-0 h-[3px] bg-[#111] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: easings.primary }}
        style={{ width: "78%" }}
      />
      
      {/* Right broken near portrait: top 30% and bottom 40% */}
      <motion.div 
        className="hidden md:block absolute top-0 right-0 w-[3px] bg-[#111] origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: 0.35, ease: easings.primary }}
        style={{ height: "30%" }}
      />
      <motion.div 
        className="hidden md:block absolute bottom-0 right-0 w-[3px] bg-[#111] origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: 0.4, ease: easings.primary }}
        style={{ height: "40%" }}
      />

      {/* Right Notch Custom Box - Visual connection between broken border */}
      <motion.div 
        className="hidden md:block absolute top-[30%] right-[-14px] w-[14px] h-[30%] border-l-[3px] border-t-[3px] border-[#111]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5, ease: easings.primary }}
      />

      <PixelCluster />
      <SmallSquare />

      {/* Children Container x: 58px, y: 94px */}
      <div className="relative h-full md:absolute md:top-[94px] md:left-[58px] z-20 md:rotate-[1.2deg]">
        {children}
      </div>
    </motion.div>
  );
}
