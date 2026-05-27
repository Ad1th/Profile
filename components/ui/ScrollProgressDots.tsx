"use client";

/**
 * ScrollProgressDots.tsx
 *
 * Fixed vertical dot column — one dot per page section.
 * Dots fill lime-yellow as the user scrolls into each section.
 * Uses IntersectionObserver on section[data-section] elements.
 * Sits fixed on the right edge, vertically centred.
 *
 * Usage: Mount once in your root layout or page, OUTSIDE all sections.
 *
 *   <ScrollProgressDots sections={["hero","about","skills","experience"]} />
 *
 * Each section must carry: <section data-section="hero" ...>
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollProgressDotsProps {
  sections: string[];
}

const SECTION_LABELS: Record<string, string> = {
  hero: "HERO",
  about: "ABOUT",
  skills: "SKILLS",
  experience: "EXPERIENCE",
  projects: "PROJECTS",
  patents: "PATENTS",
  hackathons: "HACKATHONS",
  achievements: "ACHIEVEMENTS",
  timeline: "TIMELINE",
  contact: "CONTACT",
};

export default function ScrollProgressDots({
  sections,
}: ScrollProgressDotsProps) {
  const [active, setActive] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const els = sections.map((id) =>
      document.querySelector(`[data-section="${id}"]`)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.findIndex(
              (id) => entry.target.getAttribute("data-section") === id
            );
            if (idx !== -1) setActive(idx);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    els.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(`[data-section="${id}"]`);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="fixed z-[200] hidden md:flex flex-col items-center"
      style={{
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        gap: 14,
        mixBlendMode: "normal",
      }}
    >
      {sections.map((id, i) => {
        const isFilled = i <= active;
        const isActive = i === active;
        const isHovered = hoveredIdx === i;

        return (
          <div
            key={id}
            className="relative flex items-center justify-end"
            style={{ gap: 8 }}
          >
            {/* Tooltip label */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    fontFamily: "monospace",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: "#8A8B6D",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {SECTION_LABELS[id] ?? id.toUpperCase()}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.button
              onClick={() => scrollTo(id)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              aria-label={`Scroll to ${id}`}
              style={{
                width: isActive ? 12 : 8,
                height: isActive ? 12 : 8,
                background: isFilled ? "#8A8B6D" : "#333",
                border: isActive ? "2px solid #8A8B6D" : "2px solid #333",
                borderRadius: 0,
                cursor: "pointer",
                padding: 0,
                outline: "none",
                flexShrink: 0,
                transition:
                  "width 0.25s ease, height 0.25s ease, background 0.25s ease, border-color 0.25s ease",
                boxShadow: isActive ? "0 0 0 2px #111" : "none",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
