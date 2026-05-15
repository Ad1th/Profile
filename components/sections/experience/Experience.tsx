"use client";

/**
 * Experience.tsx
 *
 * Brutalist "dossier / archive" layout.
 * Dark background, scattered paper cards with rotation, stamps, clips, tape.
 * Normal vertical scroll — appears after the cinematic sequence ends.
 *
 * Sub-components:
 *   ExperienceCard       — individual role card (paper file card aesthetic)
 *   ExperienceHeader     — left panel: "EXPERIENCE ARCHIVE." title block
 *   ExperienceSystemLog  — top-right: terminal-style system log widget
 *   ExperienceFooter     — bottom bar: archive stats + globe
 */

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import ExperienceCard, { type ExperienceEntry } from "./ExperienceCard";
import ExperienceHeader from "./ExperienceHeader";
import ExperienceSystemLog from "./ExperienceSystemLog";
import ExperienceFooter from "./ExperienceFooter";

// ─── DATA ────────────────────────────────────────────────────────────────────

const entries: ExperienceEntry[] = [
  {
    id: "01",
    role: "PRIMARY ROLE",
    title: "TECHNICAL HEAD",
    org: "Mozilla Firefox Club",
    location: "VIT Vellore",
    dateRange: "JAN 2026 – PRESENT",
    status: "ACTIVE",
    accessLevel: "INTERNAL / ACCESS LEVEL / INT-04",
    bullets: [
      "Leading technical initiatives at the Mozilla Firefox Club. Previously served as Technical Core (Mar 2025 – Dec 2025), promoting open-source technologies and collaborative development.",
    ],
    tags: ["OPEN SOURCE", "SYSTEMS", "BACKEND", "COMMUNITY"],
    archiveId: "EXP-01",
    lastUpdated: "MAY 2026",
    stamp: null,
    rotate: -2,
    zIndex: 20,
    delay: 0.1,
  },
  {
    id: "02",
    role: "CONTRIBUTOR",
    title: "OPEN SOURCE CONTRIBUTOR",
    org: "GirlScript Summer of Code",
    dateRange: "2026",
    status: "CONTRIBUTING",
    badgeLabel: "GSSOC'26",
    bullets: [
      "MERGED PULL REQUESTS",
      "COMMUNITY CONTRIBUTIONS",
      "DOCUMENTATION",
      "BUG FIXES",
      "CODE QUALITY",
    ],
    tags: [],
    archiveId: "EXP-02",
    stamp: "code",
    rotate: -4,
    zIndex: 10,
    delay: 0.22,
  },
  {
    id: "03",
    role: "INTERNSHIP",
    title: "DATABASE INTERN",
    org: "IIT Hyderabad",
    dateRange: "DEC 2025 – PRESENT",
    status: "ACTIVE",
    bullets: [
      "Working on research systems and data infrastructure.",
      "Database design, optimization and scaling.",
      "Building reliable data pipelines and tools.",
    ],
    tags: ["DATABASES", "DATA SYSTEMS", "RESEARCH"],
    archiveId: "EXP-02",
    stamp: "research",
    rotate: 1.5,
    zIndex: 15,
    delay: 0.34,
  },
  {
    id: "04",
    role: "INTERNSHIP",
    title: "SOFTWARE DEVELOPMENT INTERN",
    org: "Matrix Capital",
    dateRange: "MAY 2025 – JUN 2025",
    status: "COMPLETE",
    bullets: [
      "Built and maintained web applications.",
      "Worked on frontend & backend modules.",
      "Collaborated with cross-functional teams.",
    ],
    tags: ["WEB DEVELOPMENT", "FULL STACK", "APIs"],
    archiveId: "EXP-03",
    stamp: null,
    rotate: 3,
    zIndex: 12,
    delay: 0.46,
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Experience() {
  return (
    <section className="relative w-full bg-[#111] overflow-hidden" style={{ minHeight: "100svh" }}>
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Corner + marks (brutalist decoration) */}
      <div className="absolute top-6 left-6 text-[#333] select-none" style={{ fontFamily: "monospace", fontSize: 20 }}>+</div>
      <div className="absolute bottom-6 left-6 text-[#333] select-none" style={{ fontFamily: "monospace", fontSize: 20 }}>+</div>
      <div className="absolute bottom-6 right-6 text-[#333] select-none" style={{ fontFamily: "monospace", fontSize: 20 }}>+</div>

      <div
        className="relative mx-auto"
        style={{
          maxWidth: 1400,
          padding: "64px 48px 80px 48px",
        }}
      >
        {/* ── TOP ROW: Header left, System Log right ─── */}
        <div className="flex justify-between items-start" style={{ marginBottom: 48 }}>
          {/* Left: section label + title */}
          <div style={{ maxWidth: 340 }}>
            <ExperienceHeader />
          </div>

          {/* Right: system log widget */}
          <ExperienceSystemLog />
        </div>

        {/* ── CARDS SCATTER AREA ─────────────────────── */}
        {/*
          Layout mirrors the screenshot:
            Card 01 (Technical Head) — center, large, highest z
            Card 02 (OSS Contributor) — bottom-left, rotated, dark card
            Card 03 (DB Intern) — center-bottom, slight positive rotation
            Card 04 (SDI) — right, positive rotation
        */}
        <div
          className="relative"
          style={{ minHeight: 680 }}
        >
          {/* Card 01 — Technical Head (center, prominent) */}
          <ExperienceCard
            entry={entries[0]}
            style={{
              width: 380,
              left: "calc(50% - 230px)",
              top: 0,
            }}
          />

          {/* Card 02 — OSS Contributor (bottom-left) */}
          <ExperienceCard
            entry={entries[1]}
            style={{
              width: 320,
              left: "2%",
              top: 200,
            }}
          />

          {/* Card 03 — DB Intern (center-bottom, lower) */}
          <ExperienceCard
            entry={entries[2]}
            style={{
              width: 360,
              left: "calc(50% - 120px)",
              top: 320,
            }}
          />

          {/* Card 04 — SDI Matrix Capital (right) */}
          <ExperienceCard
            entry={entries[3]}
            style={{
              width: 340,
              right: "2%",
              top: 160,
            }}
          />
        </div>

        {/* ── FOOTER ────────────────────────────────────── */}
        <ExperienceFooter />
      </div>
    </section>
  );
}
