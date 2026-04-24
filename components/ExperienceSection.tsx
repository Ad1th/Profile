"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

/* ─── Types ─────────────────────────────────────────────────────────── */
export interface Job {
  title: string;
  company: string;
  period: string;
  description?: string;
  skills: string[];
}

/* ═══════════════════════════════════════════════════════════════════
   NIGHT MODE TOGGLE
═══════════════════════════════════════════════════════════════════ */
export function NightModeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (document.getElementById("__nm-vars")) return;
    const s = document.createElement("style");
    s.id = "__nm-vars";
    s.textContent = `
      :root {
        --nm-bg:          #E8E6E1;
        --nm-bg-card:     rgba(237,235,230,0.94);
        --nm-text:        #111111;
        --nm-text-mute:   rgba(17,17,17,0.52);
        --nm-accent:      #d96516;
        --nm-border:      rgba(17,17,17,0.13);
        --nm-surface:     rgba(17,17,17,0.04);
        --nm-heading:     #2b2b2b;
        --nm-spine:       rgba(232,93,31,0.26);
        --nm-tag-bg:      rgba(232,93,31,0.10);
        --nm-period-bg:   rgba(232,93,31,0.13);
        --nm-dot-ring:    rgba(232,93,31,0.08);
        --nm-bg-section:  #E8E6E1;
        --nm-bg-card-alt: rgba(237,235,230,0.82);
        --nm-scroll-thumb: rgba(17,17,17,0.2);
      }
      [data-theme="dark"] {
        --nm-bg:          #0d0c0a;
        --nm-bg-card:     rgba(22,20,16,0.98);
        --nm-text:        #ece8df;
        --nm-text-mute:   rgba(236,232,223,0.44);
        --nm-accent:      #e8722a;
        --nm-border:      rgba(236,232,223,0.10);
        --nm-surface:     rgba(236,232,223,0.05);
        --nm-heading:     #ece8df;
        --nm-spine:       rgba(232,114,42,0.22);
        --nm-tag-bg:      rgba(232,114,42,0.13);
        --nm-period-bg:   rgba(232,114,42,0.16);
        --nm-dot-ring:    rgba(232,114,42,0.10);
        --nm-bg-section:  #0d0c0a;
        --nm-bg-card-alt: rgba(28,24,18,0.92);
        --nm-scroll-thumb: rgba(236,232,223,0.18);
        --accent: #e8722a;
      }
      [data-theme="dark"] body,
      [data-theme="dark"] body * {
        transition:
          background-color 0.32s ease,
          border-color     0.32s ease,
          color            0.32s ease,
          opacity          0.18s ease !important;
      }
      [data-theme="dark"] body {
        background: var(--nm-bg) !important;
        color: var(--nm-text) !important;
      }
      [data-theme="dark"] ::-webkit-scrollbar-thumb {
        background: var(--nm-scroll-thumb) !important;
      }
      [data-theme="dark"] .bg-light,
      [data-theme="dark"] .bg-dark,
      [data-theme="dark"] .bg-offwhite,
      [data-theme="dark"] .bg-darker,
      [data-theme="dark"] #hero,
      [data-theme="dark"] footer {
        background: var(--nm-bg) !important;
      }
      [data-theme="dark"] h1,
      [data-theme="dark"] h2,
      [data-theme="dark"] h3,
      [data-theme="dark"] h4,
      [data-theme="dark"] h5,
      [data-theme="dark"] h6 { color: var(--nm-heading) !important; }
      [data-theme="dark"] p,
      [data-theme="dark"] span:not(.skill-dot):not([style*="color: var(--accent)"]) {
        color: var(--nm-text-mute);
      }
      [data-theme="dark"] [style*="color: var(--accent)"],
      [data-theme="dark"] [style*="color: #d65a2e"],
      [data-theme="dark"] .social-link:hover { color: var(--nm-accent) !important; }
      [data-theme="dark"] .skill-tile,
      [data-theme="dark"] .skills-stack-panel,
      [data-theme="dark"] .skills-fold-surface {
        background: var(--nm-bg-card) !important;
        border-color: var(--nm-border) !important;
      }
      [data-theme="dark"] .hack-row:hover { background: rgba(236,232,223,0.04) !important; }
      [data-theme="dark"] .nav-pill { color: rgba(236,232,223,0.52) !important; }
      [data-theme="dark"] .nav-pill:hover {
        color: var(--nm-text) !important;
        border-color: var(--nm-border) !important;
        background: rgba(232,114,42,0.1) !important;
      }
      [data-theme="dark"] .btn-ghost {
        color: var(--nm-text) !important;
        border-color: var(--nm-border) !important;
      }
      [data-theme="dark"] .btn-ghost:hover {
        border-color: var(--nm-accent) !important;
        background: rgba(232,114,42,0.08) !important;
      }
      [data-theme="dark"] .social-link { color: rgba(236,232,223,0.52) !important; }
      [data-theme="dark"] .lang-bar { background: rgba(236,232,223,0.12) !important; }
      [data-theme="dark"] .avatar-card-core {
        background: #1a1814 !important;
        border-color: rgba(236,232,223,0.12) !important;
      }
      [data-theme="dark"] .reveal-on-scroll { color: var(--nm-text) !important; }
      [data-theme="dark"] #hero h1,
      [data-theme="dark"] #hero .hero-copy h1 { color: var(--nm-heading) !important; }
      [data-theme="dark"] [style*="background: #f8f5f0"],
      [data-theme="dark"] [style*='background: "#f8f5f0"'] { background: var(--nm-bg-card) !important; }
      [data-theme="dark"] ::selection { background: rgba(232,114,42,0.28); color: var(--nm-text); }

      /* ── Experience section dark overrides ── */
      [data-theme="dark"] #experience { background: var(--nm-bg) !important; }
      [data-theme="dark"] .exp-cinematic-bg { background: var(--nm-bg) !important; }
    `;
    document.head.appendChild(s);
  }, []);

  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.setAttribute(
        "data-theme",
        next ? "dark" : "light",
      );
      return next;
    });
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      className={className}
      aria-label={dark ? "Switch to day mode" : "Switch to night mode"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "0 14px",
        height: 36,
        borderRadius: 999,
        border: "1px solid var(--nm-border, rgba(17,17,17,0.13))",
        background: "var(--nm-surface, rgba(17,17,17,0.04))",
        color: "var(--nm-text, #111)",
        fontSize: "0.66rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        cursor: "pointer",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        flexShrink: 0,
      }}
    >
      <motion.span
        key={String(dark)}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.18 }}
        style={{ lineHeight: 1, fontSize: 12 }}
      >
        {dark ? "○" : "◑"}
      </motion.span>
      {dark ? "Day" : "Night"}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EXPERIENCE CARD
═══════════════════════════════════════════════════════════════════ */
function ExperienceCard({
  job,
  index,
  progress,
}: {
  job: Job;
  index: number;
  progress: MotionValue<number>;
}) {
  const [hovered, setHovered] = useState(false);

  // Each card rises in sequence after the heading settles (progress ~0.55)
  const startAt = 0.52 + index * 0.1;
  const endAt = startAt + 0.16;

  const rawY = useTransform(progress, [startAt, endAt], ["60px", "0px"]);
  const rawOpacity = useTransform(progress, [startAt, endAt], [0, 1]);

  const y = useSpring(rawY, { stiffness: 100, damping: 22, mass: 0.3 });
  const opacity = useSpring(rawOpacity, { stiffness: 130, damping: 26 });

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ y, opacity }}
    >
      <div
        style={{
          background: "var(--nm-bg-card, rgba(237,235,230,0.92))",
          border: `1px solid ${hovered ? "rgba(217,101,22,0.3)" : "var(--nm-border, rgba(17,17,17,0.13))"}`,
          borderRadius: 12,
          padding: "24px 28px",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
          transition: "border-color 0.22s ease, background 0.32s ease",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "var(--nm-accent, #d96516)",
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.36s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 10,
            marginBottom: job.description || job.skills.length ? 12 : 0,
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--nm-text, #111)",
                lineHeight: 1.3,
                marginBottom: 3,
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              {job.title}
            </h3>
            <p
              style={{
                fontSize: "0.84rem",
                color: "var(--nm-text-mute, rgba(17,17,17,0.52))",
                fontWeight: 500,
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              {job.company}
            </p>
          </div>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "var(--nm-text, #111)",
              background: "var(--nm-period-bg, rgba(232,93,31,0.13))",
              border: "1px solid var(--nm-border, rgba(17,17,17,0.13))",
              borderRadius: 999,
              padding: "4px 12px",
              whiteSpace: "nowrap",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              transition:
                "background 0.32s ease, border-color 0.32s ease, color 0.32s ease",
            }}
          >
            {job.period}
          </span>
        </div>

        {job.description && (
          <p
            style={{
              fontSize: "0.84rem",
              color: "var(--nm-text-mute, rgba(17,17,17,0.52))",
              lineHeight: 1.74,
              marginBottom: job.skills.length ? 14 : 0,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              transition: "color 0.32s ease",
            }}
          >
            {job.description}
          </p>
        )}

        {job.skills.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {job.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "3px 10px",
                  borderRadius: 4,
                  background: "var(--nm-tag-bg, rgba(232,93,31,0.10))",
                  border: "1px solid var(--nm-border, rgba(17,17,17,0.13))",
                  color: "var(--nm-text, #333)",
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  transition:
                    "background 0.32s ease, border-color 0.32s ease, color 0.32s ease",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CINEMATIC HEADING
   
   Phase 1 (progress 0 → 0.18): "WHERE I'VE WORKED" rises into view,
     massive and centered, with a slight zoom-toward-viewer effect.
   Phase 2 (progress 0.18 → 0.22): Brief hold at peak.
   Phase 3 (progress 0.22 → 0.52): Compresses + slides to left column,
     becomes the section anchor label.
   Phase 4 (progress 0.52+): Cards rise on the right.
═══════════════════════════════════════════════════════════════════ */
function CinematicHeading({ progress }: { progress: MotionValue<number> }) {
  // Phase 1: rise up from below + scale from 0.6 → 1.15 (zoom toward viewer)
  const rawScale = useTransform(
    progress,
    [0, 0.18, 0.22, 0.52],
    [0.55, 1.15, 1.08, 0.38],
  );
  const rawY = useTransform(
    progress,
    [0, 0.14, 0.22, 0.52],
    ["18vh", "0vh", "0vh", "-2vh"],
  );
  // Phase 3: slide from center to left
  const rawX = useTransform(progress, [0.22, 0.52], ["0%", "-38%"]);
  const rawOpacity = useTransform(progress, [0, 0.06], [0, 1]);

  // Label "Experience" fades in as heading shrinks to left
  const labelOpacity = useTransform(progress, [0.38, 0.56], [0, 1]);
  const labelY = useTransform(progress, [0.38, 0.56], [12, 0]);

  const scale = useSpring(rawScale, { stiffness: 72, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 80, damping: 22, mass: 0.44 });
  const x = useSpring(rawX, { stiffness: 72, damping: 20, mass: 0.5 });
  const opacity = useSpring(rawOpacity, { stiffness: 140, damping: 28 });

  const labelOpacitySpring = useSpring(labelOpacity, {
    stiffness: 120,
    damping: 26,
  });
  const labelYSpring = useSpring(labelY, { stiffness: 120, damping: 26 });

  return (
    <div
      style={{
        position: "sticky",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {/* "Experience" label appears as heading shrinks */}
      <motion.span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: "0.62rem",
          fontWeight: 800,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--nm-accent, #d96516)",
          marginBottom: 12,
          opacity: labelOpacitySpring,
          y: labelYSpring,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 18,
            height: 1.5,
            background: "var(--nm-accent, #d96516)",
            borderRadius: 1,
          }}
        />
        Experience
      </motion.span>

      <motion.h2
        style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontWeight: 400,
          lineHeight: 1.0,
          letterSpacing: "-0.03em",
          color: "var(--nm-heading, #2b2b2b)",
          // Base size — scale handles the zoom
          fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
          margin: 0,
          transformOrigin: "left center",
          scale,
          y,
          x,
          opacity,
          whiteSpace: "nowrap",
        }}
      >
        Where I&apos;ve
        <br />
        worked
      </motion.h2>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════════════════════════ */
export default function ExperienceSection({
  experience,
}: {
  experience: Job[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  // The scroll range covers the whole cinematic section.
  // We use a tall section (300vh) so the sticky heading has room to animate.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // When progress > 0.52, show the two-column layout
  const cardsOpacity = useTransform(scrollYProgress, [0.48, 0.56], [0, 1]);
  const cardsOpacitySpring = useSpring(cardsOpacity, {
    stiffness: 100,
    damping: 24,
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="exp-cinematic-bg"
      style={{
        // Tall section = scroll budget for animation
        minHeight: "340vh",
        position: "relative",
        background: "var(--nm-bg, #E8E6E1)",
      }}
    >
      {/* ── Sticky viewport container ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            width: "100%",
            margin: "0 auto",
            padding: "0 clamp(24px,5vw,56px)",
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Heading — absolutely positioned, fills center then shifts left */}
          <div
            style={{
              position: "absolute",
              left: "clamp(24px,5vw,56px)",
              right: "clamp(24px,5vw,56px)",
              top: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <CinematicHeading progress={scrollYProgress} />
          </div>

          {/* Cards column — appears on the right */}
          <motion.div
            style={{
              marginLeft: "auto",
              width: "min(54%, 560px)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              opacity: cardsOpacitySpring,
              // Prevent cards from overlapping heading during entry
              position: "relative",
              zIndex: 5,
            }}
          >
            {experience.map((job, i) => (
              <ExperienceCard
                key={`${job.company}-${i}`}
                job={job}
                index={i}
                progress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
