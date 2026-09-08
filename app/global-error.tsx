"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#EEE7DC",
          color: "#111",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
          }}
        >
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <p
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#A14A32",
              }}
            >
              Something broke
            </p>
            <h1
              style={{
                margin: "16px 0 0",
                fontFamily: "'Arial Black', Impact, sans-serif",
                fontSize: "clamp(40px, 8vw, 88px)",
                lineHeight: 0.95,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
              }}
            >
              The page
              <br />
              <span style={{ color: "#E8420A" }}>fell over.</span>
            </h1>
            <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.5, opacity: 0.75 }}>
              Reloading usually fixes it. If it keeps happening, the home page
              still works.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => reset()}
                style={{
                  border: "3px solid #111",
                  background: "#CFDE00",
                  color: "#111",
                  padding: "12px 24px",
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  boxShadow: "4px 4px 0 0 #111",
                  cursor: "pointer",
                }}
              >
                Try again
              </button>
              <a
                href="/"
                style={{
                  border: "3px solid #111",
                  background: "#F0EBE0",
                  color: "#111",
                  padding: "12px 24px",
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  boxShadow: "4px 4px 0 0 #111",
                  textDecoration: "none",
                }}
              >
                Home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
