"use client"; // Error boundaries must be Client Components.

import { useEffect } from "react";
import { PillButton, PillLink } from "@/components/ui/pill-button";

// Route-segment error boundary. Renders INSIDE the root layout (header/footer
// present), so it can use Tailwind + the shared components. Next 16 passes
// `unstable_retry` (not the old `reset`) to re-render the failed segment.
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Surface the error in server/browser logs (no PII; matches the project's
    // console-based logging). A digest is attached for prod stack correlation.
    console.error("error boundary caught:", error);
  }, [error]);

  return (
    <section className="bg-hero-gradient">
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-32 text-center text-white">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
          Something went wrong
        </p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
          This page hit a snag
        </h1>
        <p className="mt-4 max-w-md text-white/80">
          An unexpected error occurred. You can try again, or head back home.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <PillButton variant="white" onClick={() => unstable_retry()}>
            Try again
          </PillButton>
          <PillLink href="/" variant="outlineLight">
            Back to home
          </PillLink>
        </div>
      </div>
    </section>
  );
}
