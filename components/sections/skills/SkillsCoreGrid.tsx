"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const categories: SkillCategory[] = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="6" width="28" height="20" rx="2" stroke="#E8420A" strokeWidth="2.5" fill="none"/>
        <path d="M10 12L6 16L10 20" stroke="#E8420A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M22 12L26 16L22 20" stroke="#E8420A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="14" y1="22" x2="18" y2="10" stroke="#CFDE00" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "SYSTEMS & BACKEND",
    items: ["Node.js", "Express.js", "FastAPI", "REST API Design", "JWT Authentication", "Backend Architecture", "Middleware Systems", "API Routing & Validation"],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="9" rx="12" ry="5" stroke="#E8420A" strokeWidth="2.5" fill="none"/>
        <path d="M4 9v7c0 2.76 5.37 5 12 5s12-2.24 12-5V9" stroke="#E8420A" strokeWidth="2.5" fill="none"/>
        <path d="M4 16v7c0 2.76 5.37 5 12 5s12-2.24 12-5v-7" stroke="#E8420A" strokeWidth="2.5" fill="none"/>
      </svg>
    ),
    title: "DATABASES & STORAGE",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "Prisma ORM", "SQLite", "NeonDB"],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <polygon points="16,3 29,10 29,22 16,29 3,22 3,10" stroke="#E8420A" strokeWidth="2.5" fill="none"/>
        <circle cx="16" cy="16" r="5" stroke="#CFDE00" strokeWidth="2" fill="none"/>
        <line x1="16" y1="3" x2="16" y2="11" stroke="#E8420A" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="21" x2="16" y2="29" stroke="#E8420A" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "FRONTEND & UI",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive UI Systems", "Component Architecture", "Neo-Brutalist UI Design"],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="11" height="11" rx="1" stroke="#E8420A" strokeWidth="2.5" fill="none"/>
        <rect x="17" y="4" width="11" height="11" rx="1" stroke="#CFDE00" strokeWidth="2.5" fill="none"/>
        <rect x="4" y="17" width="11" height="11" rx="1" stroke="#CFDE00" strokeWidth="2.5" fill="none"/>
        <rect x="17" y="17" width="11" height="11" rx="1" stroke="#E8420A" strokeWidth="2.5" fill="none"/>
      </svg>
    ),
    title: "OBSERVABILITY & DEVOPS",
    items: ["Docker", "Git & GitHub", "CI/CD", "Prometheus", "Grafana", "Loki", "Jaeger", "k6 Load Testing"],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C16 4 8 8 8 16C8 20.4 11.6 24 16 24C20.4 24 24 20.4 24 16C24 8 16 4 16 4Z" stroke="#E8420A" strokeWidth="2.5" fill="none"/>
        <circle cx="16" cy="16" r="3" fill="#CFDE00"/>
        <line x1="16" y1="2" x2="16" y2="6" stroke="#CFDE00" strokeWidth="2" strokeLinecap="round"/>
        <line x1="26" y1="16" x2="30" y2="16" stroke="#CFDE00" strokeWidth="2" strokeLinecap="round"/>
        <line x1="2" y1="16" x2="6" y2="16" stroke="#CFDE00" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "REALTIME & INTERACTIVE",
    items: ["WebSockets", "Socket.IO", "Live Presence Systems", "Real-time Chat", "Multiplayer Sync", "Event-based Architectures"],
  },
];

const categories2: SkillCategory[] = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="6" width="20" height="20" rx="2" stroke="#E8420A" strokeWidth="2.5" fill="none"/>
        <rect x="11" y="11" width="10" height="10" rx="1" stroke="#E8420A" strokeWidth="2" fill="none"/>
        <line x1="11" y1="2" x2="11" y2="6" stroke="#CFDE00" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="2" x2="16" y2="6" stroke="#CFDE00" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="21" y1="2" x2="21" y2="6" stroke="#CFDE00" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="11" y1="26" x2="11" y2="30" stroke="#CFDE00" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="26" x2="16" y2="30" stroke="#CFDE00" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="21" y1="26" x2="21" y2="30" stroke="#CFDE00" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="16" y="19" textAnchor="middle" fontSize="7" fontWeight="900" fontFamily="monospace" fill="#CFDE00">AI</text>
      </svg>
    ),
    title: "AI & PRODUCTIVITY",
    items: ["Gemini API Integration", "AI Workflow Systems", "Productivity Extensions", "Automation Platforms", "Prompt Engineering", "AI-Augmented UX"],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="8" y="10" width="16" height="16" rx="2" stroke="#E8420A" strokeWidth="2.5" fill="none"/>
        <rect x="12" y="14" width="8" height="8" rx="1" stroke="#E8420A" strokeWidth="2" fill="none"/>
        <line x1="4" y1="14" x2="8" y2="14" stroke="#CFDE00" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="4" y1="20" x2="8" y2="20" stroke="#CFDE00" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="24" y1="14" x2="28" y2="14" stroke="#CFDE00" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="24" y1="20" x2="28" y2="20" stroke="#CFDE00" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="14" y1="4" x2="14" y2="10" stroke="#CFDE00" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="20" y1="4" x2="20" y2="10" stroke="#CFDE00" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "HARDWARE & ELECTRONICS",
    items: ["Embedded Systems", "Microcontrollers", "Sensors & Interfaces", "System-Level Thinking", "Hardware Debugging", "Electronics Prototyping"],
  },
];

function SkillCard({
  category,
  index,
  standalone,
  isSecondRow = false,
}: {
  category: SkillCategory;
  index: number;
  standalone: boolean;
  isSecondRow?: boolean;
}) {
  return (
    <motion.div
      className="bg-[#F0EBE0] flex flex-col relative overflow-hidden"
      style={{
        border: "3px solid #111",
        borderTop: "none",
        borderLeft: index === 0 ? "none" : "3px solid #111",
        padding: "24px 22px 28px 22px",
        minHeight: 280,
      }}
      initial={standalone ? { opacity: 0, y: 20 } : false}
      whileInView={standalone ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: easings.primary }}
    >
      {/* Bottom-right diagonal hatch decoration */}
      <div className="absolute bottom-0 right-0" style={{ padding: "0 12px 12px 0" }}>
        <div className="flex gap-[4px]">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{ width: 3, height: 16, background: "#111", transform: "skewX(-20deg)", opacity: 0.2 }}
            />
          ))}
        </div>
      </div>

      {/* Icon */}
      <div style={{ marginBottom: 14 }}>{category.icon}</div>

      {/* Title */}
      <h3
        className="uppercase text-[#111]"
        style={{
          fontFamily: "var(--font-archivo), sans-serif",
          fontSize: 13,
          fontWeight: 900,
          letterSpacing: "0.06em",
          lineHeight: 1.2,
          marginBottom: 14,
        }}
      >
        {category.title}
      </h3>

      {/* Divider */}
      <div style={{ width: "100%", height: 3, background: "#E8420A", marginBottom: 14 }} />

      {/* Items */}
      <ul className="flex flex-col gap-[6px]">
        {category.items.map((item, i) => (
          <li key={i} className="flex items-center gap-3">
            <div style={{ width: 8, height: 8, background: "#111", flexShrink: 0 }} />
            <span
              className="text-[#333]"
              style={{
                fontFamily: "var(--font-archivo), sans-serif",
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function SkillsCoreGrid({ standalone }: { standalone: boolean }) {
  return (
    <div>
      {/* Section label bar */}
      <div
        className="flex items-center justify-between bg-[#EEE7DC]"
        style={{
          borderBottom: "3px solid #111",
          padding: "10px 24px",
        }}
      >
        <div className="flex items-center gap-3">
          <div style={{ width: 6, height: 6, background: "#E8420A" }} />
          <div style={{ width: 6, height: 6, background: "#E8420A" }} />
          <span
            className="font-mono text-[#111] uppercase"
            style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em" }}
          >
            // CORE SKILLS
          </span>
        </div>
        <div
          style={{ width: 22, height: 22, border: "3px solid #E8420A", background: "#E8420A" }}
        />
      </div>

      {/* Row 1: 5 columns */}
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
      >
        {categories.map((cat, i) => (
          <SkillCard key={cat.title} category={cat} index={i} standalone={standalone} />
        ))}
      </div>

      {/* Row 2: 2 columns (wider) + spacer */}
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
      >
        {categories2.map((cat, i) => (
          <SkillCard key={cat.title} category={cat} index={i} standalone={standalone} isSecondRow />
        ))}
        {/* Empty cells to fill the row */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-[#111]"
            style={{
              border: "3px solid #111",
              borderTop: "none",
              borderLeft: i === 0 ? "3px solid #111" : "3px solid #333",
            }}
          />
        ))}
      </div>
    </div>
  );
}
