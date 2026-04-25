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

      {/* Content wrapper with wider max-width to allow edge-touching on normal screens */}
      <div className="relative w-full h-full max-w-[1536px] mx-auto">
        
        {/* Far-left Orange Decorative Box - Flush to left edge */}
        <motion.div 
          className="absolute left-0 top-[25%] w-[80px] h-[380px] bg-[#F05A24] border-[3px] border-l-0 border-[#111] z-30"
          style={{ boxShadow: "8px 8px 0 #111" }}
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: easings.primary }}
        />

        {/* Left: Frame + Text */}
        <div
          className="absolute z-20"
          style={{ left: 80, top: "50%", transform: "translateY(-50%)" }}
        >
          <HeroFrame>
            <HeroHeadline />
            <HeroCTA />
          </HeroFrame>
        </div>

        {/* Right: Portrait - Flush to right edge */}
        <div
          className="absolute z-10"
          style={{ right: 0, top: "50%", transform: "translateY(-48%)" }}
        >
          <HeroPortrait />
        </div>
      </div>

      {/* Pointed/Rotated Bottom Bar */}
      <motion.div 
        className="absolute bottom-[-60px] left-[-5%] right-[-5%] h-[120px] bg-[#6E6A2D] border-t-[3px] border-[#111] z-40 origin-bottom-left"
        style={{ rotate: "-1.5deg" }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: easings.primary }}
      />
    </section>
  );
}
