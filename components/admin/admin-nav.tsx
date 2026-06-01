"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/requests", label: "Leads" },
  { href: "/admin/members", label: "Members" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-1">
      {ITEMS.map((i) => {
        const active =
          i.href === "/admin"
            ? pathname === "/admin"
            : pathname?.startsWith(i.href);
        return (
          <Link
            key={i.href}
            href={i.href}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm transition-colors",
              active
                ? "bg-brand/10 font-medium text-brand-dark"
                : "text-ink/60 hover:bg-black/[0.03] hover:text-ink"
            )}
          >
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
