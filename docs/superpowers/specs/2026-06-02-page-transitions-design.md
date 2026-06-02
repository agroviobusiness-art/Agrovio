# Page transitions & motion system — design

**Date:** 2026-06-02
**Status:** Approved (brainstorm) → implementing
**Scope:** Add smooth, premium page-to-page transitions plus a small, coherent
motion system to the Agrovio marketing site. Bar set by the client: Apple /
Spotify-grade polish — *calm*, never flashy.

## Goal

Navigations currently swap instantly with zero motion. Make moving between pages
feel intentional and smooth, and add the supporting "premium" motion (scroll
reveals, an animated mobile drawer) that makes the whole site read as expensive —
without gimmicks, and without hurting accessibility, SEO, performance, or the CSP.

## Decisions (from brainstorm)

- **Route transition mechanism:** native **View Transitions API** via React's
  `<ViewTransition>` (Next 16 `experimental.viewTransition`). Chosen over an
  enter-only `template.tsx` fade because it's the only clean way to get a real
  old→new crossfade in the App Router (framer-motion exit animations can't
  survive the router's unmount; the "FrozenRouter" hack is brittle and breaks
  scroll restoration). Degrades gracefully — unsupported browsers just swap.
- **Scope:** full premium pass (route crossfade + scroll reveals + drawer polish
  + reduced-motion + motion tokens), not route-only.

## Patterns (deliberately only two, + drawer)

1. **Route crossfade + gentle rise.** Old page dissolves, new page fades in while
   rising ~12px. ~200ms out / ~360ms in, ease-out quint `cubic-bezier(0.22,1,0.36,1)`.
   The header & footer are *anchored* (their own `view-transition-name`,
   `animation:none`) so the chrome never flashes — only the content moves.
2. **Scroll-reveal fade-up.** Sections rise ~20px + fade in once as they enter the
   viewport (IntersectionObserver), ~640ms ease-out, optional small stagger.
   Applied to the content-rich marketing pages (`/`, `/producer`); heroes are not
   revealed (they're above the fold).
3. **Mobile drawer.** The header menu currently pops in with no animation; give it
   a fade + slide + subtle scale, and keep it out of the tab order when closed.

Explicitly **avoided** as off-register for a trust-first B2B site: clip-path /
curtain wipes, big directional page slides, bouncy/overshooting springs,
scale-from-0.8 "pops", parallax, full-screen loader wipes, shared-element morphs
everywhere. Golden rule: *if a visitor notices the transition, it's too much.*

## Architecture

- `next.config.ts` — add `experimental: { viewTransition: true }` (leave CSP/headers untouched).
- `components/motion/page-transition.tsx` — server component; `<ViewTransition update="page" default="none">` wrapping a single `<div>` host around `{children}`. `update` = the route-change case for a persistent wrapper; `default="none"` keeps the initial document load from animating. Triple-slash `/// <reference types="react/canary" />` activates the `ViewTransition` types (tsconfig has no `types` array, so canary types are otherwise inert). The runtime export is present in Next's bundled React.
- `components/motion/reveal.tsx` — `'use client'` IntersectionObserver wrapper that sets `data-shown` when in view; reduced-motion / no-IO → reveal immediately.
- `app/layout.tsx` — wrap `{children}` in `<PageTransition>` inside `<main>`.
- `app/globals.css` — motion tokens (`:root`), the `::view-transition-*` rules + keyframes, header/footer anchoring, `[data-reveal]` styles, `.mobile-drawer` styles, and reduced-motion handling.
- `components/layout/site-header.tsx` — `[view-transition-name:site-header]` on `<header>`; refactor the drawer to always-rendered + `data-open` + `inert`.
- `components/layout/site-footer.tsx` — `[view-transition-name:site-footer]` on `<footer>`.
- `app/page.tsx`, `app/producer/page.tsx` — wrap section blocks in `<Reveal>`.

## Cross-cutting rules

- **Accessibility:** motion is opt-in via `@media (prefers-reduced-motion: no-preference)`, plus a hard `prefers-reduced-motion: reduce` kill-switch that collapses every view transition to an instant swap. Drawer is non-interactive (`inert`) when closed.
- **No-JS / SEO:** reveal hidden state is gated on `@media ... and (scripting: enabled)`, so content is always present and visible without JS; markup is unchanged (only opacity/transform differ).
- **CSP:** no new inline `<script>`; `view-transition-name` and reveal delays are set via CSS classes / Tailwind arbitrary properties, not inline `style=` — future-proof if the CSP is ever tightened to nonce/hash.
- **Performance:** animate `transform`/`opacity` only (GPU); `will-change` only on the actively-hidden reveal element.

## Verification

`npm run build` must pass; then drive a real browser (navigate `/ ↔ /producer ↔ /login`) to confirm the crossfade fires, the header/footer don't flash, reveals trigger on scroll, the drawer animates, and reduced-motion produces instant swaps. Security review (read-only) before push.
