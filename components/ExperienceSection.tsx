"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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
   Place <NightModeToggle /> in your Dock or navbar. It injects
   CSS variable overrides onto <html data-theme="dark">.
═══════════════════════════════════════════════════════════════════ */
export function NightModeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  /* Inject the theme variable sheet once */
  useEffect(() => {
    if (document.getElementById("__nm-vars")) return;
    const s = document.createElement("style");
    s.id = "__nm-vars";
    s.textContent = `
      :root {
        --bg:          #E8E6E1;
        --bg-card:     rgba(237,235,230,0.92);
        --bg-card-alt: rgba(248,245,240,0.96);
        --text:        #111111;
        --text-mute:   rgba(17,17,17,0.52);
        --accent:      #d96516;
        --border:      rgba(17,17,17,0.13);
        --surface:     rgba(17,17,17,0.04);
        --heading:     #2b2b2b;
        --spine:       rgba(232,93,31,0.28);
        --tag-bg:      rgba(232,93,31,0.1);
        --tag-border:  rgba(17,17,17,0.11);
        --period-bg:   rgba(232,93,31,0.13);
        --dot-shadow:  rgba(232,93,31,0.07);
      }
      [data-theme="dark"] {
        --bg:          #0d0c0a;
        --bg-card:     rgba(22,20,16,0.98);
        --bg-card-alt: rgba(28,25,20,0.98);
        --text:        #ece8df;
        --text-mute:   rgba(236,232,223,0.46);
        --accent:      #e8722a;
        --border:      rgba(236,232,223,0.1);
        --surface:     rgba(236,232,223,0.05);
        --heading:     #ece8df;
        --spine:       rgba(232,114,42,0.24);
        --tag-bg:      rgba(232,114,42,0.12);
        --tag-border:  rgba(236,232,223,0.1);
        --period-bg:   rgba(232,114,42,0.16);
        --dot-shadow:  rgba(232,114,42,0.1);
      }
      /* smooth theme transitions */
      *, *::before, *::after {
        transition:
          background-color 0.35s ease,
          border-color 0.35s ease,
          color 0.35s ease !important;
      }
      /* but keep framer-motion transforms snappy */
      [style*="transform"], [style*="opacity"] {
        transition: none !important;
      }
    `;
    document.head.appendChild(s);
  }, []);

  const toggle = useCallback(() => {
    setDark((d) => {
      const next = !d;
      document.documentElement.setAttribute(
        "data-theme",
        next ? "dark" : "light",
      );
      /* also flip the body background immediately */
      document.body.style.background = next ? "var(--bg)" : "";
      return next;
    });
  }, []);

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className={className}
      aria-label={dark ? "Switch to day mode" : "Switch to night mode"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "7px 16px",
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        color: "var(--text)",
        fontSize: "0.68rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        cursor: "pointer",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <motion.span
        key={String(dark)}
        initial={{ y: 4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -4, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ lineHeight: 1, fontSize: 13 }}
      >
        {dark ? "○" : "◑"}
      </motion.span>
      {dark ? "Day" : "Night"}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   WORD CASCADE HEADING
   Matches the Flying Papers pattern:
   1. Words rise from below, staggered, while centred
   2. Entire block glides left to become sticky left column
═══════════════════════════════════════════════════════════════════ */
const WORDS = ["Where", "I've", "worked"];

function WordReveal({
  word,
  index,
  progress,
}: {
  word: string;
  index: number;
  progress: MotionValue<number>;
}) {
  /* stagger: word 0 → [0.02..0.22], word 1 → [0.08..0.28], word 2 → [0.14..0.34] */
  const s = 0.02 + index * 0.06;
  const e = s + 0.2;

  const y = useSpring(
    useTransform(progress, [s, e], ["115%", "0%"]),
    { stiffness: 100, damping: 22, mass: 0.36 },
  );
  const opacity = useSpring(
    useTransform(progress, [s, s + 0.09], [0, 1]),
    { stiffness: 130, damping: 24 },
  );
  const blur = useTransform(
    progress,
    [s, s + 0.07, e],
    ["blur(8px)", "blur(2px)", "blur(0px)"],
  );
  const rotate = useSpring(
    useTransform(progress, [s, e], [4, 0]),
    { stiffness: 100, damping: 22, mass: 0.36 },
  );

  return (
    /* clip overflow so words appear to "emerge" from below */
    <span style={{ display: "inline-block", overflow: "hidden" }}>
      <motion.span
        style={{
          display: "inline-block",
          y,
          opacity,
          filter: blur,
          rotate,
        }}
      >
        {word}
      </motion.span>
    </span>
  );
}

function WordCascadeHeading({ progress }: { progress: MotionValue<number> }) {
  /* Phase 2: block glides left and shrinks into column position */
  const shiftX = useSpring(
    useTransform(progress, [0.44, 0.76], ["0vw", "-36vw"]),
    { stiffness: 80, damping: 22, mass: 0.44 },
  );
  const blockScale = useSpring(
    useTransform(progress, [0.44, 0.76], [1, 0.68]),
    { stiffness: 80, damping: 22, mass: 0.44 },
  );
  const labelOpacity = useSpring(
    useTransform(progress, [0.64, 0.8], [0, 1]),
    { stiffness: 120, damping: 26 },
  );
  const labelY = useSpring(
    useTransform(progress, [0.64, 0.8], [10, 0]),
    { stiffness: 120, damping: 26 },
  );

  return (
    <div style={{ position: "relative" }}>
      {/* "Experience" label — appears as block settles */}
      <motion.span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: "0.62rem",
          fontWeight: 800,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 16,
          opacity: labelOpacity,
          y: labelY,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 18,
            height: 1.5,
            background: "var(--accent)",
            borderRadius: 1,
          }}
        />
        Experience
      </motion.span>

      {/* Moving heading block */}
      <motion.div
        style={{
          x: shiftX,
          scale: blockScale,
          transformOrigin: "left center",
        }}
      >
        <h2
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(2.6rem, 5.2vw, 4.6rem)",
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "var(--heading)",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.2em",
            overflow: "visible",
          }}
        >
          {WORDS.map((word, i) => (
            <WordReveal key={word} word={word} index={i} progress={progress} />
          ))}
        </h2>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EXPERIENCE CARD
═══════════════════════════════════════════════════════════════════ */
function ExperienceCard({ job, index }: { job: Job; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-56px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.09,
      }}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${hovered ? "rgba(217,101,22,0.3)" : "var(--border)"}`,
        borderRadius: 12,
        padding: "24px 28px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.22s ease",
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
          background: "var(--accent)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.36s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Timeline dot (sits on the left spine) */}
      <div
        style={{
          position: "absolute",
          left: -20,
          top: 30,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "var(--accent)",
          border: "2px solid var(--spine)",
          boxShadow: "0 0 0 4px var(--dot-shadow)",
        }}
      />

      {/* Header row */}
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
              color: "var(--text)",
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
              color: "var(--text-mute)",
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
            color: "var(--text)",
            background: "var(--period-bg)",
            border: "1px solid var(--border)",
            borderRadius: 999,
            padding: "4px 12px",
            whiteSpace: "nowrap",
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}
        >
          {job.period}
        </span>
      </div>

      {job.description && (
        <p
          style={{
            fontSize: "0.84rem",
            color: "var(--text-mute)",
            lineHeight: 1.74,
            marginBottom: job.skills.length ? 14 : 0,
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}
        >
          {job.description}
        </p>
      )}

      {job.skills.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {job.skills.map((s) => (
            <span
              key={s}
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "3px 10px",
                borderRadius: 4,
                background: "var(--tag-bg)",
                border: "1px solid var(--tag-border)",
                color: "var(--text)",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </motion.div>
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end start"],
  });

  /* Left column opens up as heading glides into position */
  const leftColWidth = useSpring(
    useTransform(scrollYProgress, [0.64, 0.84], ["0%", "38%"]),
    { stiffness: 80, damping: 22, mass: 0.44 },
  );

  /* Cards and spine fade in once heading is settled */
  const rightOpacity = useSpring(
    useTransform(scrollYProgress, [0.74, 0.9], [0, 1]),
    { stiffness: 110, damping: 26 },
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding:
          "clamp(72px,10vw,120px) clamp(24px,5vw,56px) clamp(220px,38vw,440px)",
        position: "relative",
      }}
    >
      {/* Vertical spine line */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          /* aligns with the card dots: 38% col + padding + dot offset */
          left: "calc(38% + clamp(24px,5vw,56px) + clamp(28px,4vw,60px) + 8px)",
          top: "calc(clamp(72px,10vw,120px) + 56px)",
          bottom: "clamp(220px,38vw,440px)",
          width: 1,
          background: "linear-gradient(to bottom, var(--spine), transparent)",
          opacity: rightOpacity,
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "clamp(28px,4vw,60px)",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        {/* LEFT: sticky animated heading */}
        <motion.div style={{ width: leftColWidth, flexShrink: 0, overflow: "visible" }}>
          <div style={{ position: "sticky", top: 64 }}>
            <WordCascadeHeading progress={scrollYProgress} />
          </div>
        </motion.div>

        {/* RIGHT: experience cards */}
        <motion.div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            /* offset so cards appear below the fold, entering as heading settles */
            paddingTop: "clamp(100px,18vw,220px)",
            paddingLeft: 28,
            minWidth: 0,
            opacity: rightOpacity,
          }}
        >
          {experience.map((job, i) => (
            <ExperienceCard key={`${job.company}-${i}`} job={job} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
