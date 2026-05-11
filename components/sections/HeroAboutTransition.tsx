"use client";

/**
 * HeroAboutTransition.tsx
 *
 * Phase 1 of the page scroll sequence.
 *
 * Pin travel: 100svh + ~80px
 * - The section is taller than the viewport by ~80px.
 * - useScroll tracks that 80px of scroll distance (start→end).
 * - The spring carries the animation well past that trigger,
 *   so the full Hero→About transition plays out smoothly.
 * - 80px feels like "a small intentional scroll", not a hair trigger.
 *
 * After this section the sticky unpins and the user naturally
 * scrolls into AboutSkillsTransition below.
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

// How far past 100svh this section extends.
// This is the raw scroll distance that triggers the transition.
// 80px = small intentional scroll, spring carries the rest.
const SCROLL_TRAVEL = "80px";

function useSmoothProgress(raw: MotionValue<number>): MotionValue<number> {
  return useSpring(raw, {
    stiffness: 55,
    damping: 26,
    mass: 3.2,
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

  const edgeP = useSpring(rawProgress, {
    stiffness: 38,
    damping: 32,
    mass: 3.8,
    restDelta: 0.0008,
  });

  // ── HERO LAYER ─────────────────────────────────────────────────────────
  const heroOpacity = useTransform(edgeP, [0.14, 0.8], [1, 0]);
  const heroY = useTransform(edgeP, [0.06, 0.8], [0, -52]);
  const heroScale = useTransform(edgeP, [0.06, 0.74], [1, 0.965]);

  // ── ABOUT LAYER ───────────────────────────────────────────────────────
  const shellOpacity = useTransform(edgeP, [0.28, 0.68], [0, 1]);

  const buildY = useTransform(edgeP, [0.32, 0.76, 0.9, 1.0], [76, -4, 1, 0]);
  const buildOpacity = useTransform(edgeP, [0.32, 0.74], [0, 1]);
  const buildScale = useTransform(edgeP, [0.32, 0.76, 0.9, 1.0], [0.93, 1.02, 0.99, 1]);

  const bioClip = useTransform(edgeP, [0.38, 0.76], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const bioOpacity = useTransform(edgeP, [0.38, 0.74], [0, 1]);
  const bioY = useTransform(edgeP, [0.38, 0.76], [22, 0]);

  const paperOpacity = useTransform(p, [0.3, 0.6], [0, 1]);
  const paperScale = useTransform(p, [0.3, 0.4, 0.58, 0.74, 0.86, 0.94], [0.58, 0.76, 0.95, 1.03, 0.99, 1]);
  const paperRotate = useTransform(p, [0.3, 0.4, 0.58, 0.74, 0.86, 0.94], [-14, -7, 2.5, 0.8, -0.3, 0]);
  const paperSkewX = useTransform(p, [0.3, 0.42, 0.7, 0.84], [-10, -4, 1.5, 0]);
  const paperSkewY = useTransform(p, [0.3, 0.42, 0.7, 0.84], [5, 2.5, -0.8, 0]);
  const paperFilter = useTransform(p, [0.3, 0.4, 0.66, 0.8], ["blur(10px)", "blur(6px)", "blur(1.5px)", "blur(0px)"]);
  const paperClip = useTransform(p, [0.3, 0.4, 0.58, 0.74, 0.84], [
    "polygon(14% 5%, 95% 0%, 86% 95%, 3% 100%)",
    "polygon(6% 3%, 97% 2%, 94% 96%, 4% 96%)",
    "polygon(1% 1%, 99% 2%, 98% 99%, 0% 98%)",
    "polygon(0% 0%, 100% 1%, 99% 100%, 0% 99%)",
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  ]);

  const backendAboutY = useTransform(edgeP, [0.44, 0.82], [56, 0]);
  const backendAboutOpacity = useTransform(edgeP, [0.44, 0.8], [0, 1]);
  const backendAboutScale = useTransform(edgeP, [0.44, 0.82], [0.94, 1]);
  const hardwareX = useTransform(edgeP, [0.46, 0.84], [-68, 0]);
  const hardwareOpacity = useTransform(edgeP, [0.46, 0.82], [0, 1]);
  const interestsY = useTransform(edgeP, [0.5, 0.88], [52, 0]);
  const interestsOpacity = useTransform(edgeP, [0.5, 0.86], [0, 1]);
  const interestsScale = useTransform(edgeP, [0.5, 0.88], [0.95, 1]);
  const builtScale = useTransform(edgeP, [0.54, 0.86, 0.94, 1.0], [1.1, 1.02, 0.993, 1]);
  const builtOpacity = useTransform(edgeP, [0.54, 0.84], [0, 1]);
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
          {/* LAYER 1: Hero — fades out */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          >
            <Hero transitionProgress={p} />
          </motion.div>

          {/* LAYER 2: About — builds in underneath */}
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