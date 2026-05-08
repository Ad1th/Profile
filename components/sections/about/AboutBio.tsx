"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

// Blue card: "CSE @ VIT VELLORE" badge + bio paragraph
// Corner bracket accents (top-right and bottom-left)
export default function AboutBio() {
  return (
    <motion.div
      className="relative bg-[#7C9BB8] h-full"
      style={{ border: "4px solid #050505", padding: "28px 28px 32px 28px" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.1, ease: easings.primary }}
    >
      {/* Top-right corner bracket */}
      <div className="absolute top-0 right-0">
        <div style={{ width: 24, height: 4, background: "#050505", position: "absolute", top: 12, right: 0 }} />
        <div style={{ width: 4, height: 24, background: "#050505", position: "absolute", top: 12, right: 12 }} />
      </div>

      {/* Bottom-left corner bracket */}
      <div className="absolute bottom-0 left-0">
        <div style={{ width: 24, height: 4, background: "#050505", position: "absolute", bottom: 12, left: 0 }} />
        <div style={{ width: 4, height: 24, background: "#050505", position: "absolute", bottom: 12, left: 12 }} />
      </div>

      {/* Badge */}
      <div
        className="inline-flex items-center justify-center bg-[#D7F205]"
        style={{
          border: "3px solid #050505",
          padding: "5px 14px",
          marginBottom: 20,
        }}
      >
        <span
          className="text-[#050505] font-black uppercase tracking-[0.04em]"
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: 15,
          }}
        >
          CSE @ VIT VELLORE
        </span>
      </div>

      {/* Bio text */}
      <p
        className="text-[#050505]"
        style={{
          fontFamily: "var(--font-archivo), monospace",
          fontSize: 18,
          fontWeight: 500,
          lineHeight: 1.52,
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
