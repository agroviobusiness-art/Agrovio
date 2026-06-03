"use client"; // Error boundaries must be Client Components.

import { useEffect } from "react";

// Last-resort boundary for crashes in the ROOT layout itself. It replaces the
// root layout, so globals.css (and therefore Tailwind) is NOT loaded here and it
// must render its own <html>/<body> — hence the inline styles, which mirror the
// brand hero gradient. Next 16 passes `unstable_retry` (not the old `reset`).
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("global-error boundary caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
          backgroundImage:
            "linear-gradient(to top right, #0f5128 0%, #1f7a3f 52%, #2e9c54 100%)",
          color: "#ffffff",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Error
        </p>
        <h1
          style={{
            marginTop: "1rem",
            marginBottom: 0,
            fontSize: "2.25rem",
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            marginTop: "1rem",
            maxWidth: "28rem",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          An unexpected error occurred. Please try again — if it keeps happening,
          come back in a little while.
        </p>
        <button
          onClick={() => unstable_retry()}
          style={{
            marginTop: "2rem",
            cursor: "pointer",
            border: "none",
            borderRadius: "9999px",
            background: "#ffffff",
            color: "#0a0a0a",
            padding: "0.75rem 1.5rem",
            fontSize: "15px",
            fontWeight: 500,
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
