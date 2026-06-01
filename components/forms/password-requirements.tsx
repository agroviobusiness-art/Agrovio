import { PASSWORD_RULES } from "@/lib/password";
import { cn } from "@/lib/utils";

function StatusDot({ met }: { met: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-full transition-colors",
        met ? "bg-brand text-white" : "bg-black/10 text-transparent"
      )}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Live password-requirements checklist. Each rule ticks green as it's met. */
export function PasswordRequirements({ value }: { value: string }) {
  return (
    <ul className="space-y-2 rounded-xl bg-mist/50 p-3.5 text-sm" aria-label="Password requirements">
      {PASSWORD_RULES.map((rule) => {
        const met = rule.test(value);
        return (
          <li
            key={rule.id}
            className={cn(
              "flex items-center gap-2.5 transition-colors",
              met ? "text-ink/70" : "text-ink/45"
            )}
          >
            <StatusDot met={met} />
            <span>{rule.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
