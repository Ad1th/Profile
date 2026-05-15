"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });

export default function ExperienceHeader() {
  return (
    <div
      className="relative flex flex-col justify-between"
      style={{ height: "100%" }}
    >
      {/* Section label */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: easings.primary }}
      >
        <div style={{ width: 32, height: 3, background: "#E8420A" }} />
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "#E8420A",
            textTransform: "uppercase",
          }}
        >
          EXPERIENCE
        </span>
      </motion.div>

      {/* Main title block */}
      <div style={{ marginTop: 32 }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08, ease: easings.primary }}
        >
          <div
            className={`${anton.className} uppercase select-none`}
            style={{
              fontSize: "clamp(64px, 8vw, 110px)",
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              color: "#F0EBE0",
            }}
          >
            EXPERIENCE
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18, ease: easings.primary }}
        >
          <div
            className={`${anton.className} uppercase select-none`}
            style={{
              fontSize: "clamp(64px, 8vw, 110px)",
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              color: "#E8420A",
            }}
          >
            ARCHIVE.
          </div>
        </motion.div>

        {/* Divider + subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: easings.primary }}
          style={{ marginTop: 24 }}
        >
          <div
            style={{
              width: 48,
              height: 3,
              background: "#CFDE00",
              marginBottom: 14,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontSize: 15,
              fontWeight: 500,
              lineHeight: 1.55,
              color: "#888",
              maxWidth: 200,
            }}
          >
            A record of places,
            <br />
            projects and people
            <br />
            that shaped the way
            <br />I build systems.
          </p>
        </motion.div>
      </div>

      {/* Crosshair decoration */}
      <motion.div
        className="relative"
        style={{ width: 40, height: 40, marginTop: 40 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 1,
            background: "#F0EBE0",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 1,
            background: "#F0EBE0",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 14,
            height: 14,
            border: "1.5px solid #F0EBE0",
            borderRadius: "50%",
          }}
        />
      </motion.div>

      {/* Italic handwritten text */}
      <motion.div
        style={{ marginTop: 24 }}
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 0.75, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 22,
            lineHeight: 1.4,
            color: "#C8C0B4",
            letterSpacing: "0.01em",
          }}
        >
          Growing.
          <br />
          Building.
          <br />
          Shipping.
        </div>
        {/* Curved arrow */}
        <svg
          width="40"
          height="36"
          viewBox="0 0 40 36"
          fill="none"
          style={{ marginTop: 8, opacity: 0.5 }}
        >
          <path
            d="M6 4 C10 16 28 20 34 30"
            stroke="#C8C0B4"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M28 34 L34 30 L30 24"
            stroke="#C8C0B4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  );
}
