"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

interface AboutBioProps {
  /**
   * When true, the cinematic parent owns all animation.
   * This component must not use whileInView/viewport observers.
   */
  viewportTransition?: boolean;
}

// Blue card: "CSE @ VIT VELLORE" badge + bio paragraph
// Corner bracket accents (top-right and bottom-left)
export default function AboutBio({
  viewportTransition = false,
}: AboutBioProps) {
  const standalone = !viewportTransition;

  return (
    <motion.div
      className="relative bg-[#6C8EAD] h-full"
      style={{ border: "3px solid #111", padding: "30px 20px 24px 20px" }}
      // Receiver-only in cinematic mode: no viewport-driven triggers.
      initial={standalone ? { opacity: 0, y: 24 } : false}
      whileInView={standalone ? { opacity: 1, y: 0 } : undefined}
      viewport={standalone ? { once: true } : undefined}
      transition={
        standalone
          ? { duration: 0.55, delay: 0.1, ease: easings.primary }
          : undefined
      }
    >
      {/* Top-right corner bracket */}
      <div className="absolute top-0 right-0">
        <div
          style={{
            width: 24,
            height: 4,
            background: "#111",
            position: "absolute",
            top: 12,
            right: 12,
          }}
        />
        <div
          style={{
            width: 4,
            height: 24,
            background: "#111",
            position: "absolute",
            top: 12,
            right: 12,
          }}
        />
      </div>

      {/* Bottom-left corner bracket */}
      <div className="absolute bottom-0 left-0">
        <div
          style={{
            width: 24,
            height: 4,
            background: "#111",
            position: "absolute",
            bottom: 12,
            left: 12,
          }}
        />
        <div
          style={{
            width: 4,
            height: 24,
            background: "#111",
            position: "absolute",
            bottom: 12,
            left: 12,
          }}
        />
      </div>

      {/* Badge */}
      <div
        className="inline-flex items-center justify-center bg-[#CFDE00]"
        style={{
          border: "3px solid #111",
          padding: "5px 14px",
          marginBottom: 20,
        }}
      >
        <span
          className="text-[#111] font-black uppercase tracking-[0.04em]"
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: 20,
          }}
        >
          CSE @ VIT VELLORE
        </span>
      </div>

      {/* Bio text */}
      <p
        className="text-[#111]"
        style={{
          fontFamily: "var(--font-Azeret-Mono), sans-serif",
          fontSize: 28,
          // fontWeight: 100,
          lineHeight: 1.44,
          paddingLeft: 16,
        }}
      >
        I like building things
        <br />
        that feel real.
        <br />
        Stuff people actually use,
        <br />
        not just things that
        <br />
        look done.
      </p>
    </motion.div>
  );
}
