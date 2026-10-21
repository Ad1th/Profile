import { ImageResponse } from "next/og";

/**
 * The share card for every page below the homepage, in the root card's
 * split composition (app/opengraph-image.tsx): ink panel with the page's own
 * title, steel panel with whose page it is. A link pasted into LinkedIn,
 * WhatsApp or an AI chat now previews as the page it points at.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const INK = "#111111";
const PAPER = "#F0EBE0";
const VOLT = "#CFDE00";
const STEEL = "#6C8EAD";

const ANTON = "https://fonts.gstatic.com/s/anton/v27/1Ptgg87LROyAm0K0.ttf";
const MONO =
  "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-qxjPQ.ttf";

type Font = {
  name: string;
  data: ArrayBuffer;
  style: "normal";
  weight: 400 | 500;
};

async function face(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`font fetch failed: ${res.status}`);
  return res.arrayBuffer();
}

// One download per build worker, not one per card.
let fonts: Promise<Font[] | undefined> | undefined;

function loadFonts() {
  fonts ??= Promise.all([face(ANTON), face(MONO)])
    .then(([anton, mono]): Font[] => [
      { name: "Anton", data: anton, style: "normal", weight: 400 },
      { name: "Mono", data: mono, style: "normal", weight: 500 },
    ])
    // Never fail the build over a font CDN; fall back to the default face.
    .catch(() => undefined);
  return fonts;
}

/** Long titles step down so they still fit the ink panel. */
function titleSize(title: string) {
  if (title.length <= 14) return 112;
  if (title.length <= 24) return 92;
  if (title.length <= 40) return 76;
  if (title.length <= 70) return 60;
  return 50;
}

function clip(text: string, max: number) {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

export async function ogCard({
  eyebrow,
  title,
  subtitle,
  stat,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  stat?: { value: string; label: string };
}) {
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
        <div
          style={{
            width: "68%",
            background: INK,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 56px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Mono",
              fontSize: 20,
              color: VOLT,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Anton",
              fontSize: titleSize(title),
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: PAPER,
              textTransform: "uppercase",
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", width: 96, height: 5, background: VOLT }} />
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontFamily: "Mono",
                fontSize: 21,
                lineHeight: 1.4,
                color: "#E8DDD0",
              }}
            >
              {clip(subtitle, 150)}
            </div>
          </div>
        </div>

        <div
          style={{
            width: "32%",
            background: STEEL,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 36px",
            borderLeft: `10px solid ${INK}`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {["Adith", "Manikonda"].map((word) => (
              <div
                key={word}
                style={{
                  display: "flex",
                  fontFamily: "Anton",
                  fontSize: 48,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: INK,
                  textTransform: "uppercase",
                }}
              >
                {word}
              </div>
            ))}
            <div
              style={{
                display: "flex",
                marginTop: 14,
                fontFamily: "Mono",
                fontSize: 17,
                color: INK,
                opacity: 0.82,
              }}
            >
              Backend & Systems Engineer
            </div>
          </div>

          {stat ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontFamily: "Anton",
                  fontSize: stat.value.length > 8 ? 40 : 54,
                  lineHeight: 1,
                  color: INK,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 8,
                  fontFamily: "Mono",
                  fontSize: 14,
                  color: INK,
                  opacity: 0.75,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ) : null}

          <div
            style={{
              display: "flex",
              fontFamily: "Mono",
              fontSize: 20,
              color: INK,
            }}
          >
            adith.xyz
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  );
}
