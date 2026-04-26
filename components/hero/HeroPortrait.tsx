"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import HeroBadge from "./HeroBadge";
import { VerticalDots } from "./HeroDecor";
import Image from "next/image";

const SHIELD = "M 56 0 L 524 0 Q 580 0 580 56 L 580 460 Q 580 700 290 700 Q 0 700 0 460 L 0 56 Q 0 0 56 0 Z";
const IMAGE = "M 28 0 L 496 0 Q 524 0 524 28 L 524 432 Q 524 644 262 644 Q 0 644 0 432 L 0 28 Q 0 0 28 0 Z";
const PLATE_W = 1010;
const PLATE_H = 928;
const SLAB = "M 1010 0 L 92 18 L 92 48 L 60 48 L 60 78 L 28 78 L 28 110 L 0 110 L 0 928 L 1010 928 L 1010 72 L 984 72 L 984 34 L 1010 34 Z";

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
    <div ref={ref} className="relative" style={{ width: PLATE_W, height: PLATE_H, perspective: 1200 }}>

      {/* Rear offset slab */}
      <motion.div
        className="absolute inset-0"
        style={{ transform: "translate(17px, 16px) rotate(0.65deg)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.42 }}
      >
        <svg viewBox={`0 0 ${PLATE_W} ${PLATE_H}`} className="w-full h-full">
          <path d={SLAB} fill="#111" stroke="#111" strokeWidth="3" />
        </svg>
      </motion.div>

      {/* Main purple slab */}
      <motion.div
        className="absolute inset-0 origin-left"
        style={{ transform: "rotate(-0.72deg) skewY(-0.18deg) translateX(-2px)" }}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.42, ease: easings.primary }}
      >
        <svg viewBox={`0 0 ${PLATE_W} ${PLATE_H}`} className="w-full h-full">
          <path d={SLAB} fill="#C8A9F4" stroke="#111" strokeWidth="3" />
        </svg>
      </motion.div>

      {/* Shield shadow */}
      <div
        className="absolute"
        style={{
          width: 580, height: 700,
          top: 442, left: 582,
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg viewBox="0 0 580 700" width="580" height="700">
          <path d={SHIELD} fill="#111" />
        </svg>
      </div>

      {/* Shield body */}
      <motion.div
        className="absolute z-10"
        style={{
          width: 580, height: 700,
          top: 424, left: 566,
          transform: "translate(-50%, -50%)",
          rotateX: mobile ? 0 : rx,
          rotateY: mobile ? 0 : ry,
        }}
        initial={{ x: "calc(-50% + 80px)", y: "-50%", scale: 0.94, opacity: 0 }}
        animate={{ x: "-50%", y: "-50%", scale: 0.99, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.48, ease: easings.primary }}
      >
        {/* SVG border + fill */}
        <svg viewBox="0 0 580 700" className="absolute inset-0 w-full h-full" style={{ filter: "drop-shadow(0 0 0 transparent)" }}>
          <path d={SHIELD} fill="#F6F0E8" stroke="#111" strokeWidth="5" />
        </svg>

        {/* Clipped image */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: 28, left: 28, width: 580 - 56, height: 700 - 56,
            clipPath: `path('${IMAGE}')`,
          }}
        >
          <Image
            src="/images/me2.jpeg"
            alt="Adith Manikonda"
            fill
            sizes="580px"
            className="object-cover object-[center_4%] grayscale contrast-[1.3] scale-[1.12]"
            priority
          />
        </div>
      </motion.div>

      <HeroBadge />
      <VerticalDots />
    </div>
  );
}
