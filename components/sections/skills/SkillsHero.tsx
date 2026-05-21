"use client";

/**
 * Skillshero.tsx  (updated for cinematic transitions)
 *
 * Changes from original:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. New `animateDots` prop — when true (passed from Skills.tsx once the
 *    section is in view), language proficiency dots fill in one-by-one
 *    with a staggered delay, like a progress bar loading.
 *
 * 2. The headline text ("THE STACK / BEHIND THE / THINGS I BUILD.") now
 *    also animates in via whileInView — each line slides up from y:24
 *    with 120ms stagger between lines.
 *
 * 3. The monospace body copy fades in after the headline settles.
 *
 * 4. All animations are `once: true` so they don't re-run on scroll back.
 */

import { motion, type MotionValue } from "framer-motion";
import { easings } from "@/lib/motion";
import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });

// ── Language dot component with animated fill ─────────────────────────────
function LangDots({
  filled,
  total = 20,
  animate: shouldAnimate = false,
  rowDelay = 0,
}: {
  filled: number;
  total?: number;
  animate?: boolean;
  rowDelay?: number;
}) {
  return (
    <div className="flex items-center gap-[4px]">
      {Array.from({ length: total }).map((_, i) => {
        const isFilled = i < filled;
        return (
          <motion.div
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              flexShrink: 0,
            }}
            initial={{
              background: "#444",
              scale: 0.7,
              opacity: 0.4,
            }}
            animate={
              shouldAnimate
                ? {
                    background: isFilled ? "#CFDE00" : "#444",
                    scale: 1,
                    opacity: 1,
                  }
                : {
                    background: isFilled ? "#CFDE00" : "#444",
                    scale: 1,
                    opacity: 1,
                  }
            }
            transition={
              shouldAnimate
                ? {
                    duration: 0.18,
                    delay: rowDelay + i * 0.028,
                    ease: "easeOut",
                  }
                : { duration: 0 }
            }
          />
        );
      })}
    </div>
  );
}

const languages = [
  { name: "ENGLISH", filled: 18 },
  { name: "HINDI", filled: 15 },
  { name: "TELUGU", filled: 14 },
  { name: "KANNADA", filled: 11 },
  { name: "FRENCH", filled: 5 },
];

const headlineLines = [
  { text: "The stack", color: "#F0EBE0" },
  { text: "behind the", color: "#CFDE00" },
  { text: "things I build.", color: "#E8420A" },
];

interface SkillsHeroProps {
  standalone: boolean;
  transitionProgress?: MotionValue<number>;
  /** When true, animate language dots in one-by-one. */
  animateDots?: boolean;
}

export default function SkillsHero({ standalone, animateDots = false }: SkillsHeroProps) {
  return (
    <div
      className="relative grid"
      style={{
        gridTemplateColumns: "1fr 1fr 1fr",
        borderBottom: "3px solid #333",
        minHeight: "42svh",
        alignItems: "stretch",
      }}
    >
      {/* ── Col 1: Headline ─────────────────────────────────────────────── */}
      <div
        style={{
          borderRight: "3px solid #333",
          padding: "36px 36px 40px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <motion.div
          className="flex items-center gap-2"
          style={{ marginBottom: 20 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              fontWeight: 700,
              color: "#888",
              letterSpacing: "0.12em",
            }}
          >
            // SKILLS
          </span>
        </motion.div>

        {/* Animated headline — each line slides up */}
        <div className="overflow-hidden">
          {headlineLines.map((line, i) => (
            <div key={line.text} style={{ overflow: "hidden" }}>
              <motion.div
                className={`${anton.className} uppercase select-none`}
                style={{
                  fontSize: "clamp(52px, 5.2vw, 80px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.01em",
                  color: line.color,
                  marginBottom: i === headlineLines.length - 1 ? 20 : 0,
                }}
                initial={{ y: 48, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.6,
                  delay: 0.22 + i * 0.12,
                  ease: easings.primary,
                }}
              >
                {line.text}
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          style={{ width: 40, height: 3, background: "#CFDE00", marginTop: 8 }}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.4, delay: 0.58 }}
        />
      </div>

      {/* ── Col 2: Body copy ────────────────────────────────────────────── */}
      <div
        style={{
          borderRight: "3px solid #333",
          padding: "40px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <motion.p
          style={{
            fontFamily: "monospace",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.7,
            color: "#C8C0B4",
            maxWidth: 280,
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.55, delay: 0.36, ease: easings.primary }}
        >
          I work across the stack
          <br />
          to design, build and ship
          <br />
          systems that are fast,
          <br />
          reliable and scalable.
        </motion.p>

        <motion.div
          style={{ width: 48, height: 3, background: "#CFDE00", marginTop: 32 }}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.35, delay: 0.54 }}
        />

        <motion.div
          style={{ width: 12, height: 12, background: "#E8420A", marginTop: 20 }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.2, delay: 0.62 }}
        />
      </div>

      {/* ── Col 3: Language dots ─────────────────────────────────────────── */}
      <div
        style={{
          padding: "36px 40px 40px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Corner brackets */}
        <div className="absolute" style={{ top: 20, left: 20 }}>
          <div style={{ width: 20, height: 3, background: "#555", position: "absolute", top: 0, left: 0 }} />
          <div style={{ width: 3, height: 20, background: "#555", position: "absolute", top: 0, left: 0 }} />
        </div>
        <div className="absolute" style={{ bottom: 20, left: 20 }}>
          <div style={{ width: 20, height: 3, background: "#555", position: "absolute", bottom: 0, left: 0 }} />
          <div style={{ width: 3, height: 20, background: "#555", position: "absolute", bottom: 0, left: 0 }} />
        </div>

        <motion.div
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "#CFDE00",
            marginBottom: 20,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          LANGUAGES
        </motion.div>

        <div className="flex flex-col" style={{ gap: 12 }}>
          {languages.map(({ name, filled }, rowIdx) => (
            <motion.div
              key={name}
              className="flex items-center"
              style={{ gap: 24 }}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.35,
                delay: 0.28 + rowIdx * 0.08,
                ease: easings.primary,
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#F0EBE0",
                  letterSpacing: "0.06em",
                  minWidth: 76,
                }}
              >
                {name}
              </span>
              <LangDots
                filled={filled}
                animate={animateDots}
                rowDelay={0.5 + rowIdx * 0.14}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
