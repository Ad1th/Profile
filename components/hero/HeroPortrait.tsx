"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import HeroBadge from "./HeroBadge";
import Image from "next/image";

// Slightly narrower shield to fit the 38% panel comfortably
const SHIELD_W = 380;
const SHIELD_H = 480;
const SHIELD =
  "M 38 0 L 342 0 Q 380 0 380 38 L 380 310 Q 380 480 190 480 Q 0 480 0 310 L 0 38 Q 0 0 38 0 Z";
const IMAGE =
  "M 20 0 L 360 0 Q 380 0 360 20 L 360 296 Q 360 458 190 458 Q 0 458 0 296 L 0 20 Q 0 0 20 0 Z";

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
      {/* Vertical dots — right edge decoration */}
      <div
        className="absolute right-5 top-1/2 flex flex-col gap-3"
        style={{ transform: "translateY(-50%)" }}
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ width: 10, height: 10, background: "#111" }} />
        ))}
      </div>

      {/* Shield shadow */}
      <div
        className="absolute"
        style={{
          width: SHIELD_W,
          height: SHIELD_H,
          transform: "translate(14px, 14px)",
          zIndex: 0,
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

      {/* Shield — tilt-on-hover */}
      <motion.div
        className="relative z-10"
        style={{
          width: SHIELD_W,
          height: SHIELD_H,
          rotateX: mobile ? 0 : rx,
          rotateY: mobile ? 0 : ry,
        }}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.48, ease: easings.primary }}
      >
        {/* SVG border */}
        <svg
          viewBox={`0 0 ${SHIELD_W} ${SHIELD_H}`}
          className="absolute inset-0 w-full h-full"
        >
          <path d={SHIELD} fill="#F0EBE0" stroke="#111" strokeWidth="5" />
        </svg>

        {/* Clipped photo */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: 18,
            left: 18,
            width: SHIELD_W - 36,
            height: SHIELD_H - 36,
            clipPath: `path('${IMAGE}')`,
          }}
        >
          <Image
            src="/images/me2.jpeg"
            alt="Adith Manikonda"
            fill
            sizes={`${SHIELD_W}px`}
            className="object-cover object-[center_4%] grayscale contrast-[1.2] scale-[1.08]"
            priority
          />
        </div>
      </motion.div>

      {/* Badge */}
      <HeroBadge />
    </div>
  );
}
