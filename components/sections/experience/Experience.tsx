"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Anton } from "next/font/google";
import ExperienceCard, { type ExperienceEntry } from "./ExperienceCard";
import ExperienceSystemLog from "./ExperienceSystemLog";
import { BlurIn } from "@/components/ui/react-bits";

const anton = Anton({ weight: "400", subsets: ["latin"] });

const entries: ExperienceEntry[] = [
  // Reordered: Matrix (SDI), IIT Hyderabad (Intern), Technical Head, Open Source Contributor
  {
    id: "04",
    role: "INTERNSHIP",
    title: "SOFTWARE DEVELOPMENT INTERN",
    org: "Matrix Capital",
    dateRange: "MAY 2025 – JUN 2025",
    status: "COMPLETE",
    bullets: [
      "Built and maintained web applications.",
      "Worked on frontend and backend modules.",
      "Collaborated with cross-functional teams.",
    ],
    tags: ["WEB DEVELOPMENT", "FULL STACK", "APIs"],
    archiveId: "EXP-04",
    rotate: 2,
    zIndex: 12,
    delay: 0.34,
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
    archiveId: "EXP-03",
    stamp: "research",
    rotate: 1,
    zIndex: 15,
    delay: 0.26,
  },
  {
    id: "01",
    role: "PRIMARY ROLE",
    title: "TECHNICAL HEAD",
    org: "Mozilla Firefox Club",
    location: "VIT Vellore",
    dateRange: "JAN 2026 – PRESENT",
    status: "ACTIVE",
    bullets: [
      "Leading technical initiatives at the Mozilla Firefox Club.",
      "Previously served as Technical Core, promoting open-source technologies and collaborative development.",
    ],
    tags: ["OPEN SOURCE", "SYSTEMS", "BACKEND"],
    archiveId: "EXP-01",
    rotate: -1,
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
    rotate: -2,
    zIndex: 10,
    delay: 0.18,
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Initial: hide/compact the timeline rail and scramble cards into a heap
      gsap.set(".experience-rail", {
        scaleX: 0,
        transformOrigin: "left center",
        autoAlpha: 0,
      });

      gsap.set(".experience-node", { y: 18, autoAlpha: 0, scale: 0.9 });

      gsap.set(".experience-card-once", (i) => ({
        x: gsap.utils.random(-160, 160),
        y: gsap.utils.random(-120, 120),
        rotation: gsap.utils.random(-32, 32),
        scale: gsap.utils.random(0.9, 1.05),
        autoAlpha: 0,
        transformOrigin: "50% 50%",
      }));

      // Build a paused timeline; we'll trigger it when the section scrolls into view.
      const tl = gsap.timeline({ paused: true });

      tl.from(
        ".experience-kicker",
        { y: 18, duration: 0.32, ease: "power2.out" },
        0,
      )
        .to(
          ".experience-rail",
          { autoAlpha: 1, scaleX: 1, duration: 0.6, ease: "power2.inOut" },
          0.08,
        )
        .to(
          ".experience-card-once",
          {
            x: 0,
            y: 0,
            rotation: (i, el) => {
              const v = el.getAttribute("data-final-rotate");
              return v ? parseFloat(v) : 0;
            },
            scale: 1,
            autoAlpha: 1,
            stagger: { each: 0.12, from: "random" },
            duration: 0.9,
            ease: "back.out(1.6)",
          },
          0.24,
        )
        .to(
          ".experience-node",
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            stagger: 0.12,
            duration: 0.36,
            ease: "back.out(1.7)",
          },
          0.42,
        );

      // ScrollTrigger: play the prepared timeline when section enters view.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          // small cooked delay so the heap lingers briefly
          gsap.delayedCall(0.35, () => tl.play());
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="experience"
      className="relative w-full overflow-hidden bg-[#111] text-[#F0EBE0]"
      style={{ minHeight: "100vh", isolation: "isolate" }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.026) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.026) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 flex min-h-screen flex-col px-8 pb-8 pt-16 lg:px-14">
        <div className="experience-kicker grid grid-cols-[minmax(0,1fr)_260px] items-start gap-8">
          <div>
            <span className="font-mono text-[12px] font-black tracking-[0.18em] text-[#E8420A]">
              + EXPERIENCE
            </span>
            <h2
              className={`${anton.className} mt-4 whitespace-nowrap uppercase`}
              style={{
                fontSize: "clamp(56px, 7.2vw, 126px)",
                lineHeight: 0.88,
              }}
            >
              <BlurIn>EXPERIENCE JOURNEY</BlurIn>
            </h2>
          </div>
          <ExperienceSystemLog />
        </div>

        <div className="relative mt-8 flex-1">
          <div className="experience-rail absolute left-0 right-0 top-[52px] h-[3px] bg-[#CFDE00]" />
          <div className="grid grid-cols-4 gap-5">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className="relative"
                style={{ paddingTop: "calc(6rem + 10px)" }}
              >
                <div className="experience-node absolute left-1/2 top-0 z-20 flex -translate-x-1/2 flex-col items-center">
                  <span className="flex h-10 w-10 items-center justify-center border-[3px] border-[#111] bg-[#F0EBE0] shadow-[5px_5px_0_rgba(0,0,0,0.55)]">
                    <i className="h-3 w-3 rounded-full bg-[#E8420A]" />
                  </span>
                  <b className="mt-2 font-mono text-[10px] tracking-[0.14em] text-[#CFDE00]">
                    {index < 2 ? "2025" : "2026"}
                  </b>
                </div>

                <ExperienceCard
                  entry={entry}
                  data-final-rotate={entry.rotate}
                  density="regular"
                  positioned={false}
                  className="experience-card-once"
                  style={{ width: "100%", marginTop: 0 }}
                  shadow="8px 8px 0 rgba(0,0,0,0.62)"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto grid grid-cols-4 border-y-[3px] border-[#333] font-mono text-[11px] font-black tracking-[0.12em] text-[#777]">
          {["BUILDING.", "SHIPPING.", "LEADING.", "LEARNING."].map((item) => (
            <span
              key={item}
              className="border-r border-[#333] px-4 py-4 last:border-r-0"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
