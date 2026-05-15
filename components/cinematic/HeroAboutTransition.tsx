"use client";

/**
 * HeroAboutTransition.tsx
 *
 * Cinematic Hero → About transition using sticky viewport.
 *
 * This transition works by:
 * - Pinning the viewport sticky during scroll
 * - Hero fades out as you scroll
 * - About builds in behind it
 * - After transition completes, sticky releases and normal scrolling resumes
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

const TRANSITION_PX = 1000;

function useHeroSpring(raw: MotionValue<number>) {
  return useSpring(raw, {
    stiffness: 55,
    damping: 28,
    mass: 2.8,
    restDelta: 0.0005,
  });
}

function useAboutSpring(raw: MotionValue<number>) {
  return useSpring(raw, {
    stiffness: 38,
    damping: 30,
    mass: 3.0,
    restDelta: 0.0005,
  });
}

interface HeroAboutTransitionProps {
  stageRef: React.RefObject<HTMLElement | null>;
}

function HeroAboutTransitionDesktop({ stageRef }: HeroAboutTransitionProps) {
  const { scrollYProgress: rawProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const transitionProgress = useTransform(rawProgress, [0, 1], [0, 1], {
    clamp: true,
  });

  const transitionHeroSpring = useHeroSpring(transitionProgress);
  const transitionAboutSpring = useAboutSpring(transitionProgress);

  // Hero animations
  const heroOpacity = useTransform(transitionAboutSpring, [0.1, 0.7], [1, 0]);
  const heroY = useTransform(transitionAboutSpring, [0.04, 0.7], [0, -52]);
  const heroScale = useTransform(
    transitionAboutSpring,
    [0.04, 0.65],
    [1, 0.965],
  );

  // About shell + build animations
  const shellOpacity = useTransform(transitionAboutSpring, [0.2, 0.55], [0, 1]);

  const buildY = useTransform(
    transitionAboutSpring,
    [0.24, 0.68, 0.84, 1.0],
    [76, -4, 1, 0],
  );
  const buildOpacity = useTransform(
    transitionAboutSpring,
    [0.24, 0.65],
    [0, 1],
  );
  const buildScale = useTransform(
    transitionAboutSpring,
    [0.24, 0.68, 0.84, 1.0],
    [0.93, 1.02, 0.99, 1],
  );

  // Paper uncrumple
  const paperOpacity = useTransform(transitionHeroSpring, [0.24, 0.5], [0, 1]);
  const paperScale = useTransform(
    transitionHeroSpring,
    [0.24, 0.34, 0.5, 0.66, 0.8, 0.9],
    [0.58, 0.76, 0.95, 1.03, 0.99, 1],
  );
  const paperRotate = useTransform(
    transitionHeroSpring,
    [0.24, 0.34, 0.5, 0.66, 0.8, 0.9],
    [-14, -7, 2.5, 0.8, -0.3, 0],
  );
  const paperSkewX = useTransform(
    transitionHeroSpring,
    [0.24, 0.36, 0.62, 0.78],
    [-10, -4, 1.5, 0],
  );
  const paperSkewY = useTransform(
    transitionHeroSpring,
    [0.24, 0.36, 0.62, 0.78],
    [5, 2.5, -0.8, 0],
  );
  const paperFilter = useTransform(
    transitionHeroSpring,
    [0.24, 0.34, 0.58, 0.72],
    ["blur(10px)", "blur(6px)", "blur(1.5px)", "blur(0px)"],
  );
  const paperClip = useTransform(
    transitionHeroSpring,
    [0.24, 0.34, 0.5, 0.66, 0.78],
    [
      "polygon(14% 5%, 95% 0%, 86% 95%, 3% 100%)",
      "polygon(6% 3%, 97% 2%, 94% 96%, 4% 96%)",
      "polygon(1% 1%, 99% 2%, 98% 99%, 0% 98%)",
      "polygon(0% 0%, 100% 1%, 99% 100%, 0% 99%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
  );

  // About elements
  const bioClip = useTransform(
    transitionAboutSpring,
    [0.3, 0.68],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const bioOpacity = useTransform(transitionAboutSpring, [0.3, 0.66], [0, 1]);
  const bioY = useTransform(transitionAboutSpring, [0.3, 0.68], [22, 0]);

  const backendY = useTransform(transitionAboutSpring, [0.36, 0.74], [56, 0]);
  const backendOpacity = useTransform(
    transitionAboutSpring,
    [0.36, 0.72],
    [0, 1],
  );
  const backendScale = useTransform(
    transitionAboutSpring,
    [0.36, 0.74],
    [0.94, 1],
  );

  const hardwareX = useTransform(transitionAboutSpring, [0.38, 0.76], [-68, 0]);
  const hardwareOpacity = useTransform(
    transitionAboutSpring,
    [0.38, 0.74],
    [0, 1],
  );

  const interestsY = useTransform(transitionAboutSpring, [0.42, 0.8], [52, 0]);
  const interestsOpacity = useTransform(
    transitionAboutSpring,
    [0.42, 0.78],
    [0, 1],
  );
  const interestsScale = useTransform(
    transitionAboutSpring,
    [0.42, 0.8],
    [0.95, 1],
  );

  const builtScale = useTransform(
    transitionAboutSpring,
    [0.46, 0.8, 0.9, 1.0],
    [1.1, 1.02, 0.993, 1],
  );
  const builtOpacity = useTransform(
    transitionAboutSpring,
    [0.46, 0.78],
    [0, 1],
  );

  const footerY = useTransform(transitionAboutSpring, [0.54, 1.0], [36, 0]);
  const footerOpacity = useTransform(
    transitionAboutSpring,
    [0.54, 0.92],
    [0, 1],
  );

  return (
    <section
      ref={stageRef}
      className="relative overflow-hidden bg-[#111]"
      style={{
        height: `calc(100svh + ${TRANSITION_PX}px)`,
      }}
    >
      <div
        className="sticky top-0 z-30 overflow-hidden bg-[#111]"
        style={{
          height: "100svh",
        }}
      >
        <motion.div className="relative h-full w-full overflow-hidden">
          <motion.div
            className="absolute inset-0 z-10"
            style={{
              opacity: heroOpacity,
              y: heroY,
              scale: heroScale,
            }}
          >
            <Hero transitionProgress={transitionHeroSpring} />
          </motion.div>

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
      </div>
    </section>
  );
}

export default function HeroAboutTransition() {
  const stageRef = useRef<HTMLElement>(null);

  return (
    <>
      <div className="hidden lg:block">
        <HeroAboutTransitionDesktop stageRef={stageRef} />
      </div>

      <div className="lg:hidden">
        <Hero />
        <About />
      </div>
    </>
  );
}
