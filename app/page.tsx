"use client";

/**
 * app/page.tsx
 *
 * DESKTOP (>1180px):
 *   One pinned cinematic timeline owns Hero → About → Skills → Experience.
 *   Each section is rendered once, as a layer in the same sticky viewport.
 *
 * MOBILE/TABLET (<= 1180px):
 *   All sections render independently with whileInView animations.
 */

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import DesktopCinematicTransition from "@/components/DesktopCinematicTransition";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/about/About";
import Skills from "@/components/sections/skills/Skills";
import Experience from "@/components/sections/experience/Experience";
import Projects from "@/components/sections/projects/Projects";
import Timeline from "@/components/sections/timeline/Timeline";
import Patents from "@/components/sections/patents/Patents";
import Achievements from "@/components/sections/achievements/Achievements";
import Contact from "@/components/sections/contact/Contact";
import ScrollProgressDots from "@/components/ui/ScrollProgressDots";
import StickyTicker from "@/components/ui/StickyTicker";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 1180);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isDesktop;
}

const SECTIONS = [
  "hero",
  "about",
  "skills",
  "experience",
  "projects",
  // user requested menu order:
  "patents",
  "achievements",
  "timeline",
  "contact",
];

export default function Page() {
  const isDesktop = useIsDesktop();

  return (
    <>
      <Navbar />

      {isDesktop ? (
        <>
          <DesktopCinematicTransition />
          <Patents />
          <Achievements />
          <Timeline />
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
          <Achievements />
          <Timeline />
          <Contact />
        </>
      )}

      {/* Spacer so last section clears StickyTicker (44px + 4px border) */}
      <div style={{ paddingBottom: 48 }} />

      <ScrollProgressDots sections={SECTIONS} />
      <StickyTicker />
    </>
  );
}
