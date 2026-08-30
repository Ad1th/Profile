"use client";

/**
 * DESKTOP (>1180px):
 *   One pinned cinematic timeline owns Hero -> About -> Skills -> Experience.
 *   Each section is rendered once, as a layer in the same sticky viewport.
 *
 * MOBILE/TABLET (<= 1180px) and REDUCED MOTION:
 *   All sections render independently with whileInView animations.
 *   The stacked layout doubles as the reduced-motion variant: 320vh of
 *   scroll-linked pinning, parallax and clip-path wipes has no accessible
 *   "slower" version, so visitors who ask for less motion get the same
 *   content laid out linearly instead.
 */

import { useEffect, useLayoutEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import DesktopCinematicTransition from "@/components/DesktopCinematicTransition";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/about/About";
import Skills from "@/components/sections/skills/Skills";
import Experience from "@/components/sections/experience/Experience";
import Projects from "@/components/sections/projects/Projects";
import Timeline from "@/components/sections/timeline/Timeline";
import Patents from "@/components/sections/patents/Patents";
import HackathonsAchievements from "@/components/sections/hackathons-achievements/HackathonsAchievements";
import Contact from "@/components/sections/contact/Contact";
import ScrollProgressDots from "@/components/ui/ScrollProgressDots";

/**
 * Runs before paint on the client, no-ops on the server. The viewport check
 * used to sit in useEffect, so the browser painted the stacked layout for one
 * frame and then jumped to the cinematic one on every desktop load.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useIsomorphicLayoutEffect(() => {
    const mql = window.matchMedia("(min-width: 1181px)");
    const sync = () => setIsDesktop(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);
  return isDesktop;
}

const SECTIONS = [
  "hero",
  "about",
  "skills",
  "experience",
  "projects",
  "patents",
  "hackathons/achievements",
  "contact",
];

export default function HomePageClient() {
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {isDesktop && !prefersReducedMotion ? (
        <>
          <DesktopCinematicTransition />
          <Patents />
          <HackathonsAchievements />
          <Contact />
        </>
      ) : (
        <>
          <div data-section="hero">
            <Hero />
          </div>
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Patents />
          <HackathonsAchievements />
          <Contact />
        </>
      )}

      <ScrollProgressDots sections={SECTIONS} />
    </>
  );
}
