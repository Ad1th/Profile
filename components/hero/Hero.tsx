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

      {/* Far-left Orange Decorative Box */}
      <motion.div 
        className="absolute left-[-3px] top-[30%] w-[48px] h-[220px] bg-[#F05A24] border-[3px] border-[#111] z-30"
        style={{ boxShadow: "8px 8px 0 #111" }}
        initial={{ x: -60 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: easings.primary }}
      />

      {/* Content */}
      <div className="relative w-full h-full max-w-[1440px] mx-auto">
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

        {/* Right: Portrait */}
        <div
          className="absolute z-10"
          style={{ right: 48, top: "50%", transform: "translateY(-48%)" }}
        >
          <HeroPortrait />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[48px] bg-[#6E6A2D] border-t-[3px] border-[#111] z-40" />
    </section>
  );
}
