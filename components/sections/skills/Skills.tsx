"use client";

/**
 * Skills.tsx — CINEMATIC RECEIVER (NOT ORCHESTRATOR)
 *
 * CRITICAL: This component receives scroll orchestration from CinematicSequence.
 *
 * It does NOT:
 * - Call useScroll
 * - Create fallback transforms
 * - Track scroll progress
 * - Own any viewport logic
 *
 * It ONLY:
 * - Accepts MotionValue props from parent
 * - Renders with those transforms
 * - Uses whileInView for standalone (mobile) mode
 */

import { motion, type MotionValue } from "framer-motion";
import { easings } from "@/lib/motion";
import SkillsHeader from "./SkillsHeader";
import SkillsCoreGrid from "./SkillsCoreGrid";
import SkillsLanguages from "./SkillsLanguages";
import SkillsExploring from "./SkillsExploring";
import SkillsFooter from "./SkillsFooter";
import SkillsPhilosophy from "./SkillsPhilosophy";

interface SkillsProps {
  viewportTransition?: boolean;
  transitionProgress?: MotionValue<number>;
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
  transitionProgress,
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
  // ─── CINEMATIC MODE ─────────────────────────────────────────────────────
  // When viewportTransition=true, use the MotionValue props from parent.
  // When viewportTransition=false (standalone/mobile), use whileInView instead.
  // Do NOT create fallback transforms or useScroll.

  const standalone = !viewportTransition && !transitionProgress;

  return (
    <section className="relative w-full bg-[#EEE7DC] overflow-hidden">
      {/* Outer border shell */}
      <motion.div
        className="relative mx-auto flex flex-col"
        style={{
          border: "5px solid #111",
          maxWidth: "100%",
          opacity: shellOpacityProp,
        }}
      >
        {/* ── TOP HEADER ROW ────────────────────────────────────────── */}
        <motion.div style={{ y: headerYProp, opacity: headerOpacityProp }}>
          <SkillsHeader
            standalone={standalone}
            transitionProgress={transitionProgress}
          />
        </motion.div>

        {/* ── CORE SKILLS GRID ──────────────────────────────────────── */}
        <motion.div
          style={{
            y: gridYProp,
            opacity: gridOpacityProp,
            scale: gridScaleProp,
          }}
        >
          <SkillsCoreGrid
            standalone={standalone}
            transitionProgress={transitionProgress}
          />
        </motion.div>

        {/* ── BOTTOM ROW: Languages + Exploring ─────────────────────── */}
        <motion.div
          className="grid"
          style={{
            gridTemplateColumns: "38% 62%",
            y: bottomRowYProp,
            opacity: bottomRowOpacityProp,
          }}
        >
          <SkillsLanguages
            standalone={standalone}
            transitionProgress={transitionProgress}
          />
          <SkillsExploring
            standalone={standalone}
            transitionProgress={transitionProgress}
          />
        </motion.div>

        {/* ── FOOTER ────────────────────────────────────────────────── */}
        <motion.div style={{ y: footerYProp, opacity: footerOpacityProp }}>
          <SkillsFooter
            viewportTransition={viewportTransition}
            transitionProgress={transitionProgress}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
