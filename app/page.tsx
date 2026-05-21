/**
 * app/page.tsx  — integration snippet
 *
 * This shows exactly how to wire HeroAboutTransition, Skills,
 * ScrollProgressDots, and StickyTicker together in your root page.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  <Navbar />                          ← existing, unchanged
 *
 *  [Desktop only: HeroAboutTransition] ← renders Hero + About as one cinematic
 *  [Tablet/Mobile: <Hero /> + <About>] ← standalone fallback
 *
 *  <Skills />                          ← updated with scan-line + stagger
 *  <Experience />                      ← unchanged (add data-section="experience")
 *  <Contact />                         ← unchanged
 *
 *  <ScrollProgressDots />              ← fixed right-edge 4-dot indicator
 *  <StickyTicker />                    ← fixed bottom orange ticker
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * NOTES
 * ─────────────────────────────────────────────────────────────────────────────
 * • The `pb-[48px]` on the main wrapper ensures the last section's content
 *   is not hidden behind the sticky ticker (44px height + 4px border).
 *
 * • HeroAboutTransition is conditionally rendered only on desktop (>1180px).
 *   The useIsDesktop hook is a simple window.innerWidth check (SSR-safe).
 *
 * • On tablet/portrait/mobile, Hero and About render independently with their
 *   own whileInView animations — no cinematic wipe.
 *
 * • data-section attributes on each section are required for ScrollProgressDots.
 *   HeroAboutTransition already adds data-section="hero" and data-section="about"
 *   on its own wrapper divs. On mobile/tablet you need them on <Hero> and <About>.
 *   The updated About.tsx adds data-section="about" to its <section>.
 *   For Hero on mobile/tablet wrap it: <div data-section="hero"><Hero /></div>
 *
 * • Experience.tsx needs data-section="experience" on its outer <section>
 *   (one-line change, not included in this diff).
 */

"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroAboutTransition from "@/components/HeroAboutTransition";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/about/About";
import Skills from "@/components/sections/skills/Skills";
import Experience from "@/components/sections/experience/Experience";
// import Contact from "@/components/Contact";
import ScrollProgressDots from "@/components/ui/ScrollProgressDots";
import StickyTicker from "@/components/ui/StickyTicker";

// SSR-safe desktop check — runs only on client after hydration
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

      {/* ── HERO + ABOUT ───────────────────────────────────────────────── */}
      {isDesktop ? (
        // Desktop: cinematic scroll-driven wipe between Hero and About
        <HeroAboutTransition />
      ) : (
        // Tablet / Mobile: independent sections with their own mount animations
        <>
          <div data-section="hero">
            <Hero />
          </div>
          <About />
          {/* About.tsx already has data-section="about" on its <section> */}
        </>
      )}

      {/* ── SKILLS ─────────────────────────────────────────────────────── */}
      {/* Skills.tsx has data-section="skills" on its <section> */}
      <Skills />

      {/* ── EXPERIENCE ─────────────────────────────────────────────────── */}
      {/* Add data-section="experience" to Experience's outer <section> tag */}
      <Experience />

      {/* ── CONTACT ────────────────────────────────────────────────────── */}
      {/* pb-[48px] pads away from StickyTicker (44px + 4px border) */}
      {/* <div className="pb-[48px]">
        <Contact />
      </div> */}

      {/* ── GLOBAL OVERLAY COMPONENTS ──────────────────────────────────── */}

      {/* Fixed 4-dot right-edge section progress indicator */}
      <ScrollProgressDots sections={SECTIONS} />

      {/* Fixed bottom orange brand ticker — always visible, dims when idle */}
      <StickyTicker />
    </>
  );
}
