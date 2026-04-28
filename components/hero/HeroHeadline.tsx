"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

export default function HeroHeadline() {
  return (
    <div
      className="flex flex-col select-none uppercase"
      style={{
        fontFamily: "var(--font-anton), 'Arial Black', Impact, sans-serif",
        fontWeight: 900,
        letterSpacing: "-0.06em",
        lineHeight: 0.88,
        textRendering: "geometricPrecision",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* BACKEND — white, full width bleed */}
      <div style={{ clipPath: "inset(0 -40% 0 0)", overflow: "visible" }}>
        <motion.span
          className="block text-[#F0EBE0]"
          style={{ fontSize: "clamp(100px, 11vw, 168px)" }}
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.0, ease: easings.primary }}
        >
          BACKEND
        </motion.span>
      </div>

      {/* WITH — acid yellow outlined, offset left for tension */}
      <div style={{ clipPath: "inset(0 -40% 0 0)", overflow: "visible" }}>
        <motion.span
          className="block"
          style={{
            fontSize: "clamp(98px, 10.8vw, 164px)",
            color: "transparent",
            WebkitTextStroke: "4px #CFDE00",
            marginLeft: -6,
          }}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.16, ease: easings.primary }}
        >
          WITH
        </motion.span>
      </div>

      {/* TASTE. — orange, solid, bold */}
      <div style={{ clipPath: "inset(0 -40% 0 0)", overflow: "visible" }}>
        <motion.span
          className="block text-[#E8420A]"
          style={{ fontSize: "clamp(100px, 11vw, 168px)" }}
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.32, ease: easings.primary }}
        >
          TASTE.
        </motion.span>
      </div>

      {/* Subtext */}
      <div className="mt-[20px]">
        {/* Thick rule in acid yellow */}
        <motion.div
          style={{
            width: 64,
            height: 5,
            background: "#CFDE00",
            originX: 0,
            marginBottom: 14,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />
        <motion.p
          className="font-mono text-[#F0EBE0] normal-case"
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.4,
            maxWidth: 320,
            opacity: 0.75,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 0.6, delay: 0.56 }}
        >
          Pressure tested builds
          <br />
          with clean internals.
        </motion.p>
      </div>
    </div>
  );
}
