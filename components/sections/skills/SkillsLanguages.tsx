"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

const languages = [
  { name: "English",  level: "NATIVE",       pct: 100 },
  { name: "Hindi",    level: "FLUENT",        pct: 85  },
  { name: "Telugu",   level: "INTERMEDIATE",  pct: 60  },
  { name: "Kannada",  level: "INTERMEDIATE",  pct: 50  },
  { name: "French",   level: "BASIC",         pct: 25  },
];

export default function SkillsLanguages({ standalone }: { standalone: boolean }) {
  return (
    <div
      className="bg-[#111] flex flex-col"
      style={{
        border: "3px solid #111",
        borderTop: "none",
        borderLeft: "none",
        padding: "28px 30px 32px 30px",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[#CFDE00] uppercase"
            style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em" }}
          >
            // LANGUAGES SPOKEN
          </span>
        </div>
        <div className="flex gap-[4px]">
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ width: 4, height: 16, background: "#CFDE00", transform: "skewX(-18deg)", opacity: 0.7 }} />
          ))}
        </div>
      </div>

      {/* Language bars */}
      <div className="flex flex-col gap-[14px]">
        {languages.map((lang, i) => (
          <div key={lang.name}>
            <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
              <span
                className="font-mono text-[#F0EBE0]"
                style={{ fontSize: 14, fontWeight: 700 }}
              >
                {lang.name}
              </span>
              <span
                className="font-mono text-[#888] uppercase"
                style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em" }}
              >
                {lang.level}
              </span>
            </div>
            {/* Bar track */}
            <div style={{ height: 6, background: "#333", position: "relative" }}>
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  background: "#CFDE00",
                  originX: 0,
                }}
                initial={standalone ? { scaleX: 0 } : { scaleX: lang.pct / 100 }}
                whileInView={standalone ? { scaleX: lang.pct / 100 } : undefined}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: easings.primary }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
