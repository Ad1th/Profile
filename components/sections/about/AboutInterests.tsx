"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

const interests = [
  {
    label: "MULTIPLAYER\nGAMES",
    icon: (
      // Three people / group icon
      <svg
        width="44"
        height="40"
        viewBox="0 0 44 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="11"
          r="5"
          stroke="#111"
          strokeWidth="2.5"
          fill="none"
        />
        <circle
          cx="30"
          cy="11"
          r="5"
          stroke="#111"
          strokeWidth="2.5"
          fill="none"
        />
        <circle
          cx="22"
          cy="9"
          r="6"
          stroke="#111"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M2 34c0-6 5-10 12-10"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M42 34c0-6-5-10-12-10"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M10 38c0-7 5.4-12 12-12s12 5 12 12"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    label: "AI TOOLS",
    icon: (
      // AI chip icon
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="10"
          width="24"
          height="24"
          rx="2"
          stroke="#111"
          strokeWidth="2.5"
          fill="none"
        />
        <rect
          x="16"
          y="16"
          width="12"
          height="12"
          rx="1"
          stroke="#111"
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="16"
          y1="4"
          x2="16"
          y2="10"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="22"
          y1="4"
          x2="22"
          y2="10"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="4"
          x2="28"
          y2="10"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="16"
          y1="34"
          x2="16"
          y2="40"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="22"
          y1="34"
          x2="22"
          y2="40"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="34"
          x2="28"
          y2="40"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="4"
          y1="16"
          x2="10"
          y2="16"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="4"
          y1="22"
          x2="10"
          y2="22"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="4"
          y1="28"
          x2="10"
          y2="28"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="34"
          y1="16"
          x2="40"
          y2="16"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="34"
          y1="22"
          x2="40"
          y2="22"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="34"
          y1="28"
          x2="40"
          y2="28"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <text
          x="22"
          y="26"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fontFamily="monospace"
          fill="#111"
        >
          AI
        </text>
      </svg>
    ),
  },
  {
    label: "ANON\nFORUMS",
    icon: (
      // Mask / anonymous face icon
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="22"
          cy="22"
          rx="16"
          ry="18"
          stroke="#111"
          strokeWidth="2.5"
          fill="none"
        />
        <line
          x1="6"
          y1="22"
          x2="38"
          y2="22"
          stroke="#111"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        <ellipse
          cx="15"
          cy="18"
          rx="4"
          ry="3"
          stroke="#111"
          strokeWidth="2"
          fill="none"
        />
        <ellipse
          cx="29"
          cy="18"
          rx="4"
          ry="3"
          stroke="#111"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M15 30 Q22 35 29 30"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    label: "PRODUCTIVITY\nEXTENSIONS",
    icon: (
      // Puzzle piece icon
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 8h12v5a4 4 0 0 1 0 8v5H8V22a4 4 0 0 0 0-8V8z"
          stroke="#111"
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M20 8h12v6h2a4 4 0 0 1 0 8h-2v14H20v-5a4 4 0 0 0 0-8v-5"
          stroke="#111"
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "APPS THAT\nBRIDGE GAPS",
    icon: (
      // Bridge / arch icon
      <svg
        width="52"
        height="40"
        viewBox="0 0 52 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="2"
          y1="36"
          x2="50"
          y2="36"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="8"
          y1="8"
          x2="8"
          y2="36"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="44"
          y1="8"
          x2="44"
          y2="36"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M8 8 Q26 -4 44 8"
          stroke="#111"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="20"
          x2="20"
          y2="36"
          stroke="#111"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="26"
          y1="16"
          x2="26"
          y2="36"
          stroke="#111"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="32"
          y1="20"
          x2="32"
          y2="36"
          stroke="#111"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function AboutInterests() {
  return (
    <motion.div
      className="w-full bg-[#6C8EAD] flex items-stretch"
      style={{ border: "4px solid #111", borderTop: "none" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2, ease: easings.primary }}
    >
      {interests.map((item, i) => (
        <div
          key={item.label}
          className="flex-1 flex flex-col items-center justify-center gap-3"
          style={{
            padding: "20px 8px",
            borderLeft: i > 0 ? "3px solid #111" : "none",
          }}
        >
          {item.icon}
          <span
            className="text-[#111] text-center font-black uppercase"
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontSize: 11,
              letterSpacing: "0.08em",
              lineHeight: 0.9,
              whiteSpace: "pre-line",
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
