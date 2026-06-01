"use client";

/**
 * About.tsx  (updated for cinematic transitions)
 *
 * Changes from original:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. `data-section="about"` added to the outer <section> element so
 *    ScrollProgressDots can observe it via IntersectionObserver.
 *    NOTE: In cinematic (desktop) mode the data-section is applied by
 *    DesktopCinematicTransition directly on its timeline markers — this attribute
 *    here is the fallback for standalone/mobile/tablet modes.
 *
 * 2. No other logic changes — all animation props, viewportTransition
 *    branching, and sub-component usage remain exactly as before.
 */

import { motion, type MotionValue } from "framer-motion";
import { easings } from "@/lib/motion";
import AboutBio from "./AboutBio";
import AboutPhilosophy from "./AboutPhilosophy";
import AboutInterests from "./AboutInterests";
import AboutBuiltToBeUsed from "./AboutBuiltToBeUsed";
import AboutBackendSystems from "./AboutBackendSystems";
import AboutHardware from "./AboutHardware";
import AboutFooter from "./AboutFooter";
import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });

interface AboutProps {
  viewportTransition?: boolean;
  shellOpacity?: MotionValue<number>;
  buildY?: MotionValue<number>;
  buildOpacity?: MotionValue<number>;
  buildScale?: MotionValue<number>;
  bioClip?: MotionValue<string>;
  bioOpacity?: MotionValue<number>;
  bioY?: MotionValue<number>;
  paperOpacity?: MotionValue<number>;
  paperScale?: MotionValue<number>;
  paperRotate?: MotionValue<number>;
  paperSkewX?: MotionValue<number>;
  paperSkewY?: MotionValue<number>;
  paperFilter?: MotionValue<string>;
  paperClip?: MotionValue<string>;
  backendY?: MotionValue<number>;
  backendOpacity?: MotionValue<number>;
  backendScale?: MotionValue<number>;
  hardwareX?: MotionValue<number>;
  hardwareOpacity?: MotionValue<number>;
  interestsY?: MotionValue<number>;
  interestsOpacity?: MotionValue<number>;
  interestsScale?: MotionValue<number>;
  builtScale?: MotionValue<number>;
  builtOpacity?: MotionValue<number>;
  footerY?: MotionValue<number>;
  footerOpacity?: MotionValue<number>;
}

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
  const standalone = !viewportTransition;

  return (
    // data-section="about" — used by ScrollProgressDots in standalone mode.
    // In cinematic desktop mode DesktopCinematicTransition owns the timeline markers.
    <section
      data-section="about"
      className="relative w-full overflow-hidden bg-transparent"
      style={{ marginTop: viewportTransition ? -24 : 0 }}
    >
      <motion.div
        className={`relative mx-auto ${
          viewportTransition ? "flex h-full flex-col" : ""
        }`}
        style={{
          border: "5px solid #111",
          borderTop: "none",
          maxWidth: "100%",
          opacity: shellOpacityProp,
        }}
      >
        {/* ── MAIN GRID ───────────────────────────────────────────────── */}
        <div
          className="grid flex-1 min-h-0"
          style={{
            gridTemplateColumns: viewportTransition ? "37% 26% 37%" : "1fr",
            gridTemplateRows: viewportTransition
              ? "minmax(0, 1fr) minmax(0, 1fr)"
              : "auto auto",
            display: "grid",
            alignItems: "stretch",
            paddingTop: viewportTransition ? 68 : 0,
            gap: "4px",
            boxSizing: "border-box",
          }}
        >
          {/* ROW 1 — Col 1: I BUILD / BREAK / FIX */}
          <motion.div
            className="bg-[#111] flex items-center"
            style={{
              borderRight: "4px solid #111",
              borderBottom: "4px solid #111",
              padding: viewportTransition ? "28px 30px" : "44px 32px",
              minHeight: viewportTransition ? undefined : 330,
              y: buildYProp,
              opacity: buildOpacityProp,
              scale: buildScaleProp,
            }}
          >
            <div className="flex items-stretch gap-6 w-full h-full">
              <motion.div
                style={{
                  width: standalone ? "clamp(18px, 6vw, 24px)" : 30,
                  background: "#f6450a",
                  border: "3px solid #111",
                  flexShrink: 0,
                  /* Mobile: prevent the orange bar from stretching a bit too far */
                  maxHeight: standalone ? "82%" : undefined,
                }}
                initial={standalone ? { scaleY: 0 } : false}
                whileInView={standalone ? { scaleY: 1 } : undefined}
                viewport={standalone ? { once: true } : undefined}
                transition={
                  standalone
                    ? { duration: 0.4, ease: easings.primary }
                    : undefined
                }
              />
              <div
                className={`${anton.className} text-[#111] uppercase select-none`}
                style={{
                  fontWeight: 400,
                  letterSpacing: "0.06em",
                  lineHeight: 0.92,
                  fontSize: viewportTransition ? "clamp(32px, 4vw, 120px)" : 48,
                  // Used to slightly tighten mobile line wrapping without affecting desktop/tablet.
                  ["--aboutBuildLineFont" as any]: "clamp(95px, 7.7vw, 260px)",
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
                      fontSize: standalone
                        ? "clamp(70px, 6.5vw, 210px)"
                        : "var(--aboutBuildLineFont)",
                      opacity: standalone ? undefined : 1,
                      transform: standalone ? undefined : "translateY(0px)",
                    }}
                    initial={standalone ? { y: 40, opacity: 0 } : false}
                    whileInView={standalone ? { y: 0, opacity: 1 } : undefined}
                    viewport={standalone ? { once: true } : undefined}
                    transition={
                      standalone
                        ? {
                            duration: 0.55,
                            delay: i * 0.12,
                            ease: easings.primary,
                          }
                        : undefined
                    }
                  >
                    {line.text}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ROW 1 — Col 2: Bio */}
          <motion.div
            style={{
              borderRight: "4px solid #111",
              borderBottom: "4px solid #111",
              clipPath: bioClipProp,
              y: bioYProp,
              opacity: bioOpacityProp,
            }}
          >
            <AboutBio viewportTransition={viewportTransition} />
          </motion.div>

          {/* ROW 1 — Col 3: Philosophy */}
          <motion.div
            style={{
              borderBottom: "4px solid #111",
              opacity: paperOpacityProp,
              scale: paperScaleProp,
              rotate: paperRotateProp,
              skewX: paperSkewXProp,
              skewY: paperSkewYProp,
              filter: paperFilterProp,
              clipPath: paperClipProp,
              transformOrigin: "50% 42%",
            }}
          >
            <AboutPhilosophy viewportTransition={viewportTransition} />
          </motion.div>

          {/* ROW 2 — Col 1: Backend + Hardware */}
          <div
            className="grid h-full min-h-0"
            style={{
              gridTemplateColumns: viewportTransition ? "50% 50%" : "1fr",
              borderRight: viewportTransition ? "4px solid #111" : undefined,
            }}
          >
            <motion.div
              style={{
                y: backendYProp,
                opacity: backendOpacityProp,
                scale: backendScaleProp,
                height: "100%",
              }}
            >
              <AboutBackendSystems viewportTransition={viewportTransition} />
            </motion.div>
            <motion.div
              style={{
                x: hardwareXProp,
                opacity: hardwareOpacityProp,
                height: "100%",
              }}
            >
              <AboutHardware viewportTransition={viewportTransition} />
            </motion.div>
          </div>

          {/* ROW 2 — Col 2+3: Interests + Built to be used */}
          <div
            className="grid h-full min-h-0"
            style={{
              gridColumn: viewportTransition ? "2 / 4" : undefined,
              gridTemplateRows: viewportTransition
                ? "auto minmax(0, 1fr)"
                : "auto auto",
            }}
          >
            <motion.div
              style={{
                y: interestsYProp,
                opacity: interestsOpacityProp,
                scale: interestsScaleProp,
              }}
            >
              <AboutInterests viewportTransition={viewportTransition} />
            </motion.div>
            <motion.div
              className="min-h-0 h-full"
              style={{
                scale: builtScaleProp,
                opacity: builtOpacityProp,
                transformOrigin: "50% 0%",
              }}
            >
              <AboutBuiltToBeUsed viewportTransition={viewportTransition} />
            </motion.div>
          </div>
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────────── */}
        <motion.div
          className={viewportTransition ? "relative z-20" : ""}
          style={{ y: footerYProp, opacity: footerOpacityProp }}
        >
          <AboutFooter viewportTransition={viewportTransition} />
        </motion.div>
      </motion.div>
    </section>
  );
}
