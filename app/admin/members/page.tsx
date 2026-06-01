import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { GenerateLinkForm } from "@/components/admin/generate-link-form";
import { MemberActions } from "@/components/admin/member-actions";

export const dynamic = "force-dynamic";

type Member = {
  id: string;
  email?: string;
  created_at: string;
  last_sign_in_at?: string | null;
  email_confirmed_at?: string | null;
  confirmed_at?: string | null;
  banned_until?: string | null;
};

function fmtDate(s?: string | null) {
  return s
    ? new Date(s).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";
}

function isRemoved(u: Member) {
  return !!u.banned_until && new Date(u.banned_until) > new Date();
}

const TH = "px-4 py-3 text-left font-medium text-ink/50 whitespace-nowrap";
const TD = "px-4 py-3 align-top text-ink/80 whitespace-nowrap";

export default async function MembersPage() {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.listUsers();
  const users = (data?.users ?? []) as Member[];
  const active = users.filter((u) => !isRemoved(u));
  const removed = users.filter(isRemoved);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-medium tracking-tight text-ink">Members</h1>
        <p className="mt-1 text-ink/50">People who can sign in to Agrovio.</p>
      </div>

      <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
        <h2 className="font-medium text-ink">Invite a member</h2>
        <p className="mt-1 text-sm text-ink/50">
          Generate a link and send it to them (WhatsApp, email — anywhere).
          They&apos;ll set a password and sign in.
        </p>
        <div className="mt-4">
          <GenerateLinkForm kind="invite" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-medium text-ink">Active members ({active.length})</h2>
        {error ? (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            Couldn&apos;t load members: {error.message}
          </p>
        ) : active.length === 0 ? (
          <div className="rounded-2xl border border-black/[0.06] bg-white p-10 text-center text-ink/50">
            No active members — invite someone above.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-black/[0.06] bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-black/[0.06] bg-mist/40">
                <tr>
                  <th className={TH}>Email</th>
                  <th className={TH}>Status</th>
                  <th className={TH}>Invited</th>
                  <th className={TH}>Last sign-in</th>
                  <th className={TH}>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.05]">
                {active.map((u) => {
                  const confirmed = u.email_confirmed_at || u.confirmed_at;
                  return (
                    <tr key={u.id} className="hover:bg-black/[0.015]">
                      <td className={`${TD} font-medium text-ink`}>{u.email}</td>
                      <td className={TD}>
                        <span
                          className={
                            confirmed
                              ? "rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand-dark"
                              : "rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800"
                          }
                        >
                          {confirmed ? "Active" : "Invited"}
                        </span>
                      </td>
                      <td className={TD}>{fmtDate(u.created_at)}</td>
                      <td className={TD}>{fmtDate(u.last_sign_in_at)}</td>
                      <td className={TD}>
                        <MemberActions userId={u.id} email={u.email ?? ""} removed={false} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {removed.length > 0 && (
        <section>
          <h2 className="mb-1 font-medium text-ink">Removed members ({removed.length})</h2>
          <p className="mb-4 text-sm text-ink/50">
            Removed members can&apos;t sign in. Restore them anytime, or delete
            permanently.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-black/[0.06] bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-black/[0.06] bg-mist/40">
                <tr>
                  <th className={TH}>Email</th>
                  <th className={TH}>Invited</th>
                  <th className={TH}>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.05]">
                {removed.map((u) => (
                  <tr key={u.id} className="hover:bg-black/[0.015]">
                    <td className={`${TD} font-medium text-ink/60`}>{u.email}</td>
                    <td className={TD}>{fmtDate(u.created_at)}</td>
                    <td className={TD}>
                      <MemberActions userId={u.id} email={u.email ?? ""} removed={true} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
        <h2 className="font-medium text-ink">Reset a member&apos;s password</h2>
        <p className="mt-1 text-sm text-ink/50">
          Generate a reset link for an existing member and send it to them.
        </p>
        <div className="mt-4">
          <GenerateLinkForm kind="reset" />
        </div>
      </section>
    </div>
  );
}
