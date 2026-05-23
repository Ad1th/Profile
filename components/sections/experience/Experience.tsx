"use client";

/**
 * Experience.tsx
 *
 * Archive-to-timeline storytelling sequence.
 * Keeps the current brutalist paper language and palette, but opens the
 * section into a 1.5 viewport narrative: archive desk -> journey timeline.
 */

import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExperienceCard, { type ExperienceEntry } from "./ExperienceCard";
import ExperienceHeader from "./ExperienceHeader";
import ExperienceSystemLog from "./ExperienceSystemLog";
import ExperienceFooter from "./ExperienceFooter";
import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });

// ─── DATA ────────────────────────────────────────────────────────────────────

const entries: ExperienceEntry[] = [
  {
    id: "01",
    role: "PRIMARY ROLE",
    title: "TECHNICAL HEAD",
    org: "Mozilla Firefox Club",
    location: "VIT Vellore",
    dateRange: "JAN 2026 – PRESENT",
    status: "ACTIVE",
    accessLevel: "INTERNAL / ACCESS LEVEL / INT-04",
    bullets: [
      "Leading technical initiatives at the Mozilla Firefox Club. Previously served as Technical Core (Mar 2025 – Dec 2025), promoting open-source technologies and collaborative development.",
    ],
    tags: ["OPEN SOURCE", "SYSTEMS", "BACKEND", "COMMUNITY"],
    archiveId: "EXP-01",
    lastUpdated: "MAY 2026",
    stamp: null,
    rotate: -2,
    zIndex: 20,
    delay: 0.1,
  },
  {
    id: "02",
    role: "CONTRIBUTOR",
    title: "OPEN SOURCE CONTRIBUTOR",
    org: "GirlScript Summer of Code",
    dateRange: "2026",
    status: "CONTRIBUTING",
    badgeLabel: "GSSOC'26",
    bullets: [
      "COMMUNITY CONTRIBUTIONS",
      "DOCUMENTATION",
      "BUG FIXES",
      "CODE QUALITY",
    ],
    tags: [],
    archiveId: "EXP-02",
    stamp: "code",
    rotate: -4,
    zIndex: 10,
    delay: 0.22,
  },
  {
    id: "03",
    role: "INTERNSHIP",
    title: "INTERN",
    org: "IIT Hyderabad",
    dateRange: "DEC 2025 – PRESENT",
    status: "ACTIVE",
    bullets: [
      "Working on research systems and data infrastructure.",
      "Database design, optimization and scaling.",
      "Building reliable data pipelines and tools.",
    ],
    tags: ["DATABASES", "DATA SYSTEMS", "RESEARCH"],
    archiveId: "EXP-02",
    stamp: "research",
    rotate: 1.5,
    zIndex: 15,
    delay: 0.34,
  },
  {
    id: "04",
    role: "INTERNSHIP",
    title: "SOFTWARE DEVELOPMENT INTERN",
    org: "Matrix Capital",
    dateRange: "MAY 2025 – JUN 2025",
    status: "COMPLETE",
    bullets: [
      "Built and maintained web applications.",
      "Worked on frontend & backend modules.",
      "Collaborated with cross-functional teams.",
    ],
    tags: ["WEB DEVELOPMENT", "FULL STACK", "APIs"],
    archiveId: "EXP-03",
    stamp: null,
    rotate: 3,
    zIndex: 12,
    delay: 0.46,
  },
];

const journeyItems = [
  { entry: entries[3], year: "2025", title: "Matrix Capital" },
  { entry: entries[1], year: "2025", title: "GSSOC'26" },
  { entry: entries[2], year: "2026", title: "IIT Hyderabad" },
  { entry: entries[0], year: "2026", title: "Technical Head" },
] as const;

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".experience-journey-line", {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(".experience-journey-node", { opacity: 0, y: 18, scale: 0.92 });
      gsap.set(".experience-journey-card", { opacity: 0, y: 100 });
      gsap.set(".experience-journey-heading", { opacity: 0, y: 24 });
      gsap.set(".experience-journey-copy", { opacity: 0, y: 14 });
      gsap.set(".experience-footer-strip", { opacity: 0, y: 16 });
      gsap.set(
        [
          ".experience-paper--tech",
          ".experience-paper--oss",
          ".experience-paper--iit",
          ".experience-paper--matrix",
        ],
        { willChange: "transform" },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      tl.to(
        ".experience-title-copy",
        { y: -18, opacity: 0.9, duration: 0.22 },
        0,
      )
        .to(
          ".experience-paper--tech",
          {
            y: 38,
            x: -18,
            scale: 0.88,
            rotate: 0.5,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.06,
        )
        .to(
          ".experience-paper--oss",
          {
            y: 50,
            x: 18,
            scale: 0.9,
            rotate: -1.5,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.08,
        )
        .to(
          ".experience-paper--iit",
          {
            y: 42,
            x: 10,
            scale: 0.9,
            rotate: 0.5,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.1,
        )
        .to(
          ".experience-paper--matrix",
          {
            y: 34,
            x: -10,
            scale: 0.9,
            rotate: 1.5,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.12,
        )
        .to(
          ".experience-clip, .experience-tape, .experience-pin",
          {
            rotate: 7,
            y: -4,
            duration: 0.18,
            stagger: 0.04,
            ease: "power2.out",
          },
          0.12,
        )
        .to(
          ".experience-paper--tech",
          { x: -132, scale: 0.76, duration: 0.25, ease: "power2.inOut" },
          0.28,
        )
        .to(
          ".experience-paper--oss",
          { x: -42, scale: 0.76, duration: 0.25, ease: "power2.inOut" },
          0.3,
        )
        .to(
          ".experience-paper--iit",
          { x: 44, scale: 0.76, duration: 0.25, ease: "power2.inOut" },
          0.32,
        )
        .to(
          ".experience-paper--matrix",
          { x: 132, scale: 0.76, duration: 0.25, ease: "power2.inOut" },
          0.34,
        )
        .to(
          ".experience-journey-heading",
          { opacity: 1, y: 0, duration: 0.2 },
          0.44,
        )
        .to(
          ".experience-journey-copy",
          { opacity: 1, y: 0, duration: 0.2 },
          0.46,
        )
        .to(
          ".experience-journey-line",
          { scaleX: 1, duration: 0.32, ease: "power2.inOut" },
          0.5,
        )
        .to(
          ".experience-journey-node",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.28,
            ease: "power2.out",
          },
          0.56,
        )
        .to(
          ".experience-journey-card",
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.34,
            ease: "power2.out",
          },
          0.62,
        )
        .to(
          ".experience-top-scene",
          { opacity: 0.45, y: -12, duration: 0.18 },
          0.72,
        )
        .to(
          ".experience-footer-strip",
          { opacity: 1, y: 0, duration: 0.2 },
          0.8,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="experience"
      className="relative w-full overflow-hidden bg-[#111] text-[#F0EBE0]"
      style={{ minHeight: "180vh", isolation: "isolate" }}
    >
      <div
        className="experience-grid-motion pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(207,222,0,0.06), transparent 30%), radial-gradient(circle at 78% 18%, rgba(232,66,10,0.05), transparent 24%), radial-gradient(circle at 84% 72%, rgba(108,142,173,0.06), transparent 28%)",
          }}
        />
        <div className="experience-particles absolute inset-0">
          {[
            [12, 18, 1.8],
            [26, 72, 2.2],
            [44, 28, 1.4],
            [68, 16, 2.4],
            [79, 60, 1.9],
            [88, 84, 1.5],
          ].map(([left, top, size], index) => (
            <motion.span
              key={`${left}-${top}`}
              className="absolute rounded-full bg-[#CFDE00]"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                opacity: 0.22,
              }}
              animate={{
                y: [0, -8, 0],
                x: [0, 4, 0],
                opacity: [0.15, 0.32, 0.15],
              }}
              transition={{
                duration: 7 + index * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1800px] px-6 pb-4 pt-14 md:px-8 lg:px-12">
        <div className="experience-top-scene grid gap-8 lg:min-h-[78svh] lg:grid-cols-[minmax(330px,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <div className="experience-title-copy max-w-[520px]">
            <ExperienceHeader />
          </div>

          <div className="experience-desk relative min-h-[700px] lg:min-h-[780px]">
            <ExperienceCard
              entry={entries[0]}
              className="experience-paper experience-paper--tech"
              style={{
                width: "clamp(430px, 39vw, 540px)",
                left: "calc(50% - 270px)",
                top: -8,
                zIndex: 28,
              }}
            />
            <ExperienceCard
              entry={entries[1]}
              className="experience-paper experience-paper--oss"
              style={{
                width: "clamp(360px, 32vw, 430px)",
                left: "0%",
                top: 348,
                zIndex: 18,
              }}
              shadow="10px 10px 0 rgba(0,0,0,0.72)"
            />
            <ExperienceCard
              entry={entries[2]}
              className="experience-paper experience-paper--iit"
              style={{
                width: "clamp(390px, 34vw, 480px)",
                left: "calc(50% - 240px)",
                top: 436,
                zIndex: 22,
              }}
            />
            <ExperienceCard
              entry={entries[3]}
              className="experience-paper experience-paper--matrix"
              style={{
                width: "clamp(360px, 31vw, 440px)",
                right: "4%",
                top: 254,
                zIndex: 16,
              }}
            />
          </div>
        </div>

        <div className="experience-journey relative -mt-20 min-h-[34svh] pb-2 md:-mt-24 lg:-mt-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <motion.div
                className={`${anton.className} experience-journey-heading uppercase select-none`}
                style={{
                  fontSize: "clamp(44px, 6vw, 88px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.01em",
                  color: "#F0EBE0",
                }}
              >
                EXPERIENCE JOURNEY
              </motion.div>
              <motion.p className="experience-journey-copy mt-3 max-w-[520px] font-[var(--font-archivo),sans-serif] text-[14px] leading-[1.6] text-[#C8C0B4] md:text-[15px]">
                Papers reorganize themselves into a clean journey line as you
                keep scrolling.
              </motion.p>
            </div>
            <ExperienceSystemLog />
          </div>

          <div className="relative mt-6">
            <div className="experience-journey-line absolute left-0 right-0 top-[64px] h-[2px] origin-left bg-[#CFDE00]" />
            <div className="grid gap-5 md:grid-cols-4">
              {journeyItems.map(({ entry, year, title }) => (
                <div key={entry.id} className="relative pt-12 md:pt-14">
                  <div className="experience-journey-node absolute left-1/2 top-10 z-20 flex -translate-x-1/2 flex-col items-center">
                    <button
                      type="button"
                      className="group flex h-9 w-9 items-center justify-center border-[2px] border-[#111] bg-[#F0EBE0] text-[#111] shadow-[4px_4px_0_rgba(0,0,0,0.55)] transition-transform duration-200 hover:scale-110"
                      aria-label={`${year} ${title}`}
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-[#E8420A] transition-transform duration-200 group-hover:scale-125" />
                    </button>
                    <span className="mt-1.5 font-mono text-[10px] font-[700] tracking-[0.12em] text-[#CFDE00]">
                      {year}
                    </span>
                  </div>

                  <ExperienceCard
                    entry={entry}
                    density="compact"
                    positioned={false}
                    className="experience-journey-card"
                    style={{ width: "100%", marginTop: 12 }}
                    shadow="8px 8px 0 rgba(0,0,0,0.58)"
                  />

                  <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-[700] uppercase tracking-[0.1em] text-[#888]">
                    <span className="text-[#F0EBE0]">{year}</span>
                    <span>/</span>
                    <span>{title}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="experience-footer-strip mt-4">
              <ExperienceFooter />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
