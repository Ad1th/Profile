"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import AboutBio from "./AboutBio";
import AboutPhilosophy from "./AboutPhilosophy";
import AboutInterests from "./AboutInterests";
import AboutBuiltToBeUsed from "./AboutBuiltToBeUsed";
import AboutBackendSystems from "./AboutBackendSystems";
import AboutHardware from "./AboutHardware";
import AboutFooter from "./AboutFooter";

// ─────────────────────────────────────────────────────────────────
// About section — pixel-accurate recreation of the design image
//
// Grid structure:
//  ┌─────────────────────┬──────────────┬──────────────┐
//  │  LEFT COL (black)   │  BIO (blue)  │ BEHAVIOR     │
//  │  "I BUILD.          │  CSE badge   │ (cream/red   │
//  │   I BREAK.          │  + body text │  border)     │
//  │   I FIX."           │              │              │
//  ├─────────┬───────────┼──────────────┴──────────────┤
//  │BACKEND  │ HARDWARE  │  INTERESTS strip (5 icons)  │
//  │SYSTEMS  │ /SYSTEMS  ├──────────────────────────────┤
//  │(black)  │ (cream)   │  BUILT TO BE USED (blue CTA) │
//  ├─────────┴───────────┴──────────────────────────────┤
//  │  FOOTER: "SOFTWARE MEETS REALITY."   right label   │
//  └─────────────────────────────────────────────────────┘
// ─────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section
      className="relative w-full bg-[#EEE7DC] overflow-hidden"
      style={{ padding: "0 0" }}
    >
      {/* Outer border frame — matches hero's border */}
      <div
        className="relative mx-auto"
        style={{
          border: "5px solid #111",
          borderTop: "none", // hero section handles top
          maxWidth: "100%",
        }}
      >
        {/* ── MAIN GRID ────────────────────────────────── */}
        {/*
          3-column grid:
            col1: ~37%  (headline + bottom-left cards)
            col2: ~26%  (bio card + hardware card)
            col3: ~37%  (philosophy + interests + built-to-be-used)
        */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "37% 26% 37%",
            gridTemplateRows: "auto auto",
          }}
        >
          {/* ── ROW 1 ───────────────────────────────────── */}

          {/* Col 1, Row 1: Black panel with "I BUILD. BREAK. FIX." */}
          <div
            className="bg-[#111] flex items-center"
            style={{
              borderRight: "4px solid #111",
              borderBottom: "4px solid #111",
              padding: "48px 32px 48px 32px",
              minHeight: 420,
            }}
          >
            {/* Vertical orange bar + headline */}
            <div className="flex items-stretch gap-6 w-full h-full">
              {/* Orange bar */}
              <motion.div
                style={{
                  width: 14,
                  background: "#E8420A",
                  border: "3px solid #111",
                  flexShrink: 0,
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: easings.primary }}
              />

              {/* Text */}
              <div
                className="flex flex-col justify-center select-none uppercase"
                style={{
                  fontFamily: "var(--font-archivo), 'Arial Black', sans-serif",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                }}
              >
                {[
                  { text: "I BUILD.", color: "#F0EBE0" },
                  { text: "I BREAK.", color: "#E8420A" },
                  { text: "I FIX.", color: "#F0EBE0" },
                ].map((line, i) => (
                  <motion.span
                    key={line.text}
                    className="block"
                    style={{
                      color: line.color,
                      fontSize: "clamp(56px, 5.6vw, 90px)",
                    }}
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.12,
                      ease: easings.primary,
                    }}
                  >
                    {line.text}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2, Row 1: Bio blue card */}
          <div
            style={{
              borderRight: "4px solid #111",
              borderBottom: "4px solid #111",
            }}
          >
            <AboutBio />
          </div>

          {/* Col 3, Row 1: Philosophy cream/red card */}
          <div style={{ borderBottom: "4px solid #111" }}>
            <AboutPhilosophy />
          </div>

          {/* ── ROW 2 ───────────────────────────────────── */}

          {/* Col 1, Row 2: split into BackendSystems + Hardware side by side */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "50% 50%",
              borderRight: "4px solid #111",
            }}
          >
            <AboutBackendSystems />
            <AboutHardware />
          </div>

          {/* Col 2+3, Row 2: Interests strip + Built to Be Used stacked */}
          <div className="flex flex-col" style={{ gridColumn: "2 / 4" }}>
            <AboutInterests />
            <AboutBuiltToBeUsed />
          </div>
        </div>

        {/* ── FOOTER ───────────────────────────────────── */}
        <AboutFooter />
      </div>
    </section>
  );
}
