"use client";

/**
 * Skills.tsx
 *
 * Neo-brutalist skills section. Mirrors the design language of Hero + About:
 * black / cream / acid-yellow / orange / steel-blue palette.
 *
 * Accepts optional MotionValue props from SkillsTransition for cinematic
 * scroll-driven entry. Falls back to whileInView standalone.
 */

import { motion, type MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { easings } from "@/lib/motion";
import SkillsHeader from "./SkillsHeader";
import SkillsCoreGrid from "./SkillsCoreGrid";
import SkillsLanguages from "./SkillsLanguages";
import SkillsExploring from "./SkillsExploring";
import SkillsFooter from "./SkillsFooter";
import SkillsPhilosophy from "./SkillsPhilosophy";

interface SkillsProps {
  viewportTransition?: boolean;
  shellOpacity?: MotionValue<number>;
  headerY?: MotionValue<number>;
  headerOpacity?: MotionValue<number>;
  gridY?: MotionValue<number>;
  gridOpacity?: MotionValue<number>;
  gridScale?: MotionValue<number>;
  bottomRowY?: MotionValue<number>;
  bottomRowOpacity?: MotionValue<number>;
  footerY?: MotionValue<number>;
  footerOpacity?: MotionValue<number>;
}

export default function Skills({
  viewportTransition = false,
  shellOpacity: shellOpacityProp,
  headerY: headerYProp,
  headerOpacity: headerOpacityProp,
  gridY: gridYProp,
  gridOpacity: gridOpacityProp,
  gridScale: gridScaleProp,
  bottomRowY: bottomRowYProp,
  bottomRowOpacity: bottomRowOpacityProp,
  footerY: footerYProp,
  footerOpacity: footerOpacityProp,
}: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "start 0%"],
  });

  // Fallbacks — resolve to "fully visible" from local scroll
  const shellOpacity  = shellOpacityProp  ?? useTransform(scrollYProgress, [0.0, 0.12], [0, 1]);
  const headerY       = headerYProp       ?? useTransform(scrollYProgress, [0.04, 0.22], [60, 0]);
  const headerOpacity = headerOpacityProp ?? useTransform(scrollYProgress, [0.04, 0.22], [0, 1]);
  const gridY         = gridYProp         ?? useTransform(scrollYProgress, [0.10, 0.36], [48, 0]);
  const gridOpacity   = gridOpacityProp   ?? useTransform(scrollYProgress, [0.10, 0.36], [0, 1]);
  const gridScale     = gridScaleProp     ?? useTransform(scrollYProgress, [0.10, 0.36], [0.97, 1]);
  const bottomRowY    = bottomRowYProp    ?? useTransform(scrollYProgress, [0.22, 0.50], [40, 0]);
  const bottomRowOpacity = bottomRowOpacityProp ?? useTransform(scrollYProgress, [0.22, 0.50], [0, 1]);
  const footerY       = footerYProp       ?? useTransform(scrollYProgress, [0.36, 0.60], [24, 0]);
  const footerOpacity = footerOpacityProp ?? useTransform(scrollYProgress, [0.36, 0.60], [0, 1]);

  const standalone = !viewportTransition;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#EEE7DC] overflow-hidden"
      style={{ height: viewportTransition ? "100%" : undefined }}
    >
      {/* Outer border shell */}
      <motion.div
        className="relative mx-auto flex flex-col"
        style={{
          border: "5px solid #111",
          maxWidth: "100%",
          opacity: shellOpacity,
          height: viewportTransition ? "100%" : undefined,
        }}
      >
        {/* ── TOP HEADER ROW ────────────────────────────────────────── */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }}>
          <SkillsHeader standalone={standalone} />
        </motion.div>

        {/* ── CORE SKILLS GRID ──────────────────────────────────────── */}
        <motion.div
          style={{ y: gridY, opacity: gridOpacity, scale: gridScale }}
        >
          <SkillsCoreGrid standalone={standalone} />
        </motion.div>

        {/* ── BOTTOM ROW: Languages + Exploring ─────────────────────── */}
        <motion.div
          className="grid"
          style={{
            gridTemplateColumns: "38% 62%",
            y: bottomRowY,
            opacity: bottomRowOpacity,
          }}
        >
          <SkillsLanguages standalone={standalone} />
          <SkillsExploring standalone={standalone} />
        </motion.div>

        {/* ── FOOTER ────────────────────────────────────────────────── */}
        <motion.div style={{ y: footerY, opacity: footerOpacity }}>
          <SkillsFooter viewportTransition={viewportTransition} />
        </motion.div>
      </motion.div>
    </section>
  );
}
