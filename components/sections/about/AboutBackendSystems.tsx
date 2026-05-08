"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

// Black card: "BACKEND SYSTEMS PERFORMANCE" in acid-yellow + staircase bar chart
export default function AboutBackendSystems() {
  // Staircase bars — ascending from left to right
  const bars = [
    { w: 18, h: 16 },
    { w: 18, h: 28 },
    { w: 18, h: 42 },
    { w: 18, h: 56 },
  ];

  return (
    <motion.div
      className="relative bg-[#050505] flex flex-col justify-between overflow-hidden"
      style={{ border: "4px solid #050505", padding: "24px 24px 28px 24px" }}
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
            fontFamily: "var(--font-archivo), 'Arial Black', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(20px, 1.8vw, 26px)",
            letterSpacing: "-0.02em",
            color: "#D7F205",
            lineHeight: 1.05,
            marginBottom: 14,
          }}
        >
          BACKEND
          <br />
          SYSTEMS
          <br />
          PERFORMANCE
        </h3>

        {/* Divider rule */}
        <div style={{ width: 40, height: 3, background: "#D7F205", marginBottom: 14 }} />

        {/* Body text */}
        <p
          className="font-mono"
          style={{
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1.5,
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
      <div className="flex items-end gap-[3px]" style={{ marginTop: 18 }}>
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            style={{
              width: bar.w,
              height: bar.h,
              background: "#D7F205",
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
