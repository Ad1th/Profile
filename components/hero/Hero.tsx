"use client";

import HeroFrame from "./HeroFrame";
import HeroHeadline from "./HeroHeadline";
import HeroCTA from "./HeroCTA";
import HeroPortrait from "./HeroPortrait";
import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[900px] bg-[#EEE7DC] overflow-hidden">
      {/* Grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-[60] opacity-[0.02]" />

      {/* Content wrapper without max-width so elements touch the absolute screen edges */}
      <div className="relative w-full h-full">
        
        {/* Far-left Orange Decorative Box - Flush to left edge */}
        <motion.div 
          className="absolute left-[-4px] top-[25%] w-[80px] h-[380px] bg-[#F05A24] border-[3px] border-[#111] z-30"
          style={{ boxShadow: "8px 8px 0 #111" }}
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: easings.primary }}
        />

        {/* Left: Frame + Text - Extreme Left */}
        <div
          className="absolute z-20"
          style={{ left: 76, top: "50%", transform: "translateY(-50%)" }}
        >
          <HeroFrame>
            <HeroHeadline />
            <HeroCTA />
          </HeroFrame>
        </div>

        {/* Right: Portrait - Extreme Right */}
        <div
          className="absolute z-10"
          style={{ right: -40, top: "50%", transform: "translateY(-48%)" }}
        >
          <HeroPortrait />
        </div>
      </div>

      {/* Flat Bottom Olive Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[48px] bg-[#6E6A2D] border-t-[3px] border-[#111] z-40"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: easings.primary }}
      />
    </section>
  );
}
