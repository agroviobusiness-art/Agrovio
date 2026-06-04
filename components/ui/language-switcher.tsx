"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isSpanish = pathname?.startsWith("/es");

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchTo(lang: "en" | "es") {
    setOpen(false);
    if (lang === "es") {
      if (!isSpanish) {
        if (pathname === "/" || pathname === "") router.push("/es");
        else if (pathname === "/producer") router.push("/es/producer");
        else if (pathname === "/buyer") router.push("/es/buyer");
        else router.push("/es");
      }
    } else {
      if (isSpanish) {
        if (pathname === "/es") router.push("/");
        else if (pathname === "/es/producer") router.push("/producer");
        else if (pathname === "/es/buyer") router.push("/buyer");
        else router.push("/");
      }
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Select language"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#1a3a1f] shadow-xl">
          <button
            type="button"
            onClick={() => switchTo("en")}
            className={`flex w-full items-center gap-2.5 px-4 py-3 text-sm transition-colors hover:bg-white/10 ${
              !isSpanish ? "text-white font-medium" : "text-white/70"
            }`}
          >
            <span className="text-base">🇺🇸</span>
            English
            {!isSpanish && (
              <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => switchTo("es")}
            className={`flex w-full items-center gap-2.5 px-4 py-3 text-sm transition-colors hover:bg-white/10 ${
              isSpanish ? "text-white font-medium" : "text-white/70"
            }`}
          >
            <span className="text-base">🇵🇪</span>
            Español
            {isSpanish && (
              <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
