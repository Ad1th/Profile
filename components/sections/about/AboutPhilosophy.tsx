"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

// Cream card with orange border: "BEHAVIOR > BUZZWORDS" + bullet list
export default function AboutPhilosophy() {
  const bullets = ["UNDER LOAD.", "UNDER PRESSURE.", "UNDER MISTAKES."];

  return (
    <motion.div
      className="relative bg-[#F4EFE6] h-full flex flex-col"
      style={{ border: "4px solid #F24A05", padding: "24px 24px 28px 24px" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.16, ease: easings.primary }}
    >
      {/* Fake window chrome — top-right close buttons */}
      <div
        className="absolute top-0 right-0 flex items-center gap-0"
        style={{ padding: "6px 10px", borderBottom: "3px solid #F24A05" }}
      >
        <span
          className="text-[#050505] font-black"
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: 13,
            marginRight: 8,
          }}
        >
          —
        </span>
        <span
          className="text-[#050505] font-black"
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: 13,
          }}
        >
          ✕
        </span>
      </div>

      {/* Headline */}
      <h2
        className="text-[#050505] uppercase leading-none"
        style={{
          fontFamily: "var(--font-archivo), 'Arial Black', sans-serif",
          fontSize: "clamp(20px, 2vw, 28px)",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          marginBottom: 14,
          marginTop: 8,
        }}
      >
        BEHAVIOR &gt; BUZZWORDS
      </h2>

      {/* Horizontal rule */}
      <div style={{ width: "100%", height: 2, background: "#050505", marginBottom: 16 }} />

      {/* Body text */}
      <p
        className="text-[#050505]"
        style={{
          fontFamily: "var(--font-archivo), monospace",
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 1.5,
          marginBottom: 20,
        }}
      >
        I care more about how
        <br />
        something behaves
        <br />
        than how it's described.
      </p>

      {/* Bullet list */}
      <div className="flex flex-col gap-[10px]">
        {bullets.map((b) => (
          <div key={b} className="flex items-center gap-3">
            <div
              style={{ width: 14, height: 14, background: "#F24A05", flexShrink: 0 }}
            />
            <span
              className="text-[#050505] uppercase font-bold"
              style={{
                fontFamily: "var(--font-archivo), sans-serif",
                fontSize: 14,
                letterSpacing: "0.06em",
              }}
            >
              {b}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
