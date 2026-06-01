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
import HackathonsAchievements from "@/components/sections/hackathons-achievements/HackathonsAchievements";
import Contact from "@/components/sections/contact/Contact";
import ScrollProgressDots from "@/components/ui/ScrollProgressDots";

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
  "patents",
  "hackathons/achievements",
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
