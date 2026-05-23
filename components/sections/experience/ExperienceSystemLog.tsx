"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

export default function ExperienceSystemLog() {
  const lines = [
    { label: "USER:", value: "VIT VELLORE" },
    { label: "MODE:", value: "EXPERIENCE_VIEW" },
    { label: "STATUS:", value: "ACTIVE" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.25, ease: easings.primary }}
      style={{
        background: "transparent",
        border: "2px solid #D7FF00",
        padding: "12px 16px",
        fontFamily: "IBM Plex Mono, monospace",
        minWidth: 210,
        position: "relative",
      }}
    >
      {/* Corner brackets */}
      <div
        style={{
          position: "absolute",
          top: -2,
          right: -2,
          width: 12,
          height: 12,
          borderTop: "2px solid #D7FF00",
          borderRight: "2px solid #D7FF00",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -2,
          left: -2,
          width: 12,
          height: 12,
          borderBottom: "2px solid #D7FF00",
          borderLeft: "2px solid #D7FF00",
        }}
      />

      {/* Label */}
      <div
        style={{
          background: "#FF5A1F",
          color: "#111",
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.08em",
          padding: "2px 8px",
          marginBottom: 10,
          display: "inline-block",
          fontFamily: "IBM Plex Mono, monospace",
        }}
      >
        SYSTEM LOG
      </div>

      {/* Lines */}
      {lines.map(({ label, value }, i) => (
        <div key={i} className="flex gap-2" style={{ marginBottom: 6 }}>
          <span
            style={{
              fontSize: 11,
              color: "#888",
              letterSpacing: "0.04em",
              minWidth: 68,
              fontFamily: "IBM Plex Mono, monospace",
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontSize: 11,
              color: "#ECE7DF",
              letterSpacing: "0.04em",
              fontWeight: 700,
              fontFamily: "IBM Plex Mono, monospace",
            }}
          >
            {value}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
