"use client";

/**
 * FullTransition.tsx
 *
 * Composes two independent pinned scroll sections:
 *
 *   Section 1 — HeroAboutTransition
 *     Pin height: 100svh + ~60px  (small scroll trigger)
 *     Hero deconstructs → About builds in
 *
 *   Section 2 — AboutSkillsTransition
 *     Pin height: 100svh + ~200px  (larger scroll trigger = feels like "regular scroll")
 *     About slides left → Skills slides in horizontally
 *
 *   After both sections: normal vertical scroll continues to Experience etc.
 *
 * Key insight: each section has its OWN stageRef + useScroll,
 * so they fire independently as the user scrolls through them.
 * No more cramming everything into one scroll window.
 */

import HeroAboutTransition from "./HeroAboutTransition";
import AboutSkillsTransition from "./AboutSkillsTransition";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/about/About";
import Skills from "@/components/sections/skills/Skills";

export default function FullTransition() {
  return (
    <>
      {/* ── DESKTOP ─────────────────────────────────────────────────────── */}
      <div className="hidden lg:block">
        {/*
          Phase 1: Hero → About
          Small scroll distance (clamp ~60px pin travel).
          User barely scrolls and the cinematic swap happens.
        */}
        <HeroAboutTransition />

        {/*
          Phase 2: About → Skills (horizontal)
          Larger pin travel (~300px) so it feels like a real scroll,
          not a hairpin trigger. User scrolls a comfortable distance
          to pan the panel across.
        */}
        <AboutSkillsTransition />
      </div>

      {/* ── MOBILE / TABLET: normal stacked flow ─────────────────────── */}
      <div className="lg:hidden">
        <Hero />
        <About />
        <Skills />
      </div>
    </>
  );
}