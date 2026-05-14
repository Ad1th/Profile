"use client";

/**
 * CinematicSequence.tsx
 *
 * SINGLE SOURCE OF TRUTH for the Hero→About→Skills cinematic sequence.
 *
 * Architecture:
 * - Owns ALL scroll tracking for the cinematic sequence
 * - Calculates scroll height based on animation budgets
 * - Manages ONE sticky viewport (visually pinned to screen)
 * - Orchestrates Hero/About/Skills horizontal rail movement
 * - Cleans up sticky behavior so Experience appears immediately after
 *
 * The viewport stays visually pinned while vertical scroll drives the animations.
 *
 * CRITICAL: After this section, sticky behavior ENDS and normal scrolling resumes.
 * This creates a clean handoff to Experience section below.
 */

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/about/About";
import Skills from "@/components/sections/skills/Skills";

// ─── SCROLL BUDGET ──────────────────────────────────────────────────────────
/**
 * PHASE 1: Hero → About (vertical scroll distance in pixels)
 * This phase handles the crossfade and composition building.
 * Large budget prevents spring bleed-through into Phase 2.
 */
const PHASE1_PX = 1000;

/**
 * PHASE 2: About → Skills (horizontal pan distance in pixels)
 * This phase handles the horizontal rail movement while Skills enters.
 * Generous budget ensures smooth, non-snappy panning.
 */
const PHASE2_PX = 1200;

/**
 * Total scroll height = viewport height + both animation budgets
 * This is how much the page must scroll to complete the entire cinematic sequence.
 */
const TOTAL_SCROLL_PX = PHASE1_PX + PHASE2_PX;

/**
 * Normalized phase boundary (0-1 range)
 * Phase 1 progress: [0, PHASE1_END]
 * Phase 2 progress: [PHASE1_END, 1]
 */
const PHASE1_END = PHASE1_PX / TOTAL_SCROLL_PX; // ~0.455

// ─── SPRING CONFIGS ─────────────────────────────────────────────────────────
/**
 * Spring for Hero composition (paper uncrumple, icon rotation).
 * Deliberate, weighty feel. Prevents bounce-through to Phase 2.
 */
function useHeroSpring(raw: MotionValue<number>) {
  return useSpring(raw, {
    stiffness: 55,
    damping: 28,
    mass: 2.8,
    restDelta: 0.0005,
  });
}

/**
 * Spring for About section animations (edges, fades).
 * Coordinated with Hero spring for seamless transition.
 */
function useAboutSpring(raw: MotionValue<number>) {
  return useSpring(raw, {
    stiffness: 38,
    damping: 30,
    mass: 3.0,
    restDelta: 0.0005,
  });
}

/**
 * Spring for horizontal rail pan and Skills entrance.
 * Slightly heavier to feel deliberate and architectural.
 */
function useRailSpring(raw: MotionValue<number>) {
  return useSpring(raw, {
    stiffness: 36,
    damping: 28,
    mass: 3.2,
    restDelta: 0.0005,
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// DESKTOP CINEMATIC SEQUENCE
// ═══════════════════════════════════════════════════════════════════════════════

interface CinematicSequenceDesktopProps {
  stageRef: React.RefObject<HTMLElement | null>;
}

function CinematicSequenceDesktop({ stageRef }: CinematicSequenceDesktopProps) {
  const { scrollYProgress: rawProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 1: Hero → About (vertical-driven crossfade)
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Phase 1 progress: clamped to [0, PHASE1_END]
   * Once we enter Phase 2, this stays frozen at 1.
   * This prevents rail X from moving during Hero→About transition.
   */
  const phase1Progress = useTransform(rawProgress, [0, PHASE1_END], [0, 1], {
    clamp: true,
  });

  const phase1HeroSpring = useHeroSpring(phase1Progress);
  const phase1AboutSpring = useAboutSpring(phase1Progress);

  // ─── Hero animations ─────────────────────────────────────────────────────
  const heroOpacity = useTransform(phase1AboutSpring, [0.1, 0.7], [1, 0]);
  const heroY = useTransform(phase1AboutSpring, [0.04, 0.7], [0, -52]);
  const heroScale = useTransform(phase1AboutSpring, [0.04, 0.65], [1, 0.965]);

  // ─── About shell + build animations ─────────────────────────────────────
  const shellOpacity = useTransform(phase1AboutSpring, [0.2, 0.55], [0, 1]);

  const buildY = useTransform(
    phase1AboutSpring,
    [0.24, 0.68, 0.84, 1.0],
    [76, -4, 1, 0],
  );
  const buildOpacity = useTransform(phase1AboutSpring, [0.24, 0.65], [0, 1]);
  const buildScale = useTransform(
    phase1AboutSpring,
    [0.24, 0.68, 0.84, 1.0],
    [0.93, 1.02, 0.99, 1],
  );

  // ─── Paper uncrumple animation ──────────────────────────────────────────
  const paperOpacity = useTransform(phase1HeroSpring, [0.24, 0.5], [0, 1]);
  const paperScale = useTransform(
    phase1HeroSpring,
    [0.24, 0.34, 0.5, 0.66, 0.8, 0.9],
    [0.58, 0.76, 0.95, 1.03, 0.99, 1],
  );
  const paperRotate = useTransform(
    phase1HeroSpring,
    [0.24, 0.34, 0.5, 0.66, 0.8, 0.9],
    [-14, -7, 2.5, 0.8, -0.3, 0],
  );
  const paperSkewX = useTransform(
    phase1HeroSpring,
    [0.24, 0.36, 0.62, 0.78],
    [-10, -4, 1.5, 0],
  );
  const paperSkewY = useTransform(
    phase1HeroSpring,
    [0.24, 0.36, 0.62, 0.78],
    [5, 2.5, -0.8, 0],
  );
  const paperFilter = useTransform(
    phase1HeroSpring,
    [0.24, 0.34, 0.58, 0.72],
    ["blur(10px)", "blur(6px)", "blur(1.5px)", "blur(0px)"],
  );
  const paperClip = useTransform(
    phase1HeroSpring,
    [0.24, 0.34, 0.5, 0.66, 0.78],
    [
      "polygon(14% 5%, 95% 0%, 86% 95%, 3% 100%)",
      "polygon(6% 3%, 97% 2%, 94% 96%, 4% 96%)",
      "polygon(1% 1%, 99% 2%, 98% 99%, 0% 98%)",
      "polygon(0% 0%, 100% 1%, 99% 100%, 0% 99%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
  );

  // ─── About section elements ──────────────────────────────────────────────
  const bioClip = useTransform(
    phase1AboutSpring,
    [0.3, 0.68],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const bioOpacity = useTransform(phase1AboutSpring, [0.3, 0.66], [0, 1]);
  const bioY = useTransform(phase1AboutSpring, [0.3, 0.68], [22, 0]);

  const backendY = useTransform(phase1AboutSpring, [0.36, 0.74], [56, 0]);
  const backendOpacity = useTransform(phase1AboutSpring, [0.36, 0.72], [0, 1]);
  const backendScale = useTransform(phase1AboutSpring, [0.36, 0.74], [0.94, 1]);

  const hardwareX = useTransform(phase1AboutSpring, [0.38, 0.76], [-68, 0]);
  const hardwareOpacity = useTransform(phase1AboutSpring, [0.38, 0.74], [0, 1]);

  const interestsY = useTransform(phase1AboutSpring, [0.42, 0.8], [52, 0]);
  const interestsOpacity = useTransform(
    phase1AboutSpring,
    [0.42, 0.78],
    [0, 1],
  );
  const interestsScale = useTransform(
    phase1AboutSpring,
    [0.42, 0.8],
    [0.95, 1],
  );

  const builtScale = useTransform(
    phase1AboutSpring,
    [0.46, 0.8, 0.9, 1.0],
    [1.1, 1.02, 0.993, 1],
  );
  const builtOpacity = useTransform(phase1AboutSpring, [0.46, 0.78], [0, 1]);

  const footerY = useTransform(phase1AboutSpring, [0.54, 1.0], [36, 0]);
  const footerOpacity = useTransform(phase1AboutSpring, [0.54, 0.92], [0, 1]);

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 2: About → Skills (horizontal rail pan)
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Phase 2 progress: 0 during ALL of Phase 1, then [0, 1] during Phase 2
   * CRITICAL: Clamped so it cannot go negative or above 1.
   * This ensures the rail does NOT move until Hero→About is visually complete.
   */
  const phase2Progress = useTransform(rawProgress, [PHASE1_END, 1], [0, 1], {
    clamp: true,
  });

  const phase2RailSpring = useRailSpring(phase2Progress);

  // ─── Horizontal rail movement ───────────────────────────────────────────
  /**
   * Rail translates from 0vw (About visible) to -100vw (Skills visible).
   * Driven by phase2RailSpring so it stays static during Phase 1.
   */
  const railX = useTransform(phase2RailSpring, [0.0, 1.0], ["0vw", "-100vw"]);

  // ─── About exit animations (as it slides left) ──────────────────────────
  const aboutExitScale = useTransform(
    phase2RailSpring,
    [0.0, 0.25],
    [1, 0.975],
  );
  const aboutExitX = useTransform(phase2RailSpring, [0.02, 0.28], [0, -6]);

  // ─── Skills entrance animations ──────────────────────────────────────────
  const skillsScale = useTransform(phase2RailSpring, [0.05, 0.78], [0.985, 1]);
  const skillsOpacity = useTransform(phase2RailSpring, [0.03, 0.52], [0, 1]);

  const skillsShellOpacity = useTransform(
    phase2RailSpring,
    [0.08, 0.28],
    [0, 1],
  );
  const skillsHeaderY = useTransform(phase2RailSpring, [0.1, 0.3], [22, 0]);
  const skillsHeaderOpacity = useTransform(
    phase2RailSpring,
    [0.1, 0.24],
    [0, 1],
  );
  const skillsGridY = useTransform(phase2RailSpring, [0.18, 0.44], [20, 0]);
  const skillsGridOpacity = useTransform(
    phase2RailSpring,
    [0.18, 0.36],
    [0, 1],
  );
  const skillsGridScale = useTransform(
    phase2RailSpring,
    [0.18, 0.48],
    [0.98, 1],
  );
  const skillsBottomY = useTransform(phase2RailSpring, [0.28, 0.54], [18, 0]);
  const skillsBottomOpacity = useTransform(
    phase2RailSpring,
    [0.28, 0.46],
    [0, 1],
  );
  const skillsFooterY = useTransform(phase2RailSpring, [0.44, 0.7], [16, 0]);
  const skillsFooterOpacity = useTransform(
    phase2RailSpring,
    [0.44, 0.62],
    [0, 1],
  );
  const skillsProgress = useTransform(phase2RailSpring, [0.0, 1.0], [0, 1]);

  return (
    <section
      ref={stageRef}
      className="relative overflow-hidden bg-[#111]"
      style={{
        height: `calc(100svh + ${TOTAL_SCROLL_PX}px)`,
      }}
    >
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* STICKY VIEWPORT: Pinned to screen, drives all cinematic animations  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-30 overflow-hidden bg-[#111]"
        style={{
          height: "100svh",
        }}
      >
        {/* ────────────────────────────────────────────────────────────────── */}
        {/* HORIZONTAL RAIL: 200vw wide (two screen-width panels) */}
        {/* The rail translates horizontally while the viewport stays pinned */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <motion.div
          className="relative flex h-full will-change-transform"
          style={{
            x: railX,
            width: "200vw",
          }}
        >
          {/* ────────────────────────────────────────────────────────────── */}
          {/* LEFT PANEL: Hero fades to About */}
          {/* ────────────────────────────────────────────────────────────── */}
          <motion.div
            className="relative h-full w-screen flex-shrink-0 overflow-hidden"
            style={{
              scale: aboutExitScale,
              x: aboutExitX,
              transformOrigin: "100% 50%",
            }}
          >
            {/* ──────────────────────────────────────────────────────────── */}
            {/* Hero Layer: Fades out during Phase 1 */}
            {/* ──────────────────────────────────────────────────────────── */}
            <motion.div
              className="absolute inset-0 z-10"
              style={{
                opacity: heroOpacity,
                y: heroY,
                scale: heroScale,
              }}
            >
              <Hero transitionProgress={phase1HeroSpring} />
            </motion.div>

            {/* ──────────────────────────────────────────────────────────── */}
            {/* About Layer: Builds in behind Hero during Phase 1 */}
            {/* ──────────────────────────────────────────────────────────── */}
            <motion.div className="absolute inset-0 z-0">
              <About
                viewportTransition
                shellOpacity={shellOpacity}
                buildY={buildY}
                buildOpacity={buildOpacity}
                buildScale={buildScale}
                bioClip={bioClip}
                bioOpacity={bioOpacity}
                bioY={bioY}
                paperOpacity={paperOpacity}
                paperScale={paperScale}
                paperRotate={paperRotate}
                paperSkewX={paperSkewX}
                paperSkewY={paperSkewY}
                paperFilter={paperFilter}
                paperClip={paperClip}
                backendY={backendY}
                backendOpacity={backendOpacity}
                backendScale={backendScale}
                hardwareX={hardwareX}
                hardwareOpacity={hardwareOpacity}
                interestsY={interestsY}
                interestsOpacity={interestsOpacity}
                interestsScale={interestsScale}
                builtScale={builtScale}
                builtOpacity={builtOpacity}
                footerY={footerY}
                footerOpacity={footerOpacity}
              />
            </motion.div>
          </motion.div>

          {/* ────────────────────────────────────────────────────────────── */}
          {/* RIGHT PANEL: Skills slides in during Phase 2 */}
          {/* ────────────────────────────────────────────────────────────── */}
          <motion.div
            className="relative h-full w-screen flex-shrink-0 overflow-hidden bg-[#111]"
            style={{
              opacity: skillsOpacity,
              scale: skillsScale,
              transformOrigin: "0% 50%",
            }}
          >
            <Skills
              viewportTransition
              transitionProgress={skillsProgress}
              shellOpacity={skillsShellOpacity}
              headerY={skillsHeaderY}
              headerOpacity={skillsHeaderOpacity}
              gridY={skillsGridY}
              gridOpacity={skillsGridOpacity}
              gridScale={skillsGridScale}
              bottomRowY={skillsBottomY}
              bottomRowOpacity={skillsBottomOpacity}
              footerY={skillsFooterY}
              footerOpacity={skillsFooterOpacity}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * CinematicSequence Component
 *
 * Renders the cinematic Hero→About→Skills sequence on desktop.
 * On mobile/tablet, renders a normal stacked flow.
 *
 * After this component ends, the page returns to normal vertical scrolling
 * for Experience, Projects, and Contact sections.
 */
export default function CinematicSequence() {
  const stageRef = useRef<HTMLElement>(null);

  return (
    <>
      {/* Desktop: Cinematic sequence with sticky viewport and horizontal rail */}
      <div className="hidden lg:block">
        <CinematicSequenceDesktop stageRef={stageRef} />
      </div>

      {/* Mobile/Tablet: Normal stacked flow */}
      <div className="lg:hidden">
        <Hero />
        <About />
        <Skills />
      </div>
    </>
  );
}
