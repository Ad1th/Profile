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
      <div className="absolute inset-0 bg-grain pointer-events-none z-[60] opacity-[0.02]" />

      <div className="relative w-full h-full">
        {/* Far-left Orange Decorative Box */}
        <motion.div
          className="absolute left-[-3px] top-[38%] z-30 h-[335px] w-[41px] bg-[#F45113] border-[3px] border-[#111]"
          style={{ boxShadow: "7px 7px 0 #111" }}
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: easings.primary }}
        />

        {/* Left: Frame — z-20 so its border lines draw over the purple slab */}
        <div className="absolute z-20" style={{ left: 70, top: 148 }}>
          <HeroFrame>
            <HeroHeadline />
            <HeroCTA />
          </HeroFrame>
        </div>

        {/* Right: Portrait — kept at right:-24 so the purple fills the right half naturally.
            The frame (960px wide from left:50) reaches ~1010px from left.
            On a 1440px viewport the portrait SVG starts at 1440-1010-24=406px.
            The purple SLAB left stair edge (x=0) is at 406px — well behind the frame border.
            Frame border at ~1010px draws on top of the purple. Clean join. */}
        <div className="absolute z-10" style={{ right: -24, top: 140 }}>
          <HeroPortrait />
        </div>
      </div>

      {/* Bottom Olive Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-40 h-[43px] bg-[#6E6A2D] border-t-[3px] border-[#111]"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: easings.primary }}
      />
    </section>
  );
}
