"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

// A long ban acts as a reversible "soft delete" — fully restorable via unban.
const SOFT_DELETE_BAN = "876000h"; // ~100 years

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

/** Accept a lead: invite them as a member + mark the lead handled. */
export async function acceptLeadAction(
  _prev: LinkState,
  formData: FormData
): Promise<LinkState> {
  await requireAdmin();

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const id = String(formData.get("id") ?? "");
  if (!z.email().safeParse(email).success) {
    return { ok: false, message: "This lead has an invalid email." };
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
      email,
      message:
        error?.message ?? "Couldn't invite — they may already be a member.",
    };
  }

  if (id) {
    await admin.from("invite_requests").update({ status: "accepted" }).eq("id", id);
    revalidatePath("/admin/requests");
  }

  return {
    ok: true,
    email,
    message: `Accepted ${email}. Copy this invite link and send it to them:`,
    link: confirmLink(data.properties.hashed_token, "invite"),
  };
}

/** Soft-remove a member — a reversible ban. They can't sign in until restored. */
export async function removeMemberAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  if (!userId) return;
  const admin = createSupabaseAdminClient();
  await admin.auth.admin.updateUserById(userId, { ban_duration: SOFT_DELETE_BAN });
  revalidatePath("/admin/members");
}

/** Restore a removed member (unban). */
export async function restoreMemberAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  if (!userId) return;
  const admin = createSupabaseAdminClient();
  await admin.auth.admin.updateUserById(userId, { ban_duration: "none" });
  revalidatePath("/admin/members");
}

/** Permanently delete a member. Irreversible. */
export async function deleteMemberAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  if (!userId) return;
  const admin = createSupabaseAdminClient();
  await admin.auth.admin.deleteUser(userId);
  revalidatePath("/admin/members");
}
