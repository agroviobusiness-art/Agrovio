"use client";

import { useActionState, useEffect, useRef } from "react";
import { inviteAction, type InviteState } from "@/app/actions/invite";
import { PillButton } from "@/components/ui/pill-button";
import { TextField, SelectField } from "@/components/forms/fields";
import { COUNTRIES, REFERRAL_SOURCES } from "@/lib/content";
import { ROLES } from "@/lib/validation";

const initialState: InviteState = { ok: false, message: "" };

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SuccessPanel({ message }: { message: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // Move focus to the confirmation so keyboard/screen-reader users land on it.
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-brand/20 bg-brand/5 p-8 text-center focus:outline-none"
    >
      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-brand text-white">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-lg font-medium text-ink">{message}</p>
    </div>
  );
}

export function InviteForm() {
  const [state, action, pending] = useActionState(inviteAction, initialState);

  if (state.ok) return <SuccessPanel message={state.message} />;

  return (
    <form action={action} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="First Name" name="firstName" required autoComplete="given-name" error={state.errors?.firstName} />
        <TextField label="Last Name" name="lastName" required autoComplete="family-name" error={state.errors?.lastName} />
      </div>

      <TextField label="Email" name="email" type="email" required autoComplete="email" error={state.errors?.email} />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Phone" name="phone" type="tel" autoComplete="tel" error={state.errors?.phone} />
        <TextField label="Company" name="company" autoComplete="organization" error={state.errors?.company} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Job Title" name="jobTitle" autoComplete="organization-title" error={state.errors?.jobTitle} />
        <SelectField label="Are you a Producer or Buyer?" name="role" options={ROLES} required error={state.errors?.role} placeholder="Choose one" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField label="Country" name="country" options={COUNTRIES} error={state.errors?.country} placeholder="Select country" />
        <SelectField label="How did you hear about us?" name="referralSource" options={REFERRAL_SOURCES} error={state.errors?.referralSource} placeholder="Select one" />
      </div>

      {state.message && !state.ok && (
        <p aria-live="polite" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <PillButton type="submit" variant="black" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Submitting…" : "Submit"}
        {!pending && <ArrowIcon />}
      </PillButton>
    </form>
  );
}
