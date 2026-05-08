"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { easings } from "@/lib/motion";
import { useRef } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 40%"],
  });

  const buildY = useTransform(scrollYProgress, [0.28, 0.48], [80, 0]);
  const buildOpacity = useTransform(scrollYProgress, [0.28, 0.48], [0, 1]);
  const buildScale = useTransform(scrollYProgress, [0.28, 0.48], [0.96, 1]);

  const bioClip = useTransform(
    scrollYProgress,
    [0.34, 0.5],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const bioY = useTransform(scrollYProgress, [0.34, 0.5], [24, 0]);
  const bioOpacity = useTransform(scrollYProgress, [0.34, 0.5], [0, 1]);

  const backendY = useTransform(scrollYProgress, [0.36, 0.54], [40, 0]);
  const backendOpacity = useTransform(scrollYProgress, [0.36, 0.54], [0, 1]);
  const backendScale = useTransform(scrollYProgress, [0.36, 0.54], [0.96, 1]);

  const hardwareX = useTransform(
    scrollYProgress,
    [0.4, 0.52, 0.58],
    [-80, 8, 0],
  );
  const hardwareOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  const interestsY = useTransform(scrollYProgress, [0.42, 0.6], [48, 0]);
  const interestsOpacity = useTransform(scrollYProgress, [0.42, 0.6], [0, 1]);
  const interestsScale = useTransform(scrollYProgress, [0.42, 0.6], [0.96, 1]);

  const builtScale = useTransform(scrollYProgress, [0.45, 0.65], [1.06, 1]);
  const builtOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const builtTracking = useTransform(
    scrollYProgress,
    [0.45, 0.65],
    ["0.035em", "0em"],
  );

  const paperOpacity = useTransform(scrollYProgress, [0.52, 0.58], [0, 1]);
  const paperScale = useTransform(
    scrollYProgress,
    [0.52, 0.58, 0.66, 0.74],
    [0.7, 0.82, 1.03, 1],
  );
  const paperRotate = useTransform(
    scrollYProgress,
    [0.52, 0.58, 0.66, 0.74],
    [-8, -4, 1, 0],
  );
  const paperFilter = useTransform(
    scrollYProgress,
    [0.52, 0.58, 0.66, 0.74],
    ["blur(6px)", "blur(4px)", "blur(1px)", "blur(0px)"],
  );
  const paperClip = useTransform(
    scrollYProgress,
    [0.52, 0.58, 0.66, 0.74],
    [
      "polygon(8% 0, 100% 10%, 92% 100%, 0 88%)",
      "polygon(2% 4%, 98% 0, 100% 92%, 4% 100%)",
      "polygon(0 0, 100% 2%, 98% 100%, 0 98%)",
      "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    ],
  );

  const footerY = useTransform(scrollYProgress, [0.56, 0.74], [32, 0]);
  const footerOpacity = useTransform(scrollYProgress, [0.56, 0.74], [0, 1]);

  return (
    <section
      ref={sectionRef}
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
          <motion.div
            className="bg-[#111] flex items-center"
            style={{
              borderRight: "4px solid #111",
              borderBottom: "4px solid #111",
              padding: "48px 32px 48px 32px",
              minHeight: 420,
              y: buildY,
              opacity: buildOpacity,
              scale: buildScale,
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
          </motion.div>

          {/* Col 2, Row 1: Bio blue card */}
          <motion.div
            style={{
              borderRight: "4px solid #111",
              borderBottom: "4px solid #111",
              clipPath: bioClip,
              y: bioY,
              opacity: bioOpacity,
            }}
          >
            <AboutBio />
          </motion.div>

          {/* Col 3, Row 1: Philosophy cream/red card */}
          <motion.div
            style={{
              borderBottom: "4px solid #111",
              opacity: paperOpacity,
              scale: paperScale,
              rotate: paperRotate,
              filter: paperFilter,
              clipPath: paperClip,
              transformOrigin: "50% 42%",
            }}
          >
            <AboutPhilosophy />
          </motion.div>

          {/* ── ROW 2 ───────────────────────────────────── */}

          {/* Col 1, Row 2: split into BackendSystems + Hardware side by side */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "50% 50%",
              borderRight: "4px solid #111",
            }}
          >
            <motion.div
              style={{
                y: backendY,
                opacity: backendOpacity,
                scale: backendScale,
              }}
            >
              <AboutBackendSystems />
            </motion.div>
            <motion.div
              style={{
                x: hardwareX,
                opacity: hardwareOpacity,
              }}
            >
              <AboutHardware />
            </motion.div>
          </div>

          {/* Col 2+3, Row 2: Interests strip + Built to Be Used stacked */}
          <div className="flex flex-col" style={{ gridColumn: "2 / 4" }}>
            <motion.div
              style={{
                y: interestsY,
                opacity: interestsOpacity,
                scale: interestsScale,
              }}
            >
              <AboutInterests />
            </motion.div>
            <motion.div
              style={{
                scale: builtScale,
                opacity: builtOpacity,
                letterSpacing: builtTracking,
                transformOrigin: "50% 0%",
              }}
            >
              <AboutBuiltToBeUsed />
            </motion.div>
          </div>
        </div>

        {/* ── FOOTER ───────────────────────────────────── */}
        <motion.div style={{ y: footerY, opacity: footerOpacity }}>
          <AboutFooter />
        </motion.div>
      </div>
    </section>
  );
}
