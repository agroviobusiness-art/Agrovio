import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const TH = "px-4 py-3 text-left font-medium text-ink/50 whitespace-nowrap";
const TD = "px-4 py-3 align-top text-ink/80 whitespace-nowrap";

export default async function LeadsPage() {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("invite_requests")
    .select("*")
    .order("created_at", { ascending: false });

  const rows = data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium tracking-tight text-ink">
          Invite requests
        </h1>
        <p className="mt-1 text-ink/50">
          Everyone who submitted the contact form — {rows.length} total.
        </p>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Couldn&apos;t load submissions: {error.message}
        </p>
      )}

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-black/[0.06] bg-white p-10 text-center text-ink/50">
          No submissions yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-black/[0.06] bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-black/[0.06] bg-mist/40">
              <tr>
                <th className={TH}>Name</th>
                <th className={TH}>Email</th>
                <th className={TH}>Role</th>
                <th className={TH}>Company</th>
                <th className={TH}>Country</th>
                <th className={TH}>Heard via</th>
                <th className={TH}>Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.05]">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-black/[0.015]">
                  <td className={`${TD} font-medium text-ink`}>
                    {r.first_name} {r.last_name}
                  </td>
                  <td className={TD}>
                    <a href={`mailto:${r.email}`} className="text-brand-dark hover:underline">
                      {r.email}
                    </a>
                  </td>
                  <td className={TD}>{r.role}</td>
                  <td className={TD}>{r.company || "—"}</td>
                  <td className={TD}>{r.country || "—"}</td>
                  <td className={TD}>{r.referral_source || "—"}</td>
                  <td className={TD}>{fmtDate(r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
