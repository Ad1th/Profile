"use client";

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

      {/* Outer border frame — full page */}
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none"
        style={{ border: "5px solid #111" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />

      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between bg-[#F0EBE0]"
        style={{
          height: 64,
          borderBottom: "5px solid #111",
          padding: "0 24px",
        }}
      >
        <div
          className="flex items-center justify-center bg-[#E8420A]"
          style={{ width: 56, height: 46, border: "3px solid #111" }}
        >
          <span
            className="text-white text-[32px] font-black tracking-[-0.08em] uppercase"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            A.
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center gap-10">
          {["WORK", "ABOUT", "CONTACT"].map((item) => (
            <span
              key={item}
              className="text-[#111] text-[32px] font-black tracking-[0.13em] cursor-pointer"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              {item}
            </span>
          ))}
        </div>
        <div style={{ width: 2, height: 24, background: "#111" }} />
        <div className="grid grid-cols-3 gap-[4px] bg-[#111] p-[8px]">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              style={{ width: 4, height: 4, background: "#F0EBE0" }}
            />
          ))}
        </div>
      </div>

      <div
        className="relative w-full h-full flex"
        style={{ paddingTop: 64, paddingBottom: 104 }}
      >
        {/* ── LEFT PANEL ── */}
        <motion.div
          className="relative flex flex-col justify-center bg-[#111]"
          style={{
            width: "50%",
            borderRight: "5px solid #111",
            paddingLeft: 48,
            paddingRight: 48,
            zIndex: 20,
          }}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easings.primary }}
        >
          <div
            className="absolute"
            style={{
              left: 22,
              bottom: 76,
              width: 14,
              height: 14,
              background: "#E8420A",
              border: "2px solid #111",
            }}
          />
          {/* Headline + CTA */}
          <div style={{ marginTop: 50 }}>
            <HeroHeadline />
            <HeroCTA />
          </div>
        </motion.div>

        {/* ── RIGHT PANEL ── */}
        <motion.div
          className="relative flex items-center justify-center bg-[#6C8EAD]"
          style={{
            width: "50%",
            zIndex: 10,
          }}
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easings.primary }}
        >
          {/* Left accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0"
            style={{
              width: 4,
              background: "#E8420A",
            }}
          />
          {/* Orange accent block bottom-left */}
          <div
            className="absolute"
            style={{
              left: 18,
              bottom: 92,
              width: 24,
              height: 24,
              background: "#E8420A",
              border: "2px solid #111",
              zIndex: 5,
            }}
          />
          <HeroPortrait />
        </motion.div>
      </div>

      {/* Stats row above ticker */}
      <div
        className="absolute left-0 right-0 z-30 flex items-center"
        style={{
          bottom: 52,
          height: 100,
          background: "#F0EBE0",
          borderTop: "5px solid #111",
        }}
      >
        <div
          className="flex-1 flex flex-col items-start justify-center"
          style={{ borderRight: "5px solid #111", padding: "14px 26px" }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div style={{ width: 18, height: 3, background: "#111" }} />
            <div style={{ width: 3, height: 3, background: "#E8420A" }} />
            <div style={{ width: 3, height: 3, background: "#111" }} />
          </div>
          <div
            className="text-[#111] text-[48px] font-black leading-none"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            3+
          </div>
          <div
            className="text-[#444] text-[25px] font-bold tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-archivo), monospace" }}
          >
            Years Building
          </div>
        </div>
        <div
          className="flex-1 flex flex-col items-start justify-center"
          style={{ padding: "14px 26px" }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div style={{ width: 12, height: 3, background: "#111" }} />
            <div
              style={{
                width: 12,
                height: 3,
                background: "#111",
                transform: "skewX(-32deg)",
              }}
            />
          </div>
          <div
            className="text-[#111] text-[48px] font-black leading-none"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            12
          </div>
          <div
            className="text-[#444] text-[25px] font-bold tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-archivo), monospace" }}
          >
            Projects Shipped
          </div>
        </div>
      </div>

      {/* Full-width scrolling ticker at the very bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-40 overflow-hidden flex items-center"
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
          style={{ animation: "ticker 22s linear infinite", paddingLeft: 18 }}
        >
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-white text-[13px] font-black tracking-[0.26em] uppercase"
              style={{
                fontFamily: "var(--font-archivo), monospace",
                paddingRight: 64,
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
