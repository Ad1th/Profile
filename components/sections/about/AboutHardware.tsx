"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

interface AboutHardwareProps {
  viewportTransition?: boolean;
}

// Cream card: "HARDWARE / SYSTEMS" badge + body text + chip SVG + bottom stripe
export default function AboutHardware({
  viewportTransition = false,
}: AboutHardwareProps) {
  return (
    <motion.div
      className="relative bg-[#F0EBE0] flex flex-col justify-between overflow-hidden"
      style={{
        border: "10px solid #111",
        borderLeft: "none",
        padding: viewportTransition
          ? "40px 16px 12px 14px"
          : "20px 20px 20px 20px",
        height: "100%",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.18, ease: easings.primary }}
    >
      {/* Badge */}
      <div>
        <div
          className="inline-flex items-center justify-center"
          style={{
            border: "3px solid #111",
            background: "#CFDE00",
            padding: viewportTransition ? "6px 9px" : "5px 12px",
            marginBottom: viewportTransition ? 22 : 18,
          }}
        >
          <span
            className="text-[#111] font-black uppercase tracking-[0.04em]"
            style={{
              fontFamily: "var(--font-Roboto-Mono), monospace",
              fontWeight: 900,
              fontSize: viewportTransition ? 18 : 14,
            }}
          >
            HARDWARE / SYSTEMS
          </span>
        </div>

        {/* Body text */}
        <p
          style={{
            // font-family: 'IBM Plex Mono', monospace;
            fontFamily: "var(--font-IBM-Plex-Mono), monospace",
            fontSize: viewportTransition ? 22 : 14,
            fontWeight: 500,
            lineHeight: 1.45,
            color: "#111",
          }}
        >
          Sometimes I drift into
          <br />
          hardware, where
          <br />
          software stops being
          <br />
          abstract, physics fights
          <br />
          back and things fail
          <br />
          in the real world.
        </p>
      </div>

      <div className="flex flex-col items-end gap-3">
        {/* Chip SVG */}
        <svg
          width={viewportTransition ? "55" : "64"}
          height={viewportTransition ? "55" : "64"}
          viewBox="0 0 68 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="16"
            y="16"
            width="36"
            height="36"
            rx="3"
            stroke="#111"
            strokeWidth="3"
            fill="none"
          />
          <rect
            x="24"
            y="24"
            width="20"
            height="20"
            rx="1"
            stroke="#111"
            strokeWidth="2"
            fill="none"
          />
          {/* Pin rows */}
          {[23, 31, 39].map((y) => (
            <g key={y}>
              <line
                x1="6"
                y1={y}
                x2="16"
                y2={y}
                stroke="#111"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="52"
                y1={y}
                x2="62"
                y2={y}
                stroke="#111"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          ))}
          {[23, 31, 39].map((x) => (
            <g key={x}>
              <line
                x1={x}
                y1="6"
                x2={x}
                y2="16"
                stroke="#111"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1={x}
                y1="52"
                x2={x}
                y2="62"
                stroke="#111"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          ))}
          {/* Center cross */}
          <line
            x1="34"
            y1="28"
            x2="34"
            y2="40"
            stroke="#111"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="28"
            y1="34"
            x2="40"
            y2="34"
            stroke="#111"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Bottom stripe decoration — diagonal hatch */}
        <div className="flex gap-[4px]">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: viewportTransition ? 12 : 14,
                background: "#111",
                transform: "skewX(-20deg)",
                opacity: 0.38,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
