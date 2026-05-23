"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

export type ExperienceEntry = {
  id: string; // "01", "02", etc.
  role: string; // "PRIMARY ROLE" | "CONTRIBUTOR" | "INTERNSHIP"
  title: string; // "TECHNICAL HEAD"
  org: string; // "Mozilla Firefox Club"
  location?: string; // "VIT Vellore"
  dateRange: string; // "JAN 2026 – PRESENT"
  status: "ACTIVE" | "COMPLETE" | "CONTRIBUTING";
  accessLevel?: string; // "INTERNAL / ACCESS LEVEL / INT-04"
  bullets: string[];
  tags: string[];
  archiveId: string; // "EXP-01"
  lastUpdated?: string; // "MAY 2026"
  badgeLabel?: string; // "GSSOC'26"
  stamp?: "code" | "research" | null;
  accent?: "lime" | "tape" | "paperclip-top" | "paperclip-left";
  rotate: number; // CSS rotate degrees
  zIndex: number;
  delay: number;
};

// Paper clip SVG
function PaperClip({ side = "top" }: { side?: "top" | "left" }) {
  if (side === "left") {
    return (
      <div className="experience-clip absolute -left-[18px] top-10 z-20">
        <svg width="18" height="52" viewBox="0 0 18 52" fill="none">
          <path
            d="M9 2 C4 2 2 6 2 10 L2 42 C2 47 5 50 9 50 C13 50 16 47 16 42 L16 14 C16 10 13 8 9 8 C5 8 4 11 4 14 L4 40"
            stroke="#888"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="experience-clip absolute -top-[22px] left-8 z-20">
      <svg width="52" height="22" viewBox="0 0 52 22" fill="none">
        <path
          d="M2 11 C2 5 6 2 11 2 L41 2 C47 2 50 5 50 9 C50 13 47 16 41 16 L14 16 C10 16 8 13 8 9 C8 5 11 4 14 4 L40 4"
          stroke="#888"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

// Tape strip
function Tape() {
  return (
    <div
      className="experience-tape absolute -top-4 left-1/2 -translate-x-1/2 z-20"
      style={{
        width: 72,
        height: 28,
        background: "rgba(180,170,120,0.45)",
        border: "1px solid rgba(160,150,100,0.3)",
      }}
    />
  );
}

// Push pin / tack
function PushPin() {
  return (
    <div className="experience-pin absolute -top-3 left-1/2 -translate-x-1/2 z-20">
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 35%, #555, #111)",
          border: "2px solid #333",
          boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
        }}
      />
    </div>
  );
}

// Code stamp
function CodeStamp() {
  return (
    <div
      className="experience-stamp absolute bottom-8 right-8 opacity-60"
      style={{
        width: 72,
        height: 72,
        border: "3px solid #4a7a4a",
        borderRadius: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: "rotate(-12deg)",
        color: "#4a7a4a",
      }}
    >
      <span
        style={{
          fontFamily: "monospace",
          fontSize: 18,
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        &lt;/&gt;
      </span>
      <span
        style={{
          fontFamily: "monospace",
          fontSize: 7,
          fontWeight: 700,
          letterSpacing: "0.08em",
          marginTop: 2,
        }}
      >
        OPEN SOURCE
      </span>
    </div>
  );
}

// Research stamp
function ResearchStamp() {
  return (
    <div
      className="experience-stamp absolute bottom-6 right-6 opacity-55"
      style={{
        width: 76,
        height: 76,
        border: "3px solid #4a6a8a",
        borderRadius: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: "rotate(8deg)",
        color: "#4a6a8a",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <ellipse
          cx="16"
          cy="10"
          rx="10"
          ry="4"
          stroke="#4a6a8a"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M6 10v6c0 2.2 4.5 4 10 4s10-1.8 10-4v-6"
          stroke="#4a6a8a"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M6 16v6c0 2.2 4.5 4 10 4s10-1.8 10-4v-6"
          stroke="#4a6a8a"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <span
        style={{
          fontFamily: "monospace",
          fontSize: 7,
          fontWeight: 700,
          letterSpacing: "0.07em",
          marginTop: 3,
        }}
      >
        RESEARCH
      </span>
      <span
        style={{
          fontFamily: "monospace",
          fontSize: 7,
          fontWeight: 700,
          letterSpacing: "0.07em",
        }}
      >
        SYSTEMS
      </span>
    </div>
  );
}

// Status badge
function StatusBadge({ status }: { status: ExperienceEntry["status"] }) {
  const colors = {
    ACTIVE: { bg: "#E8420A", text: "#fff" },
    COMPLETE: { bg: "#333", text: "#ccc" },
    CONTRIBUTING: { bg: "#111", text: "#CFDE00" },
  };
  const c = colors[status];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: c.bg,
        border: `2px solid ${status === "CONTRIBUTING" ? "#CFDE00" : "#111"}`,
        padding: "3px 10px",
        fontFamily: "monospace",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.1em",
        color: c.text,
      }}
    >
      {status}
    </div>
  );
}

// Access level badge (top right, red border)
function AccessBadge({ label }: { label: string }) {
  const lines = label.split("/");
  return (
    <div
      style={{
        border: "2px solid #E8420A",
        padding: "6px 10px",
        fontFamily: "monospace",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.08em",
        color: "#E8420A",
        textAlign: "center",
        lineHeight: 1.5,
      }}
    >
      {lines.map((l, i) => (
        <div key={i}>{l.trim()}</div>
      ))}
    </div>
  );
}

// Barcode decoration
function Barcode() {
  const bars = [
    3, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2,
  ];
  return (
    <div className="flex items-end gap-[1.5px]" style={{ height: 28 }}>
      {bars.map((w, i) => (
        <div
          key={i}
          style={{
            width: w,
            height: `${60 + (i % 3) * 13}%`,
            background: "#555",
          }}
        />
      ))}
    </div>
  );
}

// Progress bar (for CONTRIBUTING card)
function ProgressBar({ value }: { value: number }) {
  const blocks = Math.round(value / 5);
  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 10,
            background: i < blocks ? "#CFDE00" : "#333",
          }}
        />
      ))}
    </div>
  );
}

export default function ExperienceCard({
  entry,
  style,
  className,
  density = "regular",
  shadow,
  positioned = true,
}: {
  entry: ExperienceEntry;
  style?: React.CSSProperties;
  className?: string;
  density?: "regular" | "compact";
  shadow?: string;
  positioned?: boolean;
}) {
  const compact = density === "compact";
  const isContributor = entry.id === "02";
  const hasPushPin = entry.id === "01";
  const hasTape = entry.id === "03";
  const hasClipLeft = entry.id === "02";
  const hasClipTop = entry.id === "04";
  const visibleBullets = compact ? entry.bullets.slice(0, 2) : entry.bullets;
  const visibleTags = compact ? entry.tags.slice(0, 3) : entry.tags;
  const outerShadow =
    shadow ??
    (isContributor
      ? "8px 8px 0 rgba(0,0,0,0.68)"
      : "6px 6px 0 rgba(0,0,0,0.5)");

  return (
    <motion.div
      className={`${positioned ? "absolute" : "relative"} ${className ?? ""}`.trim()}
      style={{
        rotate: entry.rotate,
        zIndex: entry.zIndex,
        ...style,
      }}
      whileHover={{
        zIndex: 50,
        scale: 1.03,
        rotate: entry.rotate + (entry.rotate >= 0 ? 1 : -1),
        y: -4,
        transition: { duration: 0.2 },
      }}
    >
      {/* Decorative accessories */}
      {hasPushPin && <PushPin />}
      {hasTape && <Tape />}
      {hasClipLeft && <PaperClip side="left" />}
      {hasClipTop && <PaperClip side="top" />}

      {/* Card body */}
      <div
        style={{
          background: isContributor ? "#111" : "#F0EBE0",
          border: "3px solid #111",
          boxShadow: outerShadow,
          padding: compact
            ? isContributor
              ? "18px 18px 16px 22px"
              : "18px 18px 18px 20px"
            : isContributor
              ? "24px 22px 20px 28px"
              : "24px 22px 22px 24px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Diagonal stripe accent (top-right corner) */}
        <div
          className="absolute top-0 right-0"
          style={{
            width: 52,
            height: "100%",
            background:
              "repeating-linear-gradient(135deg, transparent, transparent 4px, rgba(232,66,10,0.18) 4px, rgba(232,66,10,0.18) 8px)",
            pointerEvents: "none",
          }}
        />

        {/* Header row: ID + role label + date + status */}
        <div
          className="flex items-start justify-between"
          style={{ marginBottom: 10 }}
        >
          <div>
            <div
              className="flex items-center gap-2"
              style={{ marginBottom: 2 }}
            >
              <span
                style={{
                  fontFamily: "var(--font-archivo), sans-serif",
                  fontSize: compact ? 16 : 20,
                  fontWeight: 900,
                  color: "#E8420A",
                  lineHeight: 1,
                }}
              >
                {entry.id}
              </span>
            </div>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#E8420A",
                textTransform: "uppercase",
              }}
            >
              {entry.role}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                fontWeight: 700,
                color: isContributor ? "#888" : "#555",
                letterSpacing: "0.06em",
              }}
            >
              {entry.dateRange}
            </span>
            <StatusBadge status={entry.status} />
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: compact
              ? isContributor
                ? 20
                : 22
              : isContributor
                ? 26
                : 28,
            fontWeight: 900,
            letterSpacing: "-0.01em",
            lineHeight: 1.05,
            color: isContributor ? "#F0EBE0" : "#111",
            textTransform: "uppercase",
            marginBottom: 6,
            textDecoration: "underline",
            textDecorationColor: "#CFDE00",
            textDecorationThickness: 3,
            textUnderlineOffset: 4,
          }}
        >
          {entry.title}
        </h3>

        {/* Org + location */}
        <div style={{ marginBottom: 10 }}>
          <div
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontSize: compact ? 12 : 14,
              fontWeight: 600,
              color: isContributor ? "#C8C0B4" : "#333",
            }}
          >
            {entry.org}
          </div>
          {entry.location && (
            <div
              style={{
                fontFamily: "var(--font-archivo), sans-serif",
                fontSize: compact ? 11 : 13,
                fontWeight: 500,
                color: isContributor ? "#888" : "#555",
              }}
            >
              {entry.location}
            </div>
          )}
        </div>

        {/* Access badge (card 01 only) */}
        {entry.accessLevel && !compact && (
          <div style={{ marginBottom: 12 }}>
            <AccessBadge label={entry.accessLevel} />
          </div>
        )}

        {/* Badge label (card 02 only) */}
        {entry.badgeLabel && !compact && (
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#CFDE00",
                border: "2px solid #CFDE00",
                padding: "3px 12px",
                fontFamily: "var(--font-archivo), sans-serif",
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: "0.05em",
                color: "#111",
              }}
            >
              {entry.badgeLabel}
            </div>
          </div>
        )}

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: 2,
            background: isContributor ? "#333" : "#ccc",
            marginBottom: compact ? 10 : 12,
          }}
        />

        {/* Bullets */}
        <ul
          className="flex flex-col"
          style={{ gap: compact ? 4 : 6, marginBottom: compact ? 10 : 14 }}
        >
          {visibleBullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <span
                style={{
                  color: "#E8420A",
                  fontWeight: 900,
                  fontFamily: "monospace",
                  fontSize: compact ? 11 : 13,
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                {">"}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-archivo), sans-serif",
                  fontSize: compact ? 11 : 13,
                  lineHeight: compact ? 1.35 : 1.45,
                  color: isContributor ? "#C8C0B4" : "#333",
                }}
              >
                {b}
              </span>
            </li>
          ))}
        </ul>

        {/* Contributing-specific: progress bars */}
        {isContributor && !compact && (
          <div style={{ marginBottom: 14 }}>
            <div
              className="flex items-center gap-2"
              style={{ marginBottom: 4 }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#888",
                  letterSpacing: "0.08em",
                }}
              >
                STATUS:
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#CFDE00",
                  letterSpacing: "0.08em",
                }}
              >
                CONTRIBUTING
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#888",
                  marginLeft: "auto",
                }}
              >
                100%
              </span>
            </div>
            <ProgressBar value={100} />
            <div className="flex items-center gap-2" style={{ marginTop: 4 }}>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#888",
                  letterSpacing: "0.06em",
                }}
              >
                LEVEL
              </span>
              <ProgressBar value={80} />
            </div>
            <div className="flex items-center gap-2" style={{ marginTop: 4 }}>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#888",
                  letterSpacing: "0.06em",
                }}
              >
                DEVEL:
              </span>
              <ProgressBar value={75} />
            </div>
          </div>
        )}

        {/* Tags */}
        <div
          className="flex flex-wrap gap-[6px]"
          style={{ marginBottom: compact ? 10 : 14 }}
        >
          {visibleTags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "monospace",
                fontSize: compact ? 10 : 11,
                fontWeight: 700,
                letterSpacing: "0.07em",
                color: isContributor ? "#CFDE00" : "#111",
                border: `2px solid ${isContributor ? "#CFDE00" : "#111"}`,
                padding: compact ? "2px 8px" : "3px 10px",
                textTransform: "uppercase",
                background: "transparent",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: archive ID + last updated / barcode */}
        <div
          className="flex items-end justify-between"
          style={{ marginTop: compact ? 2 : 4 }}
        >
          <div>
            {entry.lastUpdated && (
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: compact ? 8 : 9,
                  color: "#888",
                  marginBottom: 2,
                }}
              >
                LAST UPDATED: {entry.lastUpdated}
              </div>
            )}
            <div
              style={{
                fontFamily: "monospace",
                fontSize: compact ? 8 : 9,
                color: isContributor ? "#666" : "#888",
                letterSpacing: "0.08em",
              }}
            >
              ARCHIVE ID: {entry.archiveId}
            </div>
          </div>
          {!compact && <Barcode />}
        </div>

        {/* Stamps */}
        {!compact && entry.stamp === "code" && <CodeStamp />}
        {!compact && entry.stamp === "research" && <ResearchStamp />}
      </div>
    </motion.div>
  );
}
