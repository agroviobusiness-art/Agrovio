import { z } from "zod";
import { COUNTRIES, REFERRAL_SOURCES } from "@/lib/content";
import { passwordMeetsAll } from "@/lib/password";

export const ROLES = ["Producer", "Buyer"] as const;

/**
 * Turn empty form strings into `undefined` so optional fields validate cleanly.
 * (HTML form fields submit "" when left blank.)
 */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v === "" ? undefined : v));

/**
 * Optional dropdown value: blank is allowed, but any provided value must be a
 * member of the fixed option list. Server Actions accept arbitrary POST bodies,
 * so this rejects crafted requests that bypass the <select>.
 */
const optionalEnum = (values: readonly string[]) =>
  z
    .string()
    .optional()
    .transform((v) => (v ? v : undefined))
    .refine((v) => v === undefined || values.includes(v), {
      message: "Please choose a valid option",
    });

/**
 * Invite-request / contact form.
 *
 * Required fields are kept deliberately small (name + email + audience) to
 * reduce friction on a lead-capture form. These rules are intentionally
 * STRICTER than the DB's RLS check, so anything accepted here always passes
 * the database policy on `invite_requests`.
 */
export const inviteSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(120),
  lastName: z.string().trim().min(1, "Last name is required").max(120),
  email: z
    .email("Enter a valid email address")
    .max(255)
    .transform((v) => v.trim().toLowerCase()),
  role: z
    .string()
    .refine((v) => (ROLES as readonly string[]).includes(v), {
      message: "Let us know if you're a producer or buyer",
    }),
  phone: optionalText(60),
  company: optionalText(200),
  jobTitle: optionalText(200),
  country: optionalEnum(COUNTRIES),
  referralSource: optionalEnum(REFERRAL_SOURCES),
});

export type InviteInput = z.infer<typeof inviteSchema>;

/** Login: invite-only sign-in. We only check shape; Supabase verifies creds. */
export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

/** Forgot-password: just the email to send a reset link to. */
export const resetRequestSchema = z.object({
  email: z.email("Enter a valid email address"),
});

/** Set / update password (used after an invite or reset link). */
export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .refine(passwordMeetsAll, {
        message: "Password doesn't meet all the requirements below.",
      }),
    confirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

/**
 * Collapse a ZodError into a `{ field: message }` map.
 * Written by iterating `issues` directly so it's robust across Zod versions
 * (Zod 4 deprecated `.flatten()`).
 */
export function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
