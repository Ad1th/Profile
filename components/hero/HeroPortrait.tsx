"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import HeroBadge from "./HeroBadge";
import { VerticalDots } from "./HeroDecor";
import Image from "next/image";

const SHIELD = "M 40 0 L 390 0 Q 430 0 430 40 L 430 360 Q 430 560 215 560 Q 0 560 0 360 L 0 40 Q 0 0 40 0 Z";
const IMAGE = "M 16 0 L 366 0 Q 382 0 382 16 L 382 336 Q 382 512 191 512 Q 0 512 0 336 L 0 16 Q 0 0 16 0 Z";
const SLAB = "M 560 0 L 100 0 L 100 40 L 20 40 L 20 200 L 0 200 L 0 260 L 20 260 L 20 700 L 560 700 Z";

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
    <div ref={ref} className="relative" style={{ width: 560, height: 700, perspective: 1000 }}>

      {/* Rear offset slab */}
      <motion.div
        className="absolute inset-0"
        style={{ transform: "translate(14px, 14px) rotate(0.8deg)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.42 }}
      >
        <svg viewBox="0 0 560 700" className="w-full h-full">
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
        <svg viewBox="0 0 560 700" className="w-full h-full">
          <path d={SLAB} fill="#C9B0FF" stroke="#111" strokeWidth="3" />
        </svg>
      </motion.div>

      {/* Shield shadow */}
      <div
        className="absolute"
        style={{
          width: 430, height: 560,
          top: "calc(50% + 10px)", left: "calc(50% + 10px)",
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg viewBox="0 0 430 560" width="430" height="560">
          <path d={SHIELD} fill="#111" />
        </svg>
      </div>

      {/* Shield body */}
      <motion.div
        className="absolute z-10"
        style={{
          width: 430, height: 560,
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
        <svg viewBox="0 0 430 560" className="absolute inset-0 w-full h-full" style={{ filter: "drop-shadow(0 0 0 transparent)" }}>
          <path d={SHIELD} fill="#F6F0E8" stroke="#111" strokeWidth="5" />
        </svg>

        {/* Clipped image */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: 24, left: 24, width: 430 - 48, height: 560 - 48,
            clipPath: `path('${IMAGE}')`,
          }}
        >
          <Image
            src="/images/me2.jpeg"
            alt="Adith Manikonda"
            fill
            sizes="430px"
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
