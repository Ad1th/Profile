"use client";

import { motion, type MotionValue } from "framer-motion";
import { easings } from "@/lib/motion";

export default function SkillsFooter({
  viewportTransition,
  transitionProgress,
}: {
  viewportTransition: boolean;
  transitionProgress?: MotionValue<number>;
}) {
  const transitionMode = Boolean(transitionProgress);

  return (
    <motion.div
      className="w-full flex items-center justify-between"
      style={{
        height: viewportTransition ? 32 : 52,
        background: "#111",
        border: "4px solid #111",
        borderTop: "none",
        padding: viewportTransition ? "0 14px" : "0 24px",
      }}
      initial={transitionMode ? { y: 18, opacity: 0 } : false}
      animate={transitionMode ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.5, delay: 0.6, ease: easings.primary }}
    >
      {/* Left */}
      <motion.div
        className="flex items-center gap-3"
        initial={transitionMode ? { x: -18, opacity: 0 } : false}
        animate={transitionMode ? { x: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.4, delay: 0.7, ease: easings.primary }}
      >
        <div className="relative" style={{ width: 20, height: 16 }}>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 4,
              height: 16,
              background: "#CFDE00",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 14,
              height: 4,
              background: "#CFDE00",
            }}
          />
        </div>
        <span
          className="uppercase font-mono tracking-[0.12em]"
          style={{
            color: "#F0EBE0",
            fontSize: viewportTransition ? 10 : 13,
            fontWeight: 700,
            opacity: 0.85,
          }}
        >
          SOFTWARE MEETS REALITY.
        </span>
      </motion.div>

      {/* Right */}
      <motion.div
        className="flex items-center gap-3"
        initial={transitionMode ? { x: 18, opacity: 0 } : false}
        animate={transitionMode ? { x: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.4, delay: 0.78, ease: easings.primary }}
      >
        <span
          className="uppercase font-mono tracking-[0.1em]"
          style={{
            color: "#CFDE00",
            fontSize: viewportTransition ? 10 : 13,
            fontWeight: 700,
          }}
        >
          VIT VELLORE — BACKEND SYSTEMS — 2026
        </span>
        <div className="relative" style={{ width: 20, height: 16 }}>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 4,
              height: 16,
              background: "#CFDE00",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 14,
              height: 4,
              background: "#CFDE00",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
