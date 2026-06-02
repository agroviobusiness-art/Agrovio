/// <reference types="react/canary" />
import { ViewTransition } from "react";
import type { ReactNode } from "react";

/**
 * Wraps page content in React's <ViewTransition> so client-side navigations
 * crossfade old→new via the native View Transitions API (enabled by
 * `experimental.viewTransition` in next.config.ts).
 *
 * A stable `name` ("page-content") gives the wrapped content one persistent
 * view-transition group. This wrapper lives in the root layout, so on a route
 * change its inner DOM nodes switch while the name persists — which the browser
 * crossfades (rather than an exit+enter). The stable name also lets globals.css
 * target the group / old / new with reliable NAME selectors: the crossfade
 * keyframes, the gentle rise, and turning OFF the geometry morph (so pages of
 * different heights dissolve in place instead of squishing). The header/footer
 * carry their own view-transition-name so they stay anchored.
 *
 * The single wrapping <div> gives <ViewTransition> one host element to name
 * (page components return fragments). It's layout-neutral (a full-width block
 * inside <main>).
 *
 * NOTE: the triple-slash reference activates the `ViewTransition` types from
 * react/canary (the tsconfig has no `types` array, so they're otherwise inert).
 * The runtime export is provided by Next's bundled React.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition name="page-content">
      <div className="page-vt-root">{children}</div>
    </ViewTransition>
  );
}
