"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Award,
  Ellipsis,
  FolderKanban,
  Github,
  Home,
  Info,
  Linkedin,
  Mail,
  ExternalLink,
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Inter, Playfair_Display } from "next/font/google";
import Dock from "@/components/ui/Dock";
import Loader from "@/components/Loader";
import HeroTessellatedCanvas from "@/components/backgrounds/hero-tessellated-canvas";

const BubbleMenu = dynamic(() => import("@/components/ui/BubbleMenu"), {
  ssr: false,
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/* ─── Grain overlay ──────────────────────────────────────────────── */
function Grain() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: 0.018,
        backgroundImage:
          "radial-gradient(rgba(17,17,17,0.16) 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    />
  );
}

/* ─── Cursor ─────────────────────────────────────────────────────── */
function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canUseFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const active = canUseFinePointer && !reduceMotion;

    setEnabled(active);
    if (!active) return;

    const move = (e: MouseEvent) => {
      if (raf.current !== null) return;
      const x = e.clientX;
      const y = e.clientY;

      raf.current = requestAnimationFrame(() => {
        raf.current = null;

        if (dot.current) {
          dot.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
        }
        if (ring.current) {
          ring.current.style.transform = `translate3d(${x - 18}px, ${y - 18}px, 0)`;
        }
      });
    };

    window.addEventListener("mousemove", move, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
      }
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--accent)",
          zIndex: 99999,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
      <div
        ref={ring}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(217,101,22,0.4)",
          zIndex: 99998,
          pointerEvents: "none",
          willChange: "transform",
          transition: "transform 120ms linear",
        }}
      />
    </>
  );
}

/* ─── Split text letter reveal ───────────────────────────────────── */
function SplitReveal({
  text,
  className,
  style,
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-block", ...style }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            transform: visible ? "translateY(0)" : "translateY(110%)",
            opacity: visible ? 1 : 0,
            transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay + i * 0.028}s, opacity 0.4s ease ${delay + i * 0.028}s`,
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

/* ─── Section heading ─────────────────────────────────────────────── */
function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "0.68rem",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--accent)",
        marginBottom: "18px",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 20,
          height: 1.5,
          background: "var(--accent)",
          borderRadius: 1,
        }}
      />
      {children}
    </motion.span>
  );
}

function SectionTitle({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <h2
      className={className}
      style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
        fontWeight: 400,
        color: "var(--text)",
        lineHeight: 1.06,
        letterSpacing: "-0.03em",
        marginBottom: 0,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

/* ─── Project card ────────────────────────────────────────────────── */
function ProjectCard({
  project,
  imageSrc,
  dark = false,
}: {
  project: {
    name: string;
    emoji: string;
    description: string;
    stack: readonly string[];
    github: string | null;
    badge?: string;
  };
  imageSrc?: string;
  dark?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: dark ? "rgba(255,255,255,0.04)" : "rgba(17,17,17,0.05)",
        border: `1px solid ${
          hovered
            ? "rgba(217,101,22,0.32)"
            : dark
              ? "rgba(255,255,255,0.09)"
              : "rgba(17,17,17,0.14)"
        }`,
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minHeight: 340,
        position: "relative",
        cursor: "default",
        transition: "border-color 0.25s ease",
      }}
    >
      {/* Hover accent line top */}
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
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          zIndex: 2,
        }}
      />

      {imageSrc && (
        <div style={{ overflow: "hidden", height: 180, flexShrink: 0 }}>
          <Image
            src={imageSrc}
            alt={project.name}
            width={720}
            height={420}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>
      )}

      <div
        style={{
          padding: "22px 24px 24px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ fontSize: "1.05rem" }}>{project.emoji}</span>
            <h3
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: dark ? "#ebebeb" : "#111111",
                lineHeight: 1.3,
                letterSpacing: "0.01em",
              }}
            >
              {project.name}
            </h3>
            {project.badge && (
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "2px 7px",
                  borderRadius: 999,
                  background: "rgba(217,101,22,0.18)",
                  color: "var(--accent)",
                  border: "1px solid rgba(217,101,22,0.22)",
                }}
              >
                {project.badge}
              </span>
            )}
          </div>
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.12 }}
              style={{
                color: dark ? "rgba(235,235,235,0.45)" : "rgba(17,17,17,0.4)",
                flexShrink: 0,
              }}
              aria-label={`GitHub - ${project.name}`}
            >
              <Github size={15} />
            </motion.a>
          )}
        </div>

        <p
          style={{
            fontSize: "0.83rem",
            color: dark ? "rgba(235,235,235,0.58)" : "rgba(17,17,17,0.62)",
            lineHeight: 1.68,
            flex: 1,
          }}
        >
          {project.description}
        </p>

        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 4 }}
        >
          {project.stack.map((s) => (
            <span
              key={s}
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "3px 9px",
                borderRadius: 4,
                background: dark
                  ? "rgba(255,255,255,0.07)"
                  : "rgba(17,17,17,0.06)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(17,17,17,0.12)"}`,
                color: dark ? "rgba(235,235,235,0.7)" : "rgba(17,17,17,0.7)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Experience timeline card ─────────────────────────────────────── */
function ExperienceCard({
  job,
  index,
}: {
  job: {
    title: string;
    company: string;
    period: string;
    description: string;
    skills: string[];
  };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
      style={{
        display: "flex",
        gap: 28,
        position: "relative",
      }}
    >
      {/* Timeline spine */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "var(--accent)",
            border: "2px solid rgba(232,93,31,0.3)",
            boxShadow: "0 0 0 4px rgba(232,93,31,0.08)",
            flexShrink: 0,
            marginTop: 6,
          }}
        />
        <div
          style={{
            width: 1,
            flex: 1,
            marginTop: 8,
            background:
              "linear-gradient(to bottom, rgba(232,93,31,0.3), transparent)",
            minHeight: 40,
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          background: "rgba(237,235,230,0.82)",
          border: "1px solid rgba(17,17,17,0.13)",
          borderRadius: 12,
          padding: "24px 28px",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 10,
            marginBottom: job.description ? 12 : 0,
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.05rem",
                fontWeight: 600,
                color: "#111",
                marginBottom: 3,
                lineHeight: 1.3,
              }}
            >
              {job.title}
            </h3>
            <p style={{ fontSize: "0.88rem", color: "#444", fontWeight: 500 }}>
              {job.company}
            </p>
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              color: "#111",
              background: "rgba(232,93,31,0.15)",
              border: "1px solid rgba(17,17,17,0.15)",
              borderRadius: 999,
              padding: "4px 12px",
              whiteSpace: "nowrap",
            }}
          >
            {job.period}
          </span>
        </div>
        {job.description && (
          <p
            style={{
              fontSize: "0.86rem",
              color: "#444",
              lineHeight: 1.7,
              marginBottom: 14,
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
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  padding: "3px 10px",
                  borderRadius: 4,
                  background: "rgba(232,93,31,0.12)",
                  border: "1px solid rgba(17,17,17,0.14)",
                  color: "#333",
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

/* ═══════════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const skillsSectionRef = useRef<HTMLElement | null>(null);
  const skillsLanguagesRef = useRef<HTMLDivElement | null>(null);
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const experienceSectionRef = useRef<HTMLElement | null>(null);

  const { scrollY } = useScroll();
  const { scrollYProgress: skillsProgress } = useScroll({
    target: skillsSectionRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutSectionRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: experienceProgress } = useScroll({
    target: experienceSectionRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: skillsLanguagesProgress } = useScroll({
    target: skillsLanguagesRef,
    offset: ["start end", "start center"],
  });
  const cardX = useTransform(scrollY, [0, 140, 900], ["-9.5vw", "0vw", "32vw"]);
  const cardScaleRaw = useTransform(scrollY, [0, 900], [1, 0.9]);
  const cardRotateRaw = useTransform(scrollY, [0, 900], [0, 8]);
  const cardYRaw = useTransform(
    [aboutProgress, experienceProgress],
    (latest) => {
      const about = Number(latest[0] ?? 0);
      const exp = Number(latest[1] ?? 0);
      const aboutT = Math.min(Math.max((about - 0.04) / 0.96, 0), 1);
      const expT = Math.min(Math.max((exp - 0.01) / 0.12, 0), 1);
      const lift = aboutT * 52 + expT * 86;
      return `${-50 - lift}%`;
    },
  );
  const cardOpacityRaw = useTransform(experienceProgress, [0, 0.1], [1, 0]);
  const cardFlipRaw = useTransform(
    [skillsProgress, aboutProgress],
    (latest) => {
      const skills = Number(latest[0] ?? 0);
      const about = Number(latest[1] ?? 0);
      const skillsT = Math.min(Math.max((skills - 0.25) / 0.53, 0), 1);
      const aboutT = Math.min(Math.max((about - 0.2) / 0.55, 0), 1);

      if (aboutT > 0) {
        return 180 * (1 - aboutT);
      }

      return 180 * skillsT;
    },
  );
  const cardScale = useSpring(cardScaleRaw, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });
  const cardRotate = useSpring(cardRotateRaw, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });
  const cardFlipY = useSpring(cardFlipRaw, {
    stiffness: 110,
    damping: 26,
    mass: 0.32,
  });
  const cardY = useSpring(cardYRaw, {
    stiffness: 110,
    damping: 24,
    mass: 0.34,
  });
  const cardOpacity = useSpring(cardOpacityRaw, {
    stiffness: 150,
    damping: 28,
    mass: 0.28,
  });
  const aboutImageBlend = useTransform(aboutProgress, [0.15, 0.45], [0, 1]);
  const aboutImageBlendSpring = useSpring(aboutImageBlend, {
    stiffness: 120,
    damping: 24,
    mass: 0.32,
  });
  const heroImageOpacity = useTransform(aboutImageBlendSpring, [0, 1], [1, 0]);
  const lastCardFoldProgress = useTransform(skillsLanguagesProgress, (v) =>
    Math.min(Math.max((v - 0.98) / 0.035, 0), 1),
  );
  const lastCardFoldRotateY = useSpring(
    useTransform(lastCardFoldProgress, [0, 1], [0, -176]),
    {
      stiffness: 132,
      damping: 24,
      mass: 0.32,
    },
  );
  const lastCardFoldShiftX = useSpring(
    useTransform(lastCardFoldProgress, [0, 1], [0, 0]),
    {
      stiffness: 132,
      damping: 24,
      mass: 0.32,
    },
  );
  const lastCardFoldShadow = useSpring(
    useTransform(lastCardFoldProgress, [0, 1], [0, 0.01]),
    {
      stiffness: 132,
      damping: 24,
      mass: 0.32,
    },
  );
  const otherStackCardsOpacity = useTransform(
    lastCardFoldProgress,
    [0, 0.008, 1],
    [1, 0, 0],
  );

  /* ── scroll-reveal ───────────────────────── */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal-on-scroll");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMoreMenuOpen(false);
  }, []);

  /* ── Data ──────────────────────────────────────────────────────── */
  const experience = [
    {
      title: "Intern",
      company: "IIT Hyderabad",
      period: "Dec 2025 – Present",
      description: "",
      skills: ["Databases"],
    },
    {
      title: "Software Developer Intern",
      company: "Matrix Capital",
      period: "May 2025 – Jun 2025",
      description: "",
      skills: ["Web Development"],
    },
    {
      title: "Technical Head",
      company: "Mozilla Firefox Club, VIT Vellore",
      period: "Jan 2026 – Present",
      description:
        "Leading technical initiatives at the Mozilla Firefox Club. Previously served as Technical Core (Mar 2025 – Dec 2025), promoting open-source technologies and collaborative development.",
      skills: ["Backend Development", "Open Source", "Technical Projects"],
    },
  ];

  const skillGroups = [
    {
      key: "backend",
      title: "Systems & Backend",
      skills: [
        "Node.js",
        "Express.js",
        "REST API Design",
        "Prisma ORM",
        "JWT Auth",
        "Backend Architecture",
      ],
    },
    {
      key: "databases",
      title: "Databases & Storage",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"],
    },
    {
      key: "observability",
      title: "Observability & DevOps",
      skills: [
        "Docker",
        "Git",
        "CI/CD",
        "k6 (Load Testing)",
        "Postman",
        "Prometheus",
        "Grafana",
        "Loki",
        "Jaeger",
      ],
    },
    {
      key: "frontend",
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
  ] as const;

  const languages = [
    { name: "English", level: "Native", barWidth: "100%" },
    { name: "Hindi", level: "Fluent", barWidth: "92%" },
    { name: "Telugu", level: "Intermediate", barWidth: "73%" },
    { name: "Kannada", level: "Intermediate", barWidth: "58%" },
    { name: "French", level: "Basic", barWidth: "32%" },
  ] as const;

  const projects = [
    {
      name: "Reference Hallucination Detector",
      emoji: "📚",
      description:
        "Research-grade pipeline for citation-grounded trust verification in academic text using NLP, reference extraction, and claim-to-source consistency checks.",
      stack: ["NLP", "Reference Verification", "Python"] as const,
      github: null,
    },
    {
      name: "archAIc",
      emoji: "🛡️",
      description:
        "AI-driven reliability engineering platform with 6 FastAPI microservices, OpenTelemetry trace propagation, and chaos controls for failure injection.",
      stack: [
        "FastAPI",
        "Prometheus/Grafana",
        "Kubernetes",
        "Next.js",
      ] as const,
      github: null,
    },
    {
      name: "Scotland Yard",
      emoji: "🎮",
      description:
        "Real-time multiplayer backend for a digital Scotland Yard board game. 200-node graph-based map, 6-team lobbies, turn-based asymmetric gameplay.",
      stack: ["Node.js", "Express", "PostgreSQL", "Redis"] as const,
      github: "https://github.com/Ad1th/Gravitas-Backend-25-Complete",
      badge: "100+ Users",
    },
    {
      name: "BlindSpot",
      emoji: "👁️",
      description:
        "Edge integration and deployment of a spatio-temporal assistive device for the visually impaired. YOLOv8-seg and CNN-LSTM on Raspberry Pi 5 with LLM-powered audio narration.",
      stack: ["Raspberry Pi", "YOLOv8", "CNN-LSTM", "Edge AI"] as const,
      github: null,
    },
    {
      name: "Argus",
      emoji: "🧠",
      description:
        "SQL analytics workspace where users upload CSV files, run SQL commands, inspect detailed query plans, and explore operator-level execution graphs.",
      stack: ["FastAPI", "React + TypeScript", "DuckDB", "ReactFlow"] as const,
      github: null,
    },
    {
      name: "OWC Wave Energy Harvester",
      emoji: "🌊",
      description:
        "Adapted point-source oscillator circuitry for Oscillating Water Column energy harvesting with ACS712 current sensors and voltage dividers.",
      stack: ["ACS712", "Power Electronics", "Signal Conditioning"] as const,
      github: null,
    },
    {
      name: "Point Wave Energy Harvester",
      emoji: "⚡",
      description:
        "Power conditioning circuitry for buoy-based wave energy harvesting. Full-wave rectifier, DC-DC boost converter, MPPT algorithm, IoT telemetry via ESP8266.",
      stack: ["Op-AMP 741", "Boost Converter", "Arduino", "ESP8266"] as const,
      github: null,
    },
    {
      name: "Cloudify",
      emoji: "☁️",
      description:
        "Cloud storage platform inspired by Google Drive with secure uploads, structured folder organization, and AI-driven search and data insights.",
      stack: ["PostgreSQL", "Express.js", "Vercel"] as const,
      github: "https://github.com/Ad1th/file-mgmt",
    },
    {
      name: "CropLink",
      emoji: "🌾",
      description:
        "Farm-to-labourer SMS application enabling direct communication between farmers and labourers, with crop data tailored to farm, soil type, and climate.",
      stack: ["PostgreSQL/Supabase", "Gemini API", "Twilio SMS"] as const,
      github: null,
    },
    {
      name: "Threddit",
      emoji: "🧩",
      description:
        "Productivity Chrome extension analyzing web usage and delivering personalized nudges. Saved users 36–48 minutes daily by reducing distractions.",
      stack: ["React", "FastAPI", "Gemini API", "Chrome Extensions"] as const,
      github: "https://github.com/Ad1th/3braincells_DevJams-24",
    },
    {
      name: "EchoChamber",
      emoji: "💬",
      description:
        "Anonymous forum web app enabling users to post confessions, chat, and share thoughts freely, with Supabase real-time data handling.",
      stack: ["HTML/CSS/JS", "PostgreSQL", "Supabase"] as const,
      github: "https://github.com/Ad1th/EchoChamber",
    },
    {
      name: "SevaVerse",
      emoji: "🤝",
      description:
        "Platform connecting NGOs, volunteers, and well-wishers to streamline child welfare initiatives with task management and dashboards.",
      stack: ["Node.js", "Prisma + SQLite", "Tailwind CSS"] as const,
      github: "https://github.com/Ad1th/SevaVerse",
    },
    {
      name: "EcoSync",
      emoji: "🌱",
      description:
        "Smart sustainability solutions for logistics and energy, built in a 2-day hackathon with Supabase backend and Python FastAPI.",
      stack: ["Supabase", "FastAPI", "HTML/CSS/JS"] as const,
      github: "https://github.com/Ad1th/OptiSync",
    },
    {
      name: "HOSPITECH",
      emoji: "🏥",
      description:
        "Lightweight clinic management system to digitize patient records, appointments, and doctor profiles with secure admin/doctor logins.",
      stack: ["Python", "SQL/MySQL", "Tkinter"] as const,
      github: "https://github.com/Ad1th/Hospitech--Hospital-Management-System",
    },
    {
      name: "Snek",
      emoji: "🐍",
      description:
        "Retro-style snake game with clean UI, menu screen, and dynamic difficulty. First project from grade 12.",
      stack: ["Python", "Pygame"] as const,
      github: "https://github.com/Ad1th/Snek---Snake_Game",
    },
  ];

  const achievements = [
    {
      title: "AI solutions Track Winner - Code 2 Create (C2C) Hackathon",
      year: "2025",
      description:
        "Won the AI solutions track at Code 2 Create (C2C) Hackathon held at VIT Vellore, organized by ACM, by building a blind assistance tool using image recognition and Raspberry Pi for real-time audio feedback.",
    },
    {
      title:
        "Cent Percent Attendance – Vellore Institute of Technology (2024–25)",
      year: "2024-25",
      description:
        "Awarded a Certificate of Appreciation for achieving 100% attendance in the academic year 2024–25 in B.Tech. Computer Science and Engineering (Information Security).",
    },
    {
      title: "First Place in Hackathon – CodeWars",
      year: "2024",
      description: "Won a hackathon - CodeWars - Conducted by NPS KRM.",
    },
    {
      title: "Second Place – PC Building Competition",
      year: "2023",
      description:
        "Achieved second place in a competitive PC building event, hosted by NPS HSR.",
    },
    {
      title: "OCI Foundations Certification",
      year: "2025",
      description:
        "Obtained the Oracle Cloud Infrastructure (OCI) Foundations certification, demonstrating foundational knowledge of OCI services and cloud concepts.",
    },
    {
      title: "Python Certification",
      year: "2025",
      description:
        "Received a certification in Python programming from HackerRank.",
    },
    {
      title: "SQL Basic Skill Certification",
      year: "2025",
      description: "Received a certification in SQL (Basic) from HackerRank.",
    },
    {
      title: "SQL Intermediate Skill Certification",
      year: "2025",
      description:
        "Received a certification in SQL (Intermediate) from HackerRank.",
    },
    {
      title: "Use AI Builder and Power Apps to Process Invoice Data",
      year: "2020",
      description:
        "Received a Certificate of Completion for a course on using AI Builder and Power Apps to process invoice data from Coursera.",
    },
    {
      title: "Virtual Internship in Mechanical Engineering",
      year: "2019",
      description:
        "Completed a virtual internship in Mechanical Engineering by Mindler.",
    },
  ];

  const hackathons = [
    {
      name: "Women Techies'26 - Finalist, Top 10 Teams",
      when: "March 2026 · VIT Vellore",
      desc: "Reached finalist stage as a part of the top 10 teams by building AetherQuery, a SQL analytics platform with CSV upload, SQL execution, and detailed query-plan visualization for interactive analysis.",
    },
    {
      name: "TechSolstice",
      when: "March 2026 · MIT Bangalore",
      desc: "Built archAIc, an AI-driven reliability engineering platform with microservices observability, chaos injection, and automated incident analysis workflows for resilient production-system testing.",
    },
    {
      name: "Code 2 Create (C2C) - AI Track Winner",
      when: "September 2025 · VIT Vellore",
      desc: "Built a blind assistance tool which uses image recognition to analyze surroundings and provide real-time feedback to visually impaired users via audio in their local dialect.",
    },
    {
      name: "Women Techies'25",
      when: "April 2025 · VIT Vellore",
      desc: "Built SevaVerse at Women Techies'25 – a collaborative platform connecting NGOs, volunteers, and well-wishers to streamline child welfare initiatives.",
    },
    {
      name: "Yantra Central Hack",
      when: "January 2025 · VIT Vellore",
      desc: "Built OptiSync at Yantra Central Hack – a sustainability platform tailored for the textile industry.",
    },
    {
      name: "DevJams",
      when: "September 2024 · VIT Vellore",
      desc: "Built Threddit at DevJams – a smart Chrome extension that uses the Gemini API to analyze browsing patterns and deliver AI-powered nudges.",
    },
    {
      name: "CodeWars - 1st Place",
      when: "February 2024 · NPS KRM, Bangalore",
      desc: "Won first place.",
    },
  ];

  const hobbies = [
    "Robotics",
    "Photography",
    "Cycling",
    "Trekking",
    "Gaming",
    "Music",
    "Traveling",
    "Gardening",
  ];

  const patents = [
    {
      title:
        "A system for real time environmental perception and assistance for a visually impaired user",
      status: "Published",
      appNo: "202641010249",
      filed: "31/01/2026",
      published: "13/02/2026",
      description:
        "Filed through Vellore Institute of Technology. This ordinary application in the field of Computer Science details an advanced predictive and assistive system providing real-time environmental perception to aid visually impaired individuals.",
    },
    {
      title:
        "WAVE ENERGY GENERATOR ELECTRICAL CIRCUIT WITH MAXIMUM POWER POINT TRACKING AND IOT TELEMETRY SYSTEM",
      status: "Published",
      appNo: "202641032830",
      filed: "Mar 18, 2026",
      description:
        "Built a wave energy harvesting circuit with full-bridge rectification, DC-DC boost conversion, real-time sensing, and MPPT-based control, integrated with IoT telemetry for monitoring; resulted in a published patent.",
    },
  ];

  const projectImages: Partial<Record<string, string>> = {
    "OWC Wave Energy Harvester": "/wave-energy-4.jpg",
    "Point Wave Energy Harvester": "/wave-energy-3.jpg",
    Cloudify: "/cloudify.png",
    Threddit: "/threddit.png",
    EchoChamber: "/echochamber.png",
    SevaVerse: "/sevaverse.png",
    EcoSync: "/EcoSync.png",
    HOSPITECH: "/lhospital.png",
    Snek: "/snek.png",
  };

  const dockItems = [
    {
      icon: <Home size={17} />,
      label: "Home",
      onClick: () => scrollToSection("hero"),
    },
    {
      icon: <Info size={17} />,
      label: "About",
      onClick: () => scrollToSection("about"),
    },
    {
      icon: <FolderKanban size={17} />,
      label: "Projects",
      onClick: () => scrollToSection("projects"),
    },
    {
      icon: <Ellipsis size={17} />,
      label: "More",
      onClick: () => setMoreMenuOpen((v) => !v),
      separator: true,
    },
  ];

  const moreItems = [
    {
      label: "Home",
      href: "#hero",
      rotation: -2,
      hoverStyles: { bgColor: "#d96516", textColor: "#f5f5f5" },
    },
    {
      label: "About",
      href: "#about",
      rotation: 3,
      hoverStyles: { bgColor: "#d96516", textColor: "#f5f5f5" },
    },
    {
      label: "Skills",
      href: "#skills",
      rotation: 4,
      hoverStyles: { bgColor: "#d96516", textColor: "#f5f5f5" },
    },
    {
      label: "Experience",
      href: "#experience",
      rotation: -5,
      hoverStyles: { bgColor: "#d96516", textColor: "#f5f5f5" },
    },
    {
      label: "Projects",
      href: "#projects",
      rotation: 2,
      hoverStyles: { bgColor: "#d96516", textColor: "#f5f5f5" },
    },
    {
      label: "Patents",
      href: "#patents",
      rotation: 5,
      hoverStyles: { bgColor: "#d96516", textColor: "#f5f5f5" },
    },
    {
      label: "Achievements",
      href: "#achievements",
      rotation: -4,
      hoverStyles: { bgColor: "#d96516", textColor: "#f5f5f5" },
    },
    {
      label: "Hackathons",
      href: "#hackathons",
      rotation: -1,
      hoverStyles: { bgColor: "#d96516", textColor: "#f5f5f5" },
    },
    {
      label: "Hobbies",
      href: "#hobbies",
      rotation: 1,
      hoverStyles: { bgColor: "#d96516", textColor: "#f5f5f5" },
    },
    {
      label: "Contact",
      href: "#contact",
      rotation: 3,
      hoverStyles: { bgColor: "#d96516", textColor: "#f5f5f5" },
    },
  ];

  /* ══════════════════════════════════════════════════════════════════ */
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #E8E6E1;
          color: #111111;
          font-family: 'DM Sans', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          padding-bottom: 96px;
          cursor: auto;
        }
        h1,h2,h3,h4,h5,h6 { font-family: 'DM Serif Display', Georgia, serif; font-weight: 400; }
        a { color: inherit; text-decoration: none; }
        ::selection { background: rgba(217,101,22,0.22); color: #111; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(17,17,17,0.2); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent); }
        :root {
          --accent: #d96516;
          --olive: #6f7b4b;
          --olive-soft: #d8ddcf;
          --bg-light: #eef1f3;
          --bg-dark: #eef1f3;
          --text-dark: #111111;
          --text-light: #1a1a1a;
          --text-muted-dark: rgba(17,17,17,0.58);
          --text-muted-light: rgba(17,17,17,0.55);
          --border-dark: rgba(17,17,17,0.12);
          --border-light: rgba(17,17,17,0.1);
          --surface-dark: rgba(17,17,17,0.06);
          --surface-light: rgba(17,17,17,0.04);
        }

        /* ─ Reveal ─ */
        .reveal-on-scroll {
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal-on-scroll.revealed { opacity: 1; transform: none; }
        .delay-1 { transition-delay: 0.08s !important; }
        .delay-2 { transition-delay: 0.16s !important; }
        .delay-3 { transition-delay: 0.26s !important; }
        .delay-4 { transition-delay: 0.38s !important; }

        /* ─ Nav ─ */
        .nav-pill {
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(17,17,17,0.52);
          padding: 6px 14px; border-radius: 999px;
          border: 1px solid transparent;
          transition: color 0.18s ease, border-color 0.18s ease, background 0.18s ease;
        }
        .nav-pill:hover {
          color: #111; border-color: rgba(17,17,17,0.15);
          background: rgba(111,123,75,0.14);
        }

        /* ─ Buttons ─ */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          min-height: 48px; padding: 0 28px;
          background: #111111; color: #ebebeb;
          font-weight: 600; font-size: 0.84rem; letter-spacing: 0.04em;
          border-radius: 999px; border: 1px solid rgba(17,17,17,0.2);
          transition: background 0.2s ease, transform 0.15s ease;
          cursor: pointer;
        }
        .btn-primary:hover { background: var(--accent); transform: translateY(-1px); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          min-height: 48px; padding: 0 28px;
          background: transparent; color: #111111;
          font-weight: 500; font-size: 0.84rem; letter-spacing: 0.03em;
          border-radius: 999px; border: 1px solid rgba(17,17,17,0.2);
          transition: border-color 0.2s ease, background 0.2s ease;
          cursor: pointer;
        }
        .btn-ghost:hover { border-color: var(--accent); background: rgba(217,101,22,0.06); }

        /* ─ Skills grid ─ */
        .skills-bento {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr 1fr;
          grid-template-rows: auto auto;
          gap: 14px;
          margin-top: 56px;
        }
        .skill-tile {
          border-radius: 10px; padding: 22px 24px;
          border: 1px solid rgba(17,17,17,0.14);
          transition: border-color 0.2s ease;
        }
        .skill-tile:hover { border-color: rgba(217,101,22,0.28); }
        .skill-tile-title {
          font-size: 0.65rem; font-weight: 800; letter-spacing: 0.16em;
          text-transform: uppercase; margin-bottom: 16px; line-height: 1;
        }
        .skill-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.88rem; line-height: 1.5; padding: 3px 0;
          font-weight: 450;
        }
        .skill-dot { width: 5px; height: 5px; border-radius: 1px; flex-shrink: 0; }

        /* ─ Hackathon row ─ */
        .hack-row {
          display: grid; grid-template-columns: 180px 1fr; gap: 0;
          padding: 22px 0; align-items: start;
          transition: background 0.2s ease;
        }
        .hack-row:hover { background: rgba(17,17,17,0.025); margin: 0 -24px; padding-left: 24px; padding-right: 24px; }
        .hack-row:first-child { border-top: none; }

        /* ─ Contact ─ */
        .social-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.82rem; font-weight: 600; letter-spacing: 0.04em;
          color: rgba(17,17,17,0.6);
          transition: color 0.18s ease;
          cursor: pointer;
        }
        .social-link:hover { color: var(--accent); }

        /* ─ Section divider ─ */
        .section-wrap {
          max-width: 1120px; margin: 0 auto;
          padding: clamp(72px,10vw,120px) clamp(24px,5vw,56px);
          position: relative; z-index: 0;
        }
        .bg-light::before {
          content: none; position: absolute;
          inset: 0; left: calc(-50vw + 50%); right: calc(-50vw + 50%);
          background: transparent; z-index: -1;
        }
        .bg-offwhite::before {
          content: none; position: absolute;
          inset: 0; left: calc(-50vw + 50%); right: calc(-50vw + 50%);
          background: transparent; z-index: -1;
        }
        .bg-dark::before {
          content: none; position: absolute;
          inset: 0; left: calc(-50vw + 50%); right: calc(-50vw + 50%);
          background: transparent; z-index: -1;
        }
        .bg-darker::before {
          content: none; position: absolute;
          inset: 0; left: calc(-50vw + 50%); right: calc(-50vw + 50%);
          background: transparent; z-index: -1;
        }

        /* ─ Language bars ─ */
        .lang-bar { height: 2px; background: rgba(17,17,17,0.1); border-radius: 1px; overflow: hidden; margin-top: 4px; }
        .lang-fill { height: 100%; background: var(--accent); border-radius: 1px; }

        /* ─ About falling text ─ */
        .about-falling-wrap { touch-action: pan-y; }

        /* ─ Card-driven transition ─ */
        .avatar-card-shell {
          perspective: 1400px;
          transform-style: preserve-3d;
        }
        .avatar-card-core {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          transform-style: preserve-3d;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(17,17,17,0.16);
          box-shadow: 0 20px 36px rgba(17,17,17,0.12);
          background: #f1eee9;
        }
        .avatar-card-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .avatar-front-layer {
          position: absolute;
          inset: 0;
        }
        .avatar-card-face--back {
          transform: rotateY(180deg);
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          padding: clamp(18px, 3vw, 28px);
          background: #111111;
          color: #ece8df;
          line-height: 1.22;
          letter-spacing: -0.02em;
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(1.2rem, 2.1vw, 1.9rem);
        }

        /* ─ Skills stacked sections ─ */
        .skills-stack {
          margin-top: 16px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 42px;
          padding-bottom: 0;
        }
        .skills-stack-scene {
          position: relative;
          padding-bottom: 0;
          --skills-sticky-top: 56px;
          --skills-heading-height: 152px;
        }
        .skills-section-heading {
          position: sticky;
          top: var(--skills-sticky-top);
          z-index: 8;
          padding-bottom: 16px;
          background: transparent;
        }
        .skills-stack-panel {
          position: sticky;
          top: calc(var(--skills-sticky-top) + var(--skills-heading-height));
          border-radius: 12px;
          border: 1px solid rgba(17,17,17,0.14);
          padding: 24px 26px;
          box-shadow: 0 14px 30px rgba(17,17,17,0.08);
          transition: transform 0.25s ease;
          min-height: 180px;
        }
        .skills-stack-panel:nth-child(1) { z-index: 1; }
        .skills-stack-panel:nth-child(2) { z-index: 2; margin-top: -32px; }
        .skills-stack-panel:nth-child(3) { z-index: 3; margin-top: -32px; }
        .skills-stack-panel:nth-child(4) { z-index: 4; margin-top: -32px; }
        .skills-fold-stage {
          position: relative;
        }
        .skills-fold-card {
          position: relative;
          min-height: inherit;
          perspective: 10000px;
          transform-style: preserve-3d;
        }
        .skills-fold-measure {
          visibility: hidden;
        }
        .skills-fold-half {
          position: absolute;
          inset: 0;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
          .skills-fold-half--left {
  position: absolute;
  top: 0; left: 0;
  width: 50%; height: 100%;
  overflow: hidden;              /* natural geometric clip */
  z-index: 1;
}
.skills-fold-half--right {
  position: absolute;
  top: 0; left: 50%;
  width: 50%; height: 100%;
  overflow: hidden;
  transform-origin: left center;
  z-index: 2;
  will-change: transform;
}
  /* Left half: surface sits normally, right half is clipped by overflow */
.skills-fold-half--left .skills-fold-surface {
  position: absolute;
  top: 0; left: 0;
  width: 200%;          /* full card width, left half naturally clips it */
}

/* Right half: surface is pulled left by 100% so the right half of content shows */
.skills-fold-half--right .skills-fold-surface {
  position: absolute;
  top: 0; left: -100%;  /* shift left so only the right half of content is visible */
  width: 200%;
}
        // .skills-fold-half--left {
        //   clip-path: inset(0 50% 0 0);
        //   z-index: 1;
        // }
        // .skills-fold-half--right {
        //   clip-path: inset(0 0 0 50%);
        //   transform-origin: left center;
        //   z-index: 2;
        //   will-change: transform;
        // }
        .skills-fold-shadow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(to left, rgba(17,17,17,0.28), rgba(17,17,17,0));
        }
        .skills-fold-surface {
          height: 100%;
          min-height: 180px;
          border-radius: 12px;
          border: 1px solid rgba(17,17,17,0.14);
          padding: 24px 26px;
          box-shadow: 0 14px 30px rgba(17,17,17,0.08);
        }

        .section-wrap {
          max-width: 1120px;
          margin: 0 auto;
          min-height: 100svh;
          width: 100%;
          padding: clamp(72px,10vw,120px) clamp(24px,5vw,56px);
          position: relative;
          z-index: 0;
        }

        .hero-scene {
          max-width: 100%;
          width: 100%;
        }

        .hero-copy {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: min(40vw, 560px);
          z-index: 1;
        }
        .hero-copy--left {
          left: clamp(58px, 8vw, 122px);
          text-align: left;
        }
        .hero-copy--right {
          right: clamp(36px, 6vw, 88px);
          width: min(52vw, 760px);
          transform: translateY(-50%) translateX(clamp(-24px, -4vw, -72px));
          text-align: right;
        }

        .global-card {
          position: fixed;
          top: 50%;
          left: 50%;
          z-index: 50;
          width: min(260px, 30vw);
          transform-style: preserve-3d;
          pointer-events: none;
          will-change: transform;
        }

        @media (max-width: 768px) {
          .skills-bento { grid-template-columns: 1fr; }
          .hack-row { grid-template-columns: 1fr; gap: 6px; }
          .skills-stack { gap: 16px; }
          .skills-stack-scene { padding-bottom: 0; }
          .skills-section-heading {
            position: relative;
            top: auto;
            padding-bottom: 0;
            background: transparent;
          }
          .skills-stack-panel {
            position: relative;
            top: auto;
            min-height: auto;
          }
          .hero-copy {
            position: relative;
            top: auto;
            transform: none;
            width: 100%;
            max-width: none;
          }
          .hero-copy--left,
          .hero-copy--right {
            left: auto;
            right: auto;
            text-align: left;
          }
          .global-card {
            width: min(220px, 52vw);
          }
        }
      `,
        }}
      />

      {showLoader && <Loader onDone={() => setShowLoader(false)} />}

      <motion.div
        className="global-card"
        style={{
          x: cardX,
          y: cardY,
          scale: cardScale,
          rotate: cardRotate,
          opacity: cardOpacity,
        }}
      >
        <div className="avatar-card-shell">
          <motion.div
            className="avatar-card-core"
            style={{ rotateY: cardFlipY }}
          >
            <div className="avatar-card-face avatar-card-face--front">
              <motion.div
                className="avatar-front-layer"
                style={{ opacity: heroImageOpacity }}
              >
                <Image
                  src="/me.png"
                  alt="Adith avatar"
                  width={420}
                  height={420}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "saturate(0.92) contrast(1.02)",
                  }}
                  priority
                />
              </motion.div>
              <motion.div
                className="avatar-front-layer"
                style={{ opacity: aboutImageBlendSpring }}
              >
                <Image
                  src="/me2.jpeg"
                  alt="Adith avatar alternate"
                  width={420}
                  height={420}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "saturate(0.95) contrast(1.02)",
                  }}
                  priority
                />
              </motion.div>
            </div>
            <div className="avatar-card-face avatar-card-face--back">
              Adith, Dackend Developer
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ════════ HERO ════════ */}
      <section
        id="hero"
        className="hero-scene"
        style={{
          opacity: showLoader ? 0 : 1,
          minHeight: "100svh",
          paddingTop: 0,
          position: "relative",
          overflow: "hidden",
          background: "var(--bg-light)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <HeroTessellatedCanvas />
        </div>

        <div className="hero-copy hero-copy--left">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: inter.style.fontFamily,
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: "#6b6b6b",
              opacity: 0.72,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 24,
                height: 1.5,
                background: "rgba(88,88,88,0.74)",
                display: "inline-block",
                borderRadius: 1,
              }}
            />
            Backend • Databases
          </motion.div>
          <h1
            style={{
              fontFamily: playfairDisplay.style.fontFamily,
              fontSize: "clamp(3.8rem, 8.8vw, 7.5rem)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#2b2b2b",
              overflow: "hidden",
            }}
          >
            <SplitReveal
              text="Adith"
              delay={0.2}
              style={{ display: "block", color: "#2b2b2b" }}
            />
          </h1>
        </div>

        <div className="hero-copy hero-copy--right">
          <h1
            style={{
              fontFamily: playfairDisplay.style.fontFamily,
              fontSize: "clamp(3.6rem, 8.5vw, 7.2rem)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "#d65a2e",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textRendering: "optimizeLegibility",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              textAlign: "right",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                justifyContent: "flex-end",
                fontFamily: inter.style.fontFamily,
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color: "#6b6b6b",
                opacity: 0.72,
                marginBottom: 20,
              }}
            >
              Engineering Student
              <span
                style={{
                  width: 24,
                  height: 1.5,
                  background: "rgba(88,88,88,0.74)",
                  display: "inline-block",
                  borderRadius: 1,
                }}
              />
            </motion.div>
            <SplitReveal
              text="Manikonda"
              delay={0.28}
              style={{
                display: "block",
                color: "#d65a2e",
                whiteSpace: "nowrap",
              }}
            />
          </h1>
        </div>
      </section>

      {/* ════════ SKILLS ════════ */}
      <section
        id="skills"
        className="section-wrap bg-light"
        ref={skillsSectionRef}
        style={{ paddingBottom: "clamp(120px, 14vw, 180px)" }}
      >
        <div className="skills-stack-scene">
          <div className="skills-section-heading">
            <SectionLabel>Skills</SectionLabel>
            <SectionTitle>What I work with</SectionTitle>
          </div>

          <div className="skills-stack">
            {[
              {
                key: "backend",
                index: 0,
                bg: "#E8E6E1",
                titleColor: "#333",
                bodyColor: "#222",
              },
              {
                key: "databases",
                index: 1,
                bg: "#ecd9cc",
                titleColor: "#222",
                bodyColor: "#222",
              },
              {
                key: "frontend",
                index: 3,
                bg: "#f0ede8",
                titleColor: "#555",
                bodyColor: "#444",
              },
              {
                key: "observability",
                index: 2,
                bg: "var(--accent)",
                titleColor: "rgba(255,243,234,0.85)",
                bodyColor: "#fff3ea",
              },
            ].map((group, idx) => (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.52, delay: idx * 0.08 }}
                className="skills-stack-panel"
                style={{
                  background: idx === 3 ? "transparent" : group.bg,
                  border: idx === 3 ? "none" : undefined,
                  boxShadow: idx === 3 ? "none" : undefined,
                  padding: idx === 3 ? 0 : undefined,
                  overflow: idx === 3 ? "visible" : undefined,
                  y: idx * -2,
                  ...(idx === 3
                    ? {
                        opacity: 1,
                        zIndex: 20,
                      }
                    : {
                        opacity: otherStackCardsOpacity,
                      }),
                }}
              >
                {(() => {
                  const panelContent = (
                    <>
                      <p
                        className="skill-tile-title"
                        style={{ color: group.titleColor }}
                      >
                        {skillGroups[group.index].title}
                      </p>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(190px, 1fr))",
                          gap: "4px 20px",
                        }}
                      >
                        {skillGroups[group.index].skills.map((s) => (
                          <div
                            key={s}
                            className="skill-item"
                            style={{
                              color: group.bodyColor,
                              fontSize:
                                group.key === "frontend"
                                  ? "0.82rem"
                                  : "0.88rem",
                            }}
                          >
                            <span
                              className="skill-dot"
                              style={{
                                background:
                                  group.key === "observability"
                                    ? "rgba(255,243,234,0.78)"
                                    : "var(--accent)",
                                borderRadius:
                                  group.key === "backend" ? 1 : "50%",
                                width: group.key === "observability" ? 10 : 5,
                                height: group.key === "observability" ? 2 : 5,
                              }}
                            />
                            {s}
                          </div>
                        ))}
                      </div>
                    </>
                  );

                  if (idx !== 3) return panelContent;

                  return (
                    <div className="skills-fold-stage">
                      <div className="skills-fold-card">
                        <div className="skills-fold-measure" aria-hidden>
                          <div
                            className="skills-fold-surface"
                            style={{ background: group.bg }}
                          >
                            {panelContent}
                          </div>
                        </div>
                        <div className="skills-fold-half skills-fold-half--left">
                          <div
                            className="skills-fold-surface"
                            style={{ background: group.bg }}
                          >
                            {panelContent}
                          </div>
                        </div>
                        <motion.div
                          className="skills-fold-half skills-fold-half--right"
                          style={{
                            rotateY: lastCardFoldRotateY,
                            x: lastCardFoldShiftX,
                          }}
                        >
                          <div
                            className="skills-fold-surface"
                            style={{ background: group.bg }}
                          >
                            {panelContent}
                          </div>
                          <motion.div
                            className="skills-fold-shadow"
                            style={{ opacity: lastCardFoldShadow }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            marginTop: 72,
            maxWidth: 520,
            position: "relative",
            zIndex: 9,
          }}
          ref={skillsLanguagesRef}
        >
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 20,
            }}
          >
            Languages spoken
          </p>
          {languages.map((lang, i) => (
            <div
              key={lang.name}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                padding: "8px 0",
                borderBottom:
                  i < languages.length - 1
                    ? "1px solid rgba(17,17,17,0.08)"
                    : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    color: "#111",
                  }}
                >
                  {lang.name}
                </span>
                <span
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(17,17,17,0.4)",
                  }}
                >
                  {lang.level}
                </span>
              </div>
              <div className="lang-bar">
                <motion.div
                  className="lang-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: lang.barWidth }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ════════ ABOUT ════════ */}
      <section
        id="about"
        className="section-wrap bg-dark"
        ref={aboutSectionRef}
        style={{ color: "var(--text-light)" }}
      >
        <SectionLabel>About</SectionLabel>

        <h2
          className="reveal-on-scroll"
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            color: "var(--text-light)",
            fontSize: "clamp(1.9rem, 3.8vw, 2.9rem)",
            lineHeight: 1.14,
            maxWidth: 860,
          }}
        >
          I like building things, breaking them, then fixing them again.
        </h2>

        <motion.div
          style={{
            marginTop: 64,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
            gap: 32,
            maxWidth: 880,
          }}
        >
          {[
            {
              text: "I'm a CSE student who enjoys backend-heavy projects that feel real: multiplayer games with actual users, AI tools that do something useful, anonymous forums, productivity extensions, and apps that bridge gaps outside the screen.",
              italic: false,
            },
            {
              text: "Sometimes I dip into hardware - running edge ML on Raspberry Pi for assistive tech, or wiring up wave energy experiments with sensors and telemetry. When physics fights back, your software design improves fast.",
              italic: false,
            },
            {
              text: "Mostly, I care about shipping systems that run, scale, and survive real usage. Buzzwords don't interest me much, but behaviour does.",
              italic: true,
            },
          ].map((para, i) => (
            <p
              key={i}
              className="reveal-on-scroll"
              style={{
                fontSize: "0.96rem",
                lineHeight: 1.8,
                fontStyle: para.italic ? "italic" : "normal",
                color: i === 2 ? "rgba(17,17,17,0.48)" : "rgba(17,17,17,0.72)",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {para.text}
            </p>
          ))}
        </motion.div>
      </section>

      {/* ════════ EXPERIENCE ════════ */}
      <section
        id="experience"
        className="section-wrap bg-offwhite"
        ref={experienceSectionRef}
      >
        <SectionLabel>Experience</SectionLabel>
        <SectionTitle>Where I've worked</SectionTitle>

        <div style={{ marginTop: 56, maxWidth: 700 }}>
          {experience.map((job, i) => (
            <ExperienceCard key={i} job={job} index={i} />
          ))}
        </div>
      </section>

      {/* ════════ PROJECTS ════════ */}
      <section
        id="projects"
        className="section-wrap bg-darker"
        style={{ color: "var(--text-light)" }}
      >
        <SectionLabel>Projects</SectionLabel>
        <SectionTitle style={{ color: "var(--text-light)" }}>
          Built and shipped
        </SectionTitle>

        <div
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
            gap: 14,
          }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              imageSrc={projectImages[project.name]}
              dark={false}
            />
          ))}
        </div>
      </section>

      {/* ════════ PATENTS ════════ */}
      <section id="patents" className="section-wrap bg-offwhite">
        <SectionLabel>Patents</SectionLabel>
        <SectionTitle>Intellectual property</SectionTitle>

        <div style={{ marginTop: 52, display: "grid", gap: 14 }}>
          {patents.map((patent, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{
                background: "#f8f5f0",
                border: "1px solid rgba(17,17,17,0.1)",
                borderRadius: 12,
                padding: "28px 32px",
                transition: "border-color 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#111",
                    lineHeight: 1.45,
                    maxWidth: "52rem",
                  }}
                >
                  {patent.title}
                </h3>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    borderRadius: 999,
                    background: "rgba(217,101,22,0.15)",
                    color: "var(--accent)",
                    border: "1px solid rgba(217,101,22,0.22)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {patent.status}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 14,
                }}
              >
                {[
                  patent.appNo && `App: ${patent.appNo}`,
                  patent.filed && `Filed: ${patent.filed}`,
                  (patent as any).published &&
                    `Published: ${(patent as any).published}`,
                ]
                  .filter(Boolean)
                  .map((item) => (
                    <span
                      key={item as string}
                      style={{
                        fontSize: "0.75rem",
                        padding: "3px 10px",
                        borderRadius: 4,
                        background: "rgba(17,17,17,0.05)",
                        border: "1px solid rgba(17,17,17,0.1)",
                        color: "#444",
                      }}
                    >
                      {item}
                    </span>
                  ))}
              </div>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "rgba(17,17,17,0.58)",
                  lineHeight: 1.72,
                }}
              >
                {patent.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════ ACHIEVEMENTS ════════ */}
      <section
        id="achievements"
        className="section-wrap bg-dark"
        style={{ color: "var(--text-light)" }}
      >
        <SectionLabel>Achievements</SectionLabel>
        <SectionTitle style={{ color: "var(--text-light)" }}>
          Certifications & awards
        </SectionTitle>

        <div
          style={{
            marginTop: 52,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: 12,
          }}
        >
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
              style={{
                background: "rgba(17,17,17,0.03)",
                border: "1px solid rgba(17,17,17,0.1)",
                borderRadius: 10,
                padding: "22px 24px",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                transition: "border-color 0.2s ease",
              }}
              whileHover={{ borderColor: "rgba(217,101,22,0.28)" }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: "rgba(217,101,22,0.12)",
                  border: "1px solid rgba(217,101,22,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Award size={16} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--accent)",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    marginBottom: 5,
                  }}
                >
                  {a.year}
                </p>
                <h3
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "var(--text-light)",
                    lineHeight: 1.4,
                    marginBottom: 8,
                  }}
                >
                  {a.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(17,17,17,0.5)",
                    lineHeight: 1.65,
                  }}
                >
                  {a.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════ HACKATHONS ════════ */}
      <section id="hackathons" className="section-wrap bg-light">
        <SectionLabel>Hackathons</SectionLabel>
        <SectionTitle>Live sprint record</SectionTitle>

        <div style={{ marginTop: 52, maxWidth: 860 }}>
          {hackathons.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="hack-row"
            >
              <div>
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(17,17,17,0.38)",
                  }}
                >
                  {h.when.split("·")[0].trim()}
                </span>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(17,17,17,0.4)",
                    marginTop: 2,
                  }}
                >
                  {h.when.split("·")[1]?.trim()}
                </p>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "0.96rem",
                    fontWeight: 600,
                    color: "#111",
                    marginBottom: 6,
                    lineHeight: 1.35,
                  }}
                >
                  {h.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.84rem",
                    color: "rgba(17,17,17,0.56)",
                    lineHeight: 1.68,
                  }}
                >
                  {h.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════ HOBBIES ════════ */}
      <section id="hobbies" className="section-wrap bg-offwhite">
        <SectionLabel>Hobbies</SectionLabel>
        <SectionTitle>Beyond the screen</SectionTitle>

        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))",
            gap: 10,
          }}
        >
          {hobbies.map((hobby, i) => (
            <motion.div
              key={hobby}
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              whileHover={{ y: -3 }}
              style={{
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid rgba(17,17,17,0.12)",
                aspectRatio: "1",
                position: "relative",
                background: "rgba(17,17,17,0.04)",
              }}
            >
              <Image
                src={`/${hobby.toLowerCase()}.png`}
                alt={hobby}
                width={300}
                height={300}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "28px 14px 12px",
                  background:
                    "linear-gradient(to top, rgba(10,10,10,0.72), transparent)",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "#fff",
                }}
              >
                {hobby}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════ CONTACT ════════ */}
      <section
        id="contact"
        className="section-wrap bg-darker"
        style={{ color: "var(--text-light)" }}
      >
        <div style={{ maxWidth: 580 }}>
          <SectionLabel>Contact</SectionLabel>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "clamp(2.8rem,6vw,5rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "var(--text-light)",
              marginBottom: 0,
            }}
          >
            Let&apos;s build
            <br />
            <span style={{ color: "var(--accent)" }}>something real.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              marginTop: 28,
              marginBottom: 44,
              fontSize: "0.96rem",
              color: "rgba(17,17,17,0.56)",
              lineHeight: 1.78,
            }}
          >
            Always open to new opportunities and conversations - whether it's an
            interesting problem to solve, a collaboration, or just a chat about
            systems that break in interesting ways.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <a
              href="mailto:hello@adith.xyz"
              className="btn-primary"
              style={{
                background: "var(--accent)",
                color: "#fff",
                border: "none",
              }}
            >
              <Mail size={15} /> hello@adith.xyz
            </a>
            <a
              href="https://github.com/Ad1th"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <Github size={15} /> GitHub{" "}
              <ExternalLink size={11} style={{ opacity: 0.5 }} />
            </a>
            <a
              href="https://www.linkedin.com/in/adith-manikonda/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <Linkedin size={15} /> LinkedIn{" "}
              <ExternalLink size={11} style={{ opacity: 0.5 }} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════ BUBBLE MENU ════════ */}
      <BubbleMenu
        open={moreMenuOpen}
        onRequestClose={() => setMoreMenuOpen(false)}
        items={moreItems}
        menuBg="#eef1f3"
        menuContentColor="#111111"
        useFixedPosition
      />

      {/* ════════ DOCK ════════ */}
      <Dock
        items={dockItems}
        baseItemSize={40}
        magnification={48}
        distance={120}
        panelHeight={54}
        dockHeight={72}
        spring={{ mass: 0.14, stiffness: 170, damping: 24 }}
      />

      {/* ════════ FOOTER ════════ */}
      <footer
        style={{
          borderTop: "none",
          padding: "28px clamp(24px,5vw,56px) 108px",
          background: "var(--bg-light)",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <p style={{ fontSize: "0.78rem", color: "rgba(17,17,17,0.5)" }}>
            Designed & built by{" "}
            <span style={{ color: "var(--accent)" }}>Adith Manikonda</span>
          </p>
          <p style={{ fontSize: "0.72rem", color: "rgba(17,17,17,0.42)" }}>
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </div>
      </footer>
    </>
  );
}
