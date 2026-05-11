"use client";

/**
 * FullTransition.tsx
 *
 * Single pinned section that handles all three phases:
 *
 *   Phase 1 — Hero → About  (small scroll: ~80px pin travel)
 *   Phase 2 — About → Skills horizontal pan  (~300px pin travel)
 *
 * Total pin height: 100svh + 80px + 300px
 *
 * About is rendered ONCE and shared across both phases — no ghost/duplicate.
 *
 * After the pin releases, vertical scroll continues to the Experience section.
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
// Phase 1: small intentional scroll → Hero fades, About builds in
const PHASE1_PX = 80;
// Phase 2: comfortable regular scroll → About slides left, Skills slides in
const PHASE2_PX = 300;
const TOTAL_EXTRA_PX = PHASE1_PX + PHASE2_PX; // 380px beyond 100svh

// Ratio of total scroll that Phase 1 occupies (0 → phase1Ratio = phase 1)
const PHASE1_RATIO = PHASE1_PX / TOTAL_EXTRA_PX; // ~0.21
// Phase 2 occupies (phase1Ratio → 1)

// ─── SPRING CONFIGS ─────────────────────────────────────────────────────────
function useHeroSpring(raw: MotionValue<number>) {
  return useSpring(raw, { stiffness: 55, damping: 26, mass: 3.2, restDelta: 0.0008 });
}

function useEdgeSpring(raw: MotionValue<number>) {
  return useSpring(raw, { stiffness: 38, damping: 32, mass: 3.8, restDelta: 0.0008 });
}

function usePanSpring(raw: MotionValue<number>) {
  return useSpring(raw, { stiffness: 38, damping: 30, mass: 3.6, restDelta: 0.0008 });
}

export default function FullTransition() {
  const stageRef = useRef<HTMLElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // Two spring personalities — hero phase is snappier, pan phase is heavier
  const p = useHeroSpring(rawProgress);       // used for paper uncrumple
  const edgeP = useEdgeSpring(rawProgress);   // used for hero/about layer fades
  const panP = usePanSpring(rawProgress);     // used for horizontal rail

  // ── Helper: remap a sub-range of [0,1] into a local [0,1] ───────────────
  // We map the raw phase 1 range [0, PHASE1_RATIO] and phase 2 range
  // [PHASE1_RATIO, 1] into the same animation drivers as before, by
  // scaling the spring output through useTransform.

  // ─── PHASE 1: HERO → ABOUT ──────────────────────────────────────────────
  // Phase 1 occupies edgeP [0 → PHASE1_RATIO] and p [0 → PHASE1_RATIO]
  // We rescale so the animations that previously expected [0→1] now
  // map from [0→PHASE1_RATIO].

  const P1E = PHASE1_RATIO; // ~0.21

  // Hero layer
  const heroOpacity = useTransform(edgeP, [0.14 * P1E, 0.8 * P1E], [1, 0]);
  const heroY       = useTransform(edgeP, [0.06 * P1E, 0.8 * P1E], [0, -52]);
  const heroScale   = useTransform(edgeP, [0.06 * P1E, 0.74 * P1E], [1, 0.965]);

  // About shell
  const shellOpacity = useTransform(edgeP, [0.28 * P1E, 0.68 * P1E], [0, 1]);

  // Build headline
  const buildY       = useTransform(edgeP, [0.32 * P1E, 0.76 * P1E, 0.9 * P1E, P1E], [76, -4, 1, 0]);
  const buildOpacity = useTransform(edgeP, [0.32 * P1E, 0.74 * P1E], [0, 1]);
  const buildScale   = useTransform(edgeP, [0.32 * P1E, 0.76 * P1E, 0.9 * P1E, P1E], [0.93, 1.02, 0.99, 1]);

  // Bio
  const bioClip    = useTransform(edgeP, [0.38 * P1E, 0.76 * P1E], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const bioOpacity = useTransform(edgeP, [0.38 * P1E, 0.74 * P1E], [0, 1]);
  const bioY       = useTransform(edgeP, [0.38 * P1E, 0.76 * P1E], [22, 0]);

  // Paper (uses snappier p spring)
  const paperOpacity = useTransform(p, [0.3 * P1E, 0.6 * P1E], [0, 1]);
  const paperScale   = useTransform(p, [0.3 * P1E, 0.4 * P1E, 0.58 * P1E, 0.74 * P1E, 0.86 * P1E, 0.94 * P1E], [0.58, 0.76, 0.95, 1.03, 0.99, 1]);
  const paperRotate  = useTransform(p, [0.3 * P1E, 0.4 * P1E, 0.58 * P1E, 0.74 * P1E, 0.86 * P1E, 0.94 * P1E], [-14, -7, 2.5, 0.8, -0.3, 0]);
  const paperSkewX   = useTransform(p, [0.3 * P1E, 0.42 * P1E, 0.7 * P1E, 0.84 * P1E], [-10, -4, 1.5, 0]);
  const paperSkewY   = useTransform(p, [0.3 * P1E, 0.42 * P1E, 0.7 * P1E, 0.84 * P1E], [5, 2.5, -0.8, 0]);
  const paperFilter  = useTransform(p, [0.3 * P1E, 0.4 * P1E, 0.66 * P1E, 0.8 * P1E], ["blur(10px)", "blur(6px)", "blur(1.5px)", "blur(0px)"]);
  const paperClip    = useTransform(p, [0.3 * P1E, 0.4 * P1E, 0.58 * P1E, 0.74 * P1E, 0.84 * P1E], [
    "polygon(14% 5%, 95% 0%, 86% 95%, 3% 100%)",
    "polygon(6% 3%, 97% 2%, 94% 96%, 4% 96%)",
    "polygon(1% 1%, 99% 2%, 98% 99%, 0% 98%)",
    "polygon(0% 0%, 100% 1%, 99% 100%, 0% 99%)",
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  ]);

  // About subsystems
  const backendY       = useTransform(edgeP, [0.44 * P1E, 0.82 * P1E], [56, 0]);
  const backendOpacity = useTransform(edgeP, [0.44 * P1E, 0.8 * P1E], [0, 1]);
  const backendScale   = useTransform(edgeP, [0.44 * P1E, 0.82 * P1E], [0.94, 1]);
  const hardwareX      = useTransform(edgeP, [0.46 * P1E, 0.84 * P1E], [-68, 0]);
  const hardwareOpacity= useTransform(edgeP, [0.46 * P1E, 0.82 * P1E], [0, 1]);
  const interestsY     = useTransform(edgeP, [0.5 * P1E, 0.88 * P1E], [52, 0]);
  const interestsOpacity=useTransform(edgeP, [0.5 * P1E, 0.86 * P1E], [0, 1]);
  const interestsScale = useTransform(edgeP, [0.5 * P1E, 0.88 * P1E], [0.95, 1]);
  const builtScale     = useTransform(edgeP, [0.54 * P1E, 0.86 * P1E, 0.94 * P1E, P1E], [1.1, 1.02, 0.993, 1]);
  const builtOpacity   = useTransform(edgeP, [0.54 * P1E, 0.84 * P1E], [0, 1]);
  const footerY        = useTransform(edgeP, [0.62 * P1E, P1E], [36, 0]);
  const footerOpacity  = useTransform(edgeP, [0.62 * P1E, 0.96 * P1E], [0, 1]);

  // ─── PHASE 2: ABOUT → SKILLS (horizontal pan) ───────────────────────────
  // Phase 2 occupies panP [PHASE1_RATIO → 1]
  // We map that range to a local 0→1 for the pan animations.

  const P2_START = PHASE1_RATIO;
  const P2_END = 1.0;

  // Local phase-2 progress (0→1 within phase 2)
  const phase2Local = useTransform(panP, [P2_START, P2_END], [0, 1]);

  // Rail slides left
  const railX = useTransform(phase2Local, [0.0, 0.88], ["0vw", "-100vw"]);

  // About panel subtle exit compression (using phase2Local)
  const aboutExitScale = useTransform(phase2Local, [0.0, 0.22], [1, 0.975]);
  const aboutExitX     = useTransform(phase2Local, [0.02, 0.26], [0, -6]);

  // Skills panel entry
  const skillsScale   = useTransform(phase2Local, [0.16, 0.52], [0.985, 1]);
  const skillsOpacity = useTransform(phase2Local, [0.08, 0.28], [0, 1]);

  // Skills subsystems staggered boot
  const skillsShellOpacity  = useTransform(phase2Local, [0.1, 0.32], [0, 1]);
  const skillsHeaderY       = useTransform(phase2Local, [0.14, 0.34], [22, 0]);
  const skillsHeaderOpacity = useTransform(phase2Local, [0.14, 0.28], [0, 1]);
  const skillsGridY         = useTransform(phase2Local, [0.22, 0.48], [20, 0]);
  const skillsGridOpacity   = useTransform(phase2Local, [0.22, 0.40], [0, 1]);
  const skillsGridScale     = useTransform(phase2Local, [0.22, 0.52], [0.98, 1]);
  const skillsBottomY       = useTransform(phase2Local, [0.32, 0.58], [18, 0]);
  const skillsBottomOpacity = useTransform(phase2Local, [0.32, 0.50], [0, 1]);
  const skillsFooterY       = useTransform(phase2Local, [0.48, 0.74], [16, 0]);
  const skillsFooterOpacity = useTransform(phase2Local, [0.48, 0.66], [0, 1]);
  const skillsProgress      = useTransform(phase2Local, [0.1, 0.88], [0, 1]);

  // About props during phase 2 — all fully resolved (static "1" / "0")
  // Use the About props we already drove in phase 1; by the time phase 2
  // starts they've settled at their resolved values, so no need to re-drive.
  // We pass the same MotionValues — at P2_START they are at their final states.

  return (
    <>
      {/* ── DESKTOP: single pinned stage ─────────────────────────────────── */}
      <section
        ref={stageRef}
        className="relative hidden lg:block bg-[#111]"
        style={{ height: `calc(100svh + ${TOTAL_EXTRA_PX}px)` }}
      >
        <div
          className="sticky top-0 overflow-hidden bg-[#111]"
          style={{ height: "100svh" }}
        >
          {/* ── PHASE 1 LAYER STACK (Hero + About) ─────────────────────── */}
          {/* This layer is positioned absolutely and fills the viewport.   */}
          {/* During phase 2 the whole stack slides left with the rail.     */}

          {/* Horizontal rail — only active in phase 2 */}
          <motion.div
            className="relative flex h-full will-change-transform"
            style={{
              x: railX,
              width: "200vw",
            }}
          >
            {/* LEFT PANEL: Hero fades, About builds in — lives here always */}
            <motion.div
              className="relative h-full w-screen flex-shrink-0 overflow-hidden"
              style={{
                scale: aboutExitScale,
                x: aboutExitX,
                transformOrigin: "100% 50%",
              }}
            >
              {/* Hero layer — fades out during phase 1 */}
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

            {/* RIGHT PANEL: Skills slides in during phase 2 */}
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