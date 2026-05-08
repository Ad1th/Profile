"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

interface AboutBuiltToBeUsedProps {
  viewportTransition?: boolean;
}

// Big blue panel: corner brackets + "BUILT TO BE USED." + "OPEN TO BUILD" button
export default function AboutBuiltToBeUsed({
  viewportTransition = false,
}: AboutBuiltToBeUsedProps) {
  return (
    <motion.div
      className="relative bg-[#6C8EAD] flex flex-col justify-between overflow-hidden"
      style={{
        border: "4px solid #111",
        borderTop: "none",
        padding: viewportTransition
          ? "16px 26px 20px 26px"
          : "28px 32px 32px 32px",
        height: "100%",
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.25, ease: easings.primary }}
    >
      {/* Top-left corner bracket */}
      <div className="absolute top-0 left-0">
        <div
          style={{
            width: 28,
            height: 4,
            background: "#111",
            position: "absolute",
            top: 16,
            left: 0,
          }}
        />
        <div
          style={{
            width: 4,
            height: 28,
            background: "#111",
            position: "absolute",
            top: 16,
            left: 16,
          }}
        />
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
                background: "#111",
                transform: "skewX(-20deg)",
                opacity: 0.55,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom-right corner bracket */}
      <div className="absolute bottom-0 right-0">
        <div
          style={{
            width: 28,
            height: 4,
            background: "#111",
            position: "absolute",
            bottom: 16,
            right: 0,
          }}
        />
        <div
          style={{
            width: 4,
            height: 28,
            background: "#111",
            position: "absolute",
            bottom: 16,
            right: 16,
          }}
        />
      </div>

      {/* Headline */}
      <h2
        className={`${anton.className} text-[#111] uppercase select-none`}
        style={{
          fontWeight: 400,

          fontSize: viewportTransition
            ? "clamp(88px, 8vw, 150px)"
            : "clamp(120px, 10vw, 210px)",

          letterSpacing: "-0.035em",
          lineHeight: 0.98,

          textAlign: "left",

          position: "absolute",
          top: viewportTransition ? "2.2rem" : "2.8rem",
          left: viewportTransition ? "4rem" : "5rem",

          zIndex: 2,
        }}
      >
        BUILT TO
        <br />
        BE USED.
      </h2>

      {/* CTA Button */}
      <div
        className="absolute bottom-8 right-8" //aligns bottom right of the window
        style={{ marginTop: viewportTransition ? 16 : 28 }}
      >
        <div
          className="relative"
          style={{
            width: viewportTransition ? 218 : 220,
            height: viewportTransition ? 46 : 52,
          }}
        >
          {/* Shadow block */}
          <div
            className="absolute inset-0"
            style={{
              transform: "translate(6px, 6px)",
              background: "#111",
              zIndex: 0,
            }}
          />
          {/* Button */}
          <motion.button
            className="absolute inset-0 flex items-center justify-center gap-3 bg-[#CFDE00] cursor-pointer outline-none"
            style={{
              border: "4px solid #111",
              zIndex: 1,
              letterSpacing: "0.08em",
            }}
            whileHover={{ x: -3, y: -3 }}
            whileTap={{ x: 1, y: 1 }}
            transition={{ duration: 0.16, ease: easings.editorial }}
          >
            <span
              className="text-[#111] font-black uppercase tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-archivo), sans-serif",
                fontSize: viewportTransition ? 14 : 18,
              }}
            >
              OPEN TO BUILD
            </span>
            {/* Small square accent */}
            <div
              style={{
                width: 10,
                height: 10,
                background: "#111",
                flexShrink: 0,
              }}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
