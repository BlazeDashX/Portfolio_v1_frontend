import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #111827 40%, #1e293b 100%)",
          color: "white",
        }}
      >
        {/* IMPORTANT: this wrapper has multiple children so it MUST be flex */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {/* Name row */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                letterSpacing: "-2px",
              }}
            >
              Ref
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                letterSpacing: "-2px",
                color: "#fbbf24",
              }}
            >
              at
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                letterSpacing: "-2px",
                opacity: 0.6,
              }}
            >
              .
            </div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                fontSize: 36,
                opacity: 0.85,
              }}
            >
              CSE Student • Web Developer • CV/ML Explorer
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                fontSize: 28,
                opacity: 0.7,
              }}
            >
              Production-grade web systems + research-focused development
            </div>
          </div>

          {/* Small pills row */}
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 8,
              flexWrap: "wrap",
            }}
          >
            {["Next.js", "TypeScript", "Backend APIs", "Computer Vision"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "10px 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.14)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  fontSize: 20,
                  opacity: 0.9,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}