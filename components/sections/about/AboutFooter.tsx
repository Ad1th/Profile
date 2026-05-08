"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

// Bottom status bar — matches the image's footer exactly
export default function AboutFooter() {
  return (
    <motion.div
      className="w-full flex items-center justify-between"
      style={{
        height: 52,
        background: "#111",
        border: "4px solid #111",
        borderTop: "none",
        padding: "0 24px",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3, ease: easings.primary }}
    >
      {/* Left: bracket + left label */}
      <div className="flex items-center gap-3">
        {/* Corner bracket */}
        <div className="relative" style={{ width: 20, height: 16 }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, width: 4, height: 16, background: "#CFDE00" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: 14, height: 4, background: "#CFDE00" }} />
        </div>
        <span
          className="uppercase font-mono tracking-[0.12em]"
          style={{ color: "#F0EBE0", fontSize: 13, fontWeight: 700, opacity: 0.85 }}
        >
          SOFTWARE MEETS REALITY.
        </span>
      </div>

      {/* Right: label + bracket */}
      <div className="flex items-center gap-3">
        <span
          className="uppercase font-mono tracking-[0.1em]"
          style={{ color: "#CFDE00", fontSize: 13, fontWeight: 700 }}
        >
          VIT VELLORE — BACKEND SYSTEMS — 2026
        </span>
        {/* Corner bracket */}
        <div className="relative" style={{ width: 20, height: 16 }}>
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 4, height: 16, background: "#CFDE00" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 14, height: 4, background: "#CFDE00" }} />
        </div>
      </div>
    </motion.div>
  );
}
