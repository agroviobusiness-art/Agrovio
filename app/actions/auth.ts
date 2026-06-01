"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loginSchema, fieldErrorsFrom } from "@/lib/validation";

export type LoginState = {
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
