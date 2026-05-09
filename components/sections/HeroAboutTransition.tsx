"use client";

/**
 * HeroAboutTransition.tsx
 *
 * Cinematic 5-phase scroll transition: Hero deconstructs → About reconstructs.
 * All motion happens inside ONE pinned viewport. No dead scroll space.
 *
 * SCROLL PHASES (mapped to [0, 1]):
 *  Phase 1  0.00 → 0.18   Hero destabilisation (parallax tension)
 *  Phase 2  0.18 → 0.42   Panel breakup / hero disassembly
 *  Phase 3  0.42 → 0.60   Philosophy card paper-uncrumple
 *  Phase 4  0.60 → 0.86   About reconstruction
 *  Phase 5  0.86 → 1.00   Lock-in settle
 *
 * STRUCTURE:
 *  <section style="height: 100svh + SCROLL_TRAVEL"> ← exact, no overflow
 *    <div style="sticky top:0; height:100svh">        ← pinned viewport
 *      Layer 1: Hero (fades / deconstructs)
 *      Layer 2: About (reconstructs on top)
 *    </div>
 *  </section>
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
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/about/About";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Virtual scroll distance the transition plays over.
// Keep this tight to avoid a dead-scroll tail after the transition settles.
const SCROLL_TRAVEL = "clamp(8px, 1svh, 12px)";

// Easing curves
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const QUART_INOUT = [0.76, 0, 0.24, 1] as const;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function useSmoothProgress(raw: MotionValue<number>): MotionValue<number> {
  // Temporal lag: keeps the same scroll travel but makes motion settle slower.
  // Tuned for a much slower (~3x) perceived transition response.
  return useSpring(raw, {
    stiffness: 70,
    damping: 24,
    mass: 3,
    restDelta: 0.0008,
  });
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function HeroAboutTransition() {
  const stageRef = useRef<HTMLElement>(null);

  // Raw scroll progress over the full section height
  const { scrollYProgress: rawProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // Smoothed — drives all motion
  const p = useSmoothProgress(rawProgress);
  // Extra lag for the hero exit and About entry only.
  // This keeps the middle morph timing intact while stretching the edges.
  const edgeP = useSpring(rawProgress, {
    stiffness: 45,
    damping: 30,
    mass: 3,
    restDelta: 0.0008,
  });

  // ── HERO LAYER ─────────────────────────────────────────────────────────────

  // Overall hero wrapper: fades out and slides up as phase 2 completes
  const heroOpacity = useTransform(edgeP, [0.18, 0.78], [1, 0]);
  const heroY = useTransform(edgeP, [0.08, 0.78], [0, -48]);
  const heroScale = useTransform(edgeP, [0.08, 0.72], [1, 0.97]);

  // Left black panel: slides left during breakup
  const heroLeftX = useTransform(edgeP, [0.1, 0.62], [0, -32]);
  const heroLeftOpacity = useTransform(edgeP, [0.14, 0.72], [1, 0]);

  // Right blue/portrait panel: slides right + fades
  const heroRightX = useTransform(edgeP, [0.1, 0.62], [0, 40]);
  const heroRightOpacity = useTransform(edgeP, [0.14, 0.72], [1, 0]);

  // Stats row: compresses down and fades
  const statsY = useTransform(edgeP, [0.04, 0.52], [0, 28]);
  const statsOpacity = useTransform(edgeP, [0.04, 0.52], [1, 0]);
  const statsScaleY = useTransform(edgeP, [0.04, 0.5], [1, 0.6]);

  // Marquee (orange bottom bar): fades during phase 1
  const marqueeOpacity = useTransform(edgeP, [0.04, 0.48], [1, 0]);

  // Hero headline words: subtle parallax drift
  const backendY = useTransform(edgeP, [0.0, 0.5], [0, -16]);
  const withX = useTransform(edgeP, [0.08, 0.56], [0, -24]);
  const tasteY = useTransform(edgeP, [0.08, 0.56], [0, 22]);

  // Portrait frame: rises and fades
  const portraitY = useTransform(edgeP, [0.06, 0.62], [0, -36]);
  const portraitOpacity = useTransform(edgeP, [0.1, 0.68], [1, 0]);

  // Badge: drifts & shrinks
  const badgeRotate = useTransform(edgeP, [0.0, 0.5], [-4, -10]);
  const badgeOpacity = useTransform(edgeP, [0.1, 0.58], [1, 0]);
  const badgeScale = useTransform(edgeP, [0.1, 0.58], [1, 0.7]);

  // ── ABOUT LAYER ────────────────────────────────────────────────────────────

  // Shell border frame fades in early
  const shellOpacity = useTransform(edgeP, [0.3, 0.7], [0, 1]);

  // "I BUILD / BREAK / FIX" — emerges from left panel position
  const buildY = useTransform(edgeP, [0.34, 0.78], [72, 0]);
  const buildOpacity = useTransform(edgeP, [0.34, 0.76], [0, 1]);
  const buildScale = useTransform(edgeP, [0.34, 0.78], [0.94, 1]);

  // Bio card — clips in from right (was portrait region)
  const bioClip = useTransform(
    edgeP,
    [0.4, 0.78],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const bioOpacity = useTransform(edgeP, [0.4, 0.74], [0, 1]);
  const bioY = useTransform(edgeP, [0.4, 0.78], [20, 0]);

  // Philosophy card — PAPER UNCRUMPLE (phase 3 centrepiece)
  // Starts crumpled: skewed clip-path + rotation + blur + scale
  const paperOpacity = useTransform(p, [0.32, 0.62], [0, 1]);
  const paperScale = useTransform(
    p,
    [0.32, 0.42, 0.6, 0.75, 0.88],
    [0.62, 0.78, 0.96, 1.025, 1],
  );
  const paperRotate = useTransform(
    p,
    [0.32, 0.42, 0.6, 0.75, 0.88],
    [-12, -6, 2, 0.5, 0],
  );
  const paperSkewX = useTransform(p, [0.32, 0.44, 0.72, 0.84], [-8, -3, 1, 0]);
  const paperSkewY = useTransform(p, [0.32, 0.44, 0.72, 0.84], [4, 2, -0.5, 0]);
  const paperFilter = useTransform(
    p,
    [0.32, 0.42, 0.68, 0.8],
    ["blur(8px)", "blur(5px)", "blur(2px)", "blur(0px)"],
  );
  // Polygon clip: starts as a crumpled irregular polygon, unfolds to rect
  const paperClip = useTransform(
    p,
    [0.32, 0.42, 0.6, 0.76, 0.84],
    [
      "polygon(12% 4%, 96% 0%, 88% 94%, 2% 100%)",
      "polygon(5% 2%, 98% 3%, 95% 97%, 3% 95%)",
      "polygon(1% 1%, 99% 2%, 98% 99%, 0% 98%)",
      "polygon(0% 0%, 100% 1%, 99% 100%, 0% 99%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
  );

  // Backend systems card — slides up from below
  const backendAboutY = useTransform(edgeP, [0.46, 0.84], [52, 0]);
  const backendAboutOpacity = useTransform(edgeP, [0.46, 0.8], [0, 1]);
  const backendAboutScale = useTransform(edgeP, [0.46, 0.84], [0.95, 1]);

  // Hardware card — slides in from left
  const hardwareX = useTransform(edgeP, [0.48, 0.86], [-64, 0]);
  const hardwareOpacity = useTransform(edgeP, [0.48, 0.82], [0, 1]);

  // Interests strip — rises from bottom
  const interestsY = useTransform(edgeP, [0.52, 0.9], [48, 0]);
  const interestsOpacity = useTransform(edgeP, [0.52, 0.86], [0, 1]);
  const interestsScale = useTransform(edgeP, [0.52, 0.9], [0.96, 1]);

  // "Built to be used" — scales in from centre
  const builtScale = useTransform(
    edgeP,
    [0.56, 0.88, 0.96, 1.0],
    [1.08, 1.01, 0.995, 1], // slight overshoot then settle
  );
  const builtOpacity = useTransform(edgeP, [0.56, 0.86], [0, 1]);

  // Footer — rises last
  const footerY = useTransform(edgeP, [0.64, 1.0], [32, 0]);
  const footerOpacity = useTransform(edgeP, [0.64, 0.96], [0, 1]);

  return (
    <>
      {/* ─── DESKTOP: pinned cinematic transition ─────────────────────────── */}
      <section
        ref={stageRef}
        className="relative hidden lg:block bg-[#111]"
        style={{
          // CRITICAL: section height = viewport + exact scroll travel.
          // This eliminates ALL dead scroll space after the transition.
          height: `calc(100svh + ${SCROLL_TRAVEL})`,
        }}
      >
        {/* Pinned viewport — exactly 100svh, never taller */}
        <div
          className="sticky top-0 overflow-hidden bg-[#111]"
          style={{ height: "100svh" }}
        >
          {/* ── LAYER 1: Hero (deconstructs) ────────────────────────────── */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{
              opacity: heroOpacity,
              y: heroY,
              scale: heroScale,
            }}
          >
            <Hero transitionProgress={p} />
          </motion.div>

          {/* ── LAYER 2: About (reconstructs) ───────────────────────────── */}
          {/*
            About receives scroll-driven MotionValues for every sub-section.
            This lets About.tsx wire them into its motion.divs directly,
            bypassing the whileInView triggers (which fire too early in a
            pinned context).
          */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              // Once About is fully visible, re-enable pointer events
              pointerEvents: "auto",
            }}
          >
            <About
              viewportTransition
              // Shell
              shellOpacity={shellOpacity}
              // I BUILD / BREAK / FIX
              buildY={buildY}
              buildOpacity={buildOpacity}
              buildScale={buildScale}
              // Bio
              bioClip={bioClip}
              bioOpacity={bioOpacity}
              bioY={bioY}
              // Philosophy (paper uncrumple)
              paperOpacity={paperOpacity}
              paperScale={paperScale}
              paperRotate={paperRotate}
              paperSkewX={paperSkewX}
              paperSkewY={paperSkewY}
              paperFilter={paperFilter}
              paperClip={paperClip}
              // Backend systems
              backendY={backendAboutY}
              backendOpacity={backendAboutOpacity}
              backendScale={backendAboutScale}
              // Hardware
              hardwareX={hardwareX}
              hardwareOpacity={hardwareOpacity}
              // Interests
              interestsY={interestsY}
              interestsOpacity={interestsOpacity}
              interestsScale={interestsScale}
              // Built to be used
              builtScale={builtScale}
              builtOpacity={builtOpacity}
              // Footer
              footerY={footerY}
              footerOpacity={footerOpacity}
            />
          </motion.div>
        </div>
      </section>

      {/* ─── MOBILE / TABLET: normal stacked layout ──────────────────────── */}
      <div className="lg:hidden">
        <Hero />
        <About />
      </div>
    </>
  );
}
