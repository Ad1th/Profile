"use client";

import HeroFrame from "./HeroFrame";
import HeroHeadline from "./HeroHeadline";
import HeroCTA from "./HeroCTA";
import HeroPortrait from "./HeroPortrait";
import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[900px] w-full overflow-hidden bg-[#F0EBE0]">
      {/* Grain overlay */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-[60] opacity-[0.025]" />

      {/* Hard left orange accent bar */}
      <motion.div
        className="absolute left-0 z-30 bg-[#E8420A]"
        style={{
          top: "28%",
          height: "44%",
          width: 10,
          borderRight: "3px solid #111",
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.6,
          ease: easings.primary,
          originY: 0,
        }}
      />

      {/* Outer border frame — full page */}
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none"
        style={{ border: "5px solid #111" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />

      <div className="relative w-full h-full flex">
        {/* ── LEFT PANEL: 62% ── */}
        <motion.div
          className="relative flex flex-col justify-center bg-[#111]"
          style={{
            width: "62%",
            borderRight: "5px solid #111",
            paddingLeft: 72,
            paddingRight: 48,
            zIndex: 20,
          }}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easings.primary }}
        >
          {/* Top-left logo stamp */}
          <div
            className="absolute top-0 left-0 flex items-center justify-center bg-[#E8420A]"
            style={{
              width: 64,
              height: 64,
              borderRight: "5px solid #111",
              borderBottom: "5px solid #111",
            }}
          >
            <span
              className="text-white text-[28px] font-black tracking-[-0.06em] uppercase"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              A.
            </span>
          </div>

          {/* Nav — top right of left panel */}
          <div
            className="absolute top-0 right-0 flex items-center"
            style={{
              height: 64,
              borderBottom: "5px solid #111",
              paddingLeft: 32,
              paddingRight: 32,
              gap: 32,
            }}
          >
            {["WORK", "ABOUT", "CONTACT"].map((item) => (
              <span
                key={item}
                className="text-[#F0EBE0] text-[13px] font-black tracking-[0.18em] cursor-pointer hover:text-[#CFDE00] transition-colors"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                {item}
              </span>
            ))}
            <div
              className="ml-4 flex flex-col gap-[3px] cursor-pointer"
              style={{ borderLeft: "2px solid #333", paddingLeft: 20 }}
            >
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-[3px]">
                  {[...Array(3)].map((__, j) => (
                    <div
                      key={j}
                      style={{ width: 5, height: 5, background: "#F0EBE0" }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Headline + CTA */}
          <div style={{ paddingTop: 40 }}>
            <HeroHeadline />
            <HeroCTA />
          </div>

          {/* Bottom-left decor: small hollow square + dash */}
          <div
            className="absolute bottom-0 left-0 flex items-center gap-4"
            style={{
              height: 52,
              paddingLeft: 72,
              borderTop: "5px solid #333",
              width: "100%",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                border: "3px solid #555",
              }}
            />
            <div style={{ width: 52, height: 3, background: "#CFDE00" }} />
          </div>
        </motion.div>

        {/* ── RIGHT PANEL: 38% ── */}
        <motion.div
          className="relative flex items-center justify-center bg-[#4A8DB7]"
          style={{
            width: "38%",
            zIndex: 10,
          }}
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easings.primary }}
        >
          <HeroPortrait />

          {/* Bottom olive bar — right panel only */}
          <motion.div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: 52,
              background: "#6E6A2D",
              borderTop: "5px solid #111",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.9,
              ease: easings.primary,
              originX: 0,
            }}
          />
        </motion.div>
      </div>

      {/* Full-width scrolling ticker at the very bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-40 overflow-hidden"
        style={{
          height: 52,
          background: "#E8420A",
          borderTop: "5px solid #111",
        }}
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 1.0, ease: easings.primary }}
      >
        <div
          className="flex items-center h-full whitespace-nowrap"
          style={{ animation: "ticker 22s linear infinite" }}
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-white text-[13px] font-black tracking-[0.2em] uppercase"
              style={{
                fontFamily: "var(--font-archivo), monospace",
                paddingRight: 48,
              }}
            >
              OPEN TO INTERN ■ BACKEND ENGINEER ■ CLEAN CODE ■ PRESSURE TESTED
              BUILDS ■
            </span>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
