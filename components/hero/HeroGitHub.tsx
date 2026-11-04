"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { easings } from "@/lib/motion";

export const GITHUB_URL = "https://github.com/Ad1th";

/**
 * Square brutalist GitHub button that sits beside the VIEW WORK CTA.
 * Same offset-shadow language as the CTA, in cream so the lime CTA
 * stays the primary action.
 */
export default function HeroGitHub({
  size,
  border = 4,
  offset = 9,
  iconSize,
}: {
  size: number;
  border?: number;
  offset?: number;
  iconSize?: number;
}) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${offset}px, ${offset}px)`,
          background: "#E8420A",
          border: `${border}px solid #111`,
          zIndex: 0,
        }}
      />
      <motion.a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer me"
        aria-label="Adith on GitHub"
        title="GitHub"
        className="absolute inset-0 flex items-center justify-center bg-[#F0EBE0] text-[#111]"
        style={{ border: `${border}px solid #111`, zIndex: 1 }}
        whileHover={{ x: -offset / 2, y: -offset / 2 }}
        whileTap={{ x: 1, y: 1 }}
        transition={{ duration: 0.16, ease: easings.editorial }}
      >
        <Github size={iconSize ?? Math.round(size * 0.44)} strokeWidth={2.75} />
      </motion.a>
    </div>
  );
}
