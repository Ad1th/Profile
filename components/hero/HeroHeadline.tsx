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

      {/* WITH — acid yellow outline box with cleaner styling */}
      <motion.div
        className="inline-block"
        style={{
          border: "4px solid #CFDE00",
          padding: "10px 24px 8px 24px",
          marginTop: 8,
          marginBottom: 8,
          maxWidth: "fit-content",
          backgroundColor: "transparent",
        }}
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.16, ease: easings.primary }}
      >
        <span
          className="block text-[#CFDE00]"
          style={{ fontSize: "clamp(98px, 10.8vw, 164px)", lineHeight: 0.82 }}
        >
          WITH
        </span>
      </motion.div>

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
            height: 4,
            background: "#CFDE00",
            originX: 0,
            marginBottom: 14,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />
        <motion.p
          className="font-mono text-[#E8E8E8] normal-case"
          style={{
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.02em",
            lineHeight: 1.46,
            maxWidth: 380,
            opacity: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
