"use client";

import { useActionState } from "react";
import {
  updatePasswordAction,
  type UpdatePasswordState,
} from "@/app/actions/auth";
import { PillButton } from "@/components/ui/pill-button";
import { TextField } from "@/components/forms/fields";

const initialState: UpdatePasswordState = { message: "" };

export function UpdatePasswordForm() {
  const [state, action, pending] = useActionState(
    updatePasswordAction,
    initialState
  );

  return (
    <form action={action} noValidate className="space-y-4 text-left">
      <TextField
        label="New password"
        name="password"
        type="password"
        required
        autoComplete="new-password"
        error={state.errors?.password}
      />
      <TextField
        label="Confirm password"
        name="confirm"
        type="password"
        required
        autoComplete="new-password"
        error={state.errors?.confirm}
      />
      {state.message && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}
      <PillButton type="submit" variant="green" disabled={pending} className="w-full">
        {pending ? "Saving…" : "Set password"}
      </PillButton>
    </form>
  );
}
