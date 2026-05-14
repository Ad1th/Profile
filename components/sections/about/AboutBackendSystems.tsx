"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

interface AboutBackendSystemsProps {
  /**
   * When true, the cinematic parent owns all animation.
   * This component must not use whileInView/viewport observers.
   */
  viewportTransition?: boolean;
}

// Black card: "BACKEND SYSTEMS PERFORMANCE" in acid-yellow + staircase bar chart
export default function AboutBackendSystems({
  viewportTransition = false,
}: AboutBackendSystemsProps) {
  const standalone = !viewportTransition;
  // Staircase bars — ascending from left to right
  const bars = [
    { w: 20, h: 22 },
    { w: 20, h: 34 },
    { w: 20, h: 48 },
    { w: 20, h: 62 },
    { w: 20, h: 80 },
  ];

  return (
    <motion.div
      className="relative bg-[#111] flex flex-col justify-between overflow-hidden"
      style={{
        border: "3px solid #111",
        padding: viewportTransition
          ? "35px 20px 28px 30px"
          : "25px 24px 28px 24px",
        height: "100%",
      }}
      initial={standalone ? { opacity: 0, x: -20 } : false}
      whileInView={standalone ? { opacity: 1, x: 0 } : undefined}
      viewport={standalone ? { once: true } : undefined}
      transition={
        standalone
          ? { duration: 0.55, delay: 0.1, ease: easings.primary }
          : undefined
      }
    >
      {/* White Border */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          right: 10,
          bottom: 10,
          border: "3px solid #C8C0B4",
          pointerEvents: "none",
        }}
      />
      {/* Yellow headline */}
      <div>
        <h3
          className="uppercase leading-none select-none"
          style={{
            fontFamily: "var(--font-anton), 'Arial Black', sans-serif",
            // letterSpacing: "0.75em",
            // fontWeight: 700,
            fontSize: viewportTransition
              ? "clamp(33px, 2.35vw, 25px)"
              : "clamp(22px, 2.2vw, 28px)",
            letterSpacing: "0.02em",
            color: "#CFDE00",
            lineHeight: 1.15,
            marginBottom: viewportTransition ? 10 : 14,
          }}
        >
          BACKEND
          <br />
          SYSTEMS
          <br />
          PERFORMANCE
        </h3>

        {/* Divider rule */}
        <div
          style={{
            width: 188,
            height: 3,
            background: "#CFDE00",
            marginBottom: viewportTransition ? 19 : 14,
          }}
        />

        {/* Body text */}
        <p
          className="font-mono"
          style={{
            fontSize: viewportTransition ? 20 : 14,
            fontWeight: 900,
            lineHeight: 1.45,
            color: "#C8C0B4",
          }}
        >
          I figure out why
          <br />
          things break and
          <br />
          make them break less.
        </p>
      </div>

      {/* Staircase graphic */}
      <div
        className="flex items-end gap-[0px]"
        style={{
          marginTop: viewportTransition ? 10 : 18,
          marginLeft: viewportTransition ? 160 : -2,
        }}
      >
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            style={{
              width: bar.w,
              height: viewportTransition ? bar.h - 6 : bar.h,
              background: "#CFDE00",
            }}
            initial={standalone ? { scaleY: 0, originY: 1 } : false}
            whileInView={standalone ? { scaleY: 1 } : undefined}
            viewport={standalone ? { once: true } : undefined}
            transition={
              standalone ? { duration: 0.35, delay: 0.3 + i * 0.08 } : undefined
            }
          />
        ))}
      </div>
    </motion.div>
  );
}
