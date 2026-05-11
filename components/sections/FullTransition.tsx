"use client";

/**
 * FullTransition.tsx
 *
 * Single-viewport three-phase transition — no duplication:
 *   Phase 1: Hero fades out → About builds in  (spring-triggered, same viewport)
 *   Phase 2: About slides left → Skills slides in  (spring-triggered, same viewport)
 *
 * Layout:
 *   - Horizontal rail (About | Skills) is the BASE layer, always present.
 *   - Hero sits as an absolute overlay (z-10) on top and fades out in phase 1.
 *   - About animates in during phase 1 (edgeP1), then exits via the rail in phase 2 (edgeP2).
 *   - No separate About section below — About exists exactly once.
 *
 * Scroll mechanics:
 *   - Section height: 100svh + 20px  (two 10px triggers)
 *   - rawProgress 0→0.5: phase 1 trigger fires  →  edgeP1 spring carries Hero→About
 *   - rawProgress 0.5→1: phase 2 trigger fires  →  edgeP2 spring carries About→Skills
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

function makeEdgeSpring(raw: MotionValue<number>, soft = false) {
  return useSpring(raw, {
    stiffness: soft ? 38 : 42,
    damping: soft ? 32 : 28,
    mass: soft ? 3.8 : 3.4,
    restDelta: 0.0008,
  });
}

function makeSmoothSpring(raw: MotionValue<number>) {
  return useSpring(raw, {
    stiffness: 55,
    damping: 26,
    mass: 3.2,
    restDelta: 0.0008,
  });
}

export default function FullTransition() {
  const stageRef = useRef<HTMLElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // Split raw progress into two phases
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const rawP1 = useTransform(rawProgress, [0, 0.5], [0, 1]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const rawP2 = useTransform(rawProgress, [0.5, 1], [0, 1]);

  // Phase 1 springs (Hero → About)
  const p1 = makeSmoothSpring(rawP1);
  const edgeP1 = makeEdgeSpring(rawP1, true);

  // Phase 2 springs (About → Skills)
  const edgeP2 = makeEdgeSpring(rawP2);

  // ── HERO LAYER (phase 1) ───────────────────────────────────────────────
  // Hero manages its own internal animations via transitionProgress (p1).
  // We only control the wrapper: fade + lift the whole layer out.
  const heroOpacity = useTransform(edgeP1, [0.14, 0.8], [1, 0]);
  const heroY = useTransform(edgeP1, [0.06, 0.8], [0, -52]);
  const heroScale = useTransform(edgeP1, [0.06, 0.74], [1, 0.965]);

  // ── ABOUT build-in (phase 1, driven by edgeP1 / p1) ───────────────────
  const shellOpacity = useTransform(edgeP1, [0.28, 0.68], [0, 1]);
  const buildY = useTransform(edgeP1, [0.32, 0.76, 0.9, 1.0], [76, -4, 1, 0]);
  const buildOpacity = useTransform(edgeP1, [0.32, 0.74], [0, 1]);
  const buildScale = useTransform(edgeP1, [0.32, 0.76, 0.9, 1.0], [0.93, 1.02, 0.99, 1]);
  const bioClip = useTransform(edgeP1, [0.38, 0.76], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const bioOpacity = useTransform(edgeP1, [0.38, 0.74], [0, 1]);
  const bioY = useTransform(edgeP1, [0.38, 0.76], [22, 0]);
  const paperOpacity = useTransform(p1, [0.3, 0.6], [0, 1]);
  const paperScale = useTransform(p1, [0.3, 0.4, 0.58, 0.74, 0.86, 0.94], [0.58, 0.76, 0.95, 1.03, 0.99, 1]);
  const paperRotate = useTransform(p1, [0.3, 0.4, 0.58, 0.74, 0.86, 0.94], [-14, -7, 2.5, 0.8, -0.3, 0]);
  const paperSkewX = useTransform(p1, [0.3, 0.42, 0.7, 0.84], [-10, -4, 1.5, 0]);
  const paperSkewY = useTransform(p1, [0.3, 0.42, 0.7, 0.84], [5, 2.5, -0.8, 0]);
  const paperFilter = useTransform(p1, [0.3, 0.4, 0.66, 0.8], ["blur(10px)", "blur(6px)", "blur(1.5px)", "blur(0px)"]);
  const paperClip = useTransform(p1, [0.3, 0.4, 0.58, 0.74, 0.84], [
    "polygon(14% 5%, 95% 0%, 86% 95%, 3% 100%)",
    "polygon(6% 3%, 97% 2%, 94% 96%, 4% 96%)",
    "polygon(1% 1%, 99% 2%, 98% 99%, 0% 98%)",
    "polygon(0% 0%, 100% 1%, 99% 100%, 0% 99%)",
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  ]);
  const backendAboutY = useTransform(edgeP1, [0.44, 0.82], [56, 0]);
  const backendAboutOpacity = useTransform(edgeP1, [0.44, 0.8], [0, 1]);
  const backendAboutScale = useTransform(edgeP1, [0.44, 0.82], [0.94, 1]);
  const hardwareX = useTransform(edgeP1, [0.46, 0.84], [-68, 0]);
  const hardwareOpacity = useTransform(edgeP1, [0.46, 0.82], [0, 1]);
  const interestsY = useTransform(edgeP1, [0.5, 0.88], [52, 0]);
  const interestsOpacity = useTransform(edgeP1, [0.5, 0.86], [0, 1]);
  const interestsScale = useTransform(edgeP1, [0.5, 0.88], [0.95, 1]);
  const builtScale = useTransform(edgeP1, [0.54, 0.86, 0.94, 1.0], [1.1, 1.02, 0.993, 1]);
  const builtOpacity = useTransform(edgeP1, [0.54, 0.84], [0, 1]);
  const footerY = useTransform(edgeP1, [0.62, 1.0], [36, 0]);
  const footerOpacity = useTransform(edgeP1, [0.62, 0.96], [0, 1]);

  // ── RAIL (phase 2) ─────────────────────────────────────────────────────
  const railX = useTransform(edgeP2, [0.0, 0.88], ["0vw", "-100vw"]);

  // About panel subtle exit compression during phase 2
  const aboutExitScale = useTransform(edgeP2, [0.0, 0.22], [1, 0.975]);
  const aboutExitX = useTransform(edgeP2, [0.02, 0.26], [0, -6]);

  // ── SKILLS (phase 2) ───────────────────────────────────────────────────
  const skillsScale = useTransform(edgeP2, [0.16, 0.52], [0.985, 1]);
  const skillsOpacity = useTransform(edgeP2, [0.08, 0.28], [0, 1]);
  const skillsShellOpacity = useTransform(edgeP2, [0.1, 0.32], [0, 1]);
  const skillsHeaderY = useTransform(edgeP2, [0.14, 0.34], [22, 0]);
  const skillsHeaderOpacity = useTransform(edgeP2, [0.14, 0.28], [0, 1]);
  const skillsGridY = useTransform(edgeP2, [0.22, 0.48], [20, 0]);
  const skillsGridOpacity = useTransform(edgeP2, [0.22, 0.40], [0, 1]);
  const skillsGridScale = useTransform(edgeP2, [0.22, 0.52], [0.98, 1]);
  const skillsBottomY = useTransform(edgeP2, [0.32, 0.58], [18, 0]);
  const skillsBottomOpacity = useTransform(edgeP2, [0.32, 0.50], [0, 1]);
  const skillsFooterY = useTransform(edgeP2, [0.48, 0.74], [16, 0]);
  const skillsFooterOpacity = useTransform(edgeP2, [0.48, 0.66], [0, 1]);
  const skillsProgress = useTransform(edgeP2, [0.1, 0.88], [0, 1]);

  return (
    <>
      {/* ── DESKTOP ─────────────────────────────────────────────────────── */}
      <section
        ref={stageRef}
        className="relative hidden lg:block bg-[#111]"
        style={{ height: "calc(100svh + 20px)" }}
      >
        <div
          className="sticky top-0 overflow-hidden bg-[#111]"
          style={{ height: "100svh" }}
        >
          {/* BASE: Horizontal rail — About (left) | Skills (right) */}
          <motion.div
            className="relative flex h-full w-[200vw] will-change-transform"
            style={{ x: railX }}
          >
            {/* About panel — builds in (phase 1), exits with rail (phase 2) */}
            <motion.div
              className="relative h-full w-screen flex-shrink-0 overflow-hidden bg-[#111]"
              style={{
                scale: aboutExitScale,
                x: aboutExitX,
                transformOrigin: "100% 50%",
              }}
            >
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
                backendY={backendAboutY}
                backendOpacity={backendAboutOpacity}
                backendScale={backendAboutScale}
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

            {/* Skills panel — enters (phase 2) */}
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

          {/* OVERLAY: Hero — fades out during phase 1 */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          >
            <Hero transitionProgress={p1} />
          </motion.div>
        </div>
      </section>

      {/* ── MOBILE ──────────────────────────────────────────────────────── */}
      <div className="lg:hidden">
        <Hero />
        <About />
        <Skills />
      </div>
    </>
  );
}
