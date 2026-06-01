"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Anton } from "next/font/google";
import ExperienceCard, { type ExperienceEntry } from "./ExperienceCard";
import ExperienceSystemLog from "./ExperienceSystemLog";
import { BlurIn } from "@/components/ui/react-bits";

const anton = Anton({ weight: "400", subsets: ["latin"] });

const entries: ExperienceEntry[] = [
  {
    id: "04",
    role: "INTERNSHIP",
    title: "Software development intern",
    org: "Matrix Capital",
    dateRange: "MAY 2025 – JUN 2025",
    status: "COMPLETE",
    bullets: [
      "Built research infrastructure for scalable systems.",
      "Web and API improvements.",
      "Cross-team delivery.",
    ],
    tags: ["Web", "APIs"],
    archiveId: "EXP-04",
    rotate: -2,
    zIndex: 12,
    delay: 0.34,
    accent: "barcode",
  },
  {
    id: "03",
    role: "INTERNSHIP",
    title: "Research systems",
    org: "IIT Hyderabad",
    dateRange: "DEC 2025 – PRESENT",
    status: "ACTIVE",
    bullets: ["Database optimization.", "Data pipelines.", "System tooling."],
    tags: ["Databases", "Data Systems"],
    archiveId: "EXP-03",
    stamp: "research",
    rotate: 1,
    zIndex: 15,
    delay: 0.26,
  },
  {
    id: "01",
    role: "Primary role",
    title: "Technical head",
    org: "Mozilla Firefox Club",
    location: "VIT Vellore",
    dateRange: "JAN 2026 – PRESENT",
    status: "ACTIVE",
    bullets: [
      "Lead technical initiatives and open-source programs.",
      "Mentor teams and design resilient systems.",
    ],
    tags: ["Open Source", "Systems"],
    archiveId: "EXP-01",
    rotate: -1,
    zIndex: 20,
    delay: 0.1,
    accent: "tape",
  },
  {
    id: "02",
    role: "CONTRIBUTOR",
    title: "Open source contributor",
    org: "GirlScript Summer of Code",
    dateRange: "2026",
    status: "CONTRIBUTING",
    badgeLabel: "GSSOC'26",
    bullets: ["Community, docs, and fixes."],
    tags: [],
    archiveId: "EXP-02",
    stamp: "code",
    rotate: 2,
    zIndex: 10,
    delay: 0.18,
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  // track small screens to adjust card density and spacing
  const [isSmall, setIsSmall] = useState(false);

  // client-only viewport sync — used to choose compact card density on small screens
  useLayoutEffect(() => {
    const sync = () => setIsSmall(window.innerWidth < 768);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  // No GSAP timeline — render the experience section statically to avoid
  // SPA timing/layout issues.
  useLayoutEffect(() => {
    // Intentionally empty: we avoid running any GSAP/ScrollTrigger code here.
    return () => {};
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="experience"
      className="relative w-full overflow-hidden bg-[#080808] text-[#ECE7DF]"
      style={{ minHeight: "92vh", isolation: "isolate" }}
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
        <div className="experience-kicker grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_260px] items-start gap-8">
          <div>
            <span className="font-mono text-[12px] font-black tracking-[0.12em] text-[#A14A32]">
              + EXPERIENCE
            </span>
            <h2
              className={`mt-4`}
              style={{ fontSize: "clamp(4.3rem,8vw,8rem)", lineHeight: 0.92 }}
            >
              <BlurIn>
                <span
                  style={{
                    transform: "rotate(-0.6deg) scaleY(0.96)",
                    transformOrigin: "left top",
                    fontFamily:
                      "'Luckiest Guy', Genty, Grobold, 'Bowlby One SC', Anton, sans-serif",
                    letterSpacing: "-0.06em",
                    textTransform: "uppercase",
                    lineHeight: 0.9,
                    fontWeight: 800,
                    WebkitFontSmoothing: "antialiased",
                    textRendering: "optimizeLegibility",
                    display: "block",
                    textShadow: "0 0 0.8px rgba(0,0,0,0.02)",
                  }}
                >
                  EXPERIENCE
                </span>
                <span
                  style={{
                    transform: "rotate(-0.6deg) scaleY(0.96)",
                    transformOrigin: "left top",
                    fontFamily:
                      "'Luckiest Guy', Genty, Grobold, 'Bowlby One SC', Anton, sans-serif",
                    textTransform: "uppercase",
                    lineHeight: 0.9,
                    fontWeight: 800,
                    letterSpacing: "0.175em",
                    WebkitFontSmoothing: "antialiased",
                    textRendering: "optimizeLegibility",
                    display: "block",
                    marginTop: 6,
                    textShadow: "0 0 0.8px rgba(0,0,0,0.02)",
                  }}
                >
                  JOURNEY
                </span>
              </BlurIn>
            </h2>

            <div style={{ marginTop: 12 }}>
              <p
                className="max-w-[320px] md:max-w-[420px]"
                style={{
                  color: "#C8C0B4",
                  fontSize: 15,
                  lineHeight: 1.5,
                }}
              >
                Building products, communities, and systems.{" "}
                <span style={{ color: "#8A8B6D", marginLeft: 8 }}>
                  2025 → Present
                </span>
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <ExperienceSystemLog />
          </div>
        </div>

        <div className="relative mt-8">
          <div className="experience-rail absolute left-0 right-0 top-[40px] md:top-[52px] h-[3px] bg-[#333]">
            <div
              className="experience-rail-fill absolute left-0 top-0 bottom-0 origin-left"
              style={{
                background: "#8A8B6D",
                transformOrigin: "left center",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className="relative pt-16 md:pt-[calc(6rem+10px)]"
              >
                <div className="experience-node absolute left-1/2 top-0 z-20 flex -translate-x-1/2 flex-col items-center">
                  <span className="flex h-10 w-10 items-center justify-center border-[3px] border-[#111] bg-[#ECE7DF] shadow-[5px_5px_0_rgba(0,0,0,0.55)]">
                    <i className="h-3 w-3 rounded-full bg-[#A14A32]" />
                  </span>
                  <b className="mt-[-2px] font-mono text-[10px] tracking-[0.14em] text-[#8A8B6D]">
                    {index < 2 ? "2025" : "2026"}
                  </b>
                </div>

                {/* vertical connector from node to card */}
                <div
                  className="experience-connector absolute left-1/2 top-[36px] md:top-[48px] -translate-x-1/2"
                  style={{ width: 2, height: "6rem", background: "#333" }}
                />

                <ExperienceCard
                  entry={entry}
                  data-final-rotate={entry.rotate}
                  density={isSmall ? "compact" : "regular"}
                  positioned={false}
                  className="experience-card-once"
                  style={{ width: "100%", marginTop: 0 }}
                  shadow="8px 8px 0 rgba(0,0,0,0.62)"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-4 border-y-[3px] border-[#333] font-mono text-[11px] font-black tracking-[0.12em] text-[#777]">
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
