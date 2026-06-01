"use client";

import {
  removeMemberAction,
  restoreMemberAction,
  deleteMemberAction,
} from "@/app/actions/admin";

export function MemberActions({
  userId,
  email,
  removed,
}: {
  userId: string;
  email: string;
  removed: boolean;
}) {
  if (!removed) {
    return (
      <form action={removeMemberAction}>
        <input type="hidden" name="userId" value={userId} />
        <button className="rounded-md border border-black/10 px-2.5 py-1 text-xs font-medium text-ink/70 transition-colors hover:bg-black/[0.03]">
          Remove
        </button>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <form action={restoreMemberAction}>
        <input type="hidden" name="userId" value={userId} />
        <button className="rounded-md bg-brand px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-brand-dark">
          Restore
        </button>
      </form>
      <form
        action={deleteMemberAction}
        onSubmit={(e) => {
          if (
            !window.confirm(
              `Permanently delete ${email}? This cannot be undone.`
            )
          ) {
            e.preventDefault();
          }
        }}
      >
        <input type="hidden" name="userId" value={userId} />
        <button className="rounded-md border border-red-300 px-2.5 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50">
          Delete forever
        </button>
      </form>
    </div>
  );
}
