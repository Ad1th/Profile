"use client";

/**
 * Experience.tsx
 *
 * Placeholder Experience section — same neo-brutalist design language
 * as Hero / About / Skills. Black / cream / acid-yellow / orange / steel-blue.
 *
 * This is a single "page" of vertical content that follows the pinned
 * FullTransition section. Receives proper design later.
 */

import { motion } from "framer-motion";
import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });

const easePrimary = [0.16, 1, 0.3, 1] as const;

const experiences = [
  {
    role: "BACKEND SYSTEMS ENGINEER",
    org: "PERSONAL PROJECTS",
    period: "2023 — PRESENT",
    tags: ["NODE.JS", "POSTGRESQL", "DOCKER", "PROMETHEUS"],
    desc: "Built and shipped full-stack systems with real observability stacks. Designed REST APIs, auth systems, and real-time features used in production.",
    color: "#E8420A",
  },
  {
    role: "OPEN SOURCE CONTRIBUTOR",
    org: "GITHUB",
    period: "2022 — PRESENT",
    tags: ["TYPESCRIPT", "FASTAPI", "REDIS"],
    desc: "Contributed to backend tooling and developer productivity projects. Fixed bugs, wrote tests, and improved documentation across multiple repos.",
    color: "#CFDE00",
  },
  {
    role: "HARDWARE & EMBEDDED SYSTEMS",
    org: "VIT VELLORE — LAB PROJECTS",
    period: "2023",
    tags: ["MICROCONTROLLERS", "SENSORS", "C/C++"],
    desc: "Designed embedded firmware for sensor interfaces. Debugged hardware at the register level where software abstractions stop working.",
    color: "#6C8EAD",
  },
];

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  return (
    <motion.div
      className="relative bg-[#F0EBE0] flex flex-col"
      style={{
        border: "3px solid #111",
        borderLeft: index === 0 ? "none" : "3px solid #111",
        borderTop: "none",
        padding: "32px 28px 36px 28px",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easePrimary }}
    >
      {/* Color accent bar at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: exp.color,
        }}
      />

      {/* Period tag */}
      <div
        className="inline-flex self-start"
        style={{
          background: "#111",
          border: "2px solid #111",
          padding: "4px 12px",
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        <span
          className="font-mono text-[#CFDE00] uppercase"
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}
        >
          {exp.period}
        </span>
      </div>

      {/* Role */}
      <h3
        className={`${anton.className} text-[#111] uppercase`}
        style={{
          fontSize: "clamp(22px, 2vw, 32px)",
          fontWeight: 400,
          lineHeight: 1.0,
          letterSpacing: "0.02em",
          marginBottom: 8,
        }}
      >
        {exp.role}
      </h3>

      {/* Org */}
      <div
        className="font-mono text-[#E8420A] uppercase"
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.1em",
          marginBottom: 20,
        }}
      >
        @ {exp.org}
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: 3,
          background: "#111",
          marginBottom: 18,
        }}
      />

      {/* Description */}
      <p
        className="text-[#333]"
        style={{
          fontFamily: "var(--font-archivo), sans-serif",
          fontSize: 14,
          fontWeight: 600,
          lineHeight: 1.55,
          marginBottom: 24,
        }}
      >
        {exp.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "#EEE7DC",
              border: "2px solid #111",
              padding: "4px 10px",
              fontSize: 10,
              fontWeight: 900,
              fontFamily: "monospace",
              letterSpacing: "0.08em",
              color: "#111",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom-right hatch */}
      <div
        className="absolute bottom-0 right-0"
        style={{ padding: "0 10px 10px 0", display: "flex", gap: 3 }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: 3,
              height: 14,
              background: "#111",
              transform: "skewX(-20deg)",
              opacity: 0.15,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section className="relative w-full bg-[#EEE7DC] overflow-hidden">
      <div
        className="relative mx-auto"
        style={{
          border: "5px solid #111",
          borderTop: "none",
          maxWidth: "100%",
        }}
      >
        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "42% 58%",
            borderBottom: "5px solid #111",
          }}
        >
          {/* Left — headline */}
          <motion.div
            className="bg-[#111] flex flex-col justify-between"
            style={{
              borderRight: "5px solid #111",
              padding: "36px 36px 40px 36px",
              minHeight: 220,
              position: "relative",
            }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easePrimary }}
          >
            {/* Corner bracket */}
            <div style={{ position: "absolute", top: 18, left: 18 }}>
              <div style={{ width: 24, height: 4, background: "#EEE7DC" }} />
              <div
                style={{
                  width: 4,
                  height: 24,
                  background: "#EEE7DC",
                  marginTop: -4,
                }}
              />
            </div>

            <div className="flex items-stretch gap-5 flex-1">
              <motion.div
                style={{
                  width: 14,
                  background: "#E8420A",
                  border: "3px solid #EEE7DC",
                  flexShrink: 0,
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: easePrimary }}
              />
              <div className="flex flex-col justify-end">
                <h1
                  className={`${anton.className} uppercase select-none`}
                  style={{
                    fontSize: "clamp(80px, 8.5vw, 140px)",
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    lineHeight: 0.86,
                    color: "#F0EBE0",
                    whiteSpace: "nowrap",
                  }}
                >
                  EX
                  <br />
                  <span style={{ color: "#CFDE00" }}>PERIENCE</span>
                </h1>
              </div>
            </div>

            <div style={{ marginTop: 22 }}>
              <div
                style={{
                  width: 56,
                  height: 4,
                  background: "#CFDE00",
                  marginBottom: 12,
                }}
              />
              <p
                className="font-mono text-[#C8C0B4]"
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  lineHeight: 1.5,
                  letterSpacing: "0.02em",
                }}
              >
                Real projects.
                <br />
                Real constraints.
                <br />
                Real lessons.
              </p>
            </div>
          </motion.div>

          {/* Right — status panel */}
          <motion.div
            className="bg-[#6C8EAD] flex flex-col justify-between"
            style={{
              padding: "36px 36px 40px 36px",
              position: "relative",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: easePrimary }}
          >
            {/* Diagonal hatch top-right */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                padding: "16px 18px 0 0",
                display: "flex",
                gap: 5,
              }}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 6,
                    height: 24,
                    background: "#111",
                    transform: "skewX(-20deg)",
                    opacity: 0.55,
                  }}
                />
              ))}
            </div>

            {/* Badge */}
            <div>
              <div
                className="inline-flex items-center"
                style={{
                  background: "#CFDE00",
                  border: "3px solid #111",
                  padding: "6px 18px",
                  marginBottom: 24,
                }}
              >
                <span
                  className="text-[#111] font-black uppercase"
                  style={{
                    fontFamily: "var(--font-archivo), sans-serif",
                    fontSize: 16,
                    letterSpacing: "0.04em",
                  }}
                >
                  BUILDING IN PUBLIC
                </span>
              </div>

              <p
                className="text-[#111]"
                style={{
                  fontFamily: "var(--font-archivo), sans-serif",
                  fontSize: "clamp(20px, 1.9vw, 28px)",
                  fontWeight: 700,
                  lineHeight: 1.45,
                  letterSpacing: "0.01em",
                }}
              >
                No titles yet.
                <br />
                Just shipped code,
                <br />
                broken systems,
                <br />
                and lessons learned.
              </p>
            </div>

            {/* Staircase bar graphic */}
            <div className="flex items-end gap-[3px]" style={{ marginTop: 16 }}>
              {[14, 22, 32, 46, 62, 80].map((h, i) => (
                <motion.div
                  key={i}
                  style={{
                    width: 22,
                    height: h,
                    background: "#CFDE00",
                    border: "2px solid #111",
                  }}
                  initial={{ scaleY: 0, originY: 1 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.07 }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── SECTION LABEL BAR ──────────────────────────────────────────── */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "3px solid #111",
            padding: "10px 24px",
            background: "#EEE7DC",
          }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easePrimary }}
        >
          <div className="flex items-center gap-3">
            <div style={{ width: 6, height: 6, background: "#E8420A" }} />
            <div style={{ width: 6, height: 6, background: "#E8420A" }} />
            <span
              className="font-mono text-[#111] uppercase"
              style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em" }}
            >
              // WORK & PROJECTS
            </span>
          </div>
          <div
            style={{
              width: 22,
              height: 22,
              border: "3px solid #E8420A",
              background: "#E8420A",
            }}
          />
        </motion.div>

        {/* ── EXPERIENCE CARDS ───────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.role} exp={exp} index={i} />
          ))}
        </div>

        {/* ── CTA ROW ────────────────────────────────────────────────────── */}
        <motion.div
          className="flex items-center justify-between bg-[#EEE7DC]"
          style={{
            borderTop: "3px solid #111",
            padding: "28px 32px",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: easePrimary }}
        >
          <p
            className="font-mono text-[#111] uppercase"
            style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.08em" }}
          >
            MORE PROJECTS COMING.
            <br />
            <span style={{ color: "#E8420A" }}>ALWAYS BUILDING.</span>
          </p>

          {/* Button */}
          <div className="relative" style={{ width: 240, height: 52 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: "translate(8px, 8px)",
                background: "#111",
              }}
            />
            <motion.button
              className="absolute inset-0 flex items-center justify-center gap-3 bg-[#CFDE00] cursor-pointer"
              style={{ border: "4px solid #111", letterSpacing: "0.08em" }}
              whileHover={{ x: -3, y: -3 }}
              whileTap={{ x: 1, y: 1 }}
              transition={{ duration: 0.16 }}
            >
              <span
                className="text-[#111] font-black uppercase"
                style={{
                  fontFamily: "var(--font-archivo), sans-serif",
                  fontSize: 15,
                  letterSpacing: "0.04em",
                }}
              >
                VIEW ALL PROJECTS
              </span>
              <div
                style={{
                  width: 12,
                  height: 12,
                  background: "#111",
                  flexShrink: 0,
                }}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* ── FOOTER ─────────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between"
          style={{
            height: 52,
            background: "#111",
            border: "4px solid #111",
            borderTop: "none",
            padding: "0 24px",
          }}
        >
          <div className="flex items-center gap-3">
            <div style={{ position: "relative", width: 20, height: 16 }}>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 4,
                  height: 16,
                  background: "#CFDE00",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 14,
                  height: 4,
                  background: "#CFDE00",
                }}
              />
            </div>
            <span
              className="uppercase font-mono tracking-[0.12em]"
              style={{
                color: "#F0EBE0",
                fontSize: 13,
                fontWeight: 700,
                opacity: 0.85,
              }}
            >
              SOFTWARE MEETS REALITY.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="uppercase font-mono tracking-[0.1em]"
              style={{ color: "#CFDE00", fontSize: 13, fontWeight: 700 }}
            >
              VIT VELLORE — BACKEND SYSTEMS — 2026
            </span>
            <div style={{ position: "relative", width: 20, height: 16 }}>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 4,
                  height: 16,
                  background: "#CFDE00",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 14,
                  height: 4,
                  background: "#CFDE00",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
