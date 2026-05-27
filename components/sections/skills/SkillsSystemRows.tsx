"use client";

/**
 * Skillssystemrows.tsx  (updated for cinematic transitions)
 *
 * Changes from original:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Row entry animation upgraded:
 *    - Rows slide in from x:-24 (left) with staggered delay.
 *    - The lime underline beneath the row number grows from scaleX:0 → 1
 *      after the row settles, giving a "drawn in" effect.
 *    - The orange ">" chevron before the description pulses once on entry.
 *
 * 2. Tech stack tokens fade in with per-token stagger after the row lands.
 *
 * 3. Row number accent:
 *    A thin lime-yellow vertical bar at the far left of each row
 *    grows from scaleY:0 → 1 as the row enters, one row at a time.
 *    This creates a visual "loading progress" feel as you scroll.
 *
 * 4. The Observability diagram heartbeat line gets a stroke-dashoffset
 *    animation via CSS `stroke-dasharray` on entry — drawn from left to right.
 *    This is done with a CSS animation class injected inline.
 *
 * 5. `viewport: { once: true, margin: "-50px" }` — triggers slightly before
 *    the element fully enters so the animation is visible, not late.
 */

import { motion, useInView, type MotionValue } from "framer-motion";
import { easings } from "@/lib/motion";

// ── Arrow connector SVG ───────────────────────────────────────────────────
function Arrow() {
  return (
    <svg
      width="32"
      height="16"
      viewBox="0 0 32 16"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <line x1="0" y1="8" x2="24" y2="8" stroke="#555" strokeWidth="1.5" />
      <path
        d="M20 4 L26 8 L20 12"
        stroke="#555"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// ── Diagrams (unchanged from original) ───────────────────────────────────
function BackendDiagram() {
  return (
    <div
      className="flex items-center"
      style={{ gap: 6, fontSize: 11, fontFamily: "monospace" }}
    >
      {[
        { label: "CLIENT" },
        null,
        { label: "API LAYER" },
        null,
        { label: "SERVICE LAYER" },
        null,
      ].map((item, i) =>
        item === null ? (
          <Arrow key={i} />
        ) : (
          <div
            key={i}
            style={{
              border: "1.5px solid #555",
              padding: "5px 10px",
              color: "#C8C0B4",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
              fontSize: 11,
            }}
          >
            {item.label}
          </div>
        ),
      )}
      <div className="flex flex-col" style={{ gap: 4 }}>
        {["CACHE", "QUEUE", "DATABASE"].map((l) => (
          <div
            key={l}
            style={{
              border: "1.5px solid #555",
              padding: "3px 10px",
              color: "#C8C0B4",
              fontSize: 10,
              fontFamily: "monospace",
              letterSpacing: "0.04em",
            }}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

function DataDiagram() {
  const Squares = ({
    cols = 3,
    rows = 3,
  }: {
    cols?: number;
    rows?: number;
  }) => (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${cols}, 10px)`, gap: 3 }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <div
          key={i}
          style={{ width: 10, height: 10, border: "1.5px solid #555" }}
        />
      ))}
    </div>
  );
  return (
    <div className="flex items-center" style={{ gap: 10 }}>
      <Squares cols={2} rows={3} />
      <Arrow />
      <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
        <ellipse
          cx="18"
          cy="9"
          rx="14"
          ry="5"
          stroke="#555"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M4 9v18c0 2.76 6.27 5 14 5s14-2.24 14-5V9"
          stroke="#555"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M4 18c0 2.76 6.27 5 14 5s14-2.24 14-5"
          stroke="#555"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="3 2"
        />
      </svg>
      <Arrow />
      <Squares cols={3} rows={3} />
      <Arrow />
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle
          cx="13"
          cy="13"
          r="9"
          stroke="#555"
          strokeWidth="1.5"
          fill="none"
        />
        <line
          x1="20"
          y1="20"
          x2="28"
          y2="28"
          stroke="#555"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function ObservabilityDiagram({ animate }: { animate?: boolean }) {
  // Line length is ~700 units (rough total polyline length)
  return (
    <>
      <svg
        width="260"
        height="60"
        viewBox="0 0 260 60"
        fill="none"
        className={animate ? "obs-draw" : ""}
      >
        {[15, 30, 45].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="260"
            y2={y}
            stroke="#2a2a2a"
            strokeWidth="1"
          />
        ))}
        <polyline
          className="obs-line"
          points="0,38 28,38 36,44 44,20 52,44 60,36 80,36 90,48 100,14 108,42 120,36 140,36 150,46 160,22 168,42 180,36 200,36 208,14 216,44 224,36 260,36"
          stroke="#913831"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="100" cy="14" r="4" fill="#913831" className="obs-dot" />
      </svg>
      {animate && (
        <style>{`
          .obs-line {
            stroke-dasharray: 700;
            stroke-dashoffset: 700;
            animation: obs-draw-line 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          .obs-dot {
            opacity: 0;
            animation: obs-dot-pop 0.3s ease-out 1.1s forwards;
          }
          @keyframes obs-draw-line {
            to { stroke-dashoffset: 0; }
          }
          @keyframes obs-dot-pop {
            to { opacity: 1; transform: scale(1); }
            from { opacity: 0; transform: scale(0); }
          }
        `}</style>
      )}
    </>
  );
}

function HardwareDiagram() {
  return (
    <div className="flex items-center" style={{ gap: 10 }}>
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect
          x="10"
          y="10"
          width="24"
          height="24"
          stroke="#555"
          strokeWidth="1.5"
          fill="none"
        />
        <rect
          x="15"
          y="15"
          width="14"
          height="14"
          stroke="#555"
          strokeWidth="1"
          fill="none"
        />
        {[0, 6, 12].map((o) => (
          <g key={o}>
            <line
              x1={14 + o}
              y1="2"
              x2={14 + o}
              y2="10"
              stroke="#555"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1={14 + o}
              y1="34"
              x2={14 + o}
              y2="42"
              stroke="#555"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="2"
              y1={14 + o}
              x2="10"
              y2={14 + o}
              stroke="#555"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="34"
              y1={14 + o}
              x2="42"
              y2={14 + o}
              stroke="#555"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>
      <Arrow />
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 10,
          color: "#555",
          lineHeight: 1.4,
        }}
      >
        <div>0|1|0|1</div>
        <div>1|0|1|0</div>
        <div>0|1|0|1</div>
        <div>1|0|1|1</div>
      </div>
      <Arrow />
      <svg width="80" height="44" viewBox="0 0 80 44" fill="none">
        <polyline
          points="0,22 8,22 8,8 16,8 16,36 24,36 24,22 32,22 32,6 40,6 40,38 48,38 48,22 56,22 56,10 64,10 64,34 72,34 72,22 80,22"
          stroke="#555"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Arrow />
      <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
        <line
          x1="18"
          y1="44"
          x2="18"
          y2="24"
          stroke="#555"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 32 Q18 10 30 32"
          stroke="#555"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M11 36 Q18 18 25 36"
          stroke="#555"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="18" cy="24" r="2.5" fill="#555" />
      </svg>
    </div>
  );
}

// ── Row data ──────────────────────────────────────────────────────────────
const rows = [
  {
    num: "01",
    title: "BACKEND",
    sub: "SYSTEMS",
    subColor: "#913831",
    desc: "Building modular services and robust APIs with clean architecture, authentication and performance in mind.",
    tech: [
      ["NODE.JS", "FASTAPI", "POSTGRES"],
      ["PRISMA", "REDIS", "RABBITMQ"],
    ],
    diagram: (inView: boolean) => <BackendDiagram />,
  },
  {
    num: "02",
    title: "DATA",
    sub: "SYSTEMS",
    subColor: "#913831",
    desc: "Designing data models, optimizing queries and building reliable pipelines that scale with your product.",
    tech: [
      ["POSTGRESQL", "MYSQL", "MONGODB"],
      ["REDIS", "PRISMA", "SQLITE"],
    ],
    diagram: (inView: boolean) => <DataDiagram />,
  },
  {
    num: "03",
    title: "OBSERVABILITY",
    sub: "SYSTEMS",
    subColor: "#913831",
    desc: "Instrumenting systems to see everything, understand anomalies and resolve issues before users feel them.",
    tech: [
      ["PROMETHEUS", "GRAFANA", "LOKI"],
      ["JAEGER", "SENTRY"],
    ],
    diagram: (inView: boolean) => <ObservabilityDiagram animate={inView} />,
  },
  {
    num: "04",
    title: "HARDWARE",
    sub: "SYSTEMS",
    subColor: "#6C8EAD",
    desc: "Working close to the metal. Embedded systems, sensors and hardware interfaces that connect software to reality.",
    tech: [
      ["EMBEDDED SYSTEMS", "MCU"],
      ["SENSORS", "DEBUGGING", "I2C SPI UART"],
    ],
    diagram: (inView: boolean) => <HardwareDiagram />,
  },
];

interface SkillsSystemRowsProps {
  standalone: boolean;
  transitionProgress?: MotionValue<number>;
  /** When standalone=false, drives row animations directly instead of useInView */
  isVisible?: boolean;
}

export default function SkillsSystemRows({
  standalone,
  isVisible = true,
}: SkillsSystemRowsProps) {
  return (
    <div
      className="flex flex-col"
      style={{
        borderBottom: "3px solid #333",
        flex: standalone ? undefined : 1,
        minHeight: standalone ? undefined : 0,
      }}
    >
      {rows.map((row, idx) => (
        <SystemRow
          key={row.num}
          row={row}
          idx={idx}
          isLast={idx === rows.length - 1}
          standalone={standalone}
          externalVisible={isVisible}
        />
      ))}
    </div>
  );
}

// ── Individual row — isolated so inView can be per-row ───────────────────
import { useRef } from "react";

function SystemRow({
  row,
  idx,
  isLast,
  standalone = true,
  externalVisible = true,
}: {
  row: (typeof rows)[0];
  idx: number;
  isLast: boolean;
  standalone?: boolean;
  externalVisible?: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inViewHook = useInView(rowRef, { once: true, margin: "-50px" });
  // When inside a sticky container (standalone=false), useInView never fires.
  // Use the externally-driven isVisible flag instead.
  const inView = standalone ? inViewHook : externalVisible;

  return (
    <motion.div
      ref={rowRef}
      className="relative grid"
      style={{
        gridTemplateColumns:
          "80px clamp(250px, 21vw, 350px) minmax(200px, 37vw) clamp(240px, 16vw, 320px) clamp(220px, 14vw, 280px)",
        alignItems: "center",
        borderBottom: !isLast ? "2px solid #2a2a2a" : "none",
        minHeight: 88,
        flex: standalone ? undefined : 1,
      }}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{
        duration: 0.52,
        delay: idx * 0.08,
        ease: easings.primary,
      }}
    >
      {/* Lime vertical accent bar — left edge of row, grows top→bottom on entry */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: "#8A8B6D",
          transformOrigin: "top",
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
        transition={{
          duration: 0.38,
          delay: idx * 0.08 + 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* ── Number ──────────────────────────────── */}
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
              color: "#913831",
              lineHeight: 1,
            }}
          >
            {row.num}
          </div>
          {/* Lime underline — draws in after row lands */}
          <motion.div
            style={{
              height: 2,
              background: "#8A8B6D",
              marginTop: 6,
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0, width: 28 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{
              duration: 0.3,
              delay: idx * 0.08 + 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
      </div>

      {/* ── Title + subtitle ─────────────────────── */}
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
              fontSize: "clamp(22px, 1.9vw, 32px)",
              fontWeight: 900,
              color: "#E5DED2",
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

      {/* ── Diagram ──────────────────────────────── */}
      <div
        style={{
          padding: "0 28px",
          borderRight: "2px solid #2a2a2a",
          height: "100%",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {row.diagram(inView)}
      </div>

      {/* ── Description ──────────────────────────── */}
      <div
        style={{
          padding: "20px 24px",
          borderRight: "2px solid #2a2a2a",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="flex items-start gap-2">
          {/* Orange chevron — pulses once when row enters */}
          <motion.span
            style={{
              color: "#913831",
              fontFamily: "monospace",
              fontSize: 14,
              fontWeight: 900,
              flexShrink: 0,
              marginTop: 1,
            }}
            animate={
              inView
                ? { x: [0, 4, 0], opacity: [0, 1, 1] }
                : { x: 0, opacity: 0 }
            }
            transition={{
              duration: 0.4,
              delay: idx * 0.08 + 0.42,
              ease: "easeOut",
            }}
          >
            {">"}
          </motion.span>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              lineHeight: 1.6,
              color: "#888",
            }}
          >
            {row.desc}
          </p>
        </div>
      </div>

      {/* ── Tech stack ───────────────────────────── */}
      <div
        style={{
          padding: "0 28px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {row.tech.map((techRow, ri) => (
          <div key={ri} className="flex items-center" style={{ gap: 0 }}>
            {techRow.map((t, ti) => (
              <motion.span
                key={t}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.2,
                  delay: idx * 0.08 + 0.48 + ri * 0.06 + ti * 0.04,
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#C8C0B4",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {t}
                </span>
                {ti < techRow.length - 1 && (
                  <span
                    style={{
                      color: "#444",
                      fontFamily: "monospace",
                      fontSize: 13,
                      margin: "0 8px",
                    }}
                  >
                    /
                  </span>
                )}
              </motion.span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
