"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import HeroBadge from "./HeroBadge";
import Image from "next/image";

const FRAME_W = 470;
const FRAME_H = 498;

export default function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [2, -2]), {
    stiffness: 120,
    damping: 24,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), {
    stiffness: 120,
    damping: 24,
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
      className="relative flex items-center justify-center"
      style={{
        width: "100%",
        height: "100%",
        perspective: 1200,
        paddingBottom: 52,
      }}
    >
      {/* Vertical dots — right edge decoration, moved closer */}
      <div
        className="absolute right-10 top-1/2 flex flex-col gap-3"
        style={{ transform: "translateY(-50%)" }}
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ width: 10, height: 10, background: "#111" }} />
        ))}
      </div>

      {/* Three horizontal lime ticks — brutalist decoration */}
      <div
        className="absolute"
        style={{ left: 48, top: 44, width: 40, height: 24, zIndex: 5 }}
      >
        {[0, 8, 16].map((top) => (
          <div
            key={top}
            style={{
              position: "absolute",
              width: 24,
              height: 3,
              background: "#CFDE00",
              top,
              left: 0,
            }}
          />
        ))}
      </div>

      {/* Rectangular photo block with strong brutalist frame */}
      <motion.div
        className="relative z-10"
        style={{
          width: FRAME_W,
          height: FRAME_H,
          rotateX: mobile ? 0 : rx,
          rotateY: mobile ? 0 : ry,
          border: "6px solid #111",
          boxShadow: "12px 12px 0 #F0EBE0",
          background: "#1F1F1F",
        }}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.48, ease: easings.primary }}
      >
        {/* Photo */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: 0,
            left: 0,
            width: FRAME_W,
            height: FRAME_H,
          }}
        >
          <Image
            src="/images/me2.jpeg"
            alt="Adith Manikonda"
            fill
            sizes={`${FRAME_W}px`}
            className="object-cover object-[center_25%] grayscale contrast-[1.18] scale-[1.01]"
            priority
          />
        </div>
      </motion.div>

      {/* Badge */}
      <HeroBadge />
    </div>
  );
}
