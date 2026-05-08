"use client";

/**
 * About.tsx
 *
 * Accepts optional MotionValue props from HeroAboutTransition for the
 * cinematic scroll-driven transition on desktop.
 *
 * When props are NOT passed (mobile / standalone), it falls back to
 * whileInView animations exactly as before.
 */

import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { easings } from "@/lib/motion";
import { useRef } from "react";
import AboutBio from "./AboutBio";
import AboutPhilosophy from "./AboutPhilosophy";
import AboutInterests from "./AboutInterests";
import AboutBuiltToBeUsed from "./AboutBuiltToBeUsed";
import AboutBackendSystems from "./AboutBackendSystems";
import AboutHardware from "./AboutHardware";
import AboutFooter from "./AboutFooter";

// ─── PROPS ───────────────────────────────────────────────────────────────────
interface AboutProps {
  viewportTransition?: boolean;

  // Shell
  shellOpacity?: MotionValue<number>;

  // "I BUILD / BREAK / FIX"
  buildY?: MotionValue<number>;
  buildOpacity?: MotionValue<number>;
  buildScale?: MotionValue<number>;

  // Bio card
  bioClip?: MotionValue<string>;
  bioOpacity?: MotionValue<number>;
  bioY?: MotionValue<number>;

  // Philosophy (paper uncrumple)
  paperOpacity?: MotionValue<number>;
  paperScale?: MotionValue<number>;
  paperRotate?: MotionValue<number>;
  paperSkewX?: MotionValue<number>;
  paperSkewY?: MotionValue<number>;
  paperFilter?: MotionValue<string>;
  paperClip?: MotionValue<string>;

  // Backend systems
  backendY?: MotionValue<number>;
  backendOpacity?: MotionValue<number>;
  backendScale?: MotionValue<number>;

  // Hardware
  hardwareX?: MotionValue<number>;
  hardwareOpacity?: MotionValue<number>;

  // Interests strip
  interestsY?: MotionValue<number>;
  interestsOpacity?: MotionValue<number>;
  interestsScale?: MotionValue<number>;

  // Built to be used
  builtScale?: MotionValue<number>;
  builtOpacity?: MotionValue<number>;

  // Footer
  footerY?: MotionValue<number>;
  footerOpacity?: MotionValue<number>;
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function About({
  viewportTransition = false,
  shellOpacity: shellOpacityProp,
  buildY: buildYProp,
  buildOpacity: buildOpacityProp,
  buildScale: buildScaleProp,
  bioClip: bioClipProp,
  bioOpacity: bioOpacityProp,
  bioY: bioYProp,
  paperOpacity: paperOpacityProp,
  paperScale: paperScaleProp,
  paperRotate: paperRotateProp,
  paperSkewX: paperSkewXProp,
  paperSkewY: paperSkewYProp,
  paperFilter: paperFilterProp,
  paperClip: paperClipProp,
  backendY: backendYProp,
  backendOpacity: backendOpacityProp,
  backendScale: backendScaleProp,
  hardwareX: hardwareXProp,
  hardwareOpacity: hardwareOpacityProp,
  interestsY: interestsYProp,
  interestsOpacity: interestsOpacityProp,
  interestsScale: interestsScaleProp,
  builtScale: builtScaleProp,
  builtOpacity: builtOpacityProp,
  footerY: footerYProp,
  footerOpacity: footerOpacityProp,
}: AboutProps) {
  // ── Fallback: whileInView scroll when used standalone ────────────────────
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: localProgress } = useScroll({
    target: sectionRef,
    offset: ["start 60%", "start 0%"],
  });

  // Helper: if a MotionValue prop was provided, use it; otherwise fall back
  // to a local transform that produces a static "fully visible" value.
  // (whileInView handles the actual animation in sub-components when standalone.)
  const mv = <T,>(
    prop: MotionValue<T> | undefined,
    fallback: T,
  ): MotionValue<T> | undefined => prop;

  // Standalone fallback transforms — these resolve to "fully settled" values
  // so the layout renders correctly when there's no transition parent.
  const standalone = !viewportTransition;

  const shellOpacity =
    shellOpacityProp ?? useTransform(localProgress, [0.04, 0.14], [0, 1]);

  const buildY =
    buildYProp ?? useTransform(localProgress, [0.12, 0.34], [80, 0]);
  const buildOpacity =
    buildOpacityProp ?? useTransform(localProgress, [0.12, 0.34], [0, 1]);
  const buildScale =
    buildScaleProp ?? useTransform(localProgress, [0.12, 0.34], [0.96, 1]);

  const bioClip =
    bioClipProp ??
    useTransform(
      localProgress,
      [0.18, 0.38],
      ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
    );
  const bioY = bioYProp ?? useTransform(localProgress, [0.18, 0.38], [24, 0]);
  const bioOpacity =
    bioOpacityProp ?? useTransform(localProgress, [0.18, 0.38], [0, 1]);

  const paperOpacity =
    paperOpacityProp ?? useTransform(localProgress, [0.42, 0.52], [0, 1]);
  const paperScale =
    paperScaleProp ??
    useTransform(
      localProgress,
      [0.42, 0.5, 0.58, 0.68, 0.76],
      [0.62, 0.78, 0.96, 1.025, 1],
    );
  const paperRotate =
    paperRotateProp ??
    useTransform(
      localProgress,
      [0.42, 0.5, 0.58, 0.68, 0.76],
      [-12, -6, 2, 0.5, 0],
    );
  const paperSkewX =
    paperSkewXProp ??
    useTransform(localProgress, [0.42, 0.52, 0.64, 0.72], [-8, -3, 1, 0]);
  const paperSkewY =
    paperSkewYProp ??
    useTransform(localProgress, [0.42, 0.52, 0.64, 0.72], [4, 2, -0.5, 0]);
  const paperFilter =
    paperFilterProp ??
    useTransform(
      localProgress,
      [0.42, 0.5, 0.6, 0.7],
      ["blur(8px)", "blur(5px)", "blur(2px)", "blur(0px)"],
    );
  const paperClip =
    paperClipProp ??
    useTransform(
      localProgress,
      [0.42, 0.5, 0.58, 0.66, 0.74],
      [
        "polygon(12% 4%, 96% 0%, 88% 94%, 2% 100%)",
        "polygon(5% 2%, 98% 3%, 95% 97%, 3% 95%)",
        "polygon(1% 1%, 99% 2%, 98% 99%, 0% 98%)",
        "polygon(0% 0%, 100% 1%, 99% 100%, 0% 99%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ],
    );

  const backendY =
    backendYProp ?? useTransform(localProgress, [0.24, 0.44], [40, 0]);
  const backendOpacity =
    backendOpacityProp ?? useTransform(localProgress, [0.24, 0.44], [0, 1]);
  const backendScale =
    backendScaleProp ?? useTransform(localProgress, [0.24, 0.44], [0.96, 1]);

  const hardwareX =
    hardwareXProp ??
    useTransform(localProgress, [0.28, 0.42, 0.5], [-80, 8, 0]);
  const hardwareOpacity =
    hardwareOpacityProp ?? useTransform(localProgress, [0.28, 0.4], [0, 1]);

  const interestsY =
    interestsYProp ?? useTransform(localProgress, [0.32, 0.52], [48, 0]);
  const interestsOpacity =
    interestsOpacityProp ?? useTransform(localProgress, [0.32, 0.52], [0, 1]);
  const interestsScale =
    interestsScaleProp ?? useTransform(localProgress, [0.32, 0.52], [0.96, 1]);

  const builtScale =
    builtScaleProp ??
    useTransform(
      localProgress,
      [0.36, 0.58, 0.72, 0.8],
      [1.08, 1.01, 0.995, 1],
    );
  const builtOpacity =
    builtOpacityProp ?? useTransform(localProgress, [0.36, 0.58], [0, 1]);

  const footerY =
    footerYProp ?? useTransform(localProgress, [0.48, 0.68], [32, 0]);
  const footerOpacity =
    footerOpacityProp ?? useTransform(localProgress, [0.48, 0.68], [0, 1]);

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden ${
        viewportTransition ? "h-full bg-transparent" : "bg-transparent"
      }`}
      style={{ height: viewportTransition ? "100%" : undefined }}
    >
      {/* Outer border frame */}
      <motion.div
        className={`relative mx-auto ${
          viewportTransition ? "flex h-full flex-col" : ""
        }`}
        style={{
          border: "5px solid #111",
          borderTop: "none",
          maxWidth: "100%",
          opacity: shellOpacity,
          height: viewportTransition ? "100%" : undefined,
        }}
      >
        {/* ── MAIN GRID ──────────────────────────────────────────────────── */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "37% 26% 37%",
            gridTemplateRows: viewportTransition
              ? "minmax(0, 1fr) minmax(0, 1fr)"
              : "auto auto",
            flex: viewportTransition ? "1 1 auto" : undefined,
            minHeight: viewportTransition ? 0 : undefined,
            height: viewportTransition ? "100%" : undefined,
          }}
        >
          {/* ── ROW 1 ──────────────────────────────────────────────────── */}

          {/* Col 1 Row 1 — "I BUILD / BREAK / FIX" */}
          <motion.div
            className="bg-[#111] flex items-center"
            style={{
              borderRight: "4px solid #111",
              borderBottom: "4px solid #111",
              padding: "48px 32px",
              minHeight: 420,
              y: buildY,
              opacity: buildOpacity,
              scale: buildScale,
            }}
          >
            <div className="flex items-stretch gap-6 w-full h-full">
              {/* Orange vertical bar */}
              <motion.div
                style={{
                  width: 14,
                  background: "#E8420A",
                  border: "3px solid #111",
                  flexShrink: 0,
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: easings.primary }}
              />

              {/* Headline text */}
              <div
                className="flex flex-col justify-center select-none uppercase"
                style={{
                  fontFamily: "var(--font-archivo), 'Arial Black', sans-serif",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                }}
              >
                {[
                  { text: "I BUILD.", color: "#F0EBE0" },
                  { text: "I BREAK.", color: "#E8420A" },
                  { text: "I FIX.", color: "#F0EBE0" },
                ].map((line, i) => (
                  <motion.span
                    key={line.text}
                    className="block"
                    style={{
                      color: line.color,
                      fontSize: "clamp(56px, 5.6vw, 90px)",
                    }}
                    // Only use whileInView when standalone (not in transition)
                    initial={standalone ? { y: 40, opacity: 0 } : false}
                    whileInView={standalone ? { y: 0, opacity: 1 } : undefined}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.12,
                      ease: easings.primary,
                    }}
                  >
                    {line.text}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Col 2 Row 1 — Bio */}
          <motion.div
            style={{
              borderRight: "4px solid #111",
              borderBottom: "4px solid #111",
              clipPath: bioClip,
              y: bioY,
              opacity: bioOpacity,
            }}
          >
            <AboutBio />
          </motion.div>

          {/* Col 3 Row 1 — Philosophy (paper uncrumple) */}
          <motion.div
            style={{
              borderBottom: "4px solid #111",
              opacity: paperOpacity,
              scale: paperScale,
              rotate: paperRotate,
              skewX: paperSkewX,
              skewY: paperSkewY,
              filter: paperFilter,
              clipPath: paperClip,
              transformOrigin: "50% 42%",
            }}
          >
            <AboutPhilosophy />
          </motion.div>

          {/* ── ROW 2 ──────────────────────────────────────────────────── */}

          {/* Col 1 Row 2 — Backend Systems + Hardware */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "50% 50%",
              borderRight: "4px solid #111",
            }}
          >
            <motion.div
              style={{
                y: backendY,
                opacity: backendOpacity,
                scale: backendScale,
              }}
            >
              <AboutBackendSystems />
            </motion.div>
            <motion.div
              style={{
                x: hardwareX,
                opacity: hardwareOpacity,
              }}
            >
              <AboutHardware />
            </motion.div>
          </div>

          {/* Col 2+3 Row 2 — Interests + Built to be used */}
          <div className="flex flex-col" style={{ gridColumn: "2 / 4" }}>
            <motion.div
              style={{
                y: interestsY,
                opacity: interestsOpacity,
                scale: interestsScale,
              }}
            >
              <AboutInterests />
            </motion.div>
            <motion.div
              style={{
                scale: builtScale,
                opacity: builtOpacity,
                transformOrigin: "50% 0%",
              }}
            >
              <AboutBuiltToBeUsed />
            </motion.div>
          </div>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────────────── */}
        <motion.div style={{ y: footerY, opacity: footerOpacity }}>
          <AboutFooter />
        </motion.div>
      </motion.div>
    </section>
  );
}
