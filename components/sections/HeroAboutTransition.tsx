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
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/about/About";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Virtual scroll distance the transition plays over.
// Keep this tight to avoid a dead-scroll tail after the transition settles.
const SCROLL_TRAVEL = "clamp(8px, 2svh, 24px)";

// Easing curves
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const QUART_INOUT = [0.76, 0, 0.24, 1] as const;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function useSmoothProgress(raw: MotionValue<number>): MotionValue<number> {
  return raw;
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

  // ── HERO LAYER ─────────────────────────────────────────────────────────────

  // Overall hero wrapper: fades out and slides up as phase 2 completes
  const heroOpacity = useTransform(p, [0.2, 0.65], [1, 0]);
  const heroY = useTransform(p, [0.1, 0.65], [0, -48]);
  const heroScale = useTransform(p, [0.1, 0.6], [1, 0.97]);

  // Left black panel: slides left during breakup
  const heroLeftX = useTransform(p, [0.1, 0.5], [0, -32]);
  const heroLeftOpacity = useTransform(p, [0.15, 0.55], [1, 0]);

  // Right blue/portrait panel: slides right + fades
  const heroRightX = useTransform(p, [0.1, 0.5], [0, 40]);
  const heroRightOpacity = useTransform(p, [0.15, 0.55], [1, 0]);

  // Stats row: compresses down and fades
  const statsY = useTransform(p, [0.05, 0.4], [0, 28]);
  const statsOpacity = useTransform(p, [0.05, 0.4], [1, 0]);
  const statsScaleY = useTransform(p, [0.05, 0.4], [1, 0.6]);

  // Marquee (orange bottom bar): fades during phase 1
  const marqueeOpacity = useTransform(p, [0.05, 0.35], [1, 0]);

  // Hero headline words: subtle parallax drift
  const backendY = useTransform(p, [0.0, 0.35], [0, -16]);
  const withX = useTransform(p, [0.08, 0.45], [0, -24]);
  const tasteY = useTransform(p, [0.08, 0.45], [0, 22]);

  // Portrait frame: rises and fades
  const portraitY = useTransform(p, [0.05, 0.5], [0, -36]);
  const portraitOpacity = useTransform(p, [0.1, 0.55], [1, 0]);

  // Badge: drifts & shrinks
  const badgeRotate = useTransform(p, [0.0, 0.4], [-4, -10]);
  const badgeOpacity = useTransform(p, [0.1, 0.45], [1, 0]);
  const badgeScale = useTransform(p, [0.1, 0.45], [1, 0.7]);

  // ── ABOUT LAYER ────────────────────────────────────────────────────────────

  // Shell border frame fades in early
  const shellOpacity = useTransform(p, [0.25, 0.55], [0, 1]);

  // "I BUILD / BREAK / FIX" — emerges from left panel position
  const buildY = useTransform(p, [0.3, 0.7], [72, 0]);
  const buildOpacity = useTransform(p, [0.3, 0.68], [0, 1]);
  const buildScale = useTransform(p, [0.3, 0.7], [0.94, 1]);

  // Bio card — clips in from right (was portrait region)
  const bioClip = useTransform(
    p,
    [0.36, 0.72],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const bioOpacity = useTransform(p, [0.36, 0.68], [0, 1]);
  const bioY = useTransform(p, [0.36, 0.72], [20, 0]);

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
  const backendAboutY = useTransform(p, [0.42, 0.8], [52, 0]);
  const backendAboutOpacity = useTransform(p, [0.42, 0.76], [0, 1]);
  const backendAboutScale = useTransform(p, [0.42, 0.8], [0.95, 1]);

  // Hardware card — slides in from left
  const hardwareX = useTransform(p, [0.44, 0.82], [-64, 0]);
  const hardwareOpacity = useTransform(p, [0.44, 0.78], [0, 1]);

  // Interests strip — rises from bottom
  const interestsY = useTransform(p, [0.48, 0.86], [48, 0]);
  const interestsOpacity = useTransform(p, [0.48, 0.82], [0, 1]);
  const interestsScale = useTransform(p, [0.48, 0.86], [0.96, 1]);

  // "Built to be used" — scales in from centre
  const builtScale = useTransform(
    p,
    [0.52, 0.86, 0.94, 1.0],
    [1.08, 1.01, 0.995, 1], // slight overshoot then settle
  );
  const builtOpacity = useTransform(p, [0.52, 0.84], [0, 1]);

  // Footer — rises last
  const footerY = useTransform(p, [0.6, 1.0], [32, 0]);
  const footerOpacity = useTransform(p, [0.6, 0.94], [0, 1]);

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
