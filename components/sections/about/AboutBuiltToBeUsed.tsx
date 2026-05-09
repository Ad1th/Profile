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
      className="relative bg-[#6C8EAD] flex flex-col"
      style={{
        border: "3px solid #111",
        borderTop: "none",
        padding: viewportTransition
          ? "10px 18px 12px 18px"
          : "16px 20px 18px 20px",
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
            left: 16,
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
                width: 6,
                height: 22,
                background: "#111",
                transform: "skewX(-20deg)",
                opacity: 0.75,
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
            right: 16,
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

      {/* Bottom-left corner bracket */}
      <div className="absolute bottom-0 left-0">
        <div
          style={{
            width: 28,
            height: 4,
            background: "#111",
            position: "absolute",
            bottom: 16,
            left: 16,
          }}
        />
        <div
          style={{
            width: 4,
            height: 28,
            background: "#111",
            position: "absolute",
            bottom: 16,
            left: 16,
          }}
        />
      </div>

      {/* Headline */}
      <h2
        className={`${anton.className} text-[#111] uppercase select-none`}
        style={{
          fontWeight: 400,

          fontSize: viewportTransition
            ? "clamp(140px, 15vw, 108px)"
            : "clamp(64px, 6.5vw, 112px)",

          letterSpacing: "0.02em",
          lineHeight: 0.9,

          // textAlign: "left",

          //text starts top left, with some padding from the corner brackets
          marginTop: 35,
          marginLeft: 100,
        }}
      >
        BUILT TO
        <br />
        BE USED.
      </h2>

      {/* CTA Button */}
      <div
        className="absolute"
        style={{
          bottom: viewportTransition ? "30px" : "28px",
          right: viewportTransition ? "30px" : "32px",
        }}
      >
        <div
          className="relative"
          style={{
            width: viewportTransition ? 250 : 220,
            height: viewportTransition ? 56 : 52,
          }}
        >
          {/* Shadow block */}
          <div
            className="absolute inset-0"
            style={{
              transform: "translate(8px, 8px)",
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
                fontSize: viewportTransition ? 20 : 16,
              }}
            >
              OPEN TO BUILD
            </span>
            {/* Small square accent */}
            <div
              style={{
                width: 14,
                height: 14,
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
