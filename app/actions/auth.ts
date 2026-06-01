"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  loginSchema,
  resetRequestSchema,
  updatePasswordSchema,
  fieldErrorsFrom,
} from "@/lib/validation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agrovio.vercel.app";

export type LoginState = {
  message: string;
  errors?: Record<string, string>;
};

export type ResetState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

export type UpdatePasswordState = {
  message: string;
  errors?: Record<string, string>;
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { message: "", errors: fieldErrorsFrom(parsed.error) };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  // Access is invite-only: public sign-ups are disabled in Supabase, so an
  // uninvited person simply has no account and lands here.
  if (error) {
    return {
      message:
        "Invalid email or password. Access to Agrovio is invite-only — request an invite if you don't have an account yet.",
    };
  }

  // redirect() throws NEXT_REDIRECT, so it must be outside any try/catch.
  redirect("/welcome");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

/** Forgot password: email a reset link (routed through /auth/confirm). */
export async function requestPasswordResetAction(
  _prev: ResetState,
  formData: FormData
): Promise<ResetState> {
  const parsed = resetRequestSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { ok: false, message: "", errors: fieldErrorsFrom(parsed.error) };
  }

  const supabase = await createSupabaseServerClient();
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${SITE_URL}/account/update-password`,
  });

  // Always report success — never reveal whether an account exists.
  return {
    ok: true,
    message:
      "If that email has an Agrovio account, we've sent a link to reset your password.",
  };
}

/** Set a new password — used after an invite or reset link signs the user in. */
export async function updatePasswordAction(
  _prev: UpdatePasswordState,
  formData: FormData
): Promise<UpdatePasswordState> {
  const parsed = updatePasswordSchema.safeParse({
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });
  if (!parsed.success) {
    return { message: "", errors: fieldErrorsFrom(parsed.error) };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      message:
        "Your link has expired. Please request a new invite or reset link.",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });
  if (error) {
    return { message: error.message };
  }

  redirect("/welcome");
}
