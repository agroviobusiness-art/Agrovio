"use client";

import { useActionState, useState } from "react";
import {
  generateInviteLinkAction,
  generateResetLinkAction,
  type LinkState,
} from "@/app/actions/admin";
import { PillButton } from "@/components/ui/pill-button";

const initialState: LinkState = { ok: false, message: "" };

function CopyLink({ message, link }: { message: string; link: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl border border-brand/20 bg-brand/5 p-4">
      <p className="text-sm text-ink">{message}</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          readOnly
          value={link}
          onFocus={(e) => e.currentTarget.select()}
          className="w-full truncate rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-ink/70"
        />
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="shrink-0 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black"
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}

export function GenerateLinkForm({ kind }: { kind: "invite" | "reset" }) {
  const action =
    kind === "invite" ? generateInviteLinkAction : generateResetLinkAction;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <div className="space-y-3">
      <form action={formAction} className="flex flex-col gap-3 sm:flex-row">
        <input
          name="email"
          type="email"
          required
          placeholder="name@email.com"
          aria-label="Member email"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/25"
        />
        <PillButton type="submit" variant="green" size="sm" disabled={pending} className="shrink-0">
          {pending
            ? "Generating…"
            : kind === "invite"
              ? "Generate invite link"
              : "Generate reset link"}
        </PillButton>
      </form>

      {state.errors?.email && (
        <p className="text-sm text-red-600">{state.errors.email}</p>
      )}
      {state.message && !state.ok && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}
      {state.ok && state.link && (
        <CopyLink message={state.message} link={state.link} />
      )}
    </div>
  );
}
