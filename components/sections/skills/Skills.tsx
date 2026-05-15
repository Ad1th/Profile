"use client";

/**
 * Skills.tsx
 *
 * Flexible section component that works in two modes:
 *
 * 1. **Cinematic mode** (rare, inside a hypothetical cinematic container):
 *    - Receives MotionValue props for scroll-driven animations
 *    - Receives viewportTransition=true flag
 *
 * 2. **Standalone mode** (normal vertical scroll):
 *    - No MotionValue props provided
 *    - Uses whileInView animations triggered by viewport visibility
 *    - Renders naturally in document flow
 *
 * The component automatically detects which mode it's in and uses appropriate animations.
 * Currently, Skills always renders in standalone mode with whileInView animations.
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
  // Skills is now always rendered in standalone mode with whileInView animations
  // No cinematic transition props needed
}

export default function Skills({}: SkillsProps) {
  // Skills renders naturally with whileInView animations
  // No cinematic mode, no transition props, no scroll orchestration
  const standalone = true;

  return (
    <section className="relative w-full bg-[#EEE7DC] overflow-hidden">
      {/* Outer border shell */}
      <motion.div
        className="relative mx-auto flex flex-col"
        style={{
          border: "5px solid #111",
          maxWidth: "100%",
        }}
      >
        {/* ── TOP HEADER ROW ────────────────────────────────────────── */}
        <div>
          <SkillsHeader standalone={standalone} />
        </div>

        {/* ── CORE SKILLS GRID ──────────────────────────────────────── */}
        <div>
          <SkillsCoreGrid standalone={standalone} />
        </div>

        {/* ── BOTTOM ROW: Languages + Exploring ─────────────────────── */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "38% 62%",
          }}
        >
          <SkillsLanguages standalone={standalone} />
          <SkillsExploring standalone={standalone} />
        </div>

        {/* ── FOOTER ────────────────────────────────────────────────── */}
        <div>
          <SkillsFooter />
        </div>
      </motion.div>
    </section>
  );
}
