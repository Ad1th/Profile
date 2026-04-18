"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Award, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 11px",
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.03em",
        borderRadius: "999px",
        background: "var(--surface)",
        border: "1px solid var(--border-color)",
        color: "var(--text)",
      }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--accent)",
        marginBottom: "14px",
      }}
    >
      {children}
    </span>
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
        fontSize: "clamp(2.2rem, 4vw, 3.1rem)",
        fontWeight: 400,
        color: "var(--text)",
        lineHeight: 1.15,
        marginBottom: 0,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

export default function Portfolio() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    "about",
    "experience",
    "skills",
    "projects",
    "patents",
    "achievements",
    "hackathons",
    "hobbies",
    "contact",
  ];

  const experienceColors = {
    heading: "#111111",
    secondary: "#111111",
    tertiary: "#111111",
    cardBg: "rgba(237, 235, 230, 0.82)",
    cardBorder: "rgba(17, 17, 17, 0.22)",
    tagBg: "rgba(232, 93, 31, 0.2)",
    tagBorder: "rgba(17, 17, 17, 0.2)",
    badgeBg: "rgba(232, 93, 31, 0.2)",
    badgeBorder: "rgba(17, 17, 17, 0.22)",
  } as const;

  const css = `
    :root {
      --bg-primary: #E2E2E2;
      --bg-dark: #0E0E0E;
      --bg-white: #FFFFFF;
      --accent: #E85D1F;
      --text-dark: #111111;
      --text-light: #F5F5F5;
      --text: var(--text-dark);
      --muted-text: rgba(17, 17, 17, 0.66);
      --surface: rgba(17, 17, 17, 0.06);
      --border-color: rgba(17, 17, 17, 0.18);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; color-scheme: dark; }
    body { background: var(--bg-primary); color: var(--text-dark); }
    body, button, input, textarea, select { font-family: 'DM Sans', system-ui, sans-serif; }
    body { text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    h1, h2, h3, h4, h5, h6 { font-family: 'DM Serif Display', Georgia, serif; font-weight: 400; }
    ::selection { background: rgba(232, 93, 31, 0.25); color: var(--text-light); }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg-dark); }
    ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 999px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--accent); }

    .fade-in {
      opacity: 1;
      transform: none;
      transition: none;
    }

    .nav-link {
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: rgba(17, 17, 17, 0.66);
      text-decoration: none;
      text-transform: capitalize;
      transition: color 0.2s ease;
      padding: 4px 0;
      position: relative;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1px;
      background: var(--accent);
      transition: width 0.25s ease;
    }
    .nav-link:hover { color: var(--text-dark); }
    .nav-link:hover::after { width: 100%; }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 50px;
      padding: 0 30px;
      background: var(--accent);
      color: #111111;
      font-weight: 600;
      font-size: 0.86rem;
      letter-spacing: 0.04em;
      border-radius: 999px;
      text-decoration: none;
      transition: transform 0.15s ease, background 0.2s ease;
      border: 1px solid rgba(255,122,31,0.3);
      cursor: pointer;
    }
    .btn-primary:hover { background: var(--accent); transform: translateY(-1px); }

    .btn-ghost {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 50px;
      padding: 0 30px;
      background: var(--surface);
      color: var(--text);
      font-weight: 500;
      font-size: 0.86rem;
      letter-spacing: 0.03em;
      border-radius: 999px;
      text-decoration: none;
      border: 1px solid var(--border-color);
      transition: border-color 0.2s ease, color 0.2s ease;
      cursor: pointer;
    }
    .btn-ghost:hover { border-color: var(--accent); color: var(--accent); background: var(--surface); }

    .card {
      background: var(--surface);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      transition: border-color 0.2s ease;
    }
    .card:hover { border-color: rgba(255,122,31,0.28); }

    .social-icon {
      color: var(--muted-text);
      transition: color 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .social-icon:hover { color: var(--accent); }

    .skills-grid {
      margin-top: 58px;
      display: grid;
      grid-template-columns: 1.18fr 0.82fr 1fr;
      gap: 18px;
      align-items: start;
    }

    .skills-poster {
      border: 1px solid rgba(17, 17, 17, 0.22);
      border-radius: 8px;
      padding: 20px 22px 18px;
      box-shadow: none;
      transition: border-color 0.2s ease;
    }

    .skills-poster--backend {
      background: var(--bg-primary);
      color: var(--text-dark);
    }
    .skills-poster--databases {
      background: rgba(232, 93, 31, 0.14);
      color: var(--text-dark);
    }
    .skills-poster--observability {
      background: var(--accent);
      color: var(--text-light);
    }
    .skills-poster--frontend {
      background: rgba(237, 235, 230, 0.78);
      color: var(--text-dark);
      border-color: rgba(17, 17, 17, 0.28);
      box-shadow: none;
    }

    .skills-poster--backend .skills-poster-title {
      font-size: 0.96rem;
      letter-spacing: 0.14em;
    }

    .skills-poster-title {
      font-size: 0.88rem;
      font-weight: 800;
      letter-spacing: 0.13em;
      text-transform: uppercase;
      margin-bottom: 14px;
      line-height: 1.1;
    }

    .skills-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .skills-item {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      font-size: 0.93rem;
      line-height: 1.45;
      font-weight: 500;
    }

    .skills-poster--frontend .skills-item {
      font-size: 0.87rem;
      line-height: 1.4;
      font-weight: 500;
    }

    .skills-dot {
      width: 6px;
      height: 6px;
      border-radius: 1px;
      background: currentColor;
      flex-shrink: 0;
      margin-top: 7px;
    }
    .skills-poster--databases .skills-dot {
      border-radius: 999px;
    }
    .skills-poster--observability .skills-dot {
      width: 7px;
      height: 2px;
      border-radius: 0;
      margin-top: 10px;
      background: rgba(255, 243, 234, 0.9);
    }
    .skills-poster--frontend .skills-dot {
      width: 5px;
      height: 5px;
      border-radius: 999px;
      opacity: 0.78;
    }

    .languages-editorial {
      margin-top: 70px;
      max-width: 560px;
      display: flex;
      flex-direction: column;
      gap: 9px;
      padding-left: 2px;
    }

    .languages-heading {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 6px;
    }

    .language-line {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding: 1px 0;
    }

    .language-label {
      font-size: 0.8rem;
      color: var(--text);
      line-height: 1.3;
      letter-spacing: 0.01em;
    }

    .language-sep {
      opacity: 0.7;
      margin: 0 3px;
    }

    .language-proficiency {
      font-size: 0.67rem;
      text-transform: uppercase;
      letter-spacing: 0.09em;
      color: var(--muted-text);
      font-weight: 600;
    }

    .language-bar-track {
      display: block;
      height: 3px;
      width: 100%;
      max-width: 500px;
      margin-left: 2px;
      background: rgba(245, 245, 245, 0.2);
      overflow: hidden;
    }

    .language-bar-fill {
      display: block;
      height: 100%;
      background: var(--accent);
      box-shadow: none;
    }

    .hobby-card {
      position: relative;
      overflow: hidden;
      border-radius: 14px;
      border: 1px solid var(--border-color);
      aspect-ratio: 1;
      background: var(--surface);
      transition: border-color 0.2s ease;
    }
    .hobby-card:hover { border-color: rgba(255,122,31,0.35); }
    .hobby-card:hover img { transform: scale(1.02); }
    .hobby-card img { transition: transform 0.25s ease; width: 100%; height: 100%; object-fit: cover; }
    .hobby-label {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 34px 16px 14px;
      background: rgba(14, 14, 14, 0.74);
      font-weight: 500;
      font-size: 0.95rem;
      color: var(--text-light);
    }

    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-primary);
      color: var(--text-dark);
    }

    .hero-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 64px;
    }

    .hero-kicker {
      font-size: 0.7rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-weight: 700;
      color: rgba(17, 17, 17, 0.72);
      line-height: 1.5;
    }

    .hero-kicker span + span::before {
      content: ' • ';
      opacity: 0.65;
    }

    .hero-heading-wrap {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 24px;
      align-items: flex-start;
    }

    .heading {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: clamp(3rem, 7vw, 6rem);
      font-weight: 400;
      line-height: 1.02;
      color: var(--accent);
      letter-spacing: 0;
      margin: 0;
      white-space: nowrap;
    }

    .hero-avatar {
      position: relative;
      width: min(220px, 26vw);
      max-width: 220px;
      height: auto;
      opacity: 0.95;
      flex-shrink: 0;
    }

    .hero-scroll-indicator {
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 600;
      color: rgba(17, 17, 17, 0.68);
      align-self: flex-start;
    }

    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
      background: var(--bg-dark);
      color: var(--text-light);
    }

    .about-content {
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      padding: 80px 24px;
      display: grid;
      gap: 24px;
      --text: var(--text-light);
      --muted-text: rgba(245, 245, 245, 0.78);
      --surface: rgba(245, 245, 245, 0.08);
      --border-color: rgba(245, 245, 245, 0.18);
    }

    .about-content .fade-in {
      max-width: 100% !important;
    }

    .about-content p {
      color: var(--muted-text) !important;
      line-height: 1.82;
    }

    .about-headline-line {
      color: var(--text) !important;
      font-family: 'DM Serif Display', Georgia, serif;
    }

    .about-headline-line--underlined {
      position: relative;
      display: inline-block;
      padding-bottom: 6px;
    }

    .about-headline-line--underlined::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 1px;
      height: 3px;
      background: rgba(232, 93, 31, 0.58);
      opacity: 0.7;
    }

    .section {
      max-width: 1200px;
      margin: 0 auto;
      padding: clamp(72px, 10vw, 112px) 24px;
      position: relative;
      z-index: 0;
      --text: var(--text-dark);
      --muted-text: rgba(17, 17, 17, 0.66);
      --surface: rgba(17, 17, 17, 0.06);
      --border-color: rgba(17, 17, 17, 0.18);
    }

    .section-dark {
      color: var(--text-light);
      --text: var(--text-light);
      --muted-text: rgba(245, 245, 245, 0.72);
      --surface: rgba(245, 245, 245, 0.08);
      --border-color: rgba(245, 245, 245, 0.16);
    }

    .section-silver {
      color: var(--text-dark);
    }

    .section-white {
      color: var(--text-dark);
    }

    .section-dark::before,
    .section-silver::before,
    .section-white::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: calc((100vw - 100%) / -2);
      right: calc((100vw - 100%) / -2);
      z-index: -1;
    }

    .section-dark::before { background: var(--bg-dark); }
    .section-silver::before { background: var(--bg-primary); }
    .section-white::before { background: var(--bg-white); }


    .stack-surface {
      perspective: none;
    }
    .floating-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .floating-card {
      border-radius: 14px;
      background: var(--surface);
      border: 1px solid var(--border-color);
      transition: border-color 0.2s ease;
      position: relative;
      overflow: hidden;
    }
    .floating-card::before {
      content: none;
    }
    .floating-card:hover {
      border-color: rgba(232, 93, 31, 0.38);
    }

    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .show-mobile { display: flex !important; }
      .btn-primary, .btn-ghost { width: 100%; }
      .nav-link { font-size: 0.92rem; }
      .hero-content {
        flex-direction: column;
        justify-content: center;
        gap: 24px;
        padding: 72px 24px 56px;
      }
      .hero-heading-wrap {
        align-items: center;
        text-align: center;
      }
      .hero-avatar {
        width: min(180px, 48vw);
      }
      .about {
        min-height: auto;
      }
      .about-content {
        padding: 64px 24px;
      }
      .skills-grid {
        grid-template-columns: 1fr;
        gap: 14px;
        margin-top: 42px;
      }
      .skills-poster {
        transform: none !important;
        box-shadow: none;
      }
      .languages-editorial {
        margin-top: 46px;
        max-width: 100%;
        gap: 8px;
      }
      .language-line {
        gap: 3px;
        padding: 2px 0;
      }
      .language-bar-track {
        max-width: 100%;
      }
      .floating-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .floating-card {
        margin-top: 0 !important;
      }
    }
    @media (min-width: 769px) {
      .show-mobile { display: none !important; }
    }
  `;

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
      emphasis: "strong",
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
      emphasis: "strong",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"],
    },
    {
      key: "observability",
      title: "Observability & DevOps",
      emphasis: "strong",
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
      emphasis: "lite",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
  ] as const;

  const languages = [
    { name: "English", level: "Native", barWidth: "100%" },
    { name: "Hindi", level: "Fluent", barWidth: "92%" },
    { name: "Telugu", level: "Intermediate", barWidth: "73%" },
    { name: "Kannada", level: "Intermediate", barWidth: "58%" },
    { name: "French", level: "Basic", barWidth: "32%" },
    // { name: "Tamil", level: "Just Started", barWidth: "18%" },
  ] as const;

  const projects = [
    {
      name: "Reference Hallucination Detector",
      emoji: "📚",
      description:
        "Research-grade pipeline for citation-grounded trust verification in academic text using NLP, reference extraction, and claim-to-source consistency checks.",
      stack: ["NLP", "Reference Verification", "Python"],
      github: null,
    },
    {
      name: "archAIc",
      emoji: "🛡️",
      description:
        "AI-driven reliability engineering platform with 6 FastAPI microservices, OpenTelemetry trace propagation, and chaos controls for failure injection.",
      stack: ["FastAPI", "Prometheus/Grafana", "Kubernetes", "Next.js"],
      github: null,
    },
    {
      name: "Scotland Yard",
      emoji: "🎮",
      description:
        "Real-time multiplayer backend for a digital Scotland Yard board game. 200-node graph-based map, 6-team lobbies, turn-based asymmetric gameplay.",
      stack: ["Node.js", "Express", "PostgreSQL", "Redis"],
      github: "https://github.com/Ad1th/Gravitas-Backend-25-Complete",
      badge: "100+ Users",
    },
    {
      name: "BlindSpot",
      emoji: "👁️",
      description:
        "Edge integration and deployment of a spatio-temporal assistive device for the visually impaired. YOLOv8-seg and CNN-LSTM on Raspberry Pi 5 with LLM-powered audio narration.",
      stack: ["Raspberry Pi", "YOLOv8", "CNN-LSTM", "Edge AI"],
      github: null,
    },
    {
      name: "Argus",
      emoji: "🧠",
      description:
        "SQL analytics workspace where users upload CSV files, run SQL commands, inspect detailed query plans, and explore operator-level execution graphs.",
      stack: ["FastAPI", "React + TypeScript", "DuckDB", "ReactFlow"],
      github: null,
    },
    {
      name: "OWC Wave Energy Harvester",
      emoji: "🌊",
      description:
        "Adapted point-source oscillator circuitry for Oscillating Water Column energy harvesting with ACS712 current sensors and voltage dividers.",
      stack: ["ACS712", "Power Electronics", "Signal Conditioning"],
      github: null,
    },
    {
      name: "Point Wave Energy Harvester",
      emoji: "⚡",
      description:
        "Power conditioning circuitry for buoy-based wave energy harvesting. Full-wave rectifier, DC-DC boost converter, MPPT algorithm, IoT telemetry via ESP8266.",
      stack: ["Op-AMP 741", "Boost Converter", "Arduino", "ESP8266"],
      github: null,
    },
    {
      name: "Cloudify",
      emoji: "☁️",
      description:
        "Cloud storage platform inspired by Google Drive with secure uploads, structured folder organization, and AI-driven search and data insights.",
      stack: ["PostgreSQL", "Express.js", "Vercel"],
      github: "https://github.com/Ad1th/file-mgmt",
    },
    {
      name: "CropLink",
      emoji: "🌾",
      description:
        "Farm-to-labourer SMS application enabling direct communication between farmers and labourers, with crop data tailored to farm, soil type, and climate.",
      stack: ["PostgreSQL/Supabase", "Gemini API", "Twilio SMS"],
      github: null,
    },
    {
      name: "Threddit",
      emoji: "🧩",
      description:
        "Productivity Chrome extension analyzing web usage and delivering personalized nudges. Saved users 36–48 minutes daily by reducing distractions.",
      stack: ["React", "FastAPI", "Gemini API", "Chrome Extensions"],
      github: "https://github.com/Ad1th/3braincells_DevJams-24",
    },
    {
      name: "EchoChamber",
      emoji: "💬",
      description:
        "Anonymous forum web app enabling users to post confessions, chat, and share thoughts freely, with Supabase real-time data handling.",
      stack: ["HTML/CSS/JS", "PostgreSQL", "Supabase"],
      github: "https://github.com/Ad1th/EchoChamber",
    },
    {
      name: "SevaVerse",
      emoji: "🤝",
      description:
        "Platform connecting NGOs, volunteers, and well-wishers to streamline child welfare initiatives with task management and dashboards.",
      stack: ["Node.js", "Prisma + SQLite", "Tailwind CSS"],
      github: "https://github.com/Ad1th/SevaVerse",
    },
    {
      name: "EcoSync",
      emoji: "🌱",
      description:
        "Smart sustainability solutions for logistics and energy, built in a 2-day hackathon with Supabase backend and Python FastAPI.",
      stack: ["Supabase", "FastAPI", "HTML/CSS/JS"],
      github: "https://github.com/Ad1th/OptiSync",
    },
    {
      name: "HOSPITECH",
      emoji: "🏥",
      description:
        "Lightweight clinic management system to digitize patient records, appointments, and doctor profiles with secure admin/doctor logins.",
      stack: ["Python", "SQL/MySQL", "Tkinter"],
      github: "https://github.com/Ad1th/Hospitech--Hospital-Management-System",
    },
    {
      name: "Snek",
      emoji: "🐍",
      description:
        "Retro-style snake game with clean UI, menu screen, and dynamic difficulty. First project from grade 12.",
      stack: ["Python", "Pygame"],
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
        "Recieved a certification in Python programming from HackerRank.",
    },
    {
      title: "SQL Basic Skill Certification",
      year: "2025",
      description: "Received a certification in SQL (Basic) from HackerRank.",
    },
    {
      title: "SQL Intermeddiate Skill certification",
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
      name: "Women Techies'26 - Finalist - Top 10 Teams",
      when: "March 2026 • VIT Vellore, India",
      desc: "Reached finalist stage as a part of the top 10 teams at Women Techies'26 by building AetherQuery, a SQL analytics platform with CSV upload, SQL execution, and detailed query-plan visualization for interactive analysis.",
    },
    {
      name: "TechSolstice",
      when: "March 2026 • MIT Bangalore, India",
      desc: "Built archAIc, an AI-driven reliability engineering platform with microservices observability, chaos injection, and automated incident analysis workflows for resilient production-system testing.",
    },
    {
      name: "Code 2 Create (C2C) - AI solutions Track Winner",
      when: "September 2025 • VIT Vellore, India",
      desc: "Built a blind assistance tool which uses image recognition to analyze surroundings and provide real-time feedback to visually impaired users via audio in their local dialect.",
    },
    {
      name: "Women Techies'25",
      when: "April 2025 • VIT Vellore, India",
      desc: "Built SevaVerse at Women Techies'25 – a collaborative platform connecting NGOs, volunteers, and well-wishers to streamline child welfare initiatives.",
    },
    {
      name: "Yantra Central Hack",
      when: "January 2025 • VIT Vellore, India",
      desc: "Built OptiSync at Yantra Central Hack – a sustainability platform tailored for the textile industry.",
    },
    {
      name: "DevJams",
      when: "September 2024 • VIT Vellore, India",
      desc: "Built Therddit at DevJams – a smart Chrome extension that uses the Gemini API to analyze browsing patterns and deliver AI-powered nudges.",
    },
    {
      name: "CodeWars",
      when: "February 2024 • NPS KRM, Blr, India",
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

  const projectImages: Partial<
    Record<(typeof projects)[number]["name"], string>
  > = {
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

  const heroKickerItems = [
    skillGroups[0].title,
    experience[2].skills[0],
    experience[2].skills[1],
    experience[2].skills[2],
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <nav
        style={{
          position: "relative",
          zIndex: 50,
          background: "var(--bg-primary)",
          borderBottom: "1px solid rgba(17, 17, 17, 0.12)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="#hero"
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "1.2rem",
              color: "var(--text)",
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            Adith<span style={{ color: "var(--accent)" }}>.</span>
          </Link>

          <div
            className="hide-mobile"
            style={{ display: "flex", gap: "28px", alignItems: "center" }}
          >
            {navLinks.map((item) => (
              <a key={item} href={`#${item}`} className="nav-link">
                {item}
              </a>
            ))}
          </div>

          <button
            className="show-mobile"
            onClick={() => setMobileOpen((value) => !value)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text)",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div
            style={{
              background: "var(--surface)",
              borderTop: "1px solid var(--border-color)",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
                style={{ fontSize: "0.95rem" }}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      <section id="hero" className="hero">
        <div className="hero-content">
          <div className="hero-heading-wrap">
            <div className="hero-kicker">
              {heroKickerItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <h1 className="heading">Hey, I&apos;m Adith</h1>
          </div>
          <Image
            src="/robot-avatar.svg"
            alt="Robot avatar"
            width={320}
            height={320}
            className="hero-avatar"
            priority
          />
        </div>
      </section>

      <section id="about" className="about">
        <div className="about-content">
          <div className="fade-in" style={{ maxWidth: "680px" }}>
            <SectionLabel>About</SectionLabel>
            <SectionTitle
              style={{
                fontSize: "clamp(2.65rem, 5vw, 4rem)",
                lineHeight: 1.08,
              }}
            >
              <span className="about-headline-line">
                I like building things,
              </span>
              <br />
              <span className="about-headline-line about-headline-line--underlined">
                breaking them, then fixing them again.
              </span>
            </SectionTitle>
          </div>
          <div
            className="fade-in"
            style={{
              marginTop: "40px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
              maxWidth: "900px",
            }}
          >
            {[
              "I'm a CSE student who enjoys backend-heavy projects that feel real: multiplayer games with actual users, AI tools that do something useful, anonymous forums, productivity extensions, and apps that bridge gaps outside the screen (like farmers texting labourers directly).",
              "Sometimes I dip into hardware to keep myself honest — running edge ML on Raspberry Pi for assistive tech, or wiring up wave energy experiments with sensors and telemetry. Turns out when latency, power limits, and physics fight back, your software design improves fast.",
              "Mostly, I care about shipping systems that run, scale, and survive real usage. Buzzwords don't interest me much, but behaviour does.",
            ].map((para, index) => (
              <p
                key={index}
                style={{
                  fontSize: "0.98rem",
                  color: index === 2 ? "var(--muted-text)" : "var(--text)",
                  lineHeight: 1.82,
                  fontStyle: index === 2 ? "italic" : "normal",
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section section-silver">
        <div className="fade-in">
          <SectionLabel>Experience</SectionLabel>
          <SectionTitle>Where I've worked</SectionTitle>
        </div>
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {experience.map((job, index) => (
            <div
              key={index}
              className="card fade-in"
              style={{
                padding: "28px 32px",
                background: experienceColors.cardBg,
                border: `1px solid ${experienceColors.cardBorder}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: job.description ? "12px" : "0",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: experienceColors.heading,
                      marginBottom: "4px",
                    }}
                  >
                    {job.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: experienceColors.secondary,
                      fontWeight: 500,
                    }}
                  >
                    {job.company}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: experienceColors.tertiary,
                    background: experienceColors.badgeBg,
                    border: `1px solid ${experienceColors.badgeBorder}`,
                    borderRadius: "999px",
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
                    fontSize: "0.88rem",
                    color: experienceColors.secondary,
                    lineHeight: 1.65,
                    marginBottom: "12px",
                  }}
                >
                  {job.description}
                </p>
              )}
              {job.skills.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "4px 11px",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        letterSpacing: "0.03em",
                        borderRadius: "999px",
                        background: experienceColors.tagBg,
                        border: `1px solid ${experienceColors.tagBorder}`,
                        color: experienceColors.tertiary,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="section section-white">
        <div className="fade-in">
          <SectionLabel>Skills</SectionLabel>
          <SectionTitle>What I work with</SectionTitle>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <div
              key={index}
              className={`skills-poster skills-poster--${group.key} fade-in`}
              style={{
                gridColumn:
                  index === 0
                    ? "1 / span 2"
                    : index === 1
                      ? "3 / span 1"
                      : index === 2
                        ? "2 / span 2"
                        : "1 / span 1",
                marginTop:
                  index === 1
                    ? "14px"
                    : index === 2
                      ? "8px"
                      : index === 3
                        ? "-18px"
                        : "0px",
              }}
            >
              <h3 className="skills-poster-title">{group.title}</h3>
              <ul className="skills-list">
                {group.skills.map((skill) => (
                  <li key={skill} className="skills-item">
                    <span className="skills-dot" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="languages-editorial fade-in">
          <h3 className="languages-heading">Languages</h3>
          {languages.map((lang) => (
            <div key={lang.name} className="language-line">
              <p className="language-label">
                <span>{lang.name}</span>
                <span className="language-sep">-</span>
                <span className="language-proficiency">{lang.level}</span>
              </p>
              <span className="language-bar-track" aria-hidden="true">
                <span
                  className="language-bar-fill"
                  style={{ width: lang.barWidth }}
                />
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="section section-silver">
        <div className="fade-in">
          <SectionLabel>Projects</SectionLabel>
          <SectionTitle>Built and shipped</SectionTitle>
        </div>
        <div
          style={{
            marginTop: "48px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "16px",
          }}
        >
          {projects.map((project) => {
            const imageSrc = projectImages[project.name];
            return (
              <div
                key={project.name}
                className="card fade-in"
                style={{
                  padding: "0",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "360px",
                }}
              >
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={project.name}
                    width={720}
                    height={420}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderBottom: "1px solid var(--border-color)",
                    }}
                  />
                )}
                <div
                  style={{
                    padding: "20px 22px 22px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ fontSize: "1.1rem" }}>
                        {project.emoji}
                      </span>
                      <h3
                        style={{
                          fontSize: "0.98rem",
                          fontWeight: 600,
                          color: "var(--text)",
                        }}
                      >
                        {project.name}
                      </h3>
                    </div>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="social-icon"
                        aria-label={`GitHub - ${project.name}`}
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>

                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--muted-text)",
                      lineHeight: 1.65,
                      flex: 1,
                    }}
                  >
                    {project.description}
                  </p>

                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                  >
                    {project.stack.map((item) => (
                      <Tag key={item} label={item} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="patents" className="section section-white">
        <div className="fade-in">
          <SectionLabel>Patents</SectionLabel>
          <SectionTitle>Intellectual property</SectionTitle>
        </div>
        <div
          style={{
            marginTop: "48px",
            display: "grid",
            gap: "16px",
          }}
        >
          {patents.map((patent) => (
            <div
              key={`${patent.title}-${patent.status}`}
              className="card fade-in"
              style={{ padding: "26px 28px" }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "14px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    lineHeight: 1.4,
                    maxWidth: "52rem",
                  }}
                >
                  {patent.title}
                </h3>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--text-dark)",
                    background: "rgba(232, 93, 31, 0.18)",
                    border: "1px solid rgba(17, 17, 17, 0.2)",
                    borderRadius: "999px",
                    padding: "4px 12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {patent.status}
                </span>
              </div>
              {(patent.appNo || patent.filed || patent.published) && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "14px",
                  }}
                >
                  {patent.appNo && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        border: "1px solid rgba(17, 17, 17, 0.2)",
                        background: "rgba(232, 93, 31, 0.12)",
                        borderRadius: "999px",
                        padding: "4px 12px",
                        fontSize: "0.88rem",
                        color: "var(--text-dark)",
                      }}
                    >
                      App No: {patent.appNo}
                    </span>
                  )}
                  {patent.filed && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        border: "1px solid rgba(17, 17, 17, 0.2)",
                        background: "rgba(232, 93, 31, 0.12)",
                        borderRadius: "999px",
                        padding: "4px 12px",
                        fontSize: "0.88rem",
                        color: "var(--text-dark)",
                      }}
                    >
                      Filed: {patent.filed}
                    </span>
                  )}
                  {patent.published && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        border: "1px solid rgba(17, 17, 17, 0.2)",
                        background: "rgba(232, 93, 31, 0.12)",
                        borderRadius: "999px",
                        padding: "4px 12px",
                        fontSize: "0.88rem",
                        color: "var(--text-dark)",
                      }}
                    >
                      Published: {patent.published}
                    </span>
                  )}
                </div>
              )}
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--muted-text)",
                  lineHeight: 1.7,
                }}
              >
                {patent.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="achievements" className="section section-dark">
        <div className="fade-in">
          <SectionLabel>Achievements</SectionLabel>
          <SectionTitle>Certifications &amp; awards</SectionTitle>
        </div>
        <div
          style={{
            marginTop: "48px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="card fade-in"
              style={{ padding: "24px 26px", display: "flex", gap: "16px" }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(255,122,31,0.1)",
                  border: "1px solid rgba(255,122,31,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Award size={18} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: "4px",
                    lineHeight: 1.4,
                  }}
                >
                  {achievement.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--accent)",
                    marginBottom: "8px",
                  }}
                >
                  {achievement.year}
                </p>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--muted-text)",
                    lineHeight: 1.6,
                  }}
                >
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="hackathons" className="section section-silver">
        <div className="fade-in">
          <SectionLabel>Hackathons</SectionLabel>
          <SectionTitle>Live sprint stack</SectionTitle>
        </div>
        <div className="stack-surface" style={{ marginTop: "48px" }}>
          <div className="floating-grid">
            {hackathons.map((hackathon, index) => (
              <div key={index} className="floating-card fade-in">
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "24px 28px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--text)",
                      }}
                    >
                      <span style={{ marginRight: "8px" }}>🏁</span>
                      {hackathon.name}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                      <Tag label="Hackathon" />
                      <span
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--muted-text)",
                        }}
                      >
                        {hackathon.when}
                      </span>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--muted-text)",
                      lineHeight: 1.65,
                    }}
                  >
                    {hackathon.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="hobbies" className="section section-white">
        <div className="fade-in">
          <SectionLabel>Hobbies</SectionLabel>
          <SectionTitle>Beyond the screen</SectionTitle>
        </div>
        <div
          style={{
            marginTop: "48px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "12px",
          }}
        >
          {hobbies.map((hobby) => (
            <div key={hobby} className="hobby-card fade-in">
              <Image
                src={`/${hobby.toLowerCase()}.png`}
                alt={hobby}
                width={300}
                height={300}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="hobby-label">{hobby}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section section-dark">
        <div className="fade-in" style={{ maxWidth: "560px" }}>
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>Let's connect</SectionTitle>
          <p
            style={{
              marginTop: "20px",
              marginBottom: "40px",
              color: "var(--muted-text)",
              fontSize: "0.98rem",
              lineHeight: 1.75,
            }}
          >
            Always open to new opportunities and conversations — whether it's an
            interesting problem to solve, a collaboration, or just a chat about
            systems that break in interesting ways.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="mailto:adith2505@outlook.com" className="btn-primary">
              <Mail size={16} /> adith2505@outlook.com
            </a>
            <a
              href="https://github.com/Ad1th"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/adith-manikonda/"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid var(--border-color)",
          padding: "32px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "0.82rem", color: "var(--muted-text)" }}>
            Designed &amp; built by{" "}
            <span style={{ color: "var(--accent)" }}>Adith Manikonda</span>
          </p>
          <p style={{ fontSize: "0.78rem", color: "var(--muted-text)" }}>
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </div>
      </footer>
    </>
  );
}
