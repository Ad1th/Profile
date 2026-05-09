"use client";

/**
 * HeroAboutTransition.tsx  (IMPROVED)
 *
 * Cinematic 5-phase scroll transition: Hero deconstructs → About reconstructs.
 *
 * IMPROVEMENTS over v1:
 *  - Softer spring stiffness/damping → smoother, more premium feel
 *  - edgeP damping increased: exit/entry feel more deliberate, less snappy
 *  - Wider phase overlaps: elements don't all move at once
 *  - Hero headline words have more staggered parallax
 *  - Portrait rises with a slight rotation for personality
 *  - About entry uses scale-with-overshoot on BUILD card
 *  - Paper uncrumple has ext/Users/adith/Downloads/files (2)/AboutSkillsTransition.tsxra skew bounce keyframes
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

const SCROLL_TRAVEL = "clamp(8px, 1svh, 12px)";

function useSmoothProgress(raw: MotionValue<number>): MotionValue<number> {
  return useSpring(raw, {
    stiffness: 55, // softer — was 70
    damping: 26, // more damping — was 24
    mass: 3.2, // slightly more inertia — was 3
    restDelta: 0.0008,
  });
}

export default function HeroAboutTransition() {
  const stageRef = useRef<HTMLElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const p = useSmoothProgress(rawProgress);

  // Separate slow-damped spring for edges (hero exit + about entry)
  const edgeP = useSpring(rawProgress, {
    stiffness: 38, // very soft — was 45
    damping: 32, // more damping — was 30
    mass: 3.8, // more inertia — was 3
    restDelta: 0.0008,
  });

  // ── HERO LAYER ─────────────────────────────────────────────────────────

  // Overall hero: fades out, slides up, shrinks slightly
  const heroOpacity = useTransform(edgeP, [0.14, 0.8], [1, 0]);
  const heroY = useTransform(edgeP, [0.06, 0.8], [0, -52]);
  const heroScale = useTransform(edgeP, [0.06, 0.74], [1, 0.965]);

  // Left (black) panel: slides left
  const heroLeftX = useTransform(edgeP, [0.1, 0.64], [0, -36]);
  const heroLeftOpacity = useTransform(edgeP, [0.12, 0.74], [1, 0]);

  // Right (portrait) panel: slides right + fades
  const heroRightX = useTransform(edgeP, [0.1, 0.64], [0, 44]);
  const heroRightOpacity = useTransform(edgeP, [0.12, 0.74], [1, 0]);

  // Stats row: compresses + fades earlier
  const statsY = useTransform(edgeP, [0.04, 0.5], [0, 32]);
  const statsOpacity = useTransform(edgeP, [0.04, 0.48], [1, 0]);
  const statsScaleY = useTransform(edgeP, [0.04, 0.48], [1, 0.55]);

  // Marquee: fades in phase 1
  const marqueeOpacity = useTransform(edgeP, [0.04, 0.46], [1, 0]);

  // Hero headline — wider stagger between words for parallax drama
  const backendY = useTransform(edgeP, [0.0, 0.52], [0, -20]);
  const withX = useTransform(edgeP, [0.06, 0.58], [0, -28]);
  const tasteY = useTransform(edgeP, [0.08, 0.6], [0, 28]);

  // Portrait: rises with subtle rotation
  const portraitY = useTransform(edgeP, [0.04, 0.64], [0, -40]);
  const portraitOpacity = useTransform(edgeP, [0.08, 0.7], [1, 0]);
  const portraitRotate = useTransform(edgeP, [0.04, 0.64], [0, -1.5]);

  // Badge: drifts + shrinks
  const badgeRotate = useTransform(edgeP, [0.0, 0.52], [-4, -12]);
  const badgeOpacity = useTransform(edgeP, [0.08, 0.56], [1, 0]);
  const badgeScale = useTransform(edgeP, [0.08, 0.56], [1, 0.65]);

  // ── ABOUT LAYER ───────────────────────────────────────────────────────

  // Shell border fades in slightly earlier
  const shellOpacity = useTransform(edgeP, [0.28, 0.68], [0, 1]);

  // "I BUILD / BREAK / FIX" — slight bounce overshoot
  const buildY = useTransform(edgeP, [0.32, 0.76, 0.9, 1.0], [76, -4, 1, 0]);
  const buildOpacity = useTransform(edgeP, [0.32, 0.74], [0, 1]);
  const buildScale = useTransform(
    edgeP,
    [0.32, 0.76, 0.9, 1.0],
    [0.93, 1.02, 0.99, 1],
  );

  // Bio card — clips in from right
  const bioClip = useTransform(
    edgeP,
    [0.38, 0.76],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const bioOpacity = useTransform(edgeP, [0.38, 0.74], [0, 1]);
  const bioY = useTransform(edgeP, [0.38, 0.76], [22, 0]);

  // Philosophy — paper uncrumple (phase 3 centrepiece) — enhanced bounce
  const paperOpacity = useTransform(p, [0.3, 0.6], [0, 1]);
  const paperScale = useTransform(
    p,
    [0.3, 0.4, 0.58, 0.74, 0.86, 0.94],
    [0.58, 0.76, 0.95, 1.03, 0.99, 1],
  );
  const paperRotate = useTransform(
    p,
    [0.3, 0.4, 0.58, 0.74, 0.86, 0.94],
    [-14, -7, 2.5, 0.8, -0.3, 0],
  );
  const paperSkewX = useTransform(p, [0.3, 0.42, 0.7, 0.84], [-10, -4, 1.5, 0]);
  const paperSkewY = useTransform(p, [0.3, 0.42, 0.7, 0.84], [5, 2.5, -0.8, 0]);
  const paperFilter = useTransform(
    p,
    [0.3, 0.4, 0.66, 0.8],
    ["blur(10px)", "blur(6px)", "blur(1.5px)", "blur(0px)"],
  );
  const paperClip = useTransform(
    p,
    [0.3, 0.4, 0.58, 0.74, 0.84],
    [
      "polygon(14% 5%, 95% 0%, 86% 95%, 3% 100%)",
      "polygon(6% 3%, 97% 2%, 94% 96%, 4% 96%)",
      "polygon(1% 1%, 99% 2%, 98% 99%, 0% 98%)",
      "polygon(0% 0%, 100% 1%, 99% 100%, 0% 99%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
  );

  // Backend systems — slides up
  const backendAboutY = useTransform(edgeP, [0.44, 0.82], [56, 0]);
  const backendAboutOpacity = useTransform(edgeP, [0.44, 0.8], [0, 1]);
  const backendAboutScale = useTransform(edgeP, [0.44, 0.82], [0.94, 1]);

  // Hardware — slides in from left
  const hardwareX = useTransform(edgeP, [0.46, 0.84], [-68, 0]);
  const hardwareOpacity = useTransform(edgeP, [0.46, 0.82], [0, 1]);

  // Interests — rises from below
  const interestsY = useTransform(edgeP, [0.5, 0.88], [52, 0]);
  const interestsOpacity = useTransform(edgeP, [0.5, 0.86], [0, 1]);
  const interestsScale = useTransform(edgeP, [0.5, 0.88], [0.95, 1]);

  // Built to be used — scale overshoot
  const builtScale = useTransform(
    edgeP,
    [0.54, 0.86, 0.94, 1.0],
    [1.1, 1.02, 0.993, 1],
  );
  const builtOpacity = useTransform(edgeP, [0.54, 0.84], [0, 1]);

  // Footer — rises last
  const footerY = useTransform(edgeP, [0.62, 1.0], [36, 0]);
  const footerOpacity = useTransform(edgeP, [0.62, 0.96], [0, 1]);

  return (
    <>
      {/* ─── DESKTOP ────────────────────────────────────────────────────── */}
      <section
        ref={stageRef}
        className="relative hidden lg:block bg-[#111]"
        style={{ height: `calc(100svh + ${SCROLL_TRAVEL})` }}
      >
        <div
          className="sticky top-0 overflow-hidden bg-[#111]"
          style={{ height: "100svh" }}
        >
          {/* LAYER 1: Hero */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          >
            <Hero transitionProgress={p} />
          </motion.div>

          {/* LAYER 2: About */}
          <motion.div
            className="absolute inset-0 z-20"
            style={{ pointerEvents: "auto" }}
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
        </div>
      </section>

      {/* ─── MOBILE ─────────────────────────────────────────────────────── */}
      <div className="lg:hidden">
        <Hero />
        <About />
      </div>
    </>
  );
}
