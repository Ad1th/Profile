"use client";

import { type MotionValue } from "framer-motion";
import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });

function LangDots({ filled, total = 20 }: { filled: number; total?: number }) {
  return (
    <div className="flex items-center gap-[4px]">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: i < filled ? "#CFDE00" : "#444",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

const languages = [
  { name: "ENGLISH", filled: 18 },
  { name: "HINDI", filled: 15 },
  { name: "TELUGU", filled: 14 },
  { name: "KANNADA", filled: 11 },
  { name: "FRENCH", filled: 5 },
];

interface SkillsHeroProps {
  standalone: boolean;
  transitionProgress?: MotionValue<number>;
}

export default function SkillsHero({ standalone }: SkillsHeroProps) {
  return (
    <div
      className="relative grid"
      style={{
        gridTemplateColumns: "1fr 1fr 1fr",
        borderBottom: "3px solid #333",
        minHeight: "42svh",
        alignItems: "stretch",
      }}
    >
      <div
        style={{
          borderRight: "3px solid #333",
          padding: "36px 36px 40px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gridColumn: "1 / 2",
        }}
      >
        <div className="flex items-center gap-2" style={{ marginBottom: 20 }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              fontWeight: 700,
              color: "#888",
              letterSpacing: "0.12em",
            }}
          >
            // SKILLS
          </span>
        </div>

        <div
          className={`${anton.className} uppercase select-none`}
          style={{
            fontSize: "clamp(52px, 5.2vw, 80px)",
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
            color: "#F0EBE0",
          }}
        >
          The stack
        </div>
        <div
          className={`${anton.className} uppercase select-none`}
          style={{
            fontSize: "clamp(52px, 5.2vw, 80px)",
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
            color: "#CFDE00",
          }}
        >
          behind the
        </div>
        <div
          className={`${anton.className} uppercase select-none`}
          style={{
            fontSize: "clamp(52px, 5.2vw, 80px)",
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
            color: "#E8420A",
            marginBottom: 20,
          }}
        >
          things I build.
        </div>

        <div
          style={{ width: 40, height: 3, background: "#CFDE00", marginTop: 8 }}
        />
      </div>

      <div
        style={{
          borderRight: "3px solid #333",
          padding: "40px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.7,
            color: "#C8C0B4",
            maxWidth: 280,
          }}
        >
          I work across the stack
          <br />
          to design, build and ship
          <br />
          systems that are fast,
          <br />
          reliable and scalable.
        </p>

        <div
          style={{ width: 48, height: 3, background: "#CFDE00", marginTop: 32 }}
        />

        <div
          style={{
            width: 12,
            height: 12,
            background: "#E8420A",
            marginTop: 20,
          }}
        />
      </div>

      <div
        style={{
          padding: "36px 40px 40px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div className="absolute" style={{ top: 20, left: 20 }}>
          <div
            style={{
              width: 20,
              height: 3,
              background: "#555",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
          <div
            style={{
              width: 3,
              height: 20,
              background: "#555",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>

        <div className="absolute" style={{ bottom: 20, left: 20 }}>
          <div
            style={{
              width: 20,
              height: 3,
              background: "#555",
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          />
          <div
            style={{
              width: 3,
              height: 20,
              background: "#555",
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          />
        </div>

        <div
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "#CFDE00",
            marginBottom: 20,
          }}
        >
          LANGUAGES
        </div>

        <div className="flex flex-col" style={{ gap: 12 }}>
          {languages.map(({ name, filled }) => (
            <div key={name} className="flex items-center" style={{ gap: 24 }}>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#F0EBE0",
                  letterSpacing: "0.06em",
                  minWidth: 76,
                }}
              >
                {name}
              </span>
              <LangDots filled={filled} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
