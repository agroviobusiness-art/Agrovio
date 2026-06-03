"use server";

import { headers } from "next/headers";
import { createHash } from "crypto";
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

  // Service-role client: used for the rate-limit RPC (not exposed to anon) and
  // for the insert below. We need the inserted row's id back to flag it if the
  // notification email fails, and the public RLS policy is insert-only with NO
  // SELECT — so a returning insert via the anon client couldn't read the id. Zod
  // (below) validates the payload more strictly than the table's WITH CHECK, and
  // that WITH CHECK still guards any direct anon REST insert.
  const admin = createSupabaseAdminClient();

  // 2. Per-IP rate limit: max 5 submissions/hour (atomic, via public.rate_limit_hit).
  const hdrs = await headers();
  const ip = (
    hdrs.get("x-forwarded-for")?.split(",")[0] ??
    hdrs.get("x-real-ip") ??
    "unknown"
  ).trim();
  const rlKey =
    "invite:" + createHash("sha256").update(ip).digest("hex").slice(0, 40);
  const { data: allowed, error: rlError } = await admin.rpc(
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

  const { data: inserted, error } = await admin
    .from("invite_requests")
    .insert({
      first_name: d.firstName,
      last_name: d.lastName,
      email: d.email,
      role: d.role,
      phone: d.phone ?? null,
      company: d.company ?? null,
      job_title: d.jobTitle ?? null,
      country: d.country ?? null,
      referral_source: d.referralSource ?? null,
    })
    .select("id")
    .single();

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
    // Flag the saved row so the admin portal can surface it for manual
    // follow-up (the lead itself is never lost — the row is the source of truth).
    if (inserted?.id) {
      const { error: flagError } = await admin
        .from("invite_requests")
        .update({ notification_failed: true })
        .eq("id", inserted.id);
      if (flagError) {
        console.error("failed to flag invite_requests.notification_failed", {
          code: flagError.code,
          message: flagError.message,
        });
      }
    }
  }

  return {
    ok: true,
    message: "Thanks! Your invite request is in — we'll be in touch soon.",
  };
}
