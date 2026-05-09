"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

// Cream card with orange border: "BEHAVIOR > BUZZWORDS" + bullet list
export default function AboutPhilosophy() {
  const bullets = ["UNDER LOAD.", "UNDER PRESSURE.", "UNDER MISTAKES."];

  return (
    // Outer cream card with orange border  top border thicker than bottom border to give asymmetrical "weight" to the design
    <motion.div
      className="relative bg-[#F0EBE0] h-full flex flex-col justify-between"
      style={{
        // replace with thicker top border of 28px solid #E8420A and thinner bottom border of 22px solid #E8420A to give asymmetrical weight to the design
        border: "3px solid #111",
        borderTop: "32px solid #E8420A",
        borderBottom: "15px solid #E8420A",
        borderLeft: "15px solid #E8420A",
        borderRight: "15px solid #E8420A",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.16, ease: easings.primary }}
    >
      {/* Fake window chrome — top-right close buttons */}
      <div
        className="absolute top-0 right-1 flex items-center gap-0 " //goes into the border above, negative padding
        style={{ padding: "0px 0px" /*borderBottom: "3px solid #E8420A"*/ }}
      >
        <span
          className="text-[#111] font-black"
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: 17,
            fontWeight: 1000,
            marginRight: 14,
            marginTop: -28,
          }}
        >
          —
        </span>
        <span
          className="text-[#111] font-black"
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: 20,
            fontWeight: 1400,
            marginTop: -25,
            marginRight: 5,
          }}
        >
          ✕
        </span>
      </div>
      {/* add black border accents to the inner corners of the card, positioned 12px from the edges and sized 24px by 4px, rotated to form L shapes */}
      <motion.div
        className="relative bg-[#F0EBE0] h-full flex flex-col justify-between"
        style={{
          // replace with thicker top border of 28px solid #E8420A and thinner bottom border of 22px solid #E8420A to give asymmetrical weight to the design
          border: "3px solid #111",
          padding: "23px 24px 28px 28px",
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.16, ease: easings.primary }}
      >
        {/* Headline */}
        <h2
          className={`${anton.className} text-[#111] uppercase select-none`}
          style={{
            // fontFamily: "var(--font-archivo), 'Anton', sans-serif",
            fontSize: "clamp(50px, 2vw, 28px)",
            fontWeight: 200,
            letterSpacing: "0.01em",
            lineHeight: 0.7,
            marginBottom: 14,
            marginTop: 8,
          }}
        >
          BEHAVIOR &gt; BUZZWORDS
        </h2>

        {/* Horizontal rule */}
        <div
          style={{
            width: "100%",
            height: 4,
            background: "#111",
            marginBottom: 16,
          }}
        />

        {/* Body text */}
        <p
          className="text-[#111]"
          style={{
            fontFamily: "var(--font-Roboto), serif",
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1.45,
            letterSpacing: "0.05em",
            marginBottom: 16,
          }}
        >
          I care more about how
          <br />
          something behaves
          <br />
          than how it's described.
        </p>

        {/* Horizontal rule */}
        <div
          style={{
            width: "100%",
            height: 4,
            background: "#111",
            marginBottom: 16,
          }}
        />
        {/* Bullet list */}
        <div className="flex flex-col gap-[10px]">
          {bullets.map((b) => (
            <div key={b} className="flex items-center gap-3">
              <div
                style={{
                  width: 14,
                  height: 14,
                  background: "#E8420A",
                  flexShrink: 0,
                }}
              />
              <span
                className="text-[#111] uppercase font-bold"
                style={{
                  fontFamily: "var(--font-Roboto), serif",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              >
                {b}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
