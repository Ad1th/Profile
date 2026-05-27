"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

export default function ExperienceFooter() {
  return (
    <motion.div
      className="flex items-end justify-between"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6, ease: easings.primary }}
    >
      {/* Left: archive system info */}
      <div
        style={{
          border: "2px solid #333",
          padding: "14px 20px",
          fontFamily: "IBM Plex Mono, monospace",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#888",
            letterSpacing: "0.1em",
            marginBottom: 10,
          }}
        >
          EXPERIENCE ARCHIVE SYSTEM
        </div>
        {[
          ["TOTAL RECORDS", "04"],
          ["ACTIVE RECORDS", "03"],
          ["COMPLETED", "01"],
        ].map(([label, value]) => (
          <div key={label} className="flex gap-3" style={{ marginBottom: 3 }}>
            <span
              style={{
                fontSize: 11,
                color: "#666",
                letterSpacing: "0.06em",
                minWidth: 120,
              }}
            >
              {label}
            </span>
            <span style={{ fontSize: 11, color: "#ECE7DF", fontWeight: 700 }}>
              : {value}
            </span>
          </div>
        ))}

        {/* Mini bar chart */}
        <div
          className="flex items-end gap-[3px]"
          style={{ marginTop: 10, height: 28 }}
        >
          {[8, 14, 10, 20, 16, 24, 18, 28].map((h, i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: h,
                background: i % 2 === 0 ? "#8A8B6D" : "#A14A32",
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      </div>

      {/* Right: globe + text */}
      <div className="flex items-center gap-4">
        <div
          style={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.09em",
            color: "#8A8B6D",
            textAlign: "right",
            lineHeight: 1.7,
          }}
        >
          BUILDING IMPACT.
          <br />
          SHARING KNOWLEDGE.
          <br />
          SHIPPING VALUE.
        </div>
        <div
          style={{
            border: "2px solid #8A8B6D",
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <circle
              cx="16"
              cy="16"
              r="12"
              stroke="#8A8B6D"
              strokeWidth="2"
              fill="none"
            />
            <path d="M4 16 H28" stroke="#8A8B6D" strokeWidth="1.5" />
            <path
              d="M16 4 C10 8 10 24 16 28"
              stroke="#8A8B6D"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M16 4 C22 8 22 24 16 28"
              stroke="#8A8B6D"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
