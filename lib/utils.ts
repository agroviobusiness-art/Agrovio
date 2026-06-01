/** Tiny className joiner (clsx-lite) — keeps a dependency out of the bundle. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
