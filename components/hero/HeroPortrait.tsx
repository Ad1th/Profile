"use client";

import { motion, type MotionStyle } from "framer-motion";
import { easings } from "@/lib/motion";
import { useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import HeroBadge from "./HeroBadge";
import Image from "next/image";

const FRAME_W = 460;
const FRAME_H = 488;

type HeroPortraitProps = {
  containerStyle?: MotionStyle;
};

export default function HeroPortrait({ containerStyle }: HeroPortraitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-0.5, 0.5], [2, -2]);
  const ry = useTransform(mx, [-0.5, 0.5], [-3, 3]);
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
    <motion.div
      ref={ref}
      className="relative flex items-center justify-center"
      style={{
        width: "100%",
        height: "100%",
        perspective: 1200,
        paddingBottom: 50,
        x: 24,
        y: -18,
        ...containerStyle,
      }}
    >
      {/* Vertical dots — right edge decoration, moved closer */}
      <div
        className="absolute right-10 flex flex-col gap-3"
        style={{
          top: "50%",
          right: 28,
          gap: 12,
          transform: "translateY(-50%)",
        }}
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ width: 10, height: 10, background: "#050505" }} />
        ))}
      </div>

      {/* Three horizontal lime ticks — brutalist decoration */}
      <div
        className="absolute"
        style={{ left: 58, top: 44, width: 40, height: 24, zIndex: 5 }}
      >
        {[0, 8, 16].map((top) => (
          <div
            key={top}
            style={{
              position: "absolute",
              width: 24,
              height: 3,
              background: "#D7F205",
              top,
              left: 0,
            }}
          />
        ))}
      </div>

      {/* Rectangular photo block with strong brutalist frame */}
      <div
        className="absolute"
        style={{
          width: "66%",
          aspectRatio: 0.72,
          minWidth: 360,
          maxWidth: FRAME_W + 34,
          right: "calc(50% - 260px)",
          top: "calc(50% - 254px)",
          background: "#F24A05",
          border: "4px solid #050505",
          transform: "translate(30px, -10px) rotate(-3deg) skewX(-3deg)",
          zIndex: 0,
        }}
      />
      <motion.div
        className="relative z-10"
        style={{
          width: "66%",
          aspectRatio: 0.72,
          minWidth: 360,
          maxWidth: FRAME_W,
          rotateX: mobile ? 0 : rx,
          rotateY: mobile ? 0 : ry,
          border: "7px solid #050505",
          boxShadow: "12px 12px 0 #050505",
          background: "#F4EFE6",
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
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src="/images/me2.jpeg"
            alt="Adith Manikonda"
            fill
            sizes={`${FRAME_W}px`}
            className="object-cover object-[56%_18%] grayscale contrast-[1.18] scale-[1.04]"
            priority
          />
        </div>
      </motion.div>

      {/* Badge */}
      <HeroBadge />
    </motion.div>
  );
}
