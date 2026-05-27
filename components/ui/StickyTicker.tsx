"use client";

/**
 * StickyTicker.tsx
 *
 * The orange "MAKE IT WORK ■ MAKE IT FAST ■" bar, persisted as a fixed
 * bottom element sitewide — anchoring brand energy across all sections.
 *
 * Behaviour:
 * - Always visible at bottom of viewport.
 * - Fades to 0.4 opacity when user hasn't scrolled recently (idle).
 * - Snaps back to full opacity on scroll.
 * - Respects prefers-reduced-motion.
 *
 * Usage: Mount once in root layout OUTSIDE all sections, AFTER the hero.
 *   <StickyTicker />
 *
 * Note: Add `pb-[44px]` (or the ticker height) to your page wrapper so
 * content isn't hidden behind it on the last section.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TICKER_TEXT =
  "MAKE IT WORK    ■    MAKE IT FAST    ■    MAKE IT HOLD    ■    MAKE IT BETTER    ■    ";
const REPEAT = 4;

export default function StickyTicker() {
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIdle(false);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIdle(true), 2400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Start idle timer on mount
    idleTimer.current = setTimeout(() => setIdle(true), 2400);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-[300] overflow-hidden flex items-center pointer-events-none"
      style={{
        height: 44,
        background: "#A14A32",
        borderTop: "4px solid #111",
      }}
      animate={{ opacity: idle ? 0.38 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <div
        className="flex items-center h-full whitespace-nowrap"
        style={{
          animation: "sticky-ticker 26s linear infinite",
          paddingLeft: 18,
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        {[...Array(REPEAT)].map((_, i) => (
          <span
            key={i}
            className="text-white font-black uppercase"
            style={{
              fontFamily: "var(--font-archivo), monospace",
              fontSize: 13,
              letterSpacing: "0.24em",
              paddingRight: 48,
            }}
          >
            {TICKER_TEXT}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes sticky-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sticky-ticker-inner { animation: none !important; }
        }
      `}</style>
    </motion.div>
  );
}
