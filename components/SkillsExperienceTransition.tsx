"use client";

/**
 * SkillsExperienceTransition.tsx
 *
 * 300vh container, one sticky lock. Identical architecture to HeroAboutTransition.
 *
 * LAYER STACK (bottom → top):
 *   z:10  Experience — sits underneath, whileInView animations fire normally
 *                      (Experience is in normal flow scroll, not sticky)
 *   z:20  Skills     — fully visible at start (from AboutSkillsTransition)
 *                      rows scatter off-screen during Phase 1
 *   z:30  Black void — fades in as rows leave, fades out to reveal Experience
 *
 * SCROLL MAP (0 → 1 over 300vh):
 *   0.00 → 0.25   Skills at rest / user reads it
 *   0.22 → 0.60   Skills rows scatter to 4 corners (staggered)
 *   0.28 → 0.50   Skills hero fades out
 *   0.35 → 0.65   Black void fades in behind scattering rows
 *   0.65 → 0.85   Black void fades out — Experience beneath is revealed
 *
 * WHY Experience is NOT inside the sticky:
 * Experience uses whileInView cards with complex positions (top: -690px etc).
 * Putting it inside a sticky absolute container would break its layout.
 * Instead, the sticky container fades to transparent at the end, revealing
 * the Experience section which is in normal document flow directly below.
 * The black void covers the transition so there's no jump.
 */

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import SkillsHero from "@/components/sections/skills/SkillsHero";
import Experience from "@/components/sections/experience/Experience";

// Scatter directions: where each row flies [x%, y%] of viewport
const SCATTER = [
  { x: -130, y: -110, delay: 0.0 }, // 01 BACKEND → top-left
  { x: 140, y: 120, delay: 0.04 }, // 02 DATA → bottom-right
  { x: 135, y: -115, delay: 0.02 }, // 03 OBSERVABILITY → top-right
  { x: -135, y: 115, delay: 0.06 }, // 04 HARDWARE → bottom-left
];

// Row labels (snapshot — mirrors SkillsSystemRows data)
const ROW_META = [
  { num: "01", title: "BACKEND", sub: "SYSTEMS", subColor: "#E8420A" },
  { num: "02", title: "DATA", sub: "SYSTEMS", subColor: "#E8420A" },
  { num: "03", title: "OBSERVABILITY", sub: "SYSTEMS", subColor: "#E8420A" },
  { num: "04", title: "HARDWARE", sub: "SYSTEMS", subColor: "#6C8EAD" },
];

const ROW_DESCS = [
  "Building modular services and robust APIs with clean architecture, authentication and performance in mind.",
  "Designing data models, optimizing queries and building reliable pipelines that scale with your product.",
  "Instrumenting systems to see everything, understand anomalies and resolve issues before users feel them.",
  "Working close to the metal. Embedded systems, sensors and hardware interfaces that connect software to reality.",
];

const ROW_TECH = [
  "NODE.JS / FASTAPI / POSTGRES / REDIS",
  "POSTGRESQL / MYSQL / MONGODB / PRISMA",
  "PROMETHEUS / GRAFANA / LOKI / SENTRY",
  "EMBEDDED / MCU / I2C / SPI / UART",
];

export default function SkillsExperienceTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Skills hero fades out ────────────────────────────────────────────────
  const skillsHeroOpacity = useTransform(scrollYProgress, [0.28, 0.48], [1, 0]);
  const skillsSnapshotOpacity = useTransform(scrollYProgress, [0.72, 0.9], [1, 0]);

  // ── Black void lifecycle ─────────────────────────────────────────────────
  // Fades in as rows leave, then fades out to reveal Experience inside the
  // same pinned viewport. No transparent outer scroll space is exposed.
  const voidOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.55, 0.65, 0.9],
    [0, 1, 1, 0],
  );

  // ── Per-row scatter transforms ───────────────────────────────────────────
  // All hooks called unconditionally at top level
  const r0x = useTransform(
    scrollYProgress,
    [0.22, 0.58],
    [0, SCATTER[0].x * 14.4],
  );
  const r0y = useTransform(
    scrollYProgress,
    [0.22, 0.58],
    [0, SCATTER[0].y * 9.0],
  );
  const r0op = useTransform(scrollYProgress, [0.38, 0.58], [1, 0]);
  const r0scale = useTransform(scrollYProgress, [0.22, 0.34], [1, 1.04]);

  const r1x = useTransform(
    scrollYProgress,
    [0.24, 0.6],
    [0, SCATTER[1].x * 14.4],
  );
  const r1y = useTransform(
    scrollYProgress,
    [0.24, 0.6],
    [0, SCATTER[1].y * 9.0],
  );
  const r1op = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);
  const r1scale = useTransform(scrollYProgress, [0.24, 0.36], [1, 1.04]);

  const r2x = useTransform(
    scrollYProgress,
    [0.26, 0.62],
    [0, SCATTER[2].x * 14.4],
  );
  const r2y = useTransform(
    scrollYProgress,
    [0.26, 0.62],
    [0, SCATTER[2].y * 9.0],
  );
  const r2op = useTransform(scrollYProgress, [0.42, 0.62], [1, 0]);
  const r2scale = useTransform(scrollYProgress, [0.26, 0.38], [1, 1.04]);

  const r3x = useTransform(
    scrollYProgress,
    [0.28, 0.64],
    [0, SCATTER[3].x * 14.4],
  );
  const r3y = useTransform(
    scrollYProgress,
    [0.28, 0.64],
    [0, SCATTER[3].y * 9.0],
  );
  const r3op = useTransform(scrollYProgress, [0.44, 0.64], [1, 0]);
  const r3scale = useTransform(scrollYProgress, [0.28, 0.4], [1, 1.04]);

  const rowTransforms = [
    { x: r0x, y: r0y, opacity: r0op, scale: r0scale },
    { x: r1x, y: r1y, opacity: r1op, scale: r1scale },
    { x: r2x, y: r2y, opacity: r2op, scale: r2scale },
    { x: r3x, y: r3y, opacity: r3op, scale: r3scale },
  ];

  return (
    <div
      ref={containerRef}
      data-section="skills"
      style={{ height: "300vh", position: "relative" }}
    >
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#111",
        }}
      >
        <div
          data-section="experience"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            overflow: "hidden",
          }}
        >
          <Experience />
        </div>

        {/* ── z:20 SKILLS SNAPSHOT — scatters outward ───────────────────── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            background: "#111",
            opacity: skillsSnapshotOpacity,
          }}
        >
          {/* Skills hero — fades as scatter begins */}
          <motion.div style={{ opacity: skillsHeroOpacity, flexShrink: 0 }}>
            <SkillsHero
              standalone={false}
              animateDots={true}
              isVisible={true}
            />
          </motion.div>

          {/* Rows — each scatters to its own corner */}
          <div
            style={{
              flex: 1,
              borderBottom: "3px solid #333",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {ROW_META.map((row, idx) => {
              const t = rowTransforms[idx];
              return (
                <motion.div
                  key={row.num}
                  style={{
                    flex: 1,
                    display: "grid",
                    gridTemplateColumns: "80px 220px 1fr 280px",
                    alignItems: "center",
                    borderBottom:
                      idx < ROW_META.length - 1 ? "2px solid #2a2a2a" : "none",
                    position: "relative",
                    x: t.x,
                    y: t.y,
                    scale: t.scale,
                    opacity: t.opacity,
                    willChange: "transform, opacity",
                    transformOrigin: "center center",
                  }}
                >
                  {/* Lime left accent bar */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 2,
                      background: "#CFDE00",
                    }}
                  />

                  {/* Number */}
                  <div
                    style={{
                      padding: "0 0 0 32px",
                      borderRight: "2px solid #2a2a2a",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "monospace",
                          fontSize: 18,
                          fontWeight: 700,
                          color: "#E8420A",
                          lineHeight: 1,
                        }}
                      >
                        {row.num}
                      </div>
                      <div
                        style={{
                          width: 28,
                          height: 2,
                          background: "#CFDE00",
                          marginTop: 6,
                        }}
                      />
                    </div>
                  </div>

                  {/* Title + sub */}
                  <div
                    style={{
                      padding: "0 24px",
                      borderRight: "2px solid #2a2a2a",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-archivo), sans-serif",
                          fontSize: "clamp(22px, 2.2vw, 34px)",
                          fontWeight: 900,
                          color: "#F0EBE0",
                          letterSpacing: "-0.01em",
                          lineHeight: 1,
                          textTransform: "uppercase",
                        }}
                      >
                        {row.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-archivo), sans-serif",
                          fontSize: 13,
                          fontWeight: 700,
                          color: row.subColor,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          marginTop: 4,
                        }}
                      >
                        {row.sub}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div
                    style={{
                      padding: "20px 24px",
                      borderRight: "2px solid #2a2a2a",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          color: "#E8420A",
                          fontFamily: "monospace",
                          fontSize: 14,
                          fontWeight: 900,
                          flexShrink: 0,
                        }}
                      >
                        {">"}
                      </span>
                      <p
                        style={{
                          fontFamily: "monospace",
                          fontSize: 13,
                          lineHeight: 1.6,
                          color: "#888",
                        }}
                      >
                        {ROW_DESCS[idx]}
                      </p>
                    </div>
                  </div>

                  {/* Tech */}
                  <div
                    style={{
                      padding: "0 24px",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "#555",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {ROW_TECH[idx]}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── z:30 BLACK VOID — covers scatter, then reveals Experience ─── */}
        {/*
          Fades in as rows leave (covering any straggling row edges).
          Fades out at the end to reveal Experience underneath in this same
          pinned viewport, so the page background can never show through.
        */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 30,
            background: "#111",
            opacity: voidOpacity,
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </div>
  );
}
