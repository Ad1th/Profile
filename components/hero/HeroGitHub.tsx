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
  delay = 0.66,
}: {
  size: number;
  border?: number;
  offset?: number;
  iconSize?: number;
  /** Entrance delay in seconds; lands just after the VIEW WORK CTA. */
  delay?: number;
}) {
  return (
    <motion.div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: easings.primary }}
    >
      {/* Offset shadow backdrop: starts tucked behind the button, then drops out */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "#E8420A",
          border: `${border}px solid #111`,
          zIndex: 0,
        }}
        initial={{ x: 0, y: 0, opacity: 0 }}
        animate={{ x: offset, y: offset, opacity: 1 }}
        transition={{ duration: 0.42, delay: delay + 0.3, ease: easings.primary }}
      />
      <motion.a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer me"
        aria-label="Adith on GitHub"
        title="GitHub"
        className="absolute inset-0 flex items-center justify-center bg-[#F0EBE0] text-[#111]"
        style={{ border: `${border}px solid #111`, zIndex: 1 }}
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        whileHover={{ x: -offset / 2, y: -offset / 2 }}
        whileTap={{ x: 1, y: 1 }}
        transition={{
          duration: 0.16,
          ease: easings.editorial,
          scale: { duration: 0.45, delay: delay + 0.1, ease: easings.primary },
        }}
      >
        <Github size={iconSize ?? Math.round(size * 0.44)} strokeWidth={2.75} />
      </motion.a>
    </motion.div>
  );
}
