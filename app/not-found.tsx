import { PillLink } from "@/components/ui/pill-button";

export default function NotFound() {
  return (
    <section className="bg-hero-gradient">
      <div className="flex min-h-screen flex-col items-center justify-center px-5 py-32 text-center text-white">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
          404
        </p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-white/80">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <div className="mt-8">
          <PillLink href="/" variant="white">
            Back to home
          </PillLink>
        </div>
      </div>
    </section>
  );
}
