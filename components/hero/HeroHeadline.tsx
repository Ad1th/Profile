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
        lineHeight: 0.86,
        marginTop: -70,
        textRendering: "geometricPrecision",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* BACKEND — white, full width bleed */}
      <motion.div
        style={{
          clipPath: "inset(0 -40% 0 0)",
          overflow: "visible",
          ...backendStyle,
        }}
      >
        <motion.span
          className="block text-[#F0EBE0]"
          style={{ fontSize: "clamp(100px, 11vw, 168px)" }}
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.0, ease: easings.primary }}
        >
          BACKEND
        </motion.span>
      </motion.div>

      {/* WITH — acid yellow outline box, more intentional spacing */}
      <motion.div style={withStyle}>
        <motion.div
          className="inline-block"
          style={{
            border: "4px solid #CFDE00",
            padding: "12px 28px 10px 28px",
            marginTop: 12,
            marginBottom: 12,
            maxWidth: "fit-content",
            backgroundColor: "transparent",
          }}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.16, ease: easings.primary }}
        >
          <span
            className="block text-[#CFDE00]"
            style={{
              fontSize: "clamp(98px, 10.8vw, 164px)",
              lineHeight: 0.82,
              letterSpacing: "-0.04em",
            }}
          >
            WITH
          </span>
        </motion.div>
      </motion.div>

      {/* TASTE. — orange, solid, bold, poster-like rhythm */}
      <motion.div
        style={{
          clipPath: "inset(0 -40% 0 0)",
          overflow: "visible",
          ...tasteStyle,
        }}
      >
        <motion.span
          className="block text-[#E8420A]"
          style={{
            fontSize: "clamp(100px, 11vw, 168px)",
            letterSpacing: "-0.04em",
          }}
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.32, ease: easings.primary }}
        >
          TASTE.
        </motion.span>
      </motion.div>

      {/* Subtext with more breathing space */}
      <div className="mt-[28px]">
        {/* Thick rule in acid yellow, slightly wider */}
        <motion.div
          style={{
            width: 72,
            height: 5,
            background: "#CFDE00",
            originX: 0,
            marginBottom: 18,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
        />
        <motion.p
          className="font-mono text-[#E8E8E8] normal-case"
          style={{
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.01em",
            lineHeight: 1.52,
            maxWidth: 400,
            opacity: 1,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.56, ease: "easeOut" }}
        >
          Pressure tested builds
          <br />
          with clean internals.
        </motion.p>
      </div>
    </div>
  );
}
