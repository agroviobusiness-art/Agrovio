import { PASSWORD_RULES } from "@/lib/password";
import { cn } from "@/lib/utils";

type Status = "met" | "unmet" | "idle";

function StatusIcon({ status }: { status: Status }) {
  const cls =
    status === "met"
      ? "bg-brand text-white"
      : status === "unmet"
        ? "bg-red-500 text-white"
        : "bg-black/10 text-transparent";
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-full transition-colors",
        cls
      )}
    >
      {status === "unmet" ? (
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

/**
 * Live password-requirements checklist.
 * - met rule → green ✓
 * - unmet rule (once the user has typed, or `force` after a submit attempt) → red ✗
 * - untouched & empty → neutral grey dot
 */
export function PasswordRequirements({
  value,
  force = false,
}: {
  value: string;
  force?: boolean;
}) {
  const started = value.length > 0 || force;
  return (
    <ul className="space-y-2 rounded-xl bg-mist/50 p-3.5 text-sm" aria-label="Password requirements">
      {PASSWORD_RULES.map((rule) => {
        const met = rule.test(value);
        const status: Status = met ? "met" : started ? "unmet" : "idle";
        return (
          <li
            key={rule.id}
            className={cn(
              "flex items-center gap-2.5 transition-colors",
              status === "met"
                ? "text-ink/70"
                : status === "unmet"
                  ? "text-red-600"
                  : "text-ink/45"
            )}
          >
            <StatusIcon status={status} />
            <span>{rule.label}</span>
            <span className="sr-only">
              {status === "met" ? " — met" : status === "unmet" ? " — not met yet" : ""}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
