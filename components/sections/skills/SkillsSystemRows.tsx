"use client";

import { motion, type MotionValue } from "framer-motion";
import { easings } from "@/lib/motion";

// ── Inline SVG diagrams per row ──────────────────────────────────────────────

// Arrow connector
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

// Row 01: CLIENT → API LAYER → SERVICE LAYER → [CACHE / QUEUE / DATABASE]
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
      {/* Stacked CACHE / QUEUE / DATABASE */}
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

// Row 02: grid of squares → cylinder (db) → grid → search/magnifier
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
      {/* Cylinder/DB */}
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
      {/* Magnifier */}
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

// Row 03: jagged heartbeat/metrics line with dot spike
function ObservabilityDiagram() {
  return (
    <svg width="260" height="60" viewBox="0 0 260 60" fill="none">
      {/* Grid lines */}
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
      {/* Jagged line */}
      <polyline
        points="0,38 28,38 36,44 44,20 52,44 60,36 80,36 90,48 100,14 108,42 120,36 140,36 150,46 160,22 168,42 180,36 200,36 208,14 216,44 224,36 260,36"
        stroke="#E8420A"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Spike dot */}
      <circle cx="100" cy="14" r="4" fill="#E8420A" />
    </svg>
  );
}

// Row 04: MCU → binary grid → waveform → antenna
function HardwareDiagram() {
  return (
    <div className="flex items-center" style={{ gap: 10 }}>
      {/* MCU chip */}
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

      {/* Binary-ish grid */}
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

      {/* Waveform */}
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

      {/* Antenna / signal */}
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

// ── System row data ──────────────────────────────────────────────────────────
const rows = [
  {
    num: "01",
    title: "BACKEND",
    sub: "SYSTEMS",
    subColor: "#E8420A",
    desc: "Building modular services and robust APIs with clean architecture, authentication and performance in mind.",
    tech: [
      ["NODE.JS", "FASTAPI", "POSTGRES"],
      ["PRISMA", "REDIS", "RABBITMQ"],
    ],
    diagram: <BackendDiagram />,
  },
  {
    num: "02",
    title: "DATA",
    sub: "SYSTEMS",
    subColor: "#E8420A",
    desc: "Designing data models, optimizing queries and building reliable pipelines that scale with your product.",
    tech: [
      ["POSTGRESQL", "MYSQL", "MONGODB"],
      ["REDIS", "PRISMA", "SQLITE"],
    ],
    diagram: <DataDiagram />,
  },
  {
    num: "03",
    title: "OBSERVABILITY",
    sub: "SYSTEMS",
    subColor: "#E8420A",
    desc: "Instrumenting systems to see everything, understand anomalies and resolve issues before users feel them.",
    tech: [
      ["PROMETHEUS", "GRAFANA", "LOKI"],
      ["JAEGER", "SENTRY"],
    ],
    diagram: <ObservabilityDiagram />,
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
    diagram: <HardwareDiagram />,
  },
];

interface SkillsSystemRowsProps {
  standalone: boolean;
  transitionProgress?: MotionValue<number>;
}

export default function SkillsSystemRows({
  standalone,
  transitionProgress,
}: SkillsSystemRowsProps) {
  return (
    <div className="flex flex-col" style={{ borderBottom: "3px solid #333" }}>
      {rows.map((row, idx) => (
        <motion.div
          key={row.num}
          className="grid"
          style={{
            gridTemplateColumns: "80px 180px 1fr 320px 280px",
            alignItems: "center",
            borderBottom: idx < rows.length - 1 ? "2px solid #2a2a2a" : "none",
            minHeight: 88,
          }}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.5,
            delay: idx * 0.09,
            ease: easings.primary,
          }}
        >
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
                  color: "#E8420A",
                  lineHeight: 1,
                }}
              >
                {row.num}
              </div>
              {/* Lime underline */}
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
            {row.diagram}
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
              {/* Orange chevron */}
              <span
                style={{
                  color: "#E8420A",
                  fontFamily: "monospace",
                  fontSize: 14,
                  fontWeight: 900,
                  flexShrink: 0,
                  marginTop: 1,
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
                  <span key={t}>
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
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
