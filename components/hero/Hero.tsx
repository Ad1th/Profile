"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import HeroFrame from "./HeroFrame";
import HeroHeadline from "./HeroHeadline";
import HeroCTA from "./HeroCTA";
import HeroPortrait from "./HeroPortrait";
import { PixelCluster, VerticalDots, SmallSquare } from "./HeroDecor";

export default function Hero() {
  return (
    <section className="relative w-full pt-[84px] md:pt-[128px] pb-[64px] min-h-screen flex justify-center overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-50 mix-blend-multiply opacity-[0.02]" />

      <div className="w-full max-w-[1376px] px-[24px] md:px-[48px] mx-auto flex flex-col md:grid md:grid-cols-[56%_44%] items-center mt-[32px] md:mt-[64px]">
        
        {/* Left Side */}
        <div className="relative w-full h-[600px] md:h-[720px] flex items-center xl:w-[640px]">
          <HeroFrame>
            <HeroHeadline />
            <HeroCTA />
          </HeroFrame>
        </div>

        {/* Right Side */}
        <div className="relative w-full min-h-[500px] md:h-[720px] flex justify-end xl:w-[560px] mt-[64px] md:mt-0">
          <HeroPortrait />
        </div>

      </div>

      {/* Optional Bottom Bar */}
      <div 
        className="hidden md:block absolute bottom-0 left-0 w-full h-[48px] bg-[#6E6A2D] origin-bottom z-40 border-t-[3px] border-[#111]"
      />
    </section>
  );
}
