"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import HeroBadge from "./HeroBadge";
import { VerticalDots } from "./HeroDecor";
import Image from "next/image";

// Shield scaled down from 580x700 to ~460x556 (about 79% size)
const SHIELD_W = 460;
const SHIELD_H = 556;
// Scale factor: 460/580 = ~0.793
const SHIELD =
  "M 44 0 L 416 0 Q 460 0 460 44 L 460 365 Q 460 556 230 556 Q 0 556 0 365 L 0 44 Q 0 0 44 0 Z";
const IMAGE =
  "M 22 0 L 394 0 Q 416 0 416 22 L 416 343 Q 416 512 208 512 Q 0 512 0 343 L 0 22 Q 0 0 22 0 Z";

const PLATE_W = 910;
const PLATE_H = 780;

export default function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [1.5, -1.5]), {
    stiffness: 150,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-2, 2]), {
    stiffness: 150,
    damping: 20,
  });
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
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [mx, my]);

  return (
    <div
      ref={ref}
      className="relative"
      style={{ width: PLATE_W, height: PLATE_H, perspective: 1200 }}
    >
      {/* Rear offset slab */}
      <motion.div
        className="absolute inset-0"
        style={{
          transform: "translate(20px, 20px)",
          background: "#111",
          border: "5px solid #111",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.42 }}
      />

      {/* Main purple slab */}
      <motion.div
        className="absolute inset-0 origin-left"
        style={{
          transform: "translateX(-6px)",
          background: "#D6E94B",
          border: "5px solid #111",
        }}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.42, ease: easings.primary }}
      />

      {/* Shield shadow */}
      <div
        className="absolute"
        style={{
          width: SHIELD_W,
          height: SHIELD_H,
          top: 390,
          left: 478,
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg
          viewBox={`0 0 ${SHIELD_W} ${SHIELD_H}`}
          width={SHIELD_W}
          height={SHIELD_H}
        >
          <path d={SHIELD} fill="#111" />
        </svg>
      </div>

      {/* Shield body */}
      <motion.div
        className="absolute z-10"
        style={{
          width: SHIELD_W,
          height: SHIELD_H,
          top: 374,
          left: 462,
          transform: "translate(-50%, -50%)",
          rotateX: mobile ? 0 : rx,
          rotateY: mobile ? 0 : ry,
        }}
        initial={{ x: "calc(-50% + 80px)", y: "-50%", scale: 0.94, opacity: 0 }}
        animate={{ x: "-50%", y: "-50%", scale: 0.99, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.48, ease: easings.primary }}
      >
        {/* SVG border + fill */}
        <svg
          viewBox={`0 0 ${SHIELD_W} ${SHIELD_H}`}
          className="absolute inset-0 w-full h-full"
        >
          <path d={SHIELD} fill="#F6F0E8" stroke="#111" strokeWidth="5" />
        </svg>

        {/* Clipped image */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: 22,
            left: 22,
            width: SHIELD_W - 44,
            height: SHIELD_H - 44,
            clipPath: `path('${IMAGE}')`,
          }}
        >
          <Image
            src="/images/me2.jpeg"
            alt="Adith Manikonda"
            fill
            sizes={`${SHIELD_W}px`}
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
