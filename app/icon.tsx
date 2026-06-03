import { ImageResponse } from "next/og";

// Generated app icon (crisp on retina + mobile bookmarks); favicon.ico stays as
// the legacy fallback. A green rounded tile with the Agrovio monogram.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#338f50", // --color-brand
          color: "white",
          fontSize: 44,
          fontWeight: 700,
          fontFamily: "sans-serif",
          borderRadius: 12,
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
