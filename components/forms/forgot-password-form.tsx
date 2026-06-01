"use client";

import { useActionState } from "react";
import { requestPasswordResetAction, type ResetState } from "@/app/actions/auth";
import { PillButton } from "@/components/ui/pill-button";
import { TextField } from "@/components/forms/fields";

const initialState: ResetState = { ok: false, message: "" };

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(
    requestPasswordResetAction,
    initialState
  );

  if (state.ok) {
    return (
      <p
        role="status"
        className="rounded-xl border border-brand/20 bg-brand/5 px-4 py-4 text-center text-sm text-ink"
      >
        {state.message}
      </p>
    );
  }

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
      <PillButton type="submit" variant="green" disabled={pending} className="w-full">
        {pending ? "Sending…" : "Send reset link"}
      </PillButton>
    </form>
  );
}
