"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import HeroBadge from "./HeroBadge";
import { VerticalDots } from "./HeroDecor";
import Image from "next/image";

export default function HeroPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [1, -1]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-1, 1]), { stiffness: 150, damping: 20 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || window.innerWidth < 768) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full md:w-[560px] h-[500px] md:h-[700px] flex items-center justify-center perspective-[1000px]" ref={containerRef}>
      
      {/* Background Offset Slab */}
      <motion.div 
        className="hidden md:block absolute w-full h-full bg-[#C7B6E8]"
        style={{ rotate: 0.8, x: 14, y: 14 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.48 }}
      />

      {/* Main Purple Slab */}
      <motion.div 
        className="hidden md:block absolute w-full h-full bg-[#C9B0FF] border-[3px] border-[#111]"
        style={{ rotate: 0.8 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.48 }}
      />

      {/* Portrait Shield */}
      <motion.div 
        className="relative w-full max-w-[430px] h-full max-h-[560px] bg-[#F6F0E8] border-[5px] border-[#111] overflow-hidden z-10 shadow-[10px_10px_0_#111]"
        style={{ 
          borderRadius: "34px 34px 215px 215px",
          rotateX: isMobile ? 0 : rotateX, 
          rotateY: isMobile ? 0 : rotateY,
        }}
        initial={{ x: 80, scale: 0.94, opacity: 0 }}
        animate={{ x: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 m-[24px] overflow-hidden rounded-[10px_10px_191px_191px]">
          <Image 
            src="/images/profile.png" 
            alt="Portrait" 
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover object-[center_20%] grayscale contrast-125"
            priority
          />
        </div>
      </motion.div>

      <HeroBadge />
      <VerticalDots />
    </div>
  );
}
