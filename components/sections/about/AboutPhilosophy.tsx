"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { Anton } from "next/font/google";

/* 
  Anton:
  Heavy condensed brutalist display font.
  Used for the large editorial heading.
*/
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

/*
  ABOUT PHILOSOPHY CARD
  ---------------------------------------------------------
  Cream editorial card with:
  - asymmetrical orange frame
  - fake window controls
  - bold brutalist typography
  - horizontal separators
  - statement bullets
*/
export default function AboutPhilosophy() {
  /*
    Bullet list content.
    Keeping this as an array makes it easier
    to map + animate later if needed.
  */
  const bullets = ["UNDER LOAD.", "UNDER PRESSURE.", "UNDER MISTAKES."];

  return (
    /*
      OUTER ORANGE FRAME
      ---------------------------------------------------
      This creates the thick neo-brutalist outer border.

      IMPORTANT:
      The border thickness is intentionally asymmetrical.

      WHY?
      Neo-brutalism feels more editorial and physical
      when one side visually carries more "weight".

      Top border thicker:
      Makes the card feel top-heavy like a printed poster.
    */
    <motion.div
      className="relative h-full bg-[#F0EBE0]"
      /*
        STYLE BREAKDOWN
        ---------------------------------------------------
      */
      style={{
        /*
          Base black outline.
          Gives hard comic-book edge.
        */
        border: "3px solid #111",

        /*
          Thick orange top border.
          Main visual identity edge.
        */
        borderTop: "32px solid #E8420A",

        /*
          Side borders slightly thinner.
          Creates asymmetry + tension.
        */
        borderLeft: "15px solid #E8420A",
        borderRight: "15px solid #E8420A",

        /*
          Bottom thinner than top.
          Makes top visually dominant.
        */
        borderBottom: "15px solid #E8420A",
      }}
      /*
        Entrance animation.
        Slight upward reveal.
      */
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: 0.16,
        ease: easings.primary,
      }}
    >
      {/* =========================================================
          TOP RIGHT WINDOW CONTROLS
          =========================================================

          Fake operating-system chrome.

          Makes the card feel:
          - interactive
          - draggable
          - desktop-app inspired

          Positioned INSIDE the thick orange border.
      ========================================================== */}

      <div
        className="absolute flex items-center"
        style={{
          top: -20,
          right: 10,
          gap: "8px",
          zIndex: 30,
        }}
      >
        {/* MINIMIZE DASH */}
        <span
          style={{
            /*
              Archivo gives sharp geometric look.
            */
            fontFamily: "var(--font-archivo), sans-serif",

            /*
              Thick brutalist weight.
            */
            fontWeight: 900,

            /*
              Slightly smaller than X.
            */
            fontSize: 16,

            /*
              Hard black.
            */
            color: "#111",

            /*
              Keeps vertical alignment visually centered.
            */
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          —
        </span>

        {/* CLOSE X */}
        <span
          style={{
            fontFamily: "var(--font-archivo), sans-serif",

            /*
              Extra visual dominance.
            */
            fontWeight: 1000,

            /*
              Slightly larger than dash.
            */
            fontSize: 18,

            color: "#111",

            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </span>
      </div>

      {/* =========================================================
          INNER CARD
          =========================================================

          This is the actual cream content container.

          Separate inner border creates:
          - layered frame effect
          - editorial depth
          - printed poster feel
      ========================================================== */}

      <motion.div
        className="relative h-full flex flex-col bg-[#F0EBE0]"
        style={{
          /*
            Inner black outline.
          */
          border: "3px solid #111",

          /*
            Padding controls breathing room.
          */
          padding: "22px 24px 24px 24px",
        }}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.18,
          ease: easings.primary,
        }}
      >
        {/* =====================================================
            TOP RIGHT ORANGE ACCENT LINE
            =====================================================

            This is the thin orange brutalist accent.

            Adds:
            - asymmetry
            - visual direction
            - editorial sharpness

            Tiny detail.
            Huge impact.
        ====================================================== */}

        <div
          className="absolute top-4 right-4"
          style={{
            width: 18,
            height: 18,
            top: 18,
            right: 18,
            background: "#E8420A",
          }}
        />

        {/* =====================================================
            MAIN TITLE
            ===================================================== */}

        <h2
          className={`${anton.className} uppercase text-[#111] select-none`}
          style={{
            /*
              Responsive scaling.
            */
            fontSize: "clamp(34px, 2.6vw, 58px)",

            /*
              Anton already thick.
              Keep normal.
            */
            fontWeight: 400,

            /*
              Tiny positive spacing improves readability.
            */
            letterSpacing: "0.01em",

            /*
              Tight editorial compression.
            */
            lineHeight: 0.82,

            /*
              Space below title.
            */
            marginBottom: 18,

            /*
              Slight top spacing.
            */
            marginTop: 4,
          }}
        >
          BEHAVIOR &gt; BUZZWORDS
        </h2>

        {/* =====================================================
            TOP DIVIDER LINE
            ===================================================== */}

        <div
          style={{
            width: "100%",
            /*
              Thick brutalist rule.
            */
            height: 4,
            background: "#111",
            marginBottom: 18,
          }}
        />

        {/* =====================================================
            BODY COPY
            ===================================================== */}

        <p
          className="text-[#111]"
          style={{
            /*
              Clean editorial grotesk.
            */
            fontFamily: "var(--font-roboto), sans-serif",

            /*
              Strong but not headline-heavy.
            */
            fontSize: 18,

            fontWeight: 800,

            /*
              Generous readability spacing.
            */
            lineHeight: 1.4,

            /*
              Tiny spacing improves clarity.
            */
            letterSpacing: "0.03em",

            /*
              Breathing room before divider.
            */
            marginBottom: 18,
          }}
        >
          I care more about how
          <br />
          something behaves
          <br />
          than how it's described.
        </p>

        {/* =====================================================
            SECOND DIVIDER
            ===================================================== */}

        <div
          style={{
            width: "100%",
            height: 4,
            background: "#111",
            marginBottom: 18,
          }}
        />

        {/* =====================================================
            BULLET LIST
            ===================================================== */}

        <div className="flex flex-col gap-[8px]">
          {bullets.map((b) => (
            <div key={b} className="flex items-center gap-4">
              {/* ORANGE BULLET SQUARE */}
              <div
                style={{
                  width: 14,
                  height: 14,

                  /*
                    Same orange identity color.
                  */
                  background: "#E8420A",

                  flexShrink: 0,
                }}
              />

              {/* BULLET TEXT */}
              <span
                className="uppercase text-[#111]"
                style={{
                  fontFamily: "var(--font-roboto), sans-serif",

                  fontSize: 18,

                  fontWeight: 600,

                  lineHeight: 1.4,

                  /*
                    Editorial tracking.
                  */
                  letterSpacing: "0.05em",
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
