"use client";

import React, { useEffect, useRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import gsap from "gsap";

export type ExperienceEntry = {
  id: string;
  role: string;
  title: string;
  org: string;
  location?: string;
  dateRange: string;
  status: "ACTIVE" | "COMPLETE" | "CONTRIBUTING";
  accessLevel?: string;
  bullets: string[];
  tags: string[];
  archiveId: string;
  lastUpdated?: string;
  badgeLabel?: string;
  stamp?: "code" | "research" | null;
  accent?: "lime" | "tape" | "paperclip-top" | "paperclip-left" | "barcode";
  rotate: number;
  zIndex: number;
  delay: number;
};

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

function Tape() {
  const tapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tapeRef.current) {
      gsap.to(tapeRef.current, {
        rotation: -1.5,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <motion.div
      ref={tapeRef}
      className="experience-tape absolute -top-4 left-1/2 -translate-x-1/2 z-20"
      style={{
        width: 72,
        height: 28,
        background: "rgba(180,170,120,0.45)",
        border: "1px solid rgba(160,150,100,0.3)",
        boxShadow: "2px 2px 4px rgba(0,0,0,0.15)",
      }}
    />
  );
}

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
          fontFamily: "IBM Plex Mono, monospace",
          fontSize: 18,
          fontWeight: 800,
        }}
      >
        &lt;/&gt;
      </span>
      <span
        style={{
          fontFamily: "IBM Plex Mono, monospace",
          fontSize: 8,
          fontWeight: 700,
          marginTop: 4,
        }}
      >
        OPEN SOURCE
      </span>
    </div>
  );
}

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
          fontFamily: "IBM Plex Mono, monospace",
          fontSize: 8,
          fontWeight: 700,
          marginTop: 6,
        }}
      >
        RESEARCH SYSTEMS
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: ExperienceEntry["status"] }) {
  const colors = {
    ACTIVE: { bg: "#8A8B6D", text: "#111" },
    COMPLETE: { bg: "#222", text: "#ccc" },
    CONTRIBUTING: { bg: "#111", text: "#8A8B6D" },
  } as const;
  const c = colors[status];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: c.bg,
        border: `2px solid ${status === "CONTRIBUTING" ? "#8A8B6D" : "#111"}`,
        padding: "3px 10px",
        fontFamily: "IBM Plex Mono, monospace",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        color: c.text,
      }}
    >
      {status}
    </div>
  );
}

function AccessBadge({ label }: { label: string }) {
  const lines = label.split("/");
  return (
    <div
      style={{
        border: "2px solid #A14A32",
        padding: "6px 10px",
        fontFamily: "IBM Plex Mono, monospace",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.06em",
        color: "#A14A32",
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

function Barcode() {
  const bars = [3, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2];
  return (
    <div className="flex items-end gap-[1.5px]" style={{ height: 28 }}>
      {bars.map((w, i) => (
        <div
          key={i}
          style={{
            width: w,
            height: `${60 + (i % 3) * 12}%`,
            background: "#555",
          }}
        />
      ))}
    </div>
  );
}

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
            background: i < blocks ? "#8A8B6D" : "#333",
          }}
        />
      ))}
    </div>
  );
}

export default function ExperienceCard(
  props: {
    entry: ExperienceEntry;
    style?: React.CSSProperties;
    className?: string;
    density?: "regular" | "compact";
    shadow?: string;
    positioned?: boolean;
  } & Omit<HTMLMotionProps<"div">, "ref" | "style">,
) {
  const {
    entry,
    style,
    className,
    density = "regular",
    shadow,
    positioned = true,
    ...rest
  } = props;
  const cardRef = useRef<HTMLDivElement>(null);
  const compact = density === "compact";
  const isContributor = entry.status === "CONTRIBUTING";
  const hasPushPin =
    entry.accent === "paperclip-top" || entry.accent === "paperclip-left";
  const hasTape = entry.accent === "tape";
  const hasClipLeft = entry.accent === "paperclip-left";
  const hasClipTop = entry.accent === "paperclip-top";
  const showBarcode = entry.accent === "barcode";
  const visibleBullets = compact ? entry.bullets.slice(0, 2) : entry.bullets;
  const visibleTags = compact ? entry.tags.slice(0, 3) : entry.tags;
  const outerShadow =
    shadow ??
    (isContributor
      ? "8px 8px 0 rgba(0,0,0,0.68)"
      : "6px 6px 0 rgba(0,0,0,0.5)");

  // Paper-shadow movement animation
  useEffect(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        boxShadow: [
          "6px 6px 0 rgba(0,0,0,0.5)",
          "7px 8px 0 rgba(0,0,0,0.58)",
          "6px 6px 0 rgba(0,0,0,0.5)",
        ],
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      {...rest}
      className={`${positioned ? "absolute" : "relative"} ${className ?? ""}`.trim()}
      style={{ zIndex: entry.zIndex, ...style }}
      whileHover={{
        zIndex: 50,
        scale: 1.03,
        rotate: entry.rotate + (entry.rotate >= 0 ? 1 : -1),
        y: -4,
        transition: { duration: 0.2 },
      }}
      initial={{ opacity: 0, y: 20, rotate: entry.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: entry.rotate }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.5, delay: entry.delay, ease: "easeOut" }}
    >
      {hasPushPin && <PushPin />}
      {hasTape && <Tape />}
      {hasClipLeft && <PaperClip side="left" />}
      {hasClipTop && <PaperClip side="top" />}

      <div
        style={{
          background: isContributor ? "#111" : "#ECE7DF",
          border: "2px solid #111",
          boxShadow: outerShadow,
          padding: compact ? 18 : 28,
          width: "100%",
          position: "relative",
          overflow: "hidden",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px)",
          backgroundBlendMode: "multiply",
          backgroundSize: "24px 24px",
        }}
      >
        {/* subtle corner accent only when intentionally set */}
        {entry.accent === "lime" && (
          <div
            className="absolute top-0 right-0"
            style={{
              width: 44,
              height: "100%",
              background:
                "linear-gradient(135deg, transparent, rgba(215,255,0,0.08))",
              pointerEvents: "none",
            }}
          />
        )}

        <div
          className="flex items-start justify-between"
          style={{ marginBottom: 12 }}
        >
          <div>
            <div
              className="flex items-center gap-2"
              style={{ marginBottom: 4 }}
            >
              <span
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: compact ? 14 : 16,
                  fontWeight: 700,
                  color: "#A14A32",
                  lineHeight: 1,
                }}
              >
                {entry.id}
              </span>
            </div>
            <span
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "#A14A32",
              }}
            >
              {entry.role}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 11,
                fontWeight: 600,
                color: isContributor ? "#888" : "#555",
              }}
            >
              {entry.dateRange}
            </span>
            <StatusBadge status={entry.status} />
          </div>
        </div>

        <h3
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: compact ? 18 : 24,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            lineHeight: 1.06,
            color: isContributor ? "#ECE7DF" : "#111111",
            textTransform: "none",
            marginBottom: 10,
          }}
        >
          {entry.title}
        </h3>

        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: compact ? 12 : 14,
              fontWeight: 600,
              color: isContributor ? "#C8C0B4" : "#111",
            }}
          >
            {entry.org}
          </div>
          {entry.location && (
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: compact ? 11 : 13,
                fontWeight: 500,
                color: isContributor ? "#888" : "#555",
              }}
            >
              {entry.location}
            </div>
          )}
        </div>

        {entry.accessLevel && !compact && (
          <div style={{ marginBottom: 12 }}>
            <AccessBadge label={entry.accessLevel} />
          </div>
        )}

        {entry.badgeLabel && !compact && (
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#A14A32",
                border: "2px solid #A14A32",
                padding: "4px 12px",
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 12,
                fontWeight: 700,
                color: "#111",
              }}
            >
              {entry.badgeLabel}
            </div>
          </div>
        )}

        <div
          style={{
            width: "100%",
            height: 2,
            background: isContributor ? "#333" : "#ddd",
            marginBottom: compact ? 10 : 14,
          }}
        />

        <ul
          className="flex flex-col"
          style={{ gap: compact ? 6 : 8, marginBottom: compact ? 12 : 18 }}
        >
          {visibleBullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                style={{
                  color: "#A14A32",
                  fontWeight: 700,
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: compact ? 11 : 13,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                •
              </span>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: compact ? 12 : 14,
                  lineHeight: compact ? 1.4 : 1.6,
                  color: isContributor ? "#C8C0B4" : "#111111",
                }}
              >
                {b}
              </span>
            </li>
          ))}
        </ul>

        {isContributor && !compact && (
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#888",
                }}
              >
                STATUS:
              </span>
              <span
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#8A8B6D",
                }}
              >
                CONTRIBUTING
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#888",
                }}
              >
                100%
              </span>
            </div>
            <ProgressBar value={100} />
          </div>
        )}

        <div
          className="flex flex-wrap gap-[8px]"
          style={{ marginBottom: compact ? 12 : 18 }}
        >
          {visibleTags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: compact ? 10 : 11,
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: isContributor ? "#8A8B6D" : "#111",
                border: `1px solid ${isContributor ? "#8A8B6D" : "#111"}`,
                padding: compact ? "3px 8px" : "4px 10px",
                background: "transparent",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="flex items-end justify-between"
          style={{ marginTop: compact ? 4 : 6 }}
        >
          <div>
            {entry.lastUpdated && (
              <div
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: compact ? 9 : 10,
                  color: "#888",
                  marginBottom: 4,
                }}
              >
                LAST UPDATED: {entry.lastUpdated}
              </div>
            )}
            <div
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: compact ? 9 : 10,
                color: isContributor ? "#666" : "#888",
                letterSpacing: "0.06em",
              }}
            >
              ARCHIVE ID: {entry.archiveId}
            </div>
          </div>
          {!compact && showBarcode && <Barcode />}
        </div>

        {!compact && entry.stamp === "code" && <CodeStamp />}
        {!compact && entry.stamp === "research" && <ResearchStamp />}
      </div>
    </motion.div>
  );
}
