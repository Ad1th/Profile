"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import HeroBadge from "./HeroBadge";
import { VerticalDots } from "./HeroDecor";
import Image from "next/image";

const SHIELD = "M 48 0 L 452 0 Q 500 0 500 48 L 500 420 Q 500 640 250 640 Q 0 640 0 420 L 0 48 Q 0 0 48 0 Z";
const IMAGE = "M 24 0 L 428 0 Q 452 0 452 24 L 452 396 Q 452 592 226 592 Q 0 592 0 396 L 0 24 Q 0 0 24 0 Z";
const SLAB = "M 640 0 L 120 0 L 120 50 L 24 50 L 24 120 L 0 120 L 0 180 L 24 180 L 24 800 L 640 800 Z";

export default function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [1.5, -1.5]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-2, 2]), { stiffness: 150, damping: 20 });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(window.innerWidth < 768);
    const onResize = () => setMobile(window.innerWidth < 768);
    const onMove = (e: MouseEvent) => {
      if (!ref.current || window.innerWidth < 768) return;
      const r = ref.current.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("resize", onResize); window.removeEventListener("mousemove", onMove); };
  }, [mx, my]);

  return (
    <div ref={ref} className="relative" style={{ width: 640, height: 800, perspective: 1000 }}>

      {/* Rear offset slab */}
      <motion.div
        className="absolute inset-0"
        style={{ transform: "translate(14px, 14px) rotate(0.8deg)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.42 }}
      >
        <svg viewBox="0 0 640 800" className="w-full h-full">
          <path d={SLAB} fill="#C7B6E8" stroke="#111" strokeWidth="3" />
        </svg>
      </motion.div>

      {/* Main purple slab */}
      <motion.div
        className="absolute inset-0"
        style={{ transform: "rotate(0.8deg)" }}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.42, ease: easings.primary }}
      >
        <svg viewBox="0 0 640 800" className="w-full h-full">
          <path d={SLAB} fill="#C9B0FF" stroke="#111" strokeWidth="3" />
        </svg>
      </motion.div>

      {/* Shield shadow */}
      <div
        className="absolute"
        style={{
          width: 500, height: 640,
          top: "calc(50% + 10px)", left: "calc(50% + 10px)",
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg viewBox="0 0 500 640" width="500" height="640">
          <path d={SHIELD} fill="#111" />
        </svg>
      </div>

      {/* Shield body */}
      <motion.div
        className="absolute z-10"
        style={{
          width: 500, height: 640,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          rotateX: mobile ? 0 : rx,
          rotateY: mobile ? 0 : ry,
        }}
        initial={{ x: "calc(-50% + 80px)", y: "-50%", scale: 0.94, opacity: 0 }}
        animate={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.48, ease: easings.primary }}
      >
        {/* SVG border + fill */}
        <svg viewBox="0 0 500 640" className="absolute inset-0 w-full h-full" style={{ filter: "drop-shadow(0 0 0 transparent)" }}>
          <path d={SHIELD} fill="#F6F0E8" stroke="#111" strokeWidth="5" />
        </svg>

        {/* Clipped image */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: 24, left: 24, width: 500 - 48, height: 640 - 48,
            clipPath: `path('${IMAGE}')`,
          }}
        >
          <Image
            src="/images/me2.jpeg"
            alt="Adith Manikonda"
            fill
            sizes="500px"
            className="object-cover object-[center_20%] grayscale contrast-[1.3]"
            priority
          />
        </div>
      </motion.div>

      <HeroBadge />
      <VerticalDots />
    </div>
  );
}
