"use client";

import HeroFrame from "./HeroFrame";
import HeroHeadline from "./HeroHeadline";
import HeroCTA from "./HeroCTA";
import HeroPortrait from "./HeroPortrait";
import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[900px] w-full overflow-hidden bg-[#EEE7DC]">
      {/* Grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-[60] opacity-[0.02]" />

      {/* Content wrapper without max-width so elements touch the absolute screen edges */}
      <div className="relative w-full h-full">
        
        {/* Far-left Orange Decorative Box - Flush to left edge */}
        <motion.div 
          className="absolute left-[-3px] top-[38%] z-30 h-[335px] w-[41px] bg-[#F45113] border-[3px] border-[#111]"
          style={{ boxShadow: "7px 7px 0 #111" }}
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: easings.primary }}
        />

        {/* Left: Frame + Text - Extreme Left */}
        <div
          className="absolute z-20"
          style={{ left: 52, top: 110 }}
        >
          <HeroFrame>
            <HeroHeadline />
            <HeroCTA />
          </HeroFrame>
        </div>

        {/* Right: Portrait - Extreme Right */}
        <div
          className="absolute z-10"
          style={{ right: -18, top: 82 }}
        >
          <HeroPortrait />
        </div>
      </div>

      {/* Flat Bottom Olive Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 z-40 h-[43px] bg-[#6E6A2D] border-t-[3px] border-[#111]"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: easings.primary }}
      />
    </section>
  );
}
