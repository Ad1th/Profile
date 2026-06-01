"use client";

/**
 * Hero.tsx  (updated for cinematic transition)
 *
 * Changes from original:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. `transitionProgress` MotionValue removed from internal usage —
 *    DesktopCinematicTransition drives all scroll-linked values externally now.
 *
 * 2. New props surface for the headline words, portrait, and ticker so
 *    DesktopCinematicTransition can pass pre-derived MotionValues directly:
 *      • backendStyle, withStyle, tasteStyle   → HeroHeadline
 *      • imageScale, imageY                    → HeroPortrait (panelStyle)
 *      • stickerRotate, stickerX               → HeroPortrait (stickerStyle)
 *      • marqueeOpacity, marqueeFilter,
 *        marqueeDuration                       → internal marquee ticker
 *      • suppressTicker                        → hides internal ticker
 *        (used when StickyTicker is global)
 *
 * 3. data-section="hero" moved to the desktop timeline wrapper — this file
 *    no longer needs it.
 *
 * 4. Tablet / Mobile variants are UNCHANGED and still self-animate on mount.
 *    They are never wrapped by DesktopCinematicTransition.
 *
 * 5. Internal `useScroll` + `useTransform` on `transitionProgress` removed
 *    from HeroDesktop — the fallback values it produced are now replaced by
 *    the real external props flowing in from DesktopCinematicTransition.
 *    When no external props are provided (standalone usage) the component
 *    falls back gracefully: all MotionStyle props are simply undefined, which
 *    Framer Motion ignores cleanly.
 */

import type React from "react";
import HeroHeadline from "./HeroHeadline";
import HeroCTA from "./HeroCTA";
import HeroPortrait from "./HeroPortrait";
import { motion, type MotionValue, type MotionStyle } from "framer-motion";
import { easings } from "@/lib/motion";
import { useState, useEffect } from "react";

// ── PROP TYPES ─────────────────────────────────────────────────────────────
interface HeroDesktopExternalProps {
  /** Suppress the internal orange ticker (use StickyTicker globally instead). */
  suppressTicker?: boolean;

  // Headline word-level MotionStyle overrides (from DesktopCinematicTransition)
  backendStyle?: MotionStyle;
  withStyle?: MotionStyle;
  tasteStyle?: MotionStyle;

  // Portrait panel transforms (from DesktopCinematicTransition)
  imageScale?: MotionValue<number>;
  imageY?: MotionValue<number>;
  stickerRotate?: MotionValue<number>;
  stickerX?: MotionValue<number>;

  // Marquee ticker controls (from DesktopCinematicTransition)
  marqueeOpacity?: MotionValue<number>;
  marqueeFilter?: MotionValue<string>;
  marqueeDuration?: MotionValue<string>;
}

export default function Hero({
  suppressTicker = false,
  backendStyle,
  withStyle,
  tasteStyle,
  imageScale,
  imageY,
  stickerRotate,
  stickerX,
  marqueeOpacity,
  marqueeFilter,
  marqueeDuration,

  // Legacy prop — kept for API compat; no longer used internally on desktop.
  transitionProgress: _transitionProgress,
}: HeroDesktopExternalProps & {
  transitionProgress?: MotionValue<number>;
}) {
  const [viewport, setViewport] = useState<
    "desktop" | "tabletLandscape" | "tabletPortrait" | "mobile"
  >("desktop");

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      if (w > 1180) setViewport("desktop");
      else if (w >= 768) {
        if (isPortrait && w <= 1024) setViewport("tabletPortrait");
        else setViewport("tabletLandscape");
      } else setViewport("mobile");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (viewport === "tabletPortrait") return <HeroTabletPortrait />;
  if (viewport === "tabletLandscape") return <HeroTabletLandscape />;
  if (viewport === "mobile") return <HeroMobile />;

  return (
    <HeroDesktop
      suppressTicker={suppressTicker}
      backendStyle={backendStyle}
      withStyle={withStyle}
      tasteStyle={tasteStyle}
      imageScale={imageScale}
      imageY={imageY}
      stickerRotate={stickerRotate}
      stickerX={stickerX}
      marqueeOpacity={marqueeOpacity}
      marqueeFilter={marqueeFilter}
      marqueeDuration={marqueeDuration}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DESKTOP
// ═══════════════════════════════════════════════════════════════════════════
function HeroDesktop({
  suppressTicker = false,
  backendStyle,
  withStyle,
  tasteStyle,
  imageScale,
  imageY,
  stickerRotate,
  stickerX,
  marqueeOpacity,
  marqueeFilter,
  marqueeDuration,
}: HeroDesktopExternalProps) {
  return (
    <section className="relative h-screen min-h-[900px] w-full overflow-hidden bg-[#F0EBE0]">
      <div className="absolute inset-0 bg-grain pointer-events-none z-[60] opacity-[0.025]" />

      <motion.div
        className="absolute inset-0 z-50 pointer-events-none"
        style={{ border: "5px solid #111" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />

      <div
        className="relative w-full h-full flex"
        style={{ paddingTop: 56, paddingBottom: 112 }}
      >
        {/* Left panel — black, headline + CTA */}
        <motion.div
          className="relative flex flex-col justify-center bg-[#111]"
          style={{
            width: "50%",
            borderRight: "5px solid #111",
            paddingLeft: 48,
            paddingRight: 48,
            zIndex: 20,
          }}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easings.primary }}
        >
          <div
            className="absolute"
            style={{
              left: 22,
              bottom: 76,
              width: 14,
              height: 14,
              background: "#E8420A",
              border: "2px solid #111",
            }}
          />
          <div style={{ marginTop: 50 }}>
            {/* Pass external MotionStyle props directly into HeroHeadline */}
            <HeroHeadline
              backendStyle={backendStyle}
              withStyle={withStyle}
              tasteStyle={tasteStyle}
            />
            <HeroCTA />
          </div>
        </motion.div>

        {/* Right panel — blue, portrait */}
        <motion.div
          className="relative flex items-center justify-center bg-[#6C8EAD]"
          style={{ width: "50%", zIndex: 10 }}
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easings.primary }}
        >
          <div
            className="absolute left-0 top-0 bottom-0"
            style={{ width: 4, background: "#E8420A" }}
          />
          <div
            className="absolute"
            style={{
              left: 18,
              bottom: 92,
              width: 24,
              height: 24,
              background: "#E8420A",
              border: "2px solid #111",
              zIndex: 5,
            }}
          />
          <HeroPortrait
            panelStyle={{
              scale: imageScale,
              y: imageY,
            }}
            stickerStyle={{
              rotate: stickerRotate,
              x: stickerX,
            }}
          />
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        className="absolute left-0 right-0 z-30 flex items-center"
        style={{
          bottom: 56,
          height: 100,
          background: "#F0EBE0",
          borderTop: "5px solid #111",
          borderBottom: "5px solid #111",
          boxShadow: "0 -4px 0 #111",
        }}
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 16, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.35, ease: easings.primary }}
      >
        {[
          { value: "3+", label: "Years Building", accent: true },
          { value: "15+", label: "Projects Shipped", accent: false },
          { value: "80+", label: "Repositories", accent: false },
        ].map(({ value, label, accent }, i) => (
          <div
            key={value}
            className="flex-1 flex flex-col items-start justify-center"
            style={{
              padding: "0px 28px",
              borderRight: i < 2 ? "5px solid #111" : undefined,
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              {accent ? (
                <>
                  <div style={{ width: 18, height: 3, background: "#111" }} />
                  <div style={{ width: 3, height: 3, background: "#E8420A" }} />
                  <div style={{ width: 3, height: 3, background: "#111" }} />
                </>
              ) : (
                <>
                  <div style={{ width: 12, height: 3, background: "#111" }} />
                  <div
                    style={{
                      width: 12,
                      height: 3,
                      background: "#111",
                      transform: "skewX(-32deg)",
                    }}
                  />
                </>
              )}
            </div>
            <div
              className="text-[#111] text-[48px] font-black leading-none"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              {value}
            </div>
            <div
              className="text-[#444] text-[25px] font-bold tracking-[0.12em] uppercase"
              style={{ fontFamily: "var(--font-archivo), monospace" }}
            >
              {label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Orange marquee ticker — hidden when StickyTicker is global */}
      {!suppressTicker && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-40 overflow-hidden flex items-center"
          style={{
            height: 43,
            background: "#E8420A",
            borderTop: "2px solid #111",
            boxShadow: "0 -3px 0 #111",
            opacity: marqueeOpacity,
            filter: marqueeFilter,
          }}
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: easings.primary }}
        >
          <motion.div
            className="flex items-center h-full whitespace-nowrap"
            style={{
              animation: "ticker linear infinite",
              animationDuration: marqueeDuration ?? "22s",
              paddingLeft: 12,
              paddingTop: 1,
              paddingBottom: 3,
            }}
          >
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="text-white text-[14px] font-black tracking-[0.26em] uppercase"
                style={{
                  fontFamily: "var(--font-archivo), monospace",
                  paddingRight: 64,
                }}
              >
                MAKE IT WORK ■ MAKE IT FAST ■ MAKE IT HOLD ■ MAKE IT BETTER ■
              </span>
            ))}
          </motion.div>
        </motion.div>
      )}

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TABLET LANDSCAPE  (768px – 1180px, landscape)
// ═══════════════════════════════════════════════════════════════════════════
function HeroTabletLandscape() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#F0EBE0]">
      <div className="absolute inset-0 bg-grain pointer-events-none z-[60] opacity-[0.025]" />
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none"
        style={{ border: "5px solid #111" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <div
        className="relative"
        style={{
          minHeight: "calc(100vh - var(--nav-height, 56px) - 112px - 48px)",
          display: "grid",
          gridTemplateColumns: "52% 48%",
          borderBottom: "5px solid #111",
        }}
      >
        <motion.div
          className="relative bg-[#111]"
          style={{
            borderRight: "5px solid #111",
            padding: "32px clamp(20px, 4vw, 36px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          initial={{ x: -28, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easings.primary }}
        >
          <div
            className="absolute"
            style={{
              left: 16,
              bottom: 22,
              width: 12,
              height: 12,
              background: "#E8420A",
              border: "2px solid #111",
            }}
          />
          <div style={{ width: "100%", maxWidth: 460 }}>
            <HeadlineTablet />
          </div>
        </motion.div>
        <motion.div
          className="relative bg-[#6C8EAD]"
          style={{
            padding: "28px clamp(16px, 3vw, 28px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easings.primary }}
        >
          <div
            className="absolute left-0 top-0 bottom-0"
            style={{ width: 4, background: "#E8420A" }}
          />
          <HeroPortraitTablet />
        </motion.div>
      </div>
      <StatsBarTablet />
      <TickerTablet />
      <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TABLET PORTRAIT
// ═══════════════════════════════════════════════════════════════════════════
function HeroTabletPortrait() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F0EBE0]">
      <div className="absolute inset-0 bg-grain pointer-events-none z-[60] opacity-[0.025]" />
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none"
        style={{ border: "5px solid #111" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <motion.div
        className="relative bg-[#111]"
        style={{
          borderBottom: "5px solid #111",
          padding: "34px 30px 28px",
          display: "flex",
          justifyContent: "center",
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: easings.primary }}
      >
        <div style={{ width: "100%", maxWidth: 720 }}>
          <HeadlineTabletPortrait />
        </div>
      </motion.div>
      <motion.div
        className="relative bg-[#6C8EAD]"
        style={{
          borderBottom: "5px solid #111",
          padding: "30px 24px 34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: easings.primary }}
      >
        <div
          className="absolute left-0 top-0 bottom-0"
          style={{ width: 4, background: "#E8420A" }}
        />
        <HeroPortraitTabletPortrait />
      </motion.div>
      <StatsBarTablet cols={2} />
      <TickerTablet />
      <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MOBILE
// ═══════════════════════════════════════════════════════════════════════════
function HeroMobile() {
  const [portrait, setPortrait] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(orientation: portrait)");
    const sync = () => setPortrait(media.matches);
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F0EBE0]">
      <div className="absolute inset-0 bg-grain pointer-events-none z-[60] opacity-[0.025]" />
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none hidden md:block"
        style={{ border: "4px solid #111" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <motion.div
        className="relative bg-[#111]"
        style={{
          borderBottom: "4px solid #111",
          padding: "20px 16px",
          minHeight: "46vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: easings.primary }}
      >
        <HeadlineMobile portrait={portrait} />
      </motion.div>
      <motion.div
        className="relative bg-[#6C8EAD]"
        style={{
          borderBottom: "4px solid #111",
          padding: "28px 16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: easings.primary }}
      >
        <HeroPortraitMobile />
      </motion.div>
      {/* Mobile stats */}
      <motion.div
        className="relative z-30 grid gap-0"
        style={{
          background: "#F0EBE0",
          borderBottom: "4px solid #111",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
        initial={{ opacity: 0, y: 14, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.25, ease: easings.primary }}
      >
        {[
          { value: "3+", label: "Years" },
          { value: "12", label: "Projects" },
          { value: "80+", label: "Repos" },
        ].map(({ value, label }, i) => (
          <div
            key={value}
            style={{
              borderRight: i < 2 ? "4px solid #111" : undefined,
              borderBottom: "4px solid #111",
              padding: "16px 12px",
              minHeight: 85,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div
              className="text-[#111] text-[28px] font-black leading-none"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              {value}
            </div>
            <div
              className="text-[#555] text-[10px] font-bold tracking-[0.12em] uppercase"
              style={{
                fontFamily: "var(--font-archivo), monospace",
                marginTop: 6,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </motion.div>
      {/* Mobile ticker */}
      <motion.div
        className="relative z-40 overflow-hidden flex items-center"
        style={{
          height: 40,
          background: "#E8420A",
          borderTop: "4px solid #111",
        }}
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 1.0, ease: easings.primary }}
      >
        <div
          className="flex items-center h-full whitespace-nowrap"
          style={{ animation: "ticker 18s linear infinite", paddingLeft: 12 }}
        >
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="text-white text-[10px] font-black tracking-[0.2em] uppercase"
              style={{
                fontFamily: "var(--font-archivo), monospace",
                paddingRight: 32,
              }}
            >
              OPEN TO INTERN ■ BACKEND ■ CLEAN CODE ■
            </span>
          ))}
        </div>
      </motion.div>
      <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SHARED HELPERS — Tablet/Mobile subcomponents (unchanged logic)
// ═══════════════════════════════════════════════════════════════════════════

function HeadlineTablet() {
  return (
    <div
      className="flex flex-col select-none uppercase"
      style={{
        fontFamily: "var(--font-anton), 'Arial Black', Impact, sans-serif",
        fontWeight: 900,
        letterSpacing: "-0.06em",
        lineHeight: 0.88,
      }}
    >
      <motion.span
        className="block text-[#F0EBE0]"
        style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.15, ease: easings.primary }}
      >
        BACKEND
      </motion.span>
      <motion.div
        className="inline-block"
        style={{
          border: "3px solid #CFDE00",
          padding: "3px 12px 0px 12px",
          marginTop: 6,
          marginBottom: 6,
          maxWidth: "fit-content",
        }}
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.25, ease: easings.primary }}
      >
        <span
          className="block text-[#CFDE00]"
          style={{ fontSize: "clamp(48px, 8vw, 92px)", lineHeight: 0.9 }}
        >
          WITH
        </span>
      </motion.div>
      <motion.span
        className="block text-[#E8420A]"
        style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.35, ease: easings.primary }}
      >
        TASTE.
      </motion.span>
      <motion.p
        className="font-mono text-[#E8E8E8] normal-case mt-6"
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.02em",
          lineHeight: 1.5,
          maxWidth: 360,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: easings.primary }}
      >
        Pressure tested builds with clean internals.
      </motion.p>
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: easings.primary }}
      >
        <CTASmall width={220} height={52} fontSize={14} />
      </motion.div>
    </div>
  );
}

function HeadlineTabletPortrait() {
  return (
    <div
      className="flex flex-col select-none uppercase"
      style={{
        fontFamily: "var(--font-anton), 'Arial Black', Impact, sans-serif",
        fontWeight: 900,
        letterSpacing: "-0.06em",
        lineHeight: 0.88,
      }}
    >
      <motion.span
        className="block text-[#F0EBE0]"
        style={{ fontSize: "clamp(62px, 10.5vw, 106px)" }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.15, ease: easings.primary }}
      >
        BACKEND
      </motion.span>
      <motion.div
        className="inline-block"
        style={{
          border: "3px solid #CFDE00",
          padding: "4px 12px 0px 12px",
          marginTop: 6,
          marginBottom: 6,
          maxWidth: "fit-content",
        }}
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.25, ease: easings.primary }}
      >
        <span
          className="block text-[#CFDE00]"
          style={{ fontSize: "clamp(58px, 9.8vw, 100px)", lineHeight: 0.9 }}
        >
          WITH
        </span>
      </motion.div>
      <motion.span
        className="block text-[#E8420A]"
        style={{ fontSize: "clamp(62px, 10.5vw, 106px)" }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.35, ease: easings.primary }}
      >
        TASTE.
      </motion.span>
      <motion.p
        className="font-mono text-[#E8E8E8] normal-case mt-5"
        style={{
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.02em",
          lineHeight: 1.5,
          maxWidth: 420,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: easings.primary }}
      >
        Pressure tested builds with clean internals.
      </motion.p>
      <motion.div
        className="mt-7"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: easings.primary }}
      >
        <CTASmall width={220} height={52} fontSize={14} />
      </motion.div>
    </div>
  );
}

function HeadlineMobile({ portrait = true }: { portrait?: boolean }) {
  // Bigger headline for all mobile widths (portrait/tablet mobile),
  // without touching the stats bar.
  const titleSize = portrait
    ? "clamp(52px, 20vw, 90px)"
    : "clamp(58px, 16vw, 98px)";
  // Increase only the "WITH" text + its yellow box (outline) on mobile.
  const outlineSize = portrait
    ? "clamp(52px, 20vw, 102px)"
    : "clamp(58px, 16vw, 98px)";
  return (
    <div
      className="flex flex-col select-none uppercase"
      style={{
        fontFamily: "var(--font-anton), 'Arial Black', Impact, sans-serif",
        fontWeight: 900,
        letterSpacing: "-0.06em",
        lineHeight: 0.88,
        marginTop: portrait ? -16 : -10,
      }}
    >
      <motion.span
        className="block text-[#F0EBE0]"
        style={{
          fontSize: titleSize,
          lineHeight: 0.88,
          marginTop: portrait ? -24 : -35,
          whiteSpace: "nowrap",
        }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: easings.primary }}
      >
        BACKEND
      </motion.span>
      <motion.div
        className="inline-block"
        style={{
          border: "3px solid #CFDE00",
          // Slightly larger box only for "WITH"
          padding: portrait ? "6px 12px 2px 12px" : "3px 12px 0px 12px",
          marginTop: 4,
          marginBottom: 2,
          maxWidth: "fit-content",
        }}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25, ease: easings.primary }}
      >
        <span
          className="block text-[#CFDE00]"
          style={{
            fontSize: outlineSize,
            lineHeight: 0.85,
            whiteSpace: "nowrap",
          }}
        >
          WITH
        </span>
      </motion.div>
      <motion.span
        className="block text-[#E8420A]"
        style={{
          fontSize: titleSize,
          lineHeight: 0.88,
          marginTop: 4,
          whiteSpace: "nowrap",
        }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35, ease: easings.primary }}
      >
        TASTE.
      </motion.span>
      <div
        style={{
          width: 48,
          height: 2,
          background: "#CFDE00",
          marginTop: 10,
          marginBottom: 10,
        }}
      />
      <motion.p
        className="font-mono text-[#E8E8E8] normal-case"
        style={{
          fontSize: 13,
          fontWeight: 500,
          lineHeight: 1.5,
          opacity: 0.9,
          marginBottom: 18,
          letterSpacing: "0.01em",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: easings.primary }}
      >
        Pressure tested builds with clean internals.
      </motion.p>
      <motion.div
        style={{ display: "flex", justifyContent: "flex-start", marginTop: -5 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: easings.primary }}
      >
        <CTASmall width={160} height={40} fontSize={11} />
      </motion.div>
    </div>
  );
}

function CTASmall({
  width,
  height,
  fontSize,
}: {
  width: number;
  height: number;
  fontSize: number;
}) {
  return (
    <div style={{ position: "relative", width, height }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#E8420A",
          border: "3px solid #111",
          transform: "translate(5px, 5px)",
          zIndex: 0,
        }}
      />
      <motion.button
        style={{
          position: "absolute",
          inset: 0,
          background: "#CFDE00",
          border: "3px solid #111",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize,
          fontWeight: 900,
          fontFamily: "var(--font-archivo), sans-serif",
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
          color: "#111",
          outline: "none",
        }}
        whileHover={{ x: -3, y: -3 }}
        whileTap={{ x: 1, y: 1 }}
        transition={{ duration: 0.16 }}
      >
        VIEW WORK
      </motion.button>
    </div>
  );
}

function StatsBarTablet({ cols = 3 }: { cols?: number }) {
  const stats = [
    { value: "3+", label: "Years Building" },
    { value: "15+", label: "Projects Shipped" },
    { value: "80+", label: "Repositories" },
  ].slice(0, cols);
  return (
    <motion.div
      className={`relative z-30 grid`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        background: "#F0EBE0",
        borderBottom: "5px solid #111",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.3, ease: easings.primary }}
    >
      {stats.map(({ value, label }, i) => (
        <div
          key={value}
          style={{
            borderRight: i < stats.length - 1 ? "5px solid #111" : undefined,
            padding: "24px 20px",
            minHeight: 120,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            className="text-[#111] text-[36px] font-black leading-none"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            {value}
          </div>
          <div
            className="text-[#444] text-[14px] font-bold tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-archivo), monospace" }}
          >
            {label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function TickerTablet() {
  return (
    <motion.div
      className="relative z-40 overflow-hidden flex items-center"
      style={{ height: 48, background: "#E8420A", borderTop: "5px solid #111" }}
      initial={{ y: 60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 1.0, ease: easings.primary }}
    >
      <div
        className="flex items-center h-full whitespace-nowrap"
        style={{ animation: "ticker 20s linear infinite", paddingLeft: 16 }}
      >
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className="text-white text-[12px] font-black tracking-[0.24em] uppercase"
            style={{
              fontFamily: "var(--font-archivo), monospace",
              paddingRight: 48,
            }}
          >
            OPEN TO INTERN ■ BACKEND ■ CLEAN CODE ■ PRESSURE TESTED BUILDS ■
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function HeroPortraitTablet() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 360 }}>
      <motion.div
        style={{
          width: "100%",
          aspectRatio: "3 / 4",
          border: "5px solid #111",
          boxShadow: "10px 10px 0 #F0EBE0",
          background: "#1F1F1F",
          position: "relative",
          overflow: "hidden",
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: easings.primary }}
      >
        <img
          src="/images/me2.jpeg"
          alt="Adith Manikonda"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 24%",
            filter: "grayscale(100%) contrast(1.18)",
            transform: "scale(1.02)",
          }}
        />
      </motion.div>
      <motion.div
        className="absolute flex items-center justify-center gap-3 bg-[#CFDE00]"
        style={{
          width: 200,
          height: 40,
          bottom: 20,
          right: -10,
          rotate: "-5deg",
          border: "4px solid #111",
          boxShadow: "8px 8px 0 #E8420A",
          zIndex: 20,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.42, delay: 0.7 }}
      >
        <span
          className="text-[#111] text-[12px] font-black uppercase tracking-[0.04em]"
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          OPEN TO INTERN
        </span>
      </motion.div>
    </div>
  );
}

function HeroPortraitTabletPortrait() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 440 }}>
      <motion.div
        style={{
          width: "100%",
          aspectRatio: "4 / 5",
          border: "5px solid #111",
          boxShadow: "10px 10px 0 #F0EBE0",
          background: "#1F1F1F",
          position: "relative",
          overflow: "hidden",
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: easings.primary }}
      >
        <img
          src="/images/me2.jpeg"
          alt="Adith Manikonda"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 24%",
            filter: "grayscale(100%) contrast(1.18)",
            transform: "scale(1.02)",
          }}
        />
      </motion.div>
      <motion.div
        className="absolute flex items-center justify-center gap-3 bg-[#CFDE00]"
        style={{
          width: 210,
          height: 42,
          bottom: 16,
          right: -10,
          rotate: "-5deg",
          border: "4px solid #111",
          boxShadow: "8px 8px 0 #E8420A",
          zIndex: 20,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.42, delay: 0.7 }}
      >
        <span
          className="text-[#111] text-[12px] font-black uppercase tracking-[0.04em]"
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          OPEN TO INTERN
        </span>
      </motion.div>
    </div>
  );
}

function HeroPortraitMobile() {
  return (
    <div style={{ position: "relative", width: "90%", maxWidth: 268 }}>
      <motion.div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          border: "4px solid #111",
          boxShadow: "6px 6px 0 #F0EBE0",
          background: "#1F1F1F",
          position: "relative",
          overflow: "hidden",
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25, ease: easings.primary }}
      >
        <img
          src="/images/me2.jpeg"
          alt="Adith Manikonda"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 24%",
            filter: "grayscale(100%) contrast(1.18)",
            transform: "scale(1.02)",
          }}
        />
      </motion.div>
      <motion.div
        className="absolute flex items-center justify-center bg-[#CFDE00]"
        style={{
          width: 140,
          height: 32,
          bottom: -6,
          right: -10,
          rotate: "-5deg",
          border: "3px solid #111",
          boxShadow: "5px 5px 0 #E8420A",
          zIndex: 20,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.42, delay: 0.6 }}
      >
        <span
          className="text-[#111] text-[9px] font-black uppercase tracking-[0.04em]"
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          OPEN TO INTERN
        </span>
      </motion.div>
    </div>
  );
}
