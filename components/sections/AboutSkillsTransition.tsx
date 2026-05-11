"use client";

/**
 * AboutSkillsTransition.tsx
 *
 * Phase 2 of the page scroll sequence.
 *
 * Pin travel: 100svh + ~300px
 * - Much larger than HeroAboutTransition's 80px.
 * - User scrolls a comfortable, "normal" distance to pan About → Skills.
 * - The horizontal rail slides left as they scroll — feels like
 *   switching OS panels, not a hair-trigger PPT slide.
 * - After ~300px of scroll the pin releases and vertical scroll resumes
 *   into the Experience section below.
 *
 * The About panel shown here is the fully-resolved state (all props settled
 * at 1 / 0) so it looks identical to what HeroAboutTransition left behind.
 */

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import About from "@/components/sections/about/About";
import Skills from "@/components/sections/skills/Skills";

// How far past 100svh this section extends.
// ~300px = comfortable regular scroll distance to trigger the horizontal pan.
const SCROLL_TRAVEL = "300px";

function useEdgeProgress(raw: MotionValue<number>): MotionValue<number> {
  return useSpring(raw, {
    stiffness: 38,
    damping: 30,
    mass: 3.6,
    restDelta: 0.0008,
  });
}

export default function AboutSkillsTransition() {
  const stageRef = useRef<HTMLElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const edgeP = useEdgeProgress(rawProgress);

  // Rail: slides from 0 → -100vw as edgeP goes 0 → 0.88
  const railX = useTransform(edgeP, [0.0, 0.88], ["0vw", "-100vw"]);

  // About panel: subtle exit compression
  const aboutScale = useTransform(edgeP, [0.0, 0.22], [1, 0.975]);
  const aboutX = useTransform(edgeP, [0.02, 0.26], [0, -6]);

  // Skills panel: enters as rail slides in
  const skillsScale = useTransform(edgeP, [0.16, 0.52], [0.985, 1]);
  const skillsOpacity = useTransform(edgeP, [0.08, 0.28], [0, 1]);

  // Skills subsystems boot in staggered sequence
  const skillsShellOpacity = useTransform(edgeP, [0.1, 0.32], [0, 1]);
  const skillsHeaderY = useTransform(edgeP, [0.14, 0.34], [22, 0]);
  const skillsHeaderOpacity = useTransform(edgeP, [0.14, 0.28], [0, 1]);
  const skillsGridY = useTransform(edgeP, [0.22, 0.48], [20, 0]);
  const skillsGridOpacity = useTransform(edgeP, [0.22, 0.40], [0, 1]);
  const skillsGridScale = useTransform(edgeP, [0.22, 0.52], [0.98, 1]);
  const skillsBottomY = useTransform(edgeP, [0.32, 0.58], [18, 0]);
  const skillsBottomOpacity = useTransform(edgeP, [0.32, 0.50], [0, 1]);
  const skillsFooterY = useTransform(edgeP, [0.48, 0.74], [16, 0]);
  const skillsFooterOpacity = useTransform(edgeP, [0.48, 0.66], [0, 1]);
  const skillsProgress = useTransform(edgeP, [0.1, 0.88], [0, 1]);

  // About props: all settled/resolved — About looks fully built when this section starts
  // We use static MotionValues at resolved state so About renders correctly
  // without re-animating (it already built in during HeroAboutTransition)
  const one = useTransform(edgeP, () => 1);
  const zero = useTransform(edgeP, () => 0);
  const insetFull = useTransform(edgeP, () => "inset(0 0% 0 0)");
  const clipFull = useTransform(edgeP, () => "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)");
  const blurNone = useTransform(edgeP, () => "blur(0px)");

  return (
    <>
      {/* ─── DESKTOP: pinned horizontal rail ───────────────────────────── */}
      <section
        ref={stageRef}
        className="relative hidden lg:block bg-[#111]"
        style={{ height: `calc(100svh + ${SCROLL_TRAVEL})` }}
      >
        <div
          className="sticky top-0 overflow-hidden bg-[#111]"
          style={{ height: "100svh" }}
        >
          {/* Horizontal rail */}
          <motion.div
            className="relative flex h-full w-[200vw] will-change-transform"
            style={{ x: railX }}
          >
            {/* ABOUT PANEL — fully resolved, exits with rail */}
            <motion.div
              className="relative h-full w-screen flex-shrink-0 overflow-hidden bg-[#111]"
              style={{
                scale: aboutScale,
                x: aboutX,
                transformOrigin: "100% 50%",
              }}
            >
              <About
                viewportTransition
                shellOpacity={one}
                buildY={zero}
                buildOpacity={one}
                buildScale={one}
                bioClip={insetFull}
                bioOpacity={one}
                bioY={zero}
                paperOpacity={one}
                paperScale={one}
                paperRotate={zero}
                paperSkewX={zero}
                paperSkewY={zero}
                paperFilter={blurNone}
                paperClip={clipFull}
                backendY={zero}
                backendOpacity={one}
                backendScale={one}
                hardwareX={zero}
                hardwareOpacity={one}
                interestsY={zero}
                interestsOpacity={one}
                interestsScale={one}
                builtScale={one}
                builtOpacity={one}
                footerY={zero}
                footerOpacity={one}
              />
            </motion.div>

            {/* SKILLS DASHBOARD — enters from the right */}
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

      {/* ─── MOBILE / TABLET: normal stacked flow ─────────────────────── */}
      <div className="lg:hidden">
        <Skills />
      </div>
    </>
  );
}