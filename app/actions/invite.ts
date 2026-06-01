"use server";

import { headers } from "next/headers";
import { createHash } from "crypto";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { inviteSchema, fieldErrorsFrom } from "@/lib/validation";
import { sendInviteNotification } from "@/lib/email";

export type InviteState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

/** Coerce a FormData entry to a string (drop File values) for validation. */
const str = (v: FormDataEntryValue | null) =>
  typeof v === "string" ? v : undefined;

export async function inviteAction(
  _prev: InviteState,
  formData: FormData
): Promise<InviteState> {
  // 1. Honeypot — bots fill the hidden field; silently accept without storing.
  if (String(formData.get("company_website") ?? "").trim()) {
    return {
      ok: true,
      message: "Thanks! Your invite request is in — we'll be in touch soon.",
    };
  }

  const supabase = await createSupabaseServerClient();

  // 2. Per-IP rate limit: max 5 submissions/hour (atomic, via public.rate_limit_hit).
  const hdrs = await headers();
  const ip = (
    hdrs.get("x-forwarded-for")?.split(",")[0] ??
    hdrs.get("x-real-ip") ??
    "unknown"
  ).trim();
  const rlKey =
    "invite:" + createHash("sha256").update(ip).digest("hex").slice(0, 40);
  // Called with the service-role client — the function is not exposed to anon.
  const { data: allowed, error: rlError } = await createSupabaseAdminClient().rpc(
    "rate_limit_hit",
    { p_key: rlKey, p_max: 5, p_window_seconds: 3600 }
  );
  // Fail open (don't block real leads on an infra blip) but log so a broken
  // limiter is observable.
  if (rlError) {
    console.error("rate_limit_hit failed", {
      code: rlError.code,
      message: rlError.message,
    });
  }
  if (allowed === false) {
    return {
      ok: false,
      message:
        "You've already submitted a few times — please try again in a little while.",
    };
  }

  const parsed = inviteSchema.safeParse({
    firstName: str(formData.get("firstName")),
    lastName: str(formData.get("lastName")),
    email: str(formData.get("email")),
    role: str(formData.get("role")),
    phone: str(formData.get("phone")),
    company: str(formData.get("company")),
    jobTitle: str(formData.get("jobTitle")),
    country: str(formData.get("country")),
    referralSource: str(formData.get("referralSource")),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields and try again.",
      errors: fieldErrorsFrom(parsed.error),
    };
  }

  const d = parsed.data;

  const { error } = await supabase.from("invite_requests").insert({
    first_name: d.firstName,
    last_name: d.lastName,
    email: d.email,
    role: d.role,
    phone: d.phone ?? null,
    company: d.company ?? null,
    job_title: d.jobTitle ?? null,
    country: d.country ?? null,
    referral_source: d.referralSource ?? null,
  });

  if (error) {
    // Log the failure (code/message only — never the submitted PII) so genuine
    // DB/RLS errors are observable in server logs, while the user sees a
    // friendly generic message.
    console.error("invite_requests insert failed", {
      code: error.code,
      message: error.message,
    });
    return {
      ok: false,
      message:
        "Something went wrong submitting your request. Please try again in a moment.",
    };
  }

  // Best-effort team notification — never fail the submission over an email.
  try {
    await sendInviteNotification({
      firstName: d.firstName,
      lastName: d.lastName,
      email: d.email,
      role: d.role,
      phone: d.phone,
      company: d.company,
      jobTitle: d.jobTitle,
      country: d.country,
      referralSource: d.referralSource,
    });
  } catch (err) {
    console.error("invite notification email failed", err);
  }

  return {
    ok: true,
    message: "Thanks! Your invite request is in — we'll be in touch soon.",
  };
}
