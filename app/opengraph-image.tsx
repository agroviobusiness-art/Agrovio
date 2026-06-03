import { ImageResponse } from "next/og";

// Static Open Graph / social-share card for every route (Next auto-wires it into
// metadata, and per-route titles still apply). Generated with ImageResponse so
// there's no binary asset to maintain; only flexbox + a CSS subset are supported.
export const alt =
  "Agrovio — invite-only B2B agro-produce marketplace for Peru & Latin America";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          // Mirrors the .bg-hero-gradient brand gradient (globals.css).
          backgroundImage:
            "linear-gradient(135deg, #0f5128 0%, #1f7a3f 52%, #2e9c54 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Invite-only B2B marketplace
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 124,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Agrovio
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 52,
              fontWeight: 500,
              marginTop: 12,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            Grow More. Sell More. Buy Faster.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          Connecting agro-produce growers with verified buyers · Peru &amp; Latin
          America
        </div>
      </div>
    ),
    { ...size }
  );
}
