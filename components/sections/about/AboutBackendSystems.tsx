"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

interface AboutBackendSystemsProps {
  viewportTransition?: boolean;
}

// Black card: "BACKEND SYSTEMS PERFORMANCE" in acid-yellow + staircase bar chart
export default function AboutBackendSystems({
  viewportTransition = false,
}: AboutBackendSystemsProps) {
  // Staircase bars — ascending from left to right
  const bars = [
    { w: 18, h: 16 },
    { w: 18, h: 28 },
    { w: 18, h: 42 },
    { w: 18, h: 56 },
  ];

  return (
    <motion.div
      className="relative bg-[#111] flex flex-col justify-between overflow-hidden"
      style={{
        border: "3px solid #111",
        padding: viewportTransition
          ? "18px 16px 16px 16px"
          : "24px 24px 28px 24px",
        height: "100%",
      }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.1, ease: easings.primary }}
    >
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
        style={{ marginTop: viewportTransition ? 12 : 18 }}
      >
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            style={{
              width: bar.w,
              height: viewportTransition ? bar.h - 6 : bar.h,
              background: "#CFDE00",
            }}
            initial={{ scaleY: 0, originY: 1 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.3 + i * 0.08 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
