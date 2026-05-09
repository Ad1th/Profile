import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";

// ── DATA ──────────────────────────────────────────────────────────────────
const categories = [
  {
    color: "#E8420A",
    icon: "</>",
    title: "SYSTEMS & BACKEND",
    items: ["Node.js", "Express.js", "FastAPI", "REST API Design", "JWT Authentication", "Backend Architecture", "Middleware Systems", "API Routing & Validation"],
  },
  {
    color: "#E8420A",
    icon: "DB",
    title: "DATABASES & STORAGE",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "Prisma ORM", "SQLite", "NeonDB"],
  },
  {
    color: "#E8420A",
    icon: "◈",
    title: "FRONTEND & UI",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive UI Systems", "Component Architecture", "Neo-Brutalist UI Design"],
  },
  {
    color: "#E8420A",
    icon: "⊞",
    title: "OBSERVABILITY & DEVOPS",
    items: ["Docker", "Git & GitHub", "CI/CD", "Prometheus", "Grafana", "Loki", "Jaeger", "k6 Load Testing"],
  },
  {
    color: "#E8420A",
    icon: "⚡",
    title: "REALTIME & INTERACTIVE",
    items: ["WebSockets", "Socket.IO", "Live Presence Systems", "Real-time Chat", "Multiplayer Sync", "Event-based Architectures"],
  },
  {
    color: "#CFDE00",
    icon: "AI",
    title: "AI & PRODUCTIVITY",
    items: ["Gemini API Integration", "AI Workflow Systems", "Productivity Extensions", "Automation Platforms", "Prompt Engineering", "AI-Augmented UX"],
  },
  {
    color: "#CFDE00",
    icon: "⬡",
    title: "HARDWARE & ELECTRONICS",
    items: ["Embedded Systems", "Microcontrollers", "Sensors & Interfaces", "System-Level Thinking", "Hardware Debugging", "Electronics Prototyping"],
  },
];

const languages = [
  { name: "English",  level: "NATIVE",       pct: 100 },
  { name: "Hindi",    level: "FLUENT",        pct: 85  },
  { name: "Telugu",   level: "INTERMEDIATE",  pct: 60  },
  { name: "Kannada",  level: "INTERMEDIATE",  pct: 50  },
  { name: "French",   level: "BASIC",         pct: 25  },
];

const exploring = [
  "eBPF & KERNEL OBSERVABILITY", "DISTRIBUTED SYSTEMS", "EVENT DRIVEN ARCHITECTURE",
  "AI AGENT FRAMEWORKS", "KERNEL-LEVEL DEBUGGING", "PERFORMANCE ENGINEERING",
  "GO BACKEND SYSTEMS", "RUST SYSTEMS PROGRAMMING", "CHAOS ENGINEERING",
];

const easePrimary = [0.16, 1, 0.3, 1];

// ── SKILL CARD ────────────────────────────────────────────────────────────
function SkillCard({ cat, idx }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.06, ease: easePrimary }}
      style={{
        background: "#F0EBE0",
        border: "3px solid #111",
        borderTop: "none",
        borderLeft: idx === 0 ? "none" : "3px solid #111",
        padding: "20px 18px 24px 18px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Hatch decoration */}
      <div style={{ position: "absolute", bottom: 10, right: 10, display: "flex", gap: 3 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ width: 3, height: 14, background: "#111", transform: "skewX(-20deg)", opacity: 0.15 }} />
        ))}
      </div>

      {/* Icon */}
      <div style={{
        width: 36, height: 36, background: "#111", display: "flex", alignItems: "center",
        justifyContent: "center", marginBottom: 12, flexShrink: 0,
      }}>
        <span style={{ color: cat.color, fontSize: 12, fontWeight: 900, fontFamily: "monospace" }}>{cat.icon}</span>
      </div>

      {/* Title */}
      <div style={{
        fontSize: 11, fontWeight: 900, letterSpacing: "0.06em", color: "#111",
        fontFamily: "system-ui, sans-serif", marginBottom: 10, textTransform: "uppercase", lineHeight: 1.25,
      }}>
        {cat.title}
      </div>

      {/* Rule */}
      <div style={{ width: "100%", height: 3, background: "#E8420A", marginBottom: 12 }} />

      {/* Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {cat.items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 7, height: 7, background: "#111", flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#333", fontFamily: "system-ui, sans-serif", lineHeight: 1.4 }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────
export default function SkillsPreview() {
  const [animKey, setAnimKey] = useState(0);
  const [barWidths, setBarWidths] = useState(languages.map(() => 0));

  useEffect(() => {
    const timers = languages.map((lang, i) =>
      setTimeout(() => {
        setBarWidths(prev => {
          const next = [...prev];
          next[i] = lang.pct;
          return next;
        });
      }, 400 + i * 100)
    );
    return () => timers.forEach(clearTimeout);
  }, [animKey]);

  const row1 = categories.slice(0, 5);
  const row2 = categories.slice(5, 7);

  return (
    <div style={{ background: "#EEE7DC", fontFamily: "system-ui, sans-serif", userSelect: "none" }}>

      {/* ── OUTER BORDER ─────────────────────────────────────────────── */}
      <motion.div
        key={animKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ border: "5px solid #111" }}
      >
        {/* ── HEADER ROW ──────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "42% 58%", borderBottom: "5px solid #111" }}>
          {/* Left: SKILLS headline */}
          <div style={{
            background: "#111", borderRight: "5px solid #111", padding: "28px 32px 32px 32px",
            display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 220,
            position: "relative",
          }}>
            {/* Corner bracket */}
            <div style={{ position: "absolute", top: 0, left: 0 }}>
              <div style={{ width: 24, height: 4, background: "#EEE7DC", position: "absolute", top: 16, left: 16 }} />
              <div style={{ width: 4, height: 24, background: "#EEE7DC", position: "absolute", top: 16, left: 16 }} />
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                style={{ width: 12, background: "#E8420A", height: 130, border: "3px solid #EEE7DC", transformOrigin: "bottom", flexShrink: 0 }}
                transition={{ duration: 0.45 }}
              />
              <div>
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: easePrimary }}
                  style={{
                    fontSize: "clamp(64px, 9vw, 120px)", fontWeight: 900, color: "#F0EBE0",
                    lineHeight: 0.88, letterSpacing: "-0.02em", textTransform: "uppercase",
                  }}
                >
                  I
                </motion.div>
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.08, ease: easePrimary }}
                  style={{
                    fontSize: "clamp(64px, 9vw, 120px)", fontWeight: 900, color: "#CFDE00",
                    lineHeight: 0.88, letterSpacing: "-0.02em", textTransform: "uppercase",
                  }}
                >
                  SKILLS
                </motion.div>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ width: 48, height: 4, background: "#CFDE00", marginBottom: 10, transformOrigin: "left" }}
                transition={{ duration: 0.38, delay: 0.2 }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                style={{ fontSize: 13, fontWeight: 700, color: "#C8C0B4", lineHeight: 1.55, fontFamily: "monospace" }}
              >
                The tools, systems and<br />
                technologies I use to build<br />
                and ship real systems.
              </motion.div>
            </div>
          </div>

          {/* Right: Philosophy */}
          <div style={{
            background: "#6C8EAD", padding: "28px 32px 32px 32px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            position: "relative", overflow: "hidden",
          }}>
            {/* Hatch top-right */}
            <div style={{ position: "absolute", top: 14, right: 16, display: "flex", gap: 5 }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ width: 6, height: 22, background: "#111", transform: "skewX(-20deg)", opacity: 0.5 }} />
              ))}
            </div>

            <div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  display: "inline-flex", background: "#CFDE00", border: "3px solid #111",
                  padding: "5px 16px", marginBottom: 20,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.04em", color: "#111" }}>
                  PHILOSOPHY
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                style={{ fontSize: "clamp(16px, 2vw, 24px)", fontWeight: 700, color: "#111", lineHeight: 1.45 }}
              >
                I don't chase tools.<br />
                I learn the right ones,<br />
                use them deeply,<br />
                and ship real systems.
              </motion.div>
            </div>

            {/* Staircase chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, marginTop: 16 }}>
              {[12, 20, 30, 42, 58, 76].map((h, i) => (
                <motion.div
                  key={i}
                  style={{ width: 20, height: h, background: "#CFDE00", border: "2px solid #111" }}
                  initial={{ scaleY: 0, originY: 1 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.07 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── SKILLS LABEL BAR ───────────────────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "3px solid #111", padding: "8px 20px", background: "#EEE7DC",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, background: "#E8420A" }} />
            <div style={{ width: 6, height: 6, background: "#E8420A" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", fontFamily: "monospace", textTransform: "uppercase" }}>
              // CORE SKILLS
            </span>
          </div>
          <div style={{ width: 20, height: 20, background: "#E8420A", border: "3px solid #111" }} />
        </div>

        {/* ── ROW 1: 5 columns ─────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
          {row1.map((cat, i) => <SkillCard key={cat.title} cat={cat} idx={i} />)}
        </div>

        {/* ── ROW 2: 2 + 3 empty ───────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
          {row2.map((cat, i) => <SkillCard key={cat.title} cat={cat} idx={i} />)}
          {[0,1,2].map(i => (
            <div key={i} style={{
              background: "#111", border: "3px solid #111", borderTop: "none",
              borderLeft: "3px solid #333", minHeight: 160,
            }} />
          ))}
        </div>

        {/* ── BOTTOM ROW: Languages + Exploring ──────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "38% 62%" }}>
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            style={{
              background: "#111", border: "3px solid #111", borderTop: "none",
              borderLeft: "none", padding: "24px 26px 28px 26px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", fontFamily: "monospace", color: "#CFDE00", textTransform: "uppercase" }}>
                // LANGUAGES SPOKEN
              </span>
              <div style={{ display: "flex", gap: 3 }}>
                {[0,1,2,3,4].map(i => (
                  <div key={i} style={{ width: 4, height: 14, background: "#CFDE00", transform: "skewX(-18deg)", opacity: 0.7 }} />
                ))}
              </div>
            </div>
            {languages.map((lang, i) => (
              <div key={lang.name} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#F0EBE0", fontFamily: "monospace" }}>{lang.name}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#888", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.07em" }}>{lang.level}</span>
                </div>
                <div style={{ height: 5, background: "#333", position: "relative" }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, height: "100%",
                    background: "#CFDE00",
                    width: `${barWidths[i]}%`,
                    transition: `width 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s`,
                  }} />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Currently Exploring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.52 }}
            style={{
              background: "#6C8EAD", border: "3px solid #111", borderTop: "none",
              borderLeft: "3px solid #111", borderRight: "none", padding: "24px 26px 28px 26px",
              position: "relative",
            }}
          >
            {/* Top-right bracket */}
            <div style={{ position: "absolute", top: 0, right: 0 }}>
              <div style={{ width: 20, height: 4, background: "#111", position: "absolute", top: 14, right: 14 }} />
              <div style={{ width: 4, height: 20, background: "#111", position: "absolute", top: 14, right: 14 }} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", fontFamily: "monospace", color: "#111", textTransform: "uppercase" }}>
                // CURRENTLY EXPLORING
              </span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {exploring.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.32, delay: 0.6 + i * 0.05 }}
                  whileHover={{ y: -3, boxShadow: "4px 4px 0 #111" }}
                  style={{
                    background: "#CFDE00", border: "3px solid #111",
                    padding: "6px 14px", cursor: "default",
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#111", fontFamily: "system-ui, sans-serif" }}>
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Bottom-left bracket */}
            <div style={{ position: "absolute", bottom: 0, left: 0 }}>
              <div style={{ width: 20, height: 4, background: "#111", position: "absolute", bottom: 14, left: 14 }} />
              <div style={{ width: 4, height: 20, background: "#111", position: "absolute", bottom: 14, left: 14 }} />
            </div>
          </motion.div>
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 44, background: "#111", border: "4px solid #111", borderTop: "none",
          padding: "0 20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative", width: 18, height: 14 }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, width: 4, height: 14, background: "#CFDE00" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, width: 14, height: 4, background: "#CFDE00" }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#F0EBE0", fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.85 }}>
              SOFTWARE MEETS REALITY.
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#CFDE00", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              VIT VELLORE — BACKEND SYSTEMS — 2026
            </span>
            <div style={{ position: "relative", width: 18, height: 14 }}>
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 4, height: 14, background: "#CFDE00" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 14, height: 4, background: "#CFDE00" }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Replay button */}
      <div style={{ display: "flex", justifyContent: "center", padding: "20px 0 8px" }}>
        <motion.button
          onClick={() => { setBarWidths(languages.map(() => 0)); setTimeout(() => setAnimKey(k => k+1), 50); }}
          whileHover={{ x: -3, y: -3 }}
          whileTap={{ x: 1, y: 1 }}
          style={{
            position: "relative", background: "#CFDE00", border: "3px solid #111",
            padding: "10px 28px", fontWeight: 900, fontSize: 13, letterSpacing: "0.05em",
            textTransform: "uppercase", cursor: "pointer", outline: "none", fontFamily: "system-ui",
            boxShadow: "5px 5px 0 #E8420A",
          }}
        >
          ↺ REPLAY ANIMATION
        </motion.button>
      </div>
    </div>
  );
}
