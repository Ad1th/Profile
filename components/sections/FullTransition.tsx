"use client";

/**
 * FullTransition.tsx — PHASE-LOCKED REVISION
 *
 * KEY FIX:
 *
 * Phase 1 (Hero→About) and Phase 2 (About→Skills pan) are now STRICTLY
 * sequential. The rail does NOT move at all during phase 1. Phase 2 only
 * begins once rawProgress >= PHASE1_END.
 *
 * Root causes of the previous issues:
 *  - railX was tied to phase2Local which started from rawProgress=0,
 *    so the rail was already sliding while Hero→About was still animating.
 *    This clipped the top of the About panel out of view.
 *  - PHASE1_PX (520) + PHASE2_PX (760) were too small — the spring
 *    carried animation into phase 2 before phase 1 was visually done.
 *  - panP = rawProgress (unsprung) let phase 2 accumulate immediately.
 *
 * FIX STRATEGY:
 *  - Increased PHASE1_PX to 1000px and PHASE2_PX to 1200px.
 *  - phase2Local is clamped: useTransform(rawProgress, [PHASE1_END, 1], [0, 1])
 *    — this is 0 for the entire duration of phase 1, regardless of springs.
 *  - All phase-1 MotionValues are derived from edgeP which is also clamped
 *    to [0, PHASE1_END] input range, so they freeze at their final value
 *    as phase 2 begins.
 *  - Rail X only starts moving once phase2Local > 0.
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
import Experience from "@/components/sections/experience/Experience";

// ─── SCROLL BUDGET ──────────────────────────────────────────────────────────
// PHASE1_PX: raw scroll distance to complete Hero→About.
//   Large budget means the spring has room to breathe without bleeding into phase 2.
// PHASE2_PX: raw scroll distance for the About→Skills horizontal pan.
const PHASE1_PX = 1000;
const PHASE2_PX = 1200;
const TOTAL_EXTRA_PX = PHASE1_PX + PHASE2_PX;

// Normalized boundary: rawProgress at which phase 1 ends / phase 2 begins.
const PHASE1_END = PHASE1_PX / TOTAL_EXTRA_PX; // ~0.455

// ─── SPRING CONFIGS ─────────────────────────────────────────────────────────
// Tuned for deliberate, weighty feel without bleed-through.
function useHeroSpring(raw: MotionValue<number>) {
  return useSpring(raw, {
    stiffness: 55,
    damping: 28,
    mass: 2.8,
    restDelta: 0.0005,
  });
}
function useEdgeSpring(raw: MotionValue<number>) {
  return useSpring(raw, {
    stiffness: 38,
    damping: 30,
    mass: 3.0,
    restDelta: 0.0005,
  });
}

export default function FullTransition() {
  const stageRef = useRef<HTMLElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // ─── PHASE 1 INPUTS ─────────────────────────────────────────────────────
  // Remap rawProgress [0, PHASE1_END] → [0, 1] for phase-1 animations.
  // Clamped: once rawProgress > PHASE1_END this stays frozen at 1.
  const phase1Raw = useTransform(rawProgress, [0, PHASE1_END], [0, 1], {
    clamp: true,
  });

  const p = useHeroSpring(phase1Raw); // paper uncrumple spring
  const edgeP = useEdgeSpring(phase1Raw); // hero/about fades spring

  // ─── PHASE 1: HERO → ABOUT ──────────────────────────────────────────────
  const heroOpacity = useTransform(edgeP, [0.1, 0.7], [1, 0]);
  const heroY = useTransform(edgeP, [0.04, 0.7], [0, -52]);
  const heroScale = useTransform(edgeP, [0.04, 0.65], [1, 0.965]);

  const shellOpacity = useTransform(edgeP, [0.2, 0.55], [0, 1]);

  const buildY = useTransform(edgeP, [0.24, 0.68, 0.84, 1.0], [76, -4, 1, 0]);
  const buildOpacity = useTransform(edgeP, [0.24, 0.65], [0, 1]);
  const buildScale = useTransform(
    edgeP,
    [0.24, 0.68, 0.84, 1.0],
    [0.93, 1.02, 0.99, 1],
  );

  const bioClip = useTransform(
    edgeP,
    [0.3, 0.68],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const bioOpacity = useTransform(edgeP, [0.3, 0.66], [0, 1]);
  const bioY = useTransform(edgeP, [0.3, 0.68], [22, 0]);

  const paperOpacity = useTransform(p, [0.24, 0.5], [0, 1]);
  const paperScale = useTransform(
    p,
    [0.24, 0.34, 0.5, 0.66, 0.8, 0.9],
    [0.58, 0.76, 0.95, 1.03, 0.99, 1],
  );
  const paperRotate = useTransform(
    p,
    [0.24, 0.34, 0.5, 0.66, 0.8, 0.9],
    [-14, -7, 2.5, 0.8, -0.3, 0],
  );
  const paperSkewX = useTransform(
    p,
    [0.24, 0.36, 0.62, 0.78],
    [-10, -4, 1.5, 0],
  );
  const paperSkewY = useTransform(
    p,
    [0.24, 0.36, 0.62, 0.78],
    [5, 2.5, -0.8, 0],
  );
  const paperFilter = useTransform(
    p,
    [0.24, 0.34, 0.58, 0.72],
    ["blur(10px)", "blur(6px)", "blur(1.5px)", "blur(0px)"],
  );
  const paperClip = useTransform(
    p,
    [0.24, 0.34, 0.5, 0.66, 0.78],
    [
      "polygon(14% 5%, 95% 0%, 86% 95%, 3% 100%)",
      "polygon(6% 3%, 97% 2%, 94% 96%, 4% 96%)",
      "polygon(1% 1%, 99% 2%, 98% 99%, 0% 98%)",
      "polygon(0% 0%, 100% 1%, 99% 100%, 0% 99%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
  );

  const backendY = useTransform(edgeP, [0.36, 0.74], [56, 0]);
  const backendOpacity = useTransform(edgeP, [0.36, 0.72], [0, 1]);
  const backendScale = useTransform(edgeP, [0.36, 0.74], [0.94, 1]);
  const hardwareX = useTransform(edgeP, [0.38, 0.76], [-68, 0]);
  const hardwareOpacity = useTransform(edgeP, [0.38, 0.74], [0, 1]);
  const interestsY = useTransform(edgeP, [0.42, 0.8], [52, 0]);
  const interestsOpacity = useTransform(edgeP, [0.42, 0.78], [0, 1]);
  const interestsScale = useTransform(edgeP, [0.42, 0.8], [0.95, 1]);
  const builtScale = useTransform(
    edgeP,
    [0.46, 0.8, 0.9, 1.0],
    [1.1, 1.02, 0.993, 1],
  );
  const builtOpacity = useTransform(edgeP, [0.46, 0.78], [0, 1]);
  const footerY = useTransform(edgeP, [0.54, 1.0], [36, 0]);
  const footerOpacity = useTransform(edgeP, [0.54, 0.92], [0, 1]);

  // ─── PHASE 2 INPUTS ─────────────────────────────────────────────────────
  // CRITICAL FIX: phase2Local is 0 for the ENTIRE duration of phase 1.
  // It only starts rising once rawProgress crosses PHASE1_END.
  // Clamped [0,1] — cannot go negative or above 1.
  const phase2Local = useTransform(rawProgress, [PHASE1_END, 1], [0, 1], {
    clamp: true,
  });

  // Spring the phase 2 local value for smooth pan feel.
  const phase2Spring = useSpring(phase2Local, {
    stiffness: 36,
    damping: 28,
    mass: 3.2,
    restDelta: 0.0005,
  });

  // ─── PHASE 2: ABOUT → SKILLS (horizontal pan) ───────────────────────────
  // Rail starts at 0vw (About visible) and ends at -100vw (Skills visible).
  // Because phase2Spring is 0 during all of phase 1, the rail never moves
  // until the user scrolls past the Hero→About transition.
  const railX = useTransform(phase2Spring, [0.0, 1.0], ["0vw", "-100vw"]);

  const aboutExitScale = useTransform(phase2Spring, [0.0, 0.25], [1, 0.975]);
  const aboutExitX = useTransform(phase2Spring, [0.02, 0.28], [0, -6]);

  const skillsScale = useTransform(phase2Spring, [0.05, 0.78], [0.985, 1]);
  const skillsOpacity = useTransform(phase2Spring, [0.03, 0.52], [0, 1]);

  const skillsShellOpacity = useTransform(phase2Spring, [0.08, 0.28], [0, 1]);
  const skillsHeaderY = useTransform(phase2Spring, [0.1, 0.3], [22, 0]);
  const skillsHeaderOpacity = useTransform(phase2Spring, [0.1, 0.24], [0, 1]);
  const skillsGridY = useTransform(phase2Spring, [0.18, 0.44], [20, 0]);
  const skillsGridOpacity = useTransform(phase2Spring, [0.18, 0.36], [0, 1]);
  const skillsGridScale = useTransform(phase2Spring, [0.18, 0.48], [0.98, 1]);
  const skillsBottomY = useTransform(phase2Spring, [0.28, 0.54], [18, 0]);
  const skillsBottomOpacity = useTransform(phase2Spring, [0.28, 0.46], [0, 1]);
  const skillsFooterY = useTransform(phase2Spring, [0.44, 0.7], [16, 0]);
  const skillsFooterOpacity = useTransform(phase2Spring, [0.44, 0.62], [0, 1]);
  const skillsProgress = useTransform(phase2Spring, [0.0, 1.0], [0, 1]);

  return (
    <>
      {/* ── DESKTOP: single pinned stage ─────────────────────────────────── */}
      <section
        ref={stageRef}
        className="relative hidden lg:block overflow-hidden bg-[#111]"
        style={{ height: `calc(100svh + ${TOTAL_EXTRA_PX}px)` }}
      >
        {/* ── PINNED VIEWPORT — never scrolls ───────────────────────────── */}
        <div
          className="sticky top-0 z-20 overflow-hidden bg-[#111]"
          style={{ height: "100svh" }}
        >
          {/* ── HORIZONTAL RAIL (200vw wide) ─────────────────────────────── */}
          {/*
            railX is driven by phase2Spring which is 0 during all of phase 1.
            The rail therefore stays locked at 0vw until Hero→About is complete.
          */}
          <motion.div
            className="relative flex h-full will-change-transform"
            style={{
              x: railX,
              width: "200vw",
            }}
          >
            {/* ── LEFT PANEL: Hero fades out, About builds in ──────────── */}
            <motion.div
              className="relative h-full w-screen flex-shrink-0 overflow-hidden"
              style={{
                scale: aboutExitScale,
                x: aboutExitX,
                transformOrigin: "100% 50%",
              }}
            >
              {/* Hero layer — fades out as About builds in */}
              <motion.div
                className="absolute inset-0 z-10"
                style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
              >
                <Hero transitionProgress={p} />
              </motion.div>

              {/* About layer — builds in underneath Hero */}
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

            {/* ── RIGHT PANEL: Skills slides in during phase 2 ─────────── */}
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

      {/* ── MOBILE / TABLET: normal stacked flow ─────────────────────────── */}
      <div className="lg:hidden">
        <Hero />
        <About />
        <Skills />
      </div>

      {/* ── EXPERIENCE: flows naturally after pinned section releases ─────── */}
      <Experience />
    </>
  );
}
