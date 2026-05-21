"use client";

/**
 * HeroAboutTransition.tsx
 *
 * The centrepiece scroll-driven transition between the Hero and About sections.
 *
 * HOW IT WORKS
 * ─────────────────────────────────────────────────────────────────────────────
 * The container is 300vh tall, pinned via `position:sticky` so the visible
 * viewport is locked for a long scroll zone. Inside that locked viewport:
 *
 *   Phase 1  (0 → 0.38)   Hero elements break apart:
 *            • BACKEND slides left off-screen
 *            • WITH flies right off-screen + scales down
 *            • TASTE. drops off the bottom + slight rotation
 *            • Portrait scales down + rises away
 *            • Marquee ticker fades + blurs out
 *            • Stats bar fades + compresses upward
 *
 *   Phase 2  (0.28 → 0.72)  Hero shell clip-path wipes upward, revealing About.
 *            The About bento grid is already rendered underneath.
 *
 *   Phase 3  (0.40 → 1.0)  About elements enter individually:
 *            • "I BUILD / BREAK / FIX" headline slams in from y:60
 *            • Bio card clips in from bottom
 *            • Philosophy card uncrumples (scale + skew + rotate)
 *            • Backend / Hardware tiles slide in from sides
 *            • Interests strip drops from above
 *            • "BUILT TO BE USED" panel scales up from 0.88
 *            • Footer fades up last
 *
 * ARCHITECTURE
 * ─────────────────────────────────────────────────────────────────────────────
 * • useScroll tracks scrollYProgress over the 300vh container.
 * • Every value is a MotionValue<number|string> derived via useTransform.
 * • All values are passed as props into <Hero> and <About> — neither
 *   component owns its own scroll listener; they are purely receivers.
 * • This keeps animations composable and avoids double-observer conflicts.
 *
 * USAGE
 * ─────────────────────────────────────────────────────────────────────────────
 *   // In page.tsx — desktop only, wrap inside a media-query guard:
 *
 *   <HeroAboutTransition />
 *
 *   // The component renders both Hero and About internally.
 *   // Do NOT render <Hero> or <About> separately on desktop.
 */

import { useRef } from "react";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/about/About";

export default function HeroAboutTransition() {
  // ── Scroll container ──────────────────────────────────────────────────────
  // 300vh gives enough scroll distance for the full cinematic sequence.
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 1 — HERO ELEMENT BREAKOUT
  // ═══════════════════════════════════════════════════════════════════════════

  // BACKEND  →  slides out left
  const backendX = useTransform(scrollYProgress, [0.04, 0.24], [0, -700]);
  const backendOpacity = useTransform(scrollYProgress, [0.04, 0.22], [1, 0]);

  // WITH  →  flies right + shrinks
  const withX = useTransform(scrollYProgress, [0.07, 0.28], [0, 1800]);
  const withScale = useTransform(scrollYProgress, [0.07, 0.28], [1, 0.96]);

  // TASTE.  →  drops + slight clockwise rotation
  const tasteY = useTransform(scrollYProgress, [0.11, 0.32], [0, 680]);
  const tasteRotate = useTransform(scrollYProgress, [0.11, 0.32], [0, 1.4]);

  // Portrait panel  →  scales away + lifts
  const imageScale = useTransform(scrollYProgress, [0.14, 0.40], [1, 0.90]);
  const imageY = useTransform(scrollYProgress, [0.14, 0.40], [0, -320]);

  // Badge sticker  →  drifts with portrait
  const stickerRotate = useTransform(scrollYProgress, [0.16, 0.34], [-4, -12]);
  const stickerX = useTransform(scrollYProgress, [0.16, 0.34], [0, 60]);

  // Marquee ticker  →  blurs + fades
  const marqueeOpacity = useTransform(scrollYProgress, [0.06, 0.22], [1, 0]);
  const marqueeFilter = useTransform(
    scrollYProgress,
    [0.06, 0.22],
    ["blur(0px)", "blur(4px)"]
  );
  const marqueeDuration = useTransform(
    scrollYProgress,
    [0.06, 0.22],
    ["22s", "38s"]
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 2 — HERO SHELL WIPE (clip-path rising)
  // ═══════════════════════════════════════════════════════════════════════════

  // The outer Hero shell clips away upward, revealing About underneath.
  // clip-path goes from fully visible → fully hidden (top edge rises to 100%).
  const heroShellClip = useTransform(
    scrollYProgress,
    [0.26, 0.60],
    ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]
  );

  const heroShellOpacity = useTransform(scrollYProgress, [0.55, 0.62], [1, 0]);

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 3 — ABOUT ELEMENTS ENTER
  // ═══════════════════════════════════════════════════════════════════════════

  // About shell fades in as hero wipes away
  const aboutShellOpacity = useTransform(scrollYProgress, [0.28, 0.46], [0, 1]);

  // "I BUILD / BREAK / FIX"  →  slams in from below
  const buildY = useTransform(scrollYProgress, [0.34, 0.56], [80, 0]);
  const buildOpacity = useTransform(scrollYProgress, [0.34, 0.52], [0, 1]);
  const buildScale = useTransform(scrollYProgress, [0.34, 0.56], [0.96, 1]);

  // Bio card  →  clips in from bottom, fades
  const bioClip = useTransform(
    scrollYProgress,
    [0.38, 0.58],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );
  const bioOpacity = useTransform(scrollYProgress, [0.36, 0.54], [0, 1]);
  const bioY = useTransform(scrollYProgress, [0.38, 0.58], [32, 0]);

  // Philosophy (paper uncrumple)  →  scale + skew + rotate + blur
  const paperOpacity = useTransform(scrollYProgress, [0.40, 0.60], [0, 1]);
  const paperScale = useTransform(scrollYProgress, [0.40, 0.62], [0.82, 1]);
  const paperRotate = useTransform(scrollYProgress, [0.40, 0.60], [-6, 0]);
  const paperSkewX = useTransform(scrollYProgress, [0.40, 0.60], [-8, 0]);
  const paperSkewY = useTransform(scrollYProgress, [0.40, 0.60], [4, 0]);
  const paperFilter = useTransform(
    scrollYProgress,
    [0.40, 0.60],
    ["blur(6px)", "blur(0px)"]
  );
  const paperClip = useTransform(
    scrollYProgress,
    [0.40, 0.62],
    ["inset(0% 0% 40% 0%)", "inset(0% 0% 0% 0%)"]
  );

  // Backend systems tile  →  rises + fades
  const backendAboutY = useTransform(scrollYProgress, [0.44, 0.64], [48, 0]);
  const backendAboutOpacity = useTransform(
    scrollYProgress,
    [0.44, 0.62],
    [0, 1]
  );
  const backendAboutScale = useTransform(
    scrollYProgress,
    [0.44, 0.64],
    [0.95, 1]
  );

  // Hardware tile  →  slides in from right
  const hardwareX = useTransform(scrollYProgress, [0.46, 0.66], [60, 0]);
  const hardwareOpacity = useTransform(scrollYProgress, [0.46, 0.64], [0, 1]);

  // Interests strip  →  drops from above
  const interestsY = useTransform(scrollYProgress, [0.48, 0.68], [-40, 0]);
  const interestsOpacity = useTransform(scrollYProgress, [0.48, 0.66], [0, 1]);
  const interestsScale = useTransform(
    scrollYProgress,
    [0.48, 0.68],
    [0.96, 1]
  );

  // "BUILT TO BE USED"  →  scales up from 0.88
  const builtScale = useTransform(scrollYProgress, [0.52, 0.72], [0.88, 1]);
  const builtOpacity = useTransform(scrollYProgress, [0.52, 0.70], [0, 1]);

  // Footer  →  fades in last
  const footerY = useTransform(scrollYProgress, [0.62, 0.80], [24, 0]);
  const footerOpacity = useTransform(scrollYProgress, [0.62, 0.78], [0, 1]);

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    // Outer scroll container — 300vh enables the long cinematic scroll zone
    <div
      ref={containerRef}
      data-section="hero"
      style={{ height: "300vh", position: "relative" }}
    >
      {/* ── STICKY VIEWPORT LOCK ────────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          willChange: "transform",
        }}
      >
        {/* ── ABOUT — rendered BENEATH the Hero, revealed by wipe ───────── */}
        {/*
          z-index: 10. The Hero shell sits on top (z-20) and clips away
          upward, revealing this panel. About is always full-size here —
          no scaling needed; it is already in final position.
        */}
        <div
          data-section="about"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            overflow: "hidden",
          }}
        >
          <About
            viewportTransition={true}
            shellOpacity={aboutShellOpacity}
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
        </div>

        {/* ── HERO — sits on top, clips away upward ─────────────────────── */}
        {/*
          The Hero shell uses clip-path (inset) to wipe itself upward
          over scrollYProgress [0.26 → 0.60], revealing About below.
          opacity goes to 0 at the tail end to fully remove it from paint.
        */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            clipPath: heroShellClip,
            opacity: heroShellOpacity,
            willChange: "clip-path, opacity",
          }}
        >
          <Hero
            transitionProgress={scrollYProgress}
            // Suppress the internal ticker fade — the sticky ticker handles it globally.
            suppressTicker={true}
            backendStyle={{ x: backendX, opacity: backendOpacity }}
            withStyle={{ x: withX, scale: withScale }}
            tasteStyle={{ y: tasteY, rotate: tasteRotate }}
            imageScale={imageScale}
            imageY={imageY}
            stickerRotate={stickerRotate}
            stickerX={stickerX}
            marqueeOpacity={marqueeOpacity}
            marqueeFilter={marqueeFilter}
            marqueeDuration={marqueeDuration}
          />
        </motion.div>
      </div>
    </div>
  );
}
