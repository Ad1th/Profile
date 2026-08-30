import { ImageResponse } from "next/og";

/**
 * Social preview card.
 *
 * The OG image was the 900x600 portrait — no name, no role, no context, and
 * the wrong aspect for every card renderer. This draws the hero's split
 * composition at the 1200x630 the platforms actually crop to, in the site's
 * own palette and display face, so a pasted link reads as the portfolio.
 */
export const runtime = "nodejs";
export const alt = "Adith Manikonda — Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#111111";
const PAPER = "#F0EBE0";
const FLAME = "#E8420A";
const VOLT = "#CFDE00";
const STEEL = "#6C8EAD";

const ANTON =
  "https://fonts.gstatic.com/s/anton/v27/1Ptgg87LROyAm0K0.ttf";
// The site sets body copy in mono; without a second face Satori would render
// every string in Anton, including the tagline and the stat labels.
const MONO =
  "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-qxjPQ.ttf";

async function face(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`font fetch failed: ${res.status}`);
  return res.arrayBuffer();
}

export default async function Image() {
  let fonts;
  try {
    const [antonData, monoData] = await Promise.all([face(ANTON), face(MONO)]);
    fonts = [
      { name: "Anton", data: antonData, style: "normal" as const, weight: 400 as const },
      { name: "Mono", data: monoData, style: "normal" as const, weight: 500 as const },
    ];
  } catch {
    // Never fail the build over a font CDN; fall back to the default face.
    fonts = undefined;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: PAPER,
          border: `12px solid ${INK}`,
        }}
      >
        {/* Left: the headline, as on the site */}
        <div
          style={{
            width: "62%",
            background: INK,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 56px",
          }}
        >
          <div
            style={{
              fontFamily: "Anton",
              fontSize: 104,
              lineHeight: 0.86,
              letterSpacing: "-0.04em",
              color: PAPER,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            BACKEND
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              border: `5px solid ${VOLT}`,
              padding: "6px 20px 2px",
              margin: "10px 0",
            }}
          >
            <div
              style={{
                fontFamily: "Anton",
                fontSize: 92,
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                color: VOLT,
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              WITH
            </div>
          </div>
          <div
            style={{
              fontFamily: "Anton",
              fontSize: 104,
              lineHeight: 0.86,
              letterSpacing: "-0.04em",
              color: FLAME,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            TASTE.
          </div>

          <div style={{ display: "flex", width: 96, height: 5, background: VOLT, marginTop: 34 }} />
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontFamily: "Mono",
              fontSize: 21,
              color: "#E8DDD0",
              letterSpacing: "0.01em",
            }}
          >
            Pressure tested builds with clean internals.
          </div>
        </div>

        {/* Right: who, and the proof strip */}
        <div
          style={{
            width: "38%",
            background: STEEL,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 40px",
            borderLeft: `10px solid ${INK}`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Anton",
                fontSize: 52,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: INK,
                textTransform: "uppercase",
              }}
            >
              Adith
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Anton",
                fontSize: 52,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: INK,
                textTransform: "uppercase",
              }}
            >
              Manikonda
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 16,
                fontFamily: "Mono",
                fontSize: 18,
                color: INK,
                opacity: 0.82,
              }}
            >
              Backend & Systems Engineer
            </div>
            <div style={{ display: "flex", marginTop: 6, fontFamily: "Mono", fontSize: 18, color: INK, opacity: 0.82 }}>
              VIT Vellore
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["2", "PATENTS PUBLISHED"],
              ["19", "PROJECTS SHIPPED"],
            ].map(([n, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <div
                  style={{
                    display: "flex",
                    fontFamily: "Anton",
                    fontSize: 44,
                    color: INK,
                    lineHeight: 1,
                  }}
                >
                  {n}
                </div>
                <div style={{ display: "flex", fontFamily: "Mono", fontSize: 14, color: INK, opacity: 0.75, letterSpacing: "0.08em" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
