"use client";

/**
 * FullTransition.tsx — REVISED
 *
 * KEY DESIGN DECISIONS:
 *
 * 1. ZERO VISIBLE VERTICAL SCROLL during Hero→About→Skills.
 *    The section is pinned (sticky top:0, height:100svh) and the user
 *    scrolls through a tall invisible track beneath it. The viewport
 *    never actually moves — only the scroll position changes, driving
 *    the animations via MotionValues.
 *
 * 2. LARGE SCROLL BUDGET so transitions feel slow + deliberate.
 *    Total track = 100svh + PHASE1_PX + PHASE2_PX
 *    PHASE1_PX = 800  → Hero fades, About builds in (comfortable scroll)
 *    PHASE2_PX = 1200 → About slides left, Skills slides in (comfortable scroll)
 *    Total extra beyond 100svh: 2000px
 *
 * 3. SINGLE PINNED STAGE — About is rendered once, shared across phases.
 *    No ghost/duplicate panels.
 *
 * 4. After the pin releases, the page continues vertically into Experience.
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
import Experience from "@/components/sections/Experience/Experience";

// ─── SCROLL BUDGET ──────────────────────────────────────────────────────────
// Large values = slow, deliberate transitions. User has to scroll a lot
// before the animation completes, so it never feels hair-trigger.
const PHASE1_PX = 800; // Hero → About
const PHASE2_PX = 1200; // About → Skills (horizontal pan)
const TOTAL_EXTRA_PX = PHASE1_PX + PHASE2_PX; // 2000px beyond 100svh

// Fraction of total scroll that Phase 1 occupies
const PHASE1_RATIO = PHASE1_PX / TOTAL_EXTRA_PX; // 0.4
// Phase 2 occupies [PHASE1_RATIO → 1.0]

// ─── SPRING CONFIGS ─────────────────────────────────────────────────────────
// Intentionally stiff + heavy so there's no snap/rubber-band feeling.
// The springs add smoothness without making things feel responsive to tiny inputs.
function useHeroSpring(raw: MotionValue<number>) {
  return useSpring(raw, {
    stiffness: 60,
    damping: 28,
    mass: 2.8,
    restDelta: 0.0005,
  });
}
function useEdgeSpring(raw: MotionValue<number>) {
  return useSpring(raw, {
    stiffness: 40,
    damping: 30,
    mass: 3.0,
    restDelta: 0.0005,
  });
}
function usePanSpring(raw: MotionValue<number>) {
  return useSpring(raw, {
    stiffness: 36,
    damping: 28,
    mass: 3.2,
    restDelta: 0.0005,
  });
}

export default function FullTransition() {
  const stageRef = useRef<HTMLElement>(null);

  // scrollYProgress goes 0→1 over the full height of the section
  // (100svh + TOTAL_EXTRA_PX). The sticky viewport never moves.
  const { scrollYProgress: rawProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const p = useHeroSpring(rawProgress); // paper uncrumple (snappier)
  const edgeP = useEdgeSpring(rawProgress); // hero/about layer fades
  const panP = usePanSpring(rawProgress); // horizontal rail

  // ─── PHASE 1: HERO → ABOUT ──────────────────────────────────────────────
  // Phase 1 occupies rawProgress [0 → PHASE1_RATIO].
  // We scale the animation keypoints by P1E so they complete within phase 1.
  const P1E = PHASE1_RATIO; // 0.4

  // Hero exits
  const heroOpacity = useTransform(edgeP, [0.1 * P1E, 0.7 * P1E], [1, 0]);
  const heroY = useTransform(edgeP, [0.04 * P1E, 0.7 * P1E], [0, -52]);
  const heroScale = useTransform(edgeP, [0.04 * P1E, 0.65 * P1E], [1, 0.965]);

  // About shell fades in
  const shellOpacity = useTransform(edgeP, [0.2 * P1E, 0.55 * P1E], [0, 1]);

  // Build headline
  const buildY = useTransform(
    edgeP,
    [0.24 * P1E, 0.68 * P1E, 0.84 * P1E, P1E],
    [76, -4, 1, 0],
  );
  const buildOpacity = useTransform(edgeP, [0.24 * P1E, 0.65 * P1E], [0, 1]);
  const buildScale = useTransform(
    edgeP,
    [0.24 * P1E, 0.68 * P1E, 0.84 * P1E, P1E],
    [0.93, 1.02, 0.99, 1],
  );

  // Bio clip reveal
  const bioClip = useTransform(
    edgeP,
    [0.3 * P1E, 0.68 * P1E],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const bioOpacity = useTransform(edgeP, [0.3 * P1E, 0.66 * P1E], [0, 1]);
  const bioY = useTransform(edgeP, [0.3 * P1E, 0.68 * P1E], [22, 0]);

  // Paper uncrumple (uses snappier p spring)
  const paperOpacity = useTransform(p, [0.24 * P1E, 0.5 * P1E], [0, 1]);
  const paperScale = useTransform(
    p,
    [0.24 * P1E, 0.34 * P1E, 0.5 * P1E, 0.66 * P1E, 0.8 * P1E, 0.9 * P1E],
    [0.58, 0.76, 0.95, 1.03, 0.99, 1],
  );
  const paperRotate = useTransform(
    p,
    [0.24 * P1E, 0.34 * P1E, 0.5 * P1E, 0.66 * P1E, 0.8 * P1E, 0.9 * P1E],
    [-14, -7, 2.5, 0.8, -0.3, 0],
  );
  const paperSkewX = useTransform(
    p,
    [0.24 * P1E, 0.36 * P1E, 0.62 * P1E, 0.78 * P1E],
    [-10, -4, 1.5, 0],
  );
  const paperSkewY = useTransform(
    p,
    [0.24 * P1E, 0.36 * P1E, 0.62 * P1E, 0.78 * P1E],
    [5, 2.5, -0.8, 0],
  );
  const paperFilter = useTransform(
    p,
    [0.24 * P1E, 0.34 * P1E, 0.58 * P1E, 0.72 * P1E],
    ["blur(10px)", "blur(6px)", "blur(1.5px)", "blur(0px)"],
  );
  const paperClip = useTransform(
    p,
    [0.24 * P1E, 0.34 * P1E, 0.5 * P1E, 0.66 * P1E, 0.78 * P1E],
    [
      "polygon(14% 5%, 95% 0%, 86% 95%, 3% 100%)",
      "polygon(6% 3%, 97% 2%, 94% 96%, 4% 96%)",
      "polygon(1% 1%, 99% 2%, 98% 99%, 0% 98%)",
      "polygon(0% 0%, 100% 1%, 99% 100%, 0% 99%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
  );

  // About subsystems
  const backendY = useTransform(edgeP, [0.36 * P1E, 0.74 * P1E], [56, 0]);
  const backendOpacity = useTransform(edgeP, [0.36 * P1E, 0.72 * P1E], [0, 1]);
  const backendScale = useTransform(edgeP, [0.36 * P1E, 0.74 * P1E], [0.94, 1]);
  const hardwareX = useTransform(edgeP, [0.38 * P1E, 0.76 * P1E], [-68, 0]);
  const hardwareOpacity = useTransform(edgeP, [0.38 * P1E, 0.74 * P1E], [0, 1]);
  const interestsY = useTransform(edgeP, [0.42 * P1E, 0.8 * P1E], [52, 0]);
  const interestsOpacity = useTransform(
    edgeP,
    [0.42 * P1E, 0.78 * P1E],
    [0, 1],
  );
  const interestsScale = useTransform(
    edgeP,
    [0.42 * P1E, 0.8 * P1E],
    [0.95, 1],
  );
  const builtScale = useTransform(
    edgeP,
    [0.46 * P1E, 0.8 * P1E, 0.9 * P1E, P1E],
    [1.1, 1.02, 0.993, 1],
  );
  const builtOpacity = useTransform(edgeP, [0.46 * P1E, 0.78 * P1E], [0, 1]);
  const footerY = useTransform(edgeP, [0.54 * P1E, P1E], [36, 0]);
  const footerOpacity = useTransform(edgeP, [0.54 * P1E, 0.92 * P1E], [0, 1]);

  // ─── PHASE 2: ABOUT → SKILLS (horizontal pan) ───────────────────────────
  // Phase 2 occupies panP [PHASE1_RATIO → 1.0].
  const P2_START = PHASE1_RATIO; // 0.4
  const P2_END = 1.0;

  // Remap phase 2 range to local [0, 1]
  const phase2Local = useTransform(panP, [P2_START, P2_END], [0, 1]);

  // Rail slides left: About exits, Skills enters
  const railX = useTransform(phase2Local, [0.0, 0.85], ["0vw", "-100vw"]);

  // About panel: subtle exit compression
  const aboutExitScale = useTransform(phase2Local, [0.0, 0.25], [1, 0.975]);
  const aboutExitX = useTransform(phase2Local, [0.02, 0.28], [0, -6]);

  // Skills panel entry
  const skillsScale = useTransform(phase2Local, [0.12, 0.5], [0.985, 1]);
  const skillsOpacity = useTransform(phase2Local, [0.06, 0.24], [0, 1]);

  // Skills subsystems staggered boot
  const skillsShellOpacity = useTransform(phase2Local, [0.08, 0.28], [0, 1]);
  const skillsHeaderY = useTransform(phase2Local, [0.1, 0.3], [22, 0]);
  const skillsHeaderOpacity = useTransform(phase2Local, [0.1, 0.24], [0, 1]);
  const skillsGridY = useTransform(phase2Local, [0.18, 0.44], [20, 0]);
  const skillsGridOpacity = useTransform(phase2Local, [0.18, 0.36], [0, 1]);
  const skillsGridScale = useTransform(phase2Local, [0.18, 0.48], [0.98, 1]);
  const skillsBottomY = useTransform(phase2Local, [0.28, 0.54], [18, 0]);
  const skillsBottomOpacity = useTransform(phase2Local, [0.28, 0.46], [0, 1]);
  const skillsFooterY = useTransform(phase2Local, [0.44, 0.7], [16, 0]);
  const skillsFooterOpacity = useTransform(phase2Local, [0.44, 0.62], [0, 1]);
  const skillsProgress = useTransform(phase2Local, [0.08, 0.85], [0, 1]);

  return (
    <>
      {/* ── DESKTOP: single pinned stage ─────────────────────────────────── */}
      {/*
        Height = 100svh + TOTAL_EXTRA_PX creates the scrollable track.
        The sticky inner div never moves — only scroll position changes.
        The user scrolls 2000px of invisible track to drive both transitions.
      */}
      <section
        ref={stageRef}
        className="relative hidden lg:block bg-[#111]"
        style={{ height: `calc(100svh + ${TOTAL_EXTRA_PX}px)` }}
      >
        {/* ── PINNED VIEWPORT — fills exactly 100svh, never scrolls ───── */}
        <div
          className="sticky top-0 overflow-hidden bg-[#111]"
          style={{ height: "100svh" }}
        >
          {/* ── HORIZONTAL RAIL (200vw wide) ─────────────────────────── */}
          <motion.div
            className="relative flex h-full will-change-transform"
            style={{
              x: railX,
              width: "200vw",
            }}
          >
            {/* ── LEFT PANEL: Hero fades out, About builds in ─────────── */}
            <motion.div
              className="relative h-full w-screen flex-shrink-0 overflow-hidden"
              style={{
                scale: aboutExitScale,
                x: aboutExitX,
                transformOrigin: "100% 50%",
              }}
            >
              {/* Hero layer — z-index above About, fades during phase 1 */}
              <motion.div
                className="absolute inset-0 z-10"
                style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
              >
                <Hero transitionProgress={p} />
              </motion.div>

              {/* About layer — builds in during phase 1, exits with rail in phase 2 */}
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
    </>
  );
}
