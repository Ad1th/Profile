"use client";

import { motion } from "framer-motion";
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

export default function SkillsExploring({ standalone }: { standalone: boolean }) {
  return (
    <div
      className="bg-[#6C8EAD] flex flex-col"
      style={{
        border: "3px solid #111",
        borderTop: "none",
        borderLeft: "3px solid #111",
        borderRight: "none",
        padding: "28px 30px 32px 30px",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
        <span
          className="font-mono text-[#111] uppercase"
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em" }}
        >
          // CURRENTLY EXPLORING
        </span>
        {/* Top-right corner bracket */}
        <div className="relative" style={{ width: 22, height: 18 }}>
          <div style={{ width: 22, height: 4, background: "#111", position: "absolute", top: 0, right: 0 }} />
          <div style={{ width: 4, height: 18, background: "#111", position: "absolute", top: 0, right: 0 }} />
        </div>
      </div>

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
            initial={standalone ? { opacity: 0, scale: 0.88 } : false}
            whileInView={standalone ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.055, ease: easings.primary }}
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
        <div style={{ width: 22, height: 4, background: "#111", position: "absolute", bottom: 0, left: 0 }} />
        <div style={{ width: 4, height: 18, background: "#111", position: "absolute", bottom: 0, left: 0 }} />
      </div>
    </div>
  );
}
