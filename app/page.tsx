"use client";

/**
 * app/page.tsx
 *
 * DESKTOP (>1180px) — 3 chained sticky containers, zero gaps:
 *
 *   HeroAboutTransition       (300vh) — Hero clips away upward, About enters
 *   AboutSkillsTransition     (300vh) — About collapses, shutter, Skills boots
 *   SkillsExperienceTransition(300vh) — Skills rows scatter, void fades out
 *   <Experience />            (normal flow) — revealed as void fades
 *
 * Each container is 300vh. The sticky inside locks to 100vh.
 * When a container's scroll space is exhausted the sticky releases immediately
 * and the next container's sticky locks — ZERO gap between sections.
 *
 * MOBILE/TABLET (<= 1180px):
 *   All sections render independently with whileInView animations.
 */

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroAboutTransition from "@/components/HeroAboutTransition";
import AboutSkillsTransition from "@/components/AboutSkillsTransition";
import SkillsExperienceTransition from "@/components/SkillsExperienceTransition";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/about/About";
import Skills from "@/components/sections/skills/Skills";
import Experience from "@/components/sections/experience/Experience";
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

const SECTIONS = ["hero", "about", "skills", "experience"];

export default function Page() {
  const isDesktop = useIsDesktop();

  return (
    <>
      <Navbar />

      {isDesktop ? (
        <>
          {/* 1. Hero → About (300vh) */}
          <HeroAboutTransition />

          {/* 2. About → Skills (300vh)
              About layer starts fully visible (continuing from above).
              Skills layer underneath boots up as shutter lifts. */}
          <AboutSkillsTransition />

          {/* 3. Skills → Experience (300vh)
              Skills rows scatter to corners. Void fades in then out.
              Experience is in normal flow below — revealed as void fades. */}
          <SkillsExperienceTransition />

          {/* Experience is rendered inside SkillsExperienceTransition on desktop
              so the reveal happens in the same pinned viewport with no flow gap. */}
        </>
      ) : (
        <>
          <div data-section="hero">
            <Hero />
          </div>
          <About />
          <Skills />
          <Experience />
        </>
      )}

      {/* Spacer so last section clears StickyTicker (44px + 4px border) */}
      <div style={{ paddingBottom: 48 }} />

      <ScrollProgressDots sections={SECTIONS} />
      <StickyTicker />
    </>
  );
}
