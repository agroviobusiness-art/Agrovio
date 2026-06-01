"use server";

import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agrovio.vercel.app";

export type LinkState = {
  ok: boolean;
  message: string;
  email?: string;
  link?: string;
  errors?: Record<string, string>;
};

function confirmLink(tokenHash: string, type: "invite" | "recovery") {
  return `${SITE_URL}/auth/confirm?token_hash=${tokenHash}&type=${type}&next=/account/update-password`;
}

/** Create a new member + a shareable invite link (admin copies & sends it). */
export async function generateInviteLinkAction(
  _prev: LinkState,
  formData: FormData
): Promise<LinkState> {
  await requireAdmin(); // re-check: actions are reachable by direct POST

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!z.email().safeParse(email).success) {
    return { ok: false, message: "", errors: { email: "Enter a valid email address" } };
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.generateLink({
    type: "invite",
    email,
    options: { redirectTo: `${SITE_URL}/account/update-password` },
  });

  if (error || !data?.properties?.hashed_token) {
    return {
      ok: false,
      message:
        error?.message ??
        "Couldn't create an invite — that person may already be a member.",
      email,
    };
  }

  return {
    ok: true,
    email,
    message: `Invite link for ${email} — copy it and send it to them. It lets them set a password and sign in.`,
    link: confirmLink(data.properties.hashed_token, "invite"),
  };
}

/** Generate a password-reset link for an existing member (admin shares it). */
export async function generateResetLinkAction(
  _prev: LinkState,
  formData: FormData
): Promise<LinkState> {
  await requireAdmin();

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!z.email().safeParse(email).success) {
    return { ok: false, message: "Invalid email.", email };
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo: `${SITE_URL}/account/update-password` },
  });

  if (error || !data?.properties?.hashed_token) {
    return {
      ok: false,
      message: error?.message ?? "Couldn't generate a reset link for that member.",
      email,
    };
  }

  return {
    ok: true,
    email,
    message: `Password-reset link for ${email} — copy it and send it to them.`,
    link: confirmLink(data.properties.hashed_token, "recovery"),
  };
}
