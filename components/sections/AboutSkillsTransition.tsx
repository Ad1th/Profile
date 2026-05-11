"use client";

/**
 * AboutSkillsTransition.tsx
 *
 * One-time horizontal transition: ABOUT (identity / manifesto) slides out,
 * SKILLS (engineering dashboard) slides in.
 *
 * Why this exists:
 * - Hero → About is already cinematic and pinned.
 * - ABOUT → SKILLS should feel like switching operating system panels,
 *   not like a normal slideshow or a vertical page break.
 * - After this section finishes, the page returns to normal vertical flow.
 *
 * Implementation notes:
 * - The section is pinned for a short scroll window.
 * - A wide horizontal rail moves ABOUT left and SKILLS in from the right.
 * - SKILLS children activate in a staggered sequence so the dashboard feels
 *   like subsystems booting up one at a time.
 * - Mobile keeps the normal stacked flow.
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

const SCROLL_TRAVEL = "1svh";

function useSmoothProgress(raw: MotionValue<number>): MotionValue<number> {
  return useSpring(raw, {
    stiffness: 66,
    damping: 24,
    mass: 3,
    restDelta: 0.0008,
  });
}

function useEdgeProgress(raw: MotionValue<number>): MotionValue<number> {
  return useSpring(raw, {
    stiffness: 60,
    damping: 22,
    mass: 2.2,
    restDelta: 0.0008,
  });
}

function useSettledValue<T>(progress: MotionValue<number>, value: T) {
  return useTransform(progress, () => value);
}

export default function AboutSkillsTransition() {
  const stageRef = useRef<HTMLElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const p = useSmoothProgress(rawProgress);
  const edgeP = useEdgeProgress(rawProgress);

  // Shared rail movement: starts immediately, completes by 80%.
  const railX = useTransform(edgeP, [0.0, 0.78], ["0vw", "-100vw"]);

  // ABOUT panel: compress a little before it leaves the viewport.
  const aboutScale = useTransform(edgeP, [0.0, 0.18], [1, 0.975]);
  const aboutX = useTransform(edgeP, [0.02, 0.22], [0, -6]);

  // SKILLS panel: enters as the rail slides, then settles into place.
  const skillsScale = useTransform(edgeP, [0.14, 0.42], [0.985, 1]);
  const skillsOpacity = useTransform(edgeP, [0.06, 0.24], [0, 1]);

  // SKILLS shell/rows: each subsystem boots in sequence.
  const skillsShellOpacity = useTransform(edgeP, [0.08, 0.28], [0, 1]);
  const skillsHeaderY = useTransform(edgeP, [0.1, 0.28], [22, 0]);
  const skillsHeaderOpacity = useTransform(edgeP, [0.1, 0.24], [0, 1]);
  const skillsGridY = useTransform(edgeP, [0.18, 0.40], [20, 0]);
  const skillsGridOpacity = useTransform(edgeP, [0.18, 0.34], [0, 1]);
  const skillsGridScale = useTransform(edgeP, [0.18, 0.44], [0.98, 1]);
  const skillsBottomY = useTransform(edgeP, [0.26, 0.50], [18, 0]);
  const skillsBottomOpacity = useTransform(edgeP, [0.26, 0.44], [0, 1]);
  const skillsFooterY = useTransform(edgeP, [0.40, 0.66], [16, 0]);
  const skillsFooterOpacity = useTransform(edgeP, [0.40, 0.58], [0, 1]);

  // About should read as a resolved panel while it exits.
  const settledOne = useSettledValue(p, 1);
  const settledZero = useSettledValue(p, 0);
  const settledInset = useSettledValue(p, "inset(0 0% 0 0)");
  const settledClip = useSettledValue(
    p,
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  );
  const settledBlur = useSettledValue(p, "blur(0px)");
  const settledPaper = useSettledValue(p, 1);
  const settledZeroString = useSettledValue(p, 0);

  const skillsProgress = useTransform(edgeP, [0.08, 0.78], [0, 1]);

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
          style={{
            height: "100svh",
            overscrollBehavior: "contain",
            touchAction: "pan-y",
          }}
        >
          {/* Horizontal rail: moving this rail is the actual lock. */}
          <motion.div
            className="relative flex h-full w-[200vw] will-change-transform"
            style={{ x: railX }}
          >
            {/* ABOUT PANELS ------------------------------------------------ */}
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
                // The left side should feel resolved, not mid-animation,
                // while the rail itself carries the transition.
                shellOpacity={settledOne}
                buildY={settledZero}
                buildOpacity={settledOne}
                buildScale={settledOne}
                bioClip={settledInset}
                bioOpacity={settledOne}
                bioY={settledZero}
                paperOpacity={settledOne}
                paperScale={settledPaper}
                paperRotate={settledZero}
                paperSkewX={settledZero}
                paperSkewY={settledZero}
                paperFilter={settledBlur}
                paperClip={settledClip}
                backendY={settledZero}
                backendOpacity={settledOne}
                backendScale={settledOne}
                hardwareX={settledZero}
                hardwareOpacity={settledOne}
                interestsY={settledZero}
                interestsOpacity={settledOne}
                interestsScale={settledOne}
                builtScale={settledOne}
                builtOpacity={settledOne}
                footerY={settledZeroString}
                footerOpacity={settledOne}
              />
            </motion.div>

            {/* SKILLS DASHBOARD ------------------------------------------- */}
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
