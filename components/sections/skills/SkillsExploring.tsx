"use client";

import { motion, type MotionValue } from "framer-motion";
import { easings } from "@/lib/motion";

const exploring = [
  "eBPF & KERNEL OBSERVABILITY",
  "DISTRIBUTED SYSTEMS",
  "EVENT DRIVEN ARCHITECTURE",
  "AI AGENT FRAMEWORKS",
  "KERNEL-LEVEL DEBUGGING",
  "PERFORMANCE ENGINEERING",
  "GO BACKEND SYSTEMS",
  "RUST SYSTEMS PROGRAMMING",
  "CHAOS ENGINEERING",
];

export default function SkillsExploring({
  standalone,
  transitionProgress,
}: {
  standalone: boolean;
  transitionProgress?: MotionValue<number>;
}) {
  const transitionMode = Boolean(transitionProgress);

  return (
    <motion.div
      className="bg-[#6C8EAD] flex flex-col"
      style={{
        border: "3px solid #111",
        borderTop: "none",
        borderLeft: "3px solid #111",
        borderRight: "none",
        padding: "28px 30px 32px 30px",
      }}
      initial={transitionMode ? { x: 36, opacity: 0 } : false}
      animate={transitionMode ? { x: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.6, delay: 0.12, ease: easings.primary }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        style={{ marginBottom: 24 }}
        initial={transitionMode ? { x: 14, opacity: 0 } : false}
        animate={transitionMode ? { x: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.45, delay: 0.2, ease: easings.primary }}
      >
        <span
          className="font-mono text-[#111] uppercase"
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em" }}
        >
          // CURRENTLY EXPLORING
        </span>
        {/* Top-right corner bracket */}
        <div className="relative" style={{ width: 22, height: 18 }}>
          <div
            style={{
              width: 22,
              height: 4,
              background: "#111",
              position: "absolute",
              top: 0,
              right: 0,
            }}
          />
          <div
            style={{
              width: 4,
              height: 18,
              background: "#111",
              position: "absolute",
              top: 0,
              right: 0,
            }}
          />
        </div>
      </motion.div>

      {/* Tags */}
      <div className="flex flex-wrap gap-[10px]">
        {exploring.map((item, i) => (
          <motion.div
            key={item}
            className="inline-flex items-center bg-[#CFDE00]"
            style={{
              border: "3px solid #111",
              padding: "8px 16px",
              cursor: "default",
            }}
            initial={
              standalone || transitionMode
                ? { opacity: 0, scale: 0.88, y: 10 }
                : false
            }
            animate={
              standalone || transitionMode
                ? { opacity: 1, scale: 1, y: 0 }
                : undefined
            }
            viewport={{ once: true }}
            transition={{
              duration: 0.35,
              delay: transitionMode ? 0.28 + i * 0.045 : i * 0.055,
              ease: easings.primary,
            }}
            whileHover={{ y: -3, boxShadow: "4px 4px 0 #111" }}
          >
            <span
              className="text-[#111] font-black uppercase"
              style={{
                fontFamily: "var(--font-archivo), sans-serif",
                fontSize: 12,
                letterSpacing: "0.05em",
              }}
            >
              {item}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom-left corner bracket */}
      <div className="relative mt-auto pt-4" style={{ width: 22, height: 18 }}>
        <div
          style={{
            width: 22,
            height: 4,
            background: "#111",
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
        />
        <div
          style={{
            width: 4,
            height: 18,
            background: "#111",
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
        />
      </div>
    </motion.div>
  );
}
