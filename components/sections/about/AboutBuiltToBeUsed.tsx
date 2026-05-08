"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

// Big blue panel: corner brackets + "BUILT TO BE USED." + "OPEN TO BUILD" button
export default function AboutBuiltToBeUsed() {
  return (
    <motion.div
      className="relative bg-[#7C9BB8] flex flex-col justify-between overflow-hidden"
      style={{ border: "4px solid #050505", borderTop: "none", padding: "28px 32px 32px 32px" }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.25, ease: easings.primary }}
    >
      {/* Top-left corner bracket */}
      <div className="absolute top-0 left-0">
        <div style={{ width: 28, height: 4, background: "#050505", position: "absolute", top: 16, left: 0 }} />
        <div style={{ width: 4, height: 28, background: "#050505", position: "absolute", top: 16, left: 16 }} />
      </div>

      {/* Top-right diagonal hatching decoration */}
      <div
        className="absolute top-0 right-0"
        style={{ padding: "14px 16px 0 0" }}
      >
        {/* Stripe pattern — mimics the "///////". */}
        <div className="flex gap-[5px]">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: 22,
                background: "#050505",
                transform: "skewX(-20deg)",
                opacity: 0.55,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom-right corner bracket */}
      <div className="absolute bottom-0 right-0">
        <div style={{ width: 28, height: 4, background: "#050505", position: "absolute", bottom: 16, right: 0 }} />
        <div style={{ width: 4, height: 28, background: "#050505", position: "absolute", bottom: 16, right: 16 }} />
      </div>

      {/* Headline */}
      <h2
        className="text-[#050505] uppercase leading-none select-none"
        style={{
          fontFamily: "var(--font-archivo), 'Arial Black', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(64px, 7vw, 112px)",
          letterSpacing: "-0.04em",
          lineHeight: 0.88,
          marginTop: 20,
        }}
      >
        BUILT TO
        <br />
        BE USED.
      </h2>

      {/* CTA Button */}
      <div className="flex justify-end" style={{ marginTop: 28 }}>
        <div className="relative" style={{ width: 220, height: 52 }}>
          {/* Shadow block */}
          <div
            className="absolute inset-0"
            style={{
              transform: "translate(6px, 6px)",
              background: "#050505",
              zIndex: 0,
            }}
          />
          {/* Button */}
          <motion.button
            className="absolute inset-0 flex items-center justify-center gap-3 bg-[#D7F205] cursor-pointer outline-none"
            style={{
              border: "4px solid #050505",
              zIndex: 1,
            }}
            whileHover={{ x: -3, y: -3 }}
            whileTap={{ x: 1, y: 1 }}
            transition={{ duration: 0.16, ease: easings.primary }}
          >
            <span
              className="text-[#050505] font-black uppercase tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-archivo), sans-serif",
                fontSize: 18,
              }}
            >
              OPEN TO BUILD
            </span>
            {/* Small square accent */}
            <div style={{ width: 10, height: 10, background: "#050505", flexShrink: 0 }} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
