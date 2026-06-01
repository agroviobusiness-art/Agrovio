import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function StatTile({
  label,
  value,
  href,
}: {
  label: string;
  value: number | string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-black/[0.06] bg-white p-6 transition-shadow hover:shadow-sm"
    >
      <p className="text-sm text-ink/50">{label}</p>
      <p className="mt-2 text-4xl font-medium tracking-tight text-ink">{value}</p>
    </Link>
  );
}

export default async function AdminDashboard() {
  const admin = createSupabaseAdminClient();

  const [leadCountRes, usersRes, recentRes] = await Promise.all([
    admin.from("invite_requests").select("*", { count: "exact", head: true }),
    admin.auth.admin.listUsers(),
    admin
      .from("invite_requests")
      .select("first_name,last_name,email,role,created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const leadCount = leadCountRes.count ?? 0;
  const memberCount = usersRes.data?.users?.length ?? 0;
  const recent = recentRes.data ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium tracking-tight text-ink">Dashboard</h1>
        <p className="mt-1 text-ink/50">
          Overview of your invite-only network.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatTile label="Invite requests (leads)" value={leadCount} href="/admin/requests" />
        <StatTile label="Members" value={memberCount} href="/admin/members" />
      </div>

      <div className="rounded-2xl border border-black/[0.06] bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-ink">Recent leads</h2>
          <Link href="/admin/requests" className="text-sm text-brand-dark hover:underline">
            View all
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="mt-4 text-sm text-ink/50">No submissions yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-black/[0.06]">
            {recent.map((r, i) => (
              <li key={i} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <span className="font-medium text-ink">
                    {r.first_name} {r.last_name}
                  </span>
                  <span className="ml-2 text-ink/50">{r.email}</span>
                </div>
                <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand-dark">
                  {r.role}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
