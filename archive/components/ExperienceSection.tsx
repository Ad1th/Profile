"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ─────────────────────────────────────────────── */
export interface Job {
  title: string;
  company: string;
  period: string;
  description?: string;
  skills: string[];
}

/* ═══════════════════════════════════════════════
   NIGHT MODE TOGGLE
═══════════════════════════════════════════════ */
export function NightModeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (document.getElementById("__nm-vars")) return;

    const s = document.createElement("style");
    s.id = "__nm-vars";
    s.textContent = `
      :root{
        --nm-bg:#E8E6E1;
        --nm-text:#111111;
        --nm-muted:rgba(17,17,17,.54);
        --nm-accent:#d96516;
        --nm-card:#f4f1ec;
        --nm-dark:#121212;
        --nm-border:rgba(17,17,17,.11);
      }

      [data-theme="dark"]{
        --nm-bg:#0d0c0a;
        --nm-text:#ece8df;
        --nm-muted:rgba(236,232,223,.58);
        --nm-accent:#e8722a;
        --nm-card:#181612;
        --nm-dark:#111111;
        --nm-border:rgba(236,232,223,.10);
        --accent:#e8722a;
      }

      [data-theme="dark"] body{
        background:var(--nm-bg)!important;
        color:var(--nm-text)!important;
      }

      [data-theme="dark"] #experience,
      [data-theme="dark"] .exp-bg{
        background:var(--nm-bg)!important;
      }
    `;
    document.head.appendChild(s);
  }, []);

  const toggle = () => {
    setDark((v) => {
      const next = !v;
      document.documentElement.setAttribute(
        "data-theme",
        next ? "dark" : "light",
      );
      return next;
    });
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      className={className}
      style={{
        height: 36,
        padding: "0 14px",
        borderRadius: 999,
        border: "1px solid var(--nm-border)",
        background: "rgba(255,255,255,.04)",
        color: "var(--nm-text)",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        fontSize: "0.66rem",
        fontWeight: 700,
        letterSpacing: ".12em",
        textTransform: "uppercase",
      }}
    >
      <span>{dark ? "○" : "◑"}</span>
      {dark ? "Day" : "Night"}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════
   PANEL
═══════════════════════════════════════════════ */
function FloatingPanel({
  job,
  index,
  progress,
}: {
  job: Job;
  index: number;
  progress: MotionValue<number>;
}) {
  const [hovered, setHovered] = useState(false);

  const configs = [
    {
      start: 0.54,
      end: 0.68,
      w: "min(430px, 42vw)",
      h: 250,
      top: "16vh",
      right: "6vw",
      bg: "#111111",
      text: "#f1ece3",
      mute: "rgba(241,236,227,.58)",
      accent: "#e8722a",
      radius: 28,
      z: 6,
      rotate: 0,
    },
    {
      start: 0.62,
      end: 0.76,
      w: "min(340px, 34vw)",
      h: 210,
      top: "42vh",
      right: "18vw",
      bg: "rgba(255,255,255,.58)",
      text: "#111111",
      mute: "rgba(17,17,17,.56)",
      accent: "#d96516",
      radius: 24,
      z: 8,
      rotate: -4,
    },
    {
      start: 0.7,
      end: 0.84,
      w: "min(280px, 28vw)",
      h: 160,
      top: "68vh",
      right: "2vw",
      bg: "linear-gradient(135deg,#d96516,#f08932)",
      text: "#fff8f1",
      mute: "rgba(255,248,241,.72)",
      accent: "#fff8f1",
      radius: 22,
      z: 3,
      rotate: 6,
    },
  ][index];

  const x = useSpring(
    useTransform(progress, [configs.start, configs.end], [220, 0]),
    { stiffness: 80, damping: 20 },
  );

  const y = useSpring(
    useTransform(progress, [configs.start, configs.end], [60, 0]),
    { stiffness: 80, damping: 20 },
  );

  const opacity = useSpring(
    useTransform(progress, [configs.start, configs.end], [0, 1]),
    { stiffness: 100, damping: 24 },
  );

  const rotate = useSpring(
    useTransform(progress, [configs.start, configs.end], [18, configs.rotate]),
    { stiffness: 80, damping: 18 },
  );

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "absolute",
        top: configs.top,
        right: configs.right,
        width: configs.w,
        height: configs.h,
        zIndex: configs.z,
        x,
        y,
        opacity,
        rotate,
        scale: hovered ? 1.02 : 1,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: configs.radius,
          background: configs.bg,
          padding: "26px 28px",
          border: "1px solid rgba(255,255,255,.06)",
          boxShadow: hovered
            ? "0 34px 90px rgba(0,0,0,.24)"
            : "0 24px 70px rgba(0,0,0,.16)",
          backdropFilter: "blur(18px)",
          transition: "all .25s cubic-bezier(0.16,1,0.3,1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.62rem",
              fontWeight: 800,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: configs.accent,
              marginBottom: 8,
            }}
          >
            {job.company}
          </p>

          <h3
            style={{
              fontSize: index === 0 ? "1.5rem" : "1.2rem",
              lineHeight: 1.15,
              color: configs.text,
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              marginBottom: 10,
            }}
          >
            {job.title}
          </h3>

          {job.description && (
            <p
              style={{
                fontSize: ".8rem",
                lineHeight: 1.6,
                color: configs.mute,
                maxWidth: "90%",
              }}
            >
              {job.description}
            </p>
          )}
        </div>

        <div>
          {job.skills.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 12,
              }}
            >
              {job.skills.slice(0, 3).map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: ".56rem",
                    fontWeight: 800,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    padding: "4px 8px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,.09)",
                    color: configs.accent,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          <p
            style={{
              fontSize: ".68rem",
              letterSpacing: ".04em",
              color: configs.mute,
            }}
          >
            {job.period}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   TITLE
═══════════════════════════════════════════════ */
function CinematicTitle({ progress }: { progress: MotionValue<number> }) {
  const line1Y = useSpring(useTransform(progress, [0, 0.14], [130, 0]), {
    stiffness: 80,
    damping: 18,
  });

  const line2Y = useSpring(useTransform(progress, [0.04, 0.18], [130, 0]), {
    stiffness: 80,
    damping: 18,
  });

  const line1Opacity = useTransform(progress, [0, 0.08], [0, 1]);
  const line2Opacity = useTransform(progress, [0.04, 0.12], [0, 1]);

  const scale = useSpring(
    useTransform(progress, [0, 0.26, 0.52], [0.88, 1.16, 0.42]),
    { stiffness: 70, damping: 20 },
  );

  const x = useSpring(useTransform(progress, [0.32, 0.52], ["0vw", "-30vw"]), {
    stiffness: 70,
    damping: 20,
  });

  const y = useSpring(useTransform(progress, [0.24, 0.52], ["0vh", "-8vh"]), {
    stiffness: 70,
    damping: 20,
  });

  const labelOpacity = useTransform(progress, [0.42, 0.54], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          marginLeft: "6vw",
          x,
          y,
          scale,
          transformOrigin: "left center",
        }}
      >
        <motion.div
          style={{
            opacity: labelOpacity,
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: ".66rem",
            fontWeight: 800,
            letterSpacing: ".26em",
            textTransform: "uppercase",
            color: "var(--nm-accent)",
          }}
        >
          <span
            style={{
              width: 18,
              height: 1.5,
              background: "var(--nm-accent)",
            }}
          />
          Experience
        </motion.div>

        <div style={{ overflow: "hidden" }}>
          <motion.h2
            style={{
              y: line1Y,
              opacity: line1Opacity,
              margin: 0,
              fontSize: "clamp(88px,11vw,180px)",
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              color: "var(--nm-text)",
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontWeight: 400,
              whiteSpace: "nowrap",
            }}
          >
            Where I&apos;ve
          </motion.h2>
        </div>

        <div style={{ overflow: "hidden" }}>
          <motion.h2
            style={{
              y: line2Y,
              opacity: line2Opacity,
              margin: 0,
              fontSize: "clamp(88px,11vw,180px)",
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              color: "var(--nm-accent)",
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontWeight: 400,
              whiteSpace: "nowrap",
            }}
          >
            worked.
          </motion.h2>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════ */
export default function ExperienceSection({
  experience,
}: {
  experience: Job[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  if (mobile) {
    return (
      <section
        id="experience"
        ref={sectionRef}
        className="exp-bg"
        style={{
          padding: "110px 24px",
          background: "var(--nm-bg)",
        }}
      >
        <p
          style={{
            fontSize: ".66rem",
            fontWeight: 800,
            letterSpacing: ".24em",
            textTransform: "uppercase",
            color: "var(--nm-accent)",
            marginBottom: 18,
          }}
        >
          Experience
        </p>

        <h2
          style={{
            fontSize: "clamp(54px,18vw,92px)",
            lineHeight: 0.92,
            letterSpacing: "-0.05em",
            marginBottom: 42,
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
          }}
        >
          Where I&apos;ve
          <br />
          <span style={{ color: "var(--nm-accent)" }}>worked.</span>
        </h2>

        <div style={{ display: "grid", gap: 16 }}>
          {experience.map((job, i) => (
            <div
              key={i}
              style={{
                padding: 24,
                borderRadius: 22,
                background: i === 0 ? "#111" : "var(--nm-card)",
                color: i === 0 ? "#fff" : "var(--nm-text)",
              }}
            >
              <p
                style={{
                  fontSize: ".62rem",
                  fontWeight: 800,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "var(--nm-accent)",
                  marginBottom: 8,
                }}
              >
                {job.company}
              </p>

              <h3
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: "1.35rem",
                  marginBottom: 8,
                }}
              >
                {job.title}
              </h3>

              <p style={{ opacity: 0.7, fontSize: ".8rem" }}>{job.period}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="exp-bg"
      style={{
        minHeight: "320vh",
        position: "relative",
        background: "var(--nm-bg)",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* subtle glow */}
        <div
          style={{
            position: "absolute",
            right: "8%",
            top: "18%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(217,101,22,.12), transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <CinematicTitle progress={scrollYProgress} />

        <div
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          {experience.slice(0, 3).map((job, i) => (
            <FloatingPanel
              key={`${job.company}-${i}`}
              job={job}
              index={i}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
