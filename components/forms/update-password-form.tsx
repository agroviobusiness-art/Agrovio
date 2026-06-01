"use client";

import { useActionState, useState } from "react";
import {
  updatePasswordAction,
  type UpdatePasswordState,
} from "@/app/actions/auth";
import { PillButton } from "@/components/ui/pill-button";
import { TextField } from "@/components/forms/fields";
import { PasswordRequirements } from "@/components/forms/password-requirements";
import { passwordMeetsAll } from "@/lib/password";

const initialState: UpdatePasswordState = { message: "" };

export function UpdatePasswordForm() {
  const [state, action, pending] = useActionState(updatePasswordAction, initialState);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const allMet = passwordMeetsAll(password);
  const matches = confirm.length > 0 && password === confirm;
  const canSubmit = allMet && matches && !pending;

  return (
    <form action={action} noValidate className="space-y-4 text-left">
      <TextField
        label="New password"
        name="password"
        type="password"
        required
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={state.errors?.password}
      />

      <PasswordRequirements value={password} />

      <TextField
        label="Confirm password"
        name="confirm"
        type="password"
        required
        autoComplete="new-password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={
          state.errors?.confirm ??
          (confirm.length > 0 && !matches ? "Passwords don't match" : undefined)
        }
      />

      {state.message && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <PillButton type="submit" variant="green" disabled={!canSubmit} className="w-full">
        {pending ? "Saving…" : "Set password"}
      </PillButton>
    </form>
  );
}
