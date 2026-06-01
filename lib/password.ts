/**
 * Single source of truth for password rules — used by the live requirements
 * checklist (UI) AND the server-side Zod validation, so they can't drift.
 * MUST match the Supabase dashboard policy (Auth → Providers → Email):
 * minimum length 8 + lowercase, uppercase, digit, and symbol required.
 */

export const PASSWORD_MIN_LENGTH = 8;

// Supabase's allowed symbol set: !@#$%^&*()_+-=[]{};'\:"|<>?,./`~
const SYMBOL_RE = /[!@#$%^&*()_+\-=[\]{};'\\:"|<>?,.\/`~]/;

export type PasswordRule = {
  id: string;
  label: string;
  test: (value: string) => boolean;
};

export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: "length",
    label: `At least ${PASSWORD_MIN_LENGTH} characters`,
    test: (v) => v.length >= PASSWORD_MIN_LENGTH,
  },
  { id: "lower", label: "A lowercase letter (a–z)", test: (v) => /[a-z]/.test(v) },
  { id: "upper", label: "An uppercase letter (A–Z)", test: (v) => /[A-Z]/.test(v) },
  { id: "digit", label: "A number (0–9)", test: (v) => /[0-9]/.test(v) },
  { id: "symbol", label: "A symbol (e.g. ! @ # $ %)", test: (v) => SYMBOL_RE.test(v) },
];

export function passwordMeetsAll(value: string): boolean {
  return PASSWORD_RULES.every((rule) => rule.test(value));
}
