"use client";

import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Award,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ─── Scroll-into-view fade hook ──────────────────────────────────────────────
function useFadeIn() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Tiny components ─────────────────────────────────────────────────────────
function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 10px",
        fontSize: "0.72rem",
        fontWeight: 500,
        letterSpacing: "0.02em",
        borderRadius: "4px",
        background: "rgba(255,122,31,0.08)",
        border: "1px solid rgba(255,122,31,0.18)",
        color: "#FF7A1F",
      }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#FF7A1F",
        marginBottom: "16px",
      }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: "clamp(2rem, 4vw, 2.8rem)",
        fontWeight: 400,
        color: "#E5E5E5",
        lineHeight: 1.15,
        marginBottom: "0",
      }}
    >
      {children}
    </h2>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: "100%",
        height: "1px",
        background: "#333333",
        margin: "0",
      }}
    />
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Portfolio() {
  useFadeIn();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #111111; color: #E5E5E5; font-family: 'DM Sans', system-ui, sans-serif; }
    ::selection { background: rgba(255,122,31,0.25); color: #E5E5E5; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #111111; }
    ::-webkit-scrollbar-thumb { background: #333333; border-radius: 2px; }
    ::-webkit-scrollbar-thumb:hover { background: #FF7A1F; }

    .fade-in {
      opacity: 0;
      transform: translateY(18px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .nav-link {
      font-size: 0.82rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      color: #A0A0A0;
      text-decoration: none;
      text-transform: capitalize;
      transition: color 0.2s ease;
      padding: 4px 0;
      position: relative;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 0; height: 1px;
      background: #FF7A1F;
      transition: width 0.25s ease;
    }
    .nav-link:hover { color: #E5E5E5; }
    .nav-link:hover::after { width: 100%; }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 28px;
      background: #FF7A1F;
      color: #111111;
      font-weight: 600;
      font-size: 0.85rem;
      letter-spacing: 0.03em;
      border-radius: 6px;
      text-decoration: none;
      transition: background 0.2s ease, transform 0.15s ease;
      border: none;
      cursor: pointer;
    }
    .btn-primary:hover { background: #e86c10; transform: translateY(-1px); }

    .btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 28px;
      background: transparent;
      color: #E5E5E5;
      font-weight: 500;
      font-size: 0.85rem;
      letter-spacing: 0.03em;
      border-radius: 6px;
      text-decoration: none;
      border: 1px solid #333333;
      transition: border-color 0.2s ease, color 0.2s ease;
      cursor: pointer;
    }
    .btn-ghost:hover { border-color: #FF7A1F; color: #FF7A1F; }

    .card {
      background: #1A1A1A;
      border: 1px solid #333333;
      border-radius: 10px;
      transition: border-color 0.2s ease;
    }
    .card:hover { border-color: rgba(255,122,31,0.35); }

    .social-icon {
      color: #A0A0A0;
      transition: color 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .social-icon:hover { color: #FF7A1F; }

    .skill-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #FF7A1F;
      flex-shrink: 0;
      margin-top: 7px;
    }

    .lang-bar-fill {
      height: 3px;
      border-radius: 2px;
      background: #FF7A1F;
    }
    .lang-bar-empty {
      height: 3px;
      border-radius: 2px;
      background: #333333;
    }

    .hobby-card {
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      border: 1px solid #333333;
      aspect-ratio: 1;
      background: #1A1A1A;
      transition: border-color 0.2s ease;
    }
    .hobby-card:hover { border-color: rgba(255,122,31,0.35); }
    .hobby-card:hover img { transform: scale(1.06); }
    .hobby-card img { transition: transform 0.4s ease; width: 100%; height: 100%; object-fit: cover; }
    .hobby-label {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      padding: 28px 16px 14px;
      background: linear-gradient(to top, rgba(17,17,17,0.85) 0%, transparent 100%);
      font-weight: 500;
      font-size: 0.95rem;
      color: #E5E5E5;
    }

    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .show-mobile { display: flex !important; }
    }
    @media (min-width: 769px) {
      .show-mobile { display: none !important; }
    }
  `;

  // ─── DATA ────────────────────────────────────────────────────────────────
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
      title: "Systems & Backend",
      skills: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "Prisma",
        "JWT",
        "REST",
        "Docker",
      ],
    },
    {
      title: "Data & Research",
      skills: [
        "Query Plan Analysis",
        "EXPLAIN/ANALYZE",
        "GROBID",
        "ETL Pipelines",
        "Similarity Scoring",
      ],
    },
    {
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "AI & Edge",
      skills: ["YOLOv8", "CNN-LSTM", "Raspberry Pi", "FastAPI", "Gemini API"],
    },
    {
      title: "DevOps",
      skills: ["Azure", "CI/CD", "Load Testing", "Production Debugging"],
    },
  ];

  const languages = [
    { name: "English", level: "Native", p: 5 },
    { name: "Hindi", level: "Fluent", p: 4 },
    { name: "Telugu", level: "Intermediate", p: 3 },
    { name: "Kannada", level: "Intermediate", p: 3 },
    { name: "French", level: "Basic", p: 2 },
  ];

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
        "Platform connecting NGOs, volunteers, and donors to enhance child welfare with task management and dashboards.",
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
      title: "AI Solutions Track Winner – Code 2 Create (C2C) Hackathon",
      year: "2025",
      description:
        "Won the AI solutions track at VIT Vellore, organized by ACM, by building a blind assistance tool using image recognition and Raspberry Pi for real-time audio feedback.",
    },
    {
      title: "Cent Percent Attendance – VIT (2024–25)",
      year: "2024–25",
      description:
        "Awarded Certificate of Appreciation for 100% attendance in B.Tech. Computer Science and Engineering (Information Security).",
    },
    {
      title: "First Place – CodeWars Hackathon",
      year: "2024",
      description: "Won CodeWars hackathon conducted by NPS KRM.",
    },
    {
      title: "Second Place – PC Building Competition",
      year: "2023",
      description:
        "Second place in a competitive PC building event hosted by NPS HSR.",
    },
    {
      title: "OCI Foundations Certification",
      year: "2025",
      description:
        "Oracle Cloud Infrastructure Foundations certification demonstrating foundational knowledge of OCI services and cloud concepts.",
    },
    {
      title: "Python Certification – HackerRank",
      year: "2025",
      description: "Python programming certification from HackerRank.",
    },
    {
      title: "SQL Basic + Intermediate – HackerRank",
      year: "2025",
      description:
        "Certifications in SQL Basic and SQL Intermediate from HackerRank.",
    },
    {
      title: "AI Builder & Power Apps – Coursera",
      year: "2020",
      description:
        "Certificate of Completion for using AI Builder and Power Apps to process invoice data.",
    },
  ];

  const hackathons = [
    {
      name: "Women Techies '26 – Finalist, Top 10 Teams",
      when: "March 2026 · VIT Vellore",
      desc: "Reached finalist stage by building AetherQuery, a SQL analytics platform with CSV upload, SQL execution, and detailed query-plan visualization.",
      tags: [],
    },
    {
      name: "Code 2 Create (C2C) – AI Track Winner",
      when: "Feb 2026 · VIT Vellore",
      desc: "Won the AI solutions track by building BlindSpot, an assistive device for the visually impaired using Raspberry Pi and YOLOv8 with LLM-powered audio narration.",
      tags: ["Winner"],
    },
    {
      name: "HackVita 4.0 – Top 10 Teams",
      when: "Jan 2026 · VIT Vellore",
      desc: "Built a comprehensive healthcare solution in the top 10 teams.",
      tags: [],
    },
    {
      name: "Gravitas – Top 6 Teams",
      when: "Nov 2025 · VIT Vellore",
      desc: "Built Scotland Yard, a real-time multiplayer digital board game backend with 200-node graph-based map and asymmetric gameplay.",
      tags: [],
    },
    {
      name: "Hack The Verse 3.0 – Top 5 Teams",
      when: "Oct 2025 · VIT Vellore",
      desc: "Top 5 finish building a full-stack platform under 24 hours.",
      tags: [],
    },
    {
      name: "DevJams – Participant",
      when: "Sep 2024 · VIT Vellore",
      desc: "Built Threddit – a smart Chrome extension using Gemini API to analyze browsing patterns and deliver AI-powered productivity nudges.",
      tags: [],
    },
    {
      name: "CodeWars – First Place",
      when: "Feb 2024 · NPS KRM, Bangalore",
      desc: "Won first place.",
      tags: ["Winner"],
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

  // ─── RENDER ──────────────────────────────────────────────────────────────
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ── NAV ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled ? "rgba(17,17,17,0.95)" : "#111111",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid #333333"
            : "1px solid transparent",
          transition: "all 0.3s ease",
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
            href="#"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.2rem",
              color: "#E5E5E5",
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            Adith<span style={{ color: "#FF7A1F" }}>.</span>
          </Link>

          {/* Desktop nav */}
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

          {/* Mobile hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              color: "#E5E5E5",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            style={{
              background: "#1A1A1A",
              borderTop: "1px solid #333333",
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

      {/* ── HERO ── */}
      <section
        id="hero"
        style={{
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          alignItems: "center",
          padding: "80px 24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ maxWidth: "720px" }}>
          <SectionLabel>Engineering Student · VIT Vellore</SectionLabel>
          <h1
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              color: "#E5E5E5",
              marginBottom: "28px",
            }}
          >
            Hi, I'm <span style={{ color: "#FF7A1F" }}>Adith Manikonda</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "#A0A0A0",
              lineHeight: 1.7,
              maxWidth: "580px",
              marginBottom: "16px",
            }}
          >
            Software Developer &amp; Engineering Freshman. I build backend-heavy
            systems — multiplayer games, AI tools, edge ML devices, and apps
            that solve real problems.
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#A0A0A0",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "44px",
            }}
          >
            <MapPin size={14} style={{ color: "#FF7A1F" }} />
            VIT, Vellore, India
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "48px",
            }}
          >
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#about" className="btn-ghost">
              About Me
            </a>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <a
              href="https://github.com/Ad1th"
              target="_blank"
              className="social-icon"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/adith-manikonda/"
              target="_blank"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="mailto:adith2505@outlook.com"
              className="social-icon"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── ABOUT ── */}
      <section
        id="about"
        style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div className="fade-in" style={{ maxWidth: "680px" }}>
          <SectionLabel>About</SectionLabel>
          <SectionTitle>
            I like building things,
            <br />
            breaking them, then fixing them.
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
          ].map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: "0.98rem",
                color: i === 2 ? "#A0A0A0" : "#E5E5E5",
                lineHeight: 1.75,
                fontStyle: i === 2 ? "italic" : "normal",
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── EXPERIENCE ── */}
      <section
        id="experience"
        style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div className="fade-in">
          <SectionLabel>Experience</SectionLabel>
          <SectionTitle>Where I've worked</SectionTitle>
        </div>
        <div
          style={{
            marginTop: "56px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {experience.map((job, i) => (
            <div
              key={i}
              className="card fade-in"
              style={{ padding: "28px 32px" }}
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
                      color: "#E5E5E5",
                      marginBottom: "4px",
                    }}
                  >
                    {job.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#FF7A1F",
                      fontWeight: 500,
                    }}
                  >
                    {job.company}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "#A0A0A0",
                    background: "#111111",
                    border: "1px solid #333333",
                    borderRadius: "4px",
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
                    color: "#A0A0A0",
                    lineHeight: 1.65,
                    marginBottom: "12px",
                  }}
                >
                  {job.description}
                </p>
              )}
              {job.skills.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {job.skills.map((s) => (
                    <Tag key={s} label={s} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── SKILLS ── */}
      <section
        id="skills"
        style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div className="fade-in">
          <SectionLabel>Skills</SectionLabel>
          <SectionTitle>What I work with</SectionTitle>
        </div>
        <div
          style={{
            marginTop: "56px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {skillGroups.map((group, i) => (
            <div
              key={i}
              className="card fade-in"
              style={{ padding: "24px 28px" }}
            >
              <h3
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#FF7A1F",
                  marginBottom: "20px",
                }}
              >
                {group.title}
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div className="skill-dot" />
                    <span
                      style={{
                        fontSize: "0.9rem",
                        color: "#E5E5E5",
                        lineHeight: 1.4,
                      }}
                    >
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div style={{ marginTop: "64px" }}>
          <h3
            className="fade-in"
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#A0A0A0",
              marginBottom: "28px",
            }}
          >
            Languages
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "16px",
            }}
          >
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="card fade-in"
                style={{ padding: "20px 22px" }}
              >
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "#E5E5E5",
                    marginBottom: "4px",
                  }}
                >
                  {lang.name}
                </p>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "#A0A0A0",
                    marginBottom: "12px",
                  }}
                >
                  {lang.level}
                </p>
                <div style={{ display: "flex", gap: "4px" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: "3px",
                        borderRadius: "2px",
                        background: i < lang.p ? "#FF7A1F" : "#333333",
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div className="fade-in">
          <SectionLabel>Projects</SectionLabel>
          <SectionTitle>Things I've built</SectionTitle>
        </div>
        <div
          style={{
            marginTop: "56px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {projects.map((p, i) => (
            <div
              key={i}
              className="card fade-in"
              style={{
                padding: "24px 26px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span style={{ fontSize: "1.3rem" }}>{p.emoji}</span>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#E5E5E5",
                    }}
                  >
                    {p.name}
                  </h3>
                </div>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  {p.badge && (
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        color: "#4ade80",
                        background: "rgba(74,222,128,0.1)",
                        border: "1px solid rgba(74,222,128,0.25)",
                        borderRadius: "100px",
                        padding: "2px 8px",
                      }}
                    >
                      {p.badge}
                    </span>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      className="social-icon"
                      aria-label="GitHub"
                    >
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </div>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#A0A0A0",
                  lineHeight: 1.65,
                  flex: 1,
                }}
              >
                {p.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {p.stack.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── PATENTS (placeholder) ── */}
      <section
        id="patents"
        style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div className="fade-in">
          <SectionLabel>Patents</SectionLabel>
          <SectionTitle>Intellectual property</SectionTitle>
        </div>
        <p
          className="fade-in"
          style={{
            marginTop: "32px",
            color: "#A0A0A0",
            fontSize: "0.95rem",
            fontStyle: "italic",
          }}
        >
          Patent details coming soon.
        </p>
      </section>

      <Divider />

      {/* ── ACHIEVEMENTS ── */}
      <section
        id="achievements"
        style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div className="fade-in">
          <SectionLabel>Achievements</SectionLabel>
          <SectionTitle>Certifications &amp; awards</SectionTitle>
        </div>
        <div
          style={{
            marginTop: "56px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {achievements.map((a, i) => (
            <div
              key={i}
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
                <Award size={18} style={{ color: "#FF7A1F" }} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "#E5E5E5",
                    marginBottom: "4px",
                    lineHeight: 1.4,
                  }}
                >
                  {a.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#FF7A1F",
                    marginBottom: "8px",
                  }}
                >
                  {a.year}
                </p>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "#A0A0A0",
                    lineHeight: 1.6,
                  }}
                >
                  {a.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── HACKATHONS ── */}
      <section
        id="hackathons"
        style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div className="fade-in">
          <SectionLabel>Hackathons</SectionLabel>
          <SectionTitle>Built under pressure</SectionTitle>
        </div>
        <div
          style={{
            marginTop: "56px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {hackathons.map((h, i) => (
            <div
              key={i}
              className="card fade-in"
              style={{ padding: "24px 28px" }}
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
                    color: "#E5E5E5",
                  }}
                >
                  {h.name}
                </h3>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  {h.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "#FF7A1F",
                        background: "rgba(255,122,31,0.1)",
                        border: "1px solid rgba(255,122,31,0.25)",
                        borderRadius: "4px",
                        padding: "2px 8px",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  <span style={{ fontSize: "0.78rem", color: "#A0A0A0" }}>
                    {h.when}
                  </span>
                </div>
              </div>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "#A0A0A0",
                  lineHeight: 1.65,
                }}
              >
                {h.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── HOBBIES ── */}
      <section
        id="hobbies"
        style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div className="fade-in">
          <SectionLabel>Hobbies</SectionLabel>
          <SectionTitle>Beyond the screen</SectionTitle>
        </div>
        <div
          style={{
            marginTop: "56px",
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

      <Divider />

      {/* ── CONTACT ── */}
      <section
        id="contact"
        style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div className="fade-in" style={{ maxWidth: "560px" }}>
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>Let's connect</SectionTitle>
          <p
            style={{
              marginTop: "20px",
              marginBottom: "48px",
              color: "#A0A0A0",
              fontSize: "0.98rem",
              lineHeight: 1.7,
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
              className="btn-ghost"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/adith-manikonda/"
              target="_blank"
              className="btn-ghost"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid #333333",
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
          <p style={{ fontSize: "0.82rem", color: "#A0A0A0" }}>
            Designed &amp; built by{" "}
            <span style={{ color: "#FF7A1F" }}>Adith Manikonda</span>
          </p>
          <p style={{ fontSize: "0.78rem", color: "#555555" }}>
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </div>
      </footer>
    </>
  );
}
