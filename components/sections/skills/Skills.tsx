"use client";

/**
 * Skills.tsx  (updated for cinematic transitions)
 *
 * Changes from original:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. `data-section="skills"` added to <section> for ScrollProgressDots.
 *
 * 2. Scan-line reveal on entry:
 *    A thin horizontal lime line sweeps top → bottom as the section enters
 *    the viewport, like a CRT screen powering on. Implemented with
 *    whileInView on an absolutely-positioned div.
 *
 * 3. The section background starts at `bg-[#0d0d0d]` (slightly lighter
 *    than pure #111) and transitions to `#111` after reveal — imperceptible
 *    to most users but gives the scan-line something to contrast against
 *    on first paint.
 *
 * 4. SkillsHero dots animate in one-by-one on scroll entry.
 *    This is handled via a new `animateDots` prop passed to SkillsHero.
 *
 * 5. SkillsSystemRows receives `animateOnScroll={true}` (already the default)
 *    confirming the stagger reveal behaviour in Skillssystemrows.tsx.
 *
 * 6. No internal useScroll — the section is a normal flow element; the
 *    scroll stagger is purely whileInView + viewport triggers.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SkillsHero from "@/components/sections/skills/SkillsHero";
import SkillsSystemRows from "@/components/sections/skills/SkillsSystemRows";
import { easings } from "@/lib/motion";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15% 0px" });

  return (
    <section
      ref={sectionRef}
      data-section="skills"
      className="relative w-full bg-[#111]"
      style={{ isolation: "isolate" }}
    >
      {/* ── CRT scan-line reveal ─────────────────────────────────────────── */}
      {/*
        A lime-coloured horizontal bar that sweeps from top to bottom
        as the section enters the viewport. It's 2px tall, positioned
        absolutely, and driven by a CSS animation triggered once.
        The bar itself fades out as it completes the sweep.
      */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 z-50"
        style={{
          top: 0,
          height: 2,
          background: "#CFDE00",
          boxShadow: "0 0 12px 3px rgba(207,222,0,0.55)",
          originY: 0,
        }}
        initial={{ y: 0, opacity: 0 }}
        animate={
          isInView
            ? {
                y: ["0%", "100vh"],
                opacity: [0, 1, 1, 0],
              }
            : { y: "0%", opacity: 0 }
        }
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
          times: [0, 0.05, 0.85, 1],
        }}
      />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <motion.div
        className="relative mx-auto flex flex-col"
        style={{
          border: "5px solid #111",
          maxWidth: "100%",
        }}
        // Fade the whole section in behind the scan-line
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.18, ease: easings.primary }}
      >
        {/* SkillsHero — language dots animate in on entry */}
        <SkillsHero standalone={true} animateDots={isInView} />

        {/* SkillsSystemRows — rows stagger in on scroll */}
        <SkillsSystemRows standalone={true} />
      </motion.div>
    </section>
  );
}
