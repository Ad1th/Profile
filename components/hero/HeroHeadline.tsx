"use client";

import { motion, type MotionStyle } from "framer-motion";
import { easings } from "@/lib/motion";

type HeroHeadlineProps = {
  backendStyle?: MotionStyle;
  withStyle?: MotionStyle;
  tasteStyle?: MotionStyle;
};

export default function HeroHeadline({
  backendStyle,
  withStyle,
  tasteStyle,
}: HeroHeadlineProps) {
  return (
    <div
      className="flex flex-col select-none uppercase"
      style={{
        fontFamily: "var(--font-anton), 'Arial Black', Impact, sans-serif",
        fontWeight: 900,
        letterSpacing: "-0.06em",
        lineHeight: 0.88,
        marginTop: -70,
        textRendering: "geometricPrecision",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* BACKEND — white, full width bleed */}
      <div style={{ clipPath: "inset(0 -40% 0 0)", overflow: "visible" }}>
        <motion.span
          className="block text-[#F4EFE6]"
          style={{
            fontSize: "clamp(96px, 11vw, 180px)",
            lineHeight: 0.82,
            ...backendStyle,
          }}
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
          border: "4px solid #D7F205",
          padding: "12px 18px 4px 18px",
          marginTop: 8,
          marginBottom: 8,
          maxWidth: "fit-content",
          backgroundColor: "transparent",
          ...withStyle,
        }}
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.16, ease: easings.primary }}
      >
        <span
          className="block text-[#D7F205]"
          style={{
            color: "#D7F205",
            fontSize: "clamp(96px, 11vw, 180px)",
            lineHeight: 0.82,
          }}
        >
          WITH
        </span>
      </motion.div>

      {/* TASTE. — orange, solid, bold */}
      <div style={{ clipPath: "inset(0 -40% 0 0)", overflow: "visible" }}>
        <motion.span
          className="block text-[#F24A05]"
          style={{
            color: "#F24A05",
            fontSize: "clamp(96px, 11vw, 180px)",
            lineHeight: 0.82,
            ...tasteStyle,
          }}
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
            background: "#D7F205",
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
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.02em",
            lineHeight: 1.45,
            maxWidth: 420,
            opacity: 0.92,
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
