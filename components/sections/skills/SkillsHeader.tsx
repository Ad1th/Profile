"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { easings } from "@/lib/motion";
import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });

export default function SkillsHeader({
  standalone,
  transitionProgress,
}: {
  standalone: boolean;
  transitionProgress?: MotionValue<number>;
}) {
  const fallbackProgress = useMotionValue(1);
  const progress = transitionProgress ?? fallbackProgress;
  const transitionMode = Boolean(transitionProgress);

  const railX = useTransform(progress, [0.0, 0.18], [72, 0]);
  const railOpacity = useTransform(progress, [0.0, 0.12], [0, 1]);
  const leftX = useTransform(progress, [0.06, 0.22], [28, 0]);
  const leftOpacity = useTransform(progress, [0.04, 0.16], [0, 1]);
  const titleX = useTransform(progress, [0.12, 0.3], [22, 0]);
  const titleOpacity = useTransform(progress, [0.1, 0.22], [0, 1]);
  const rightX = useTransform(progress, [0.1, 0.26], [36, 0]);
  const rightOpacity = useTransform(progress, [0.08, 0.2], [0, 1]);
  const badgeX = useTransform(progress, [0.16, 0.3], [16, 0]);
  const badgeOpacity = useTransform(progress, [0.14, 0.24], [0, 1]);
  const copyY = useTransform(progress, [0.18, 0.32], [14, 0]);
  const copyOpacity = useTransform(progress, [0.16, 0.26], [0, 1]);

  return (
    <motion.div
      className="grid"
      style={{
        gridTemplateColumns: "44% 56%",
        borderBottom: "5px solid #111",
        x: transitionMode ? railX : 0,
        opacity: transitionMode ? railOpacity : 1,
      }}
    >
      {/* LEFT — "I SKILLS" headline panel */}
      <motion.div
        className="bg-[#111] flex flex-col justify-between relative overflow-hidden"
        style={{
          borderRight: "5px solid #111",
          padding: "32px 36px 36px 36px",
          minHeight: 240,
          x: transitionMode ? leftX : 0,
          opacity: transitionMode ? leftOpacity : 1,
        }}
      >
        {/* Top-left corner bracket */}
        <div className="absolute top-0 left-0" style={{ zIndex: 10 }}>
          <div
            style={{
              width: 28,
              height: 5,
              background: "#EEE7DC",
              position: "absolute",
              top: 18,
              left: 18,
            }}
          />
          <div
            style={{
              width: 5,
              height: 28,
              background: "#EEE7DC",
              position: "absolute",
              top: 18,
              left: 18,
            }}
          />
        </div>

        {/* Orange vertical bar + SKILLS headline */}
        <div className="flex items-stretch gap-5 flex-1">
          <motion.div
            style={{
              width: 14,
              background: "#E8420A",
              border: "3px solid #EEE7DC",
              flexShrink: 0,
            }}
            initial={standalone ? { scaleY: 0 } : false}
            whileInView={standalone ? { scaleY: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: easings.primary }}
          />
          <motion.div
            className="flex flex-col justify-end"
            style={{
              x: transitionMode ? titleX : 0,
              opacity: transitionMode ? titleOpacity : 1,
            }}
          >
            <motion.h1
              className={`${anton.className} uppercase text-[#F0EBE0] select-none`}
              style={{
                fontSize: "clamp(80px, 8.5vw, 140px)",
                fontWeight: 400,
                letterSpacing: "0.01em",
                lineHeight: 0.86,
                whiteSpace: "nowrap",
              }}
              initial={standalone ? { y: 40, opacity: 0 } : false}
              whileInView={standalone ? { y: 0, opacity: 1 } : undefined}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easings.primary }}
            >
              I<br />
              <span style={{ color: "#CFDE00" }}>SKILLS</span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Subtext */}
        <div style={{ marginTop: 22 }}>
          <motion.div
            style={{
              width: 56,
              height: 4,
              background: "#CFDE00",
              marginBottom: 12,
              originX: 0,
            }}
            initial={standalone ? { scaleX: 0 } : false}
            whileInView={standalone ? { scaleX: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.38, delay: 0.18 }}
          />
          <motion.p
            className="font-mono text-[#C8C0B4]"
            style={{
              fontSize: 15,
              fontWeight: 700,
              lineHeight: 1.5,
              letterSpacing: "0.02em",
            }}
            initial={standalone ? { opacity: 0 } : false}
            whileInView={standalone ? { opacity: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            The tools, systems and
            <br />
            technologies I use to build
            <br />
            and ship real systems.
          </motion.p>
        </div>
      </motion.div>

      {/* RIGHT — Philosophy card */}
      <motion.div
        className="bg-[#6C8EAD] flex flex-col justify-between relative overflow-hidden"
        style={{
          padding: "32px 36px 36px 36px",
          x: transitionMode ? rightX : 0,
          opacity: transitionMode ? rightOpacity : 1,
        }}
      >
        {/* Top-right diagonal hatch */}
        <div
          className="absolute top-0 right-0"
          style={{ padding: "16px 18px 0 0" }}
        >
          <div className="flex gap-[5px]">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 6,
                  height: 24,
                  background: "#111",
                  transform: "skewX(-20deg)",
                  opacity: 0.55,
                }}
              />
            ))}
          </div>
        </div>

        {/* Badge */}
        <div>
          <motion.div
            className="inline-flex items-center justify-center bg-[#CFDE00]"
            style={{
              border: "3px solid #111",
              padding: "6px 18px",
              marginBottom: 24,
              x: transitionMode ? badgeX : 0,
              opacity: transitionMode ? badgeOpacity : 1,
            }}
            initial={standalone ? { x: -20, opacity: 0 } : false}
            whileInView={standalone ? { x: 0, opacity: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="text-[#111] font-black uppercase tracking-[0.04em]"
              style={{
                fontFamily: "var(--font-archivo), sans-serif",
                fontSize: 16,
              }}
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
              x: transitionMode ? badgeX : 0,
              y: transitionMode ? copyY : 0,
              opacity: transitionMode ? copyOpacity : 1,
            }}
            initial={standalone ? { opacity: 0, y: 16 } : false}
            whileInView={standalone ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            I don't chase tools.
            <br />
            I learn the right ones,
            <br />
            use them deeply,
            <br />
            and ship real systems.
          </motion.p>
        </div>

        {/* Staircase chart graphic */}
        <div className="flex items-end gap-[3px]" style={{ marginTop: 16 }}>
          {[14, 22, 32, 46, 62, 80].map((h, i) => (
            <motion.div
              key={i}
              style={{
                width: 22,
                height: h,
                background: "#CFDE00",
                border: "2px solid #111",
              }}
              initial={standalone ? { scaleY: 0, originY: 1 } : false}
              whileInView={standalone ? { scaleY: 1 } : undefined}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.3 + i * 0.07 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
