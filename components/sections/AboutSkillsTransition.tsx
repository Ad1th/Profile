"use client";

/**
 * AboutSkillsTransition.tsx
 *
 * Cinematic 4-phase scroll transition: About deconstructs → Skills reconstructs.
 * Pinned viewport pattern matching HeroAboutTransition.
 *
 * SCROLL PHASES [0, 1]:
 *  Phase 1  0.00 → 0.22   About destabilisation
 *  Phase 2  0.22 → 0.52   About panel breakup
 *  Phase 3  0.52 → 0.78   Skills reconstruction
 *  Phase 4  0.78 → 1.00   Lock-in settle
 *
 * Mobile: normal stacked layout, no transition.
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

const SCROLL_TRAVEL = "clamp(8px, 1svh, 12px)";

function useSmoothProgress(raw: MotionValue<number>): MotionValue<number> {
  return useSpring(raw, {
    stiffness: 60,
    damping: 22,
    mass: 3.2,
    restDelta: 0.0008,
  });
}

function useEdgeProgress(raw: MotionValue<number>): MotionValue<number> {
  return useSpring(raw, {
    stiffness: 40,
    damping: 28,
    mass: 3.5,
    restDelta: 0.0008,
  });
}

export default function AboutSkillsTransition() {
  const stageRef = useRef<HTMLElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const p = useSmoothProgress(rawProgress);
  const edgeP = useEdgeProgress(rawProgress);

  // ── ABOUT LAYER (exits) ──────────────────────────────────────────────────

  // Overall About wrapper fades/slides up as phase 2 completes
  const aboutOpacity = useTransform(edgeP, [0.18, 0.72], [1, 0]);
  const aboutY       = useTransform(edgeP, [0.10, 0.72], [0, -44]);
  const aboutScale   = useTransform(edgeP, [0.10, 0.68], [1, 0.97]);

  // I BUILD panel exits left
  const buildExitX   = useTransform(edgeP, [0.12, 0.58], [0, -48]);
  const buildExitO   = useTransform(edgeP, [0.16, 0.60], [1, 0]);

  // Bio panel exits right
  const bioExitX     = useTransform(edgeP, [0.12, 0.56], [0, 52]);
  const bioExitO     = useTransform(edgeP, [0.14, 0.58], [1, 0]);

  // Philosophy (orange card) shrinks & fades
  const philoScale   = useTransform(edgeP, [0.14, 0.56], [1, 0.88]);
  const philoO       = useTransform(edgeP, [0.16, 0.58], [1, 0]);

  // Backend systems slides down
  const backendExitY = useTransform(edgeP, [0.18, 0.60], [0, 36]);
  const backendExitO = useTransform(edgeP, [0.18, 0.60], [1, 0]);

  // Hardware exits left
  const hardwareExitX = useTransform(edgeP, [0.20, 0.58], [0, -40]);
  const hardwareExitO = useTransform(edgeP, [0.20, 0.58], [1, 0]);

  // Interests strip fades
  const interestsExitO = useTransform(edgeP, [0.14, 0.52], [1, 0]);
  const interestsExitY = useTransform(edgeP, [0.14, 0.52], [0, 24]);

  // Built to be used scales out
  const builtExitScale = useTransform(edgeP, [0.16, 0.54], [1, 0.94]);
  const builtExitO     = useTransform(edgeP, [0.16, 0.54], [1, 0]);

  // Footer exits down
  const footerExitY = useTransform(edgeP, [0.12, 0.50], [0, 20]);
  const footerExitO = useTransform(edgeP, [0.12, 0.50], [1, 0]);

  // ── SKILLS LAYER (enters) ────────────────────────────────────────────────

  // Shell fades in
  const skillsShellO = useTransform(edgeP, [0.34, 0.64], [0, 1]);

  // Header slides down into place
  const headerY      = useTransform(edgeP, [0.38, 0.72], [-52, 0]);
  const headerO      = useTransform(edgeP, [0.38, 0.70], [0, 1]);

  // Core grid rises
  const gridY        = useTransform(edgeP, [0.44, 0.80], [48, 0]);
  const gridO        = useTransform(edgeP, [0.44, 0.78], [0, 1]);
  const gridScale    = useTransform(edgeP, [0.44, 0.80], [0.96, 1]);

  // Bottom row rises
  const bottomY      = useTransform(edgeP, [0.52, 0.88], [40, 0]);
  const bottomO      = useTransform(edgeP, [0.52, 0.86], [0, 1]);

  // Footer last
  const skillsFooterY = useTransform(edgeP, [0.62, 1.0], [28, 0]);
  const skillsFooterO = useTransform(edgeP, [0.62, 0.96], [0, 1]);

  return (
    <>
      {/* ─── DESKTOP: pinned transition ─────────────────────────────────── */}
      <section
        ref={stageRef}
        className="relative hidden lg:block bg-[#111]"
        style={{ height: `calc(100svh + ${SCROLL_TRAVEL})` }}
      >
        <div
          className="sticky top-0 overflow-hidden bg-[#111]"
          style={{ height: "100svh" }}
        >
          {/* ── LAYER 1: About (deconstructs) ───────────────────────────── */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{
              opacity: aboutOpacity,
              y: aboutY,
              scale: aboutScale,
            }}
          >
            <About
              viewportTransition
              // Pass static "settled" values for About's own sub-elements
              // so the about section appears fully rendered as it exits
              shellOpacity={useTransform(p, () => 1) as any}
              buildY={useTransform(p, () => 0) as any}
              buildOpacity={useTransform(p, () => 1) as any}
              buildScale={useTransform(p, () => 1) as any}
              bioClip={useTransform(p, () => "inset(0 0% 0 0)") as any}
              bioOpacity={useTransform(p, () => 1) as any}
              bioY={useTransform(p, () => 0) as any}
              paperOpacity={useTransform(p, () => 1) as any}
              paperScale={useTransform(p, () => 1) as any}
              paperRotate={useTransform(p, () => 0) as any}
              paperSkewX={useTransform(p, () => 0) as any}
              paperSkewY={useTransform(p, () => 0) as any}
              paperFilter={useTransform(p, () => "blur(0px)") as any}
              paperClip={useTransform(p, () => "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)") as any}
              backendY={useTransform(p, () => 0) as any}
              backendOpacity={useTransform(p, () => 1) as any}
              backendScale={useTransform(p, () => 1) as any}
              hardwareX={useTransform(p, () => 0) as any}
              hardwareOpacity={useTransform(p, () => 1) as any}
              interestsY={useTransform(p, () => 0) as any}
              interestsOpacity={useTransform(p, () => 1) as any}
              interestsScale={useTransform(p, () => 1) as any}
              builtScale={useTransform(p, () => 1) as any}
              builtOpacity={useTransform(p, () => 1) as any}
              footerY={useTransform(p, () => 0) as any}
              footerOpacity={useTransform(p, () => 1) as any}
            />
          </motion.div>

          {/* ── LAYER 2: Skills (reconstructs) ──────────────────────────── */}
          <motion.div
            className="absolute inset-0 z-20"
            style={{ pointerEvents: "auto" }}
          >
            <Skills
              viewportTransition
              shellOpacity={skillsShellO}
              headerY={headerY}
              headerOpacity={headerO}
              gridY={gridY}
              gridOpacity={gridO}
              gridScale={gridScale}
              bottomRowY={bottomY}
              bottomRowOpacity={bottomO}
              footerY={skillsFooterY}
              footerOpacity={skillsFooterO}
            />
          </motion.div>
        </div>
      </section>

      {/* ─── MOBILE / TABLET: normal stacked ────────────────────────────── */}
      <div className="lg:hidden">
        <About />
        <Skills />
      </div>
    </>
  );
}
