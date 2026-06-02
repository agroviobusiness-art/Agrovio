export type Stat = { value: string; label: string; description?: string };

export function StatCard({ value, label, description }: Stat) {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm sm:p-8">
      <p className="font-display text-4xl font-medium tracking-tight text-brand sm:text-5xl">
        {value}
      </p>
      <p className="mt-2 text-sm text-ink/60 sm:text-base">{label}</p>
      {description ? (
        <p className="mt-1 text-sm text-ink/45">{description}</p>
      ) : null}
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
