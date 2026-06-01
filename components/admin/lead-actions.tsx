"use client";

import { useActionState, useState } from "react";
import { acceptLeadAction, type LinkState } from "@/app/actions/admin";

const initialState: LinkState = { ok: false, message: "" };

export function LeadActions({
  id,
  email,
  status,
}: {
  id: string;
  email: string;
  status: string;
}) {
  const [state, action, pending] = useActionState(acceptLeadAction, initialState);
  const [copied, setCopied] = useState(false);

  if (state.ok && state.link) {
    const link = state.link;
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-brand-dark">Invite ready</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="rounded-md bg-ink px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-black"
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="flex items-center gap-2">
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="id" value={id} />
      {status === "accepted" && (
        <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand-dark">
          Accepted
        </span>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md border border-black/10 px-2.5 py-1 text-xs font-medium text-ink/70 transition-colors hover:bg-black/[0.03] disabled:opacity-50"
      >
        {pending ? "…" : status === "accepted" ? "Re-invite" : "Accept"}
      </button>
      {state.message && !state.ok && (
        <span className="text-xs text-red-600">{state.message}</span>
      )}
    </form>
  );
}
