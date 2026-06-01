export type Stat = { value: string; label: string };

export function StatCard({ value, label }: Stat) {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm sm:p-8">
      <p className="text-4xl font-medium tracking-tight text-brand sm:text-5xl">
        {value}
      </p>
      <p className="mt-2 text-sm text-ink/60 sm:text-base">{label}</p>
    </div>
  );
}

export function StatCardRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}
