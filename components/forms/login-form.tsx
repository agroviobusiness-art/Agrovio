"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/actions/auth";
import { PillButton } from "@/components/ui/pill-button";
import { TextField } from "@/components/forms/fields";

const initialState: LoginState = { message: "" };

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} noValidate className="space-y-4 text-left">
      <TextField
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        error={state.errors?.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        error={state.errors?.password}
      />

      {state.message && (
        <p aria-live="polite" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <PillButton type="submit" variant="green" disabled={pending} className="w-full">
        {pending ? "Signing in…" : "Log in"}
      </PillButton>
    </form>
  );
}
