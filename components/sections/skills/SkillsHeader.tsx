"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });

export default function SkillsHeader({ standalone }: { standalone: boolean }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: "44% 56%",
        borderBottom: "5px solid #111",
      }}
    >
      {/* LEFT — "I SKILLS" headline panel */}
      <div
        className="bg-[#111] flex flex-col justify-between relative overflow-hidden"
        style={{
          borderRight: "5px solid #111",
          padding: "32px 36px 36px 36px",
          minHeight: 240,
        }}
      >
        {/* Top-left corner bracket */}
        <div className="absolute top-0 left-0" style={{ zIndex: 10 }}>
          <div style={{ width: 28, height: 5, background: "#EEE7DC", position: "absolute", top: 18, left: 18 }} />
          <div style={{ width: 5, height: 28, background: "#EEE7DC", position: "absolute", top: 18, left: 18 }} />
        </div>

        {/* Orange vertical bar + SKILLS headline */}
        <div className="flex items-stretch gap-5 flex-1">
          <motion.div
            style={{ width: 14, background: "#E8420A", border: "3px solid #EEE7DC", flexShrink: 0 }}
            initial={standalone ? { scaleY: 0 } : false}
            whileInView={standalone ? { scaleY: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: easings.primary }}
          />
          <div className="flex flex-col justify-end">
            <motion.h1
              className={`${anton.className} uppercase text-[#F0EBE0] select-none`}
              style={{
                fontSize: "clamp(80px, 8.5vw, 140px)",
                fontWeight: 400,
                letterSpacing: "0.01em",
                lineHeight: 0.86,
              }}
              initial={standalone ? { y: 40, opacity: 0 } : false}
              whileInView={standalone ? { y: 0, opacity: 1 } : undefined}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easings.primary }}
            >
              I<br />
              <span style={{ color: "#CFDE00" }}>SKILLS</span>
            </motion.h1>
          </div>
        </div>

        {/* Subtext */}
        <div style={{ marginTop: 22 }}>
          <motion.div
            style={{ width: 56, height: 4, background: "#CFDE00", marginBottom: 12, originX: 0 }}
            initial={standalone ? { scaleX: 0 } : false}
            whileInView={standalone ? { scaleX: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.38, delay: 0.18 }}
          />
          <motion.p
            className="font-mono text-[#C8C0B4]"
            style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.5, letterSpacing: "0.02em" }}
            initial={standalone ? { opacity: 0 } : false}
            whileInView={standalone ? { opacity: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            The tools, systems and<br />
            technologies I use to build<br />
            and ship real systems.
          </motion.p>
        </div>
      </div>

      {/* RIGHT — Philosophy card */}
      <div
        className="bg-[#6C8EAD] flex flex-col justify-between relative overflow-hidden"
        style={{ padding: "32px 36px 36px 36px" }}
      >
        {/* Top-right diagonal hatch */}
        <div className="absolute top-0 right-0" style={{ padding: "16px 18px 0 0" }}>
          <div className="flex gap-[5px]">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                style={{ width: 6, height: 24, background: "#111", transform: "skewX(-20deg)", opacity: 0.55 }}
              />
            ))}
          </div>
        </div>

        {/* Badge */}
        <div>
          <motion.div
            className="inline-flex items-center justify-center bg-[#CFDE00]"
            style={{ border: "3px solid #111", padding: "6px 18px", marginBottom: 24 }}
            initial={standalone ? { x: -20, opacity: 0 } : false}
            whileInView={standalone ? { x: 0, opacity: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="text-[#111] font-black uppercase tracking-[0.04em]"
              style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: 16 }}
            >
              PHILOSOPHY
            </span>
          </motion.div>

          {/* Philosophy text */}
          <motion.p
            className="text-[#111]"
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontSize: "clamp(20px, 1.9vw, 28px)",
              fontWeight: 700,
              lineHeight: 1.45,
              letterSpacing: "0.01em",
            }}
            initial={standalone ? { opacity: 0, y: 16 } : false}
            whileInView={standalone ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            I don't chase tools.<br />
            I learn the right ones,<br />
            use them deeply,<br />
            and ship real systems.
          </motion.p>
        </div>

        {/* Staircase chart graphic */}
        <div className="flex items-end gap-[3px]" style={{ marginTop: 16 }}>
          {[14, 22, 32, 46, 62, 80].map((h, i) => (
            <motion.div
              key={i}
              style={{ width: 22, height: h, background: "#CFDE00", border: "2px solid #111" }}
              initial={standalone ? { scaleY: 0, originY: 1 } : false}
              whileInView={standalone ? { scaleY: 1 } : undefined}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.3 + i * 0.07 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
