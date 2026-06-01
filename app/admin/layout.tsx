import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/admin";
import { logoutAction } from "@/app/actions/auth";
import { AdminNav } from "@/components/admin/admin-nav";
import leafMark from "@/public/assets/agrovio-leaf.png";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-mist/30">
      <header className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <div className="flex items-center gap-5">
            <Link href="/admin" className="flex items-center gap-2">
              <Image src={leafMark} alt="" className="h-6 w-auto" />
              <span className="font-medium text-ink">
                Agrovio <span className="text-ink/40">Admin</span>
              </span>
            </Link>
            <AdminNav />
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-ink/50 sm:inline">{user.email}</span>
            <Link href="/" className="text-ink/50 hover:text-ink">
              View site
            </Link>
            <form action={logoutAction}>
              <button className="rounded-lg border border-black/10 px-3 py-1.5 text-ink/70 transition-colors hover:bg-black/[0.03]">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        {children}
      </div>
    </div>
  );
}
