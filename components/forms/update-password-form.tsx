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
  const [attempted, setAttempted] = useState(false);

  const allMet = passwordMeetsAll(password);
  const matches = password.length > 0 && password === confirm;
  const valid = allMet && matches;

  // Confirm error shows once they've typed a confirm value OR tried to submit.
  const confirmError =
    state.errors?.confirm ??
    ((confirm.length > 0 || attempted) && !matches
      ? "Passwords don't match"
      : undefined);

  return (
    <form
      action={action}
      noValidate
      // Button stays clickable; if incomplete, flag everything instead of silently doing nothing.
      onSubmit={(e) => {
        if (!valid) {
          e.preventDefault();
          setAttempted(true);
        }
      }}
      className="space-y-4 text-left"
    >
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

      <PasswordRequirements value={password} force={attempted} />

      <TextField
        label="Confirm password"
        name="confirm"
        type="password"
        required
        autoComplete="new-password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={confirmError}
      />

      {attempted && !valid && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Please complete the requirements marked in red and make sure both
          passwords match.
        </p>
      )}

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
