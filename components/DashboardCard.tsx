interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function DashboardCard({
  title,
  children,
  className = "",
}: DashboardCardProps) {
  return (
    <section
      className={`glass-panel rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-xl shadow-indigo-950/25 ring-1 ring-white/5 ${className}`}
    >
      <h2 className="mb-4 text-base font-semibold text-[var(--text-primary)]">
        {title}
      </h2>
      {children}
    </section>
  );
}
