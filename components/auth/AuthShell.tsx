import Link from "next/link";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-500/30 ring-1 ring-white/10">
              <svg
                className="h-5 w-5 text-violet-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <span className="font-semibold text-[var(--text-secondary)]">
              Expense Tracker
            </span>
          </Link>

          <h1 className="mt-6 bg-gradient-to-r from-white via-violet-100 to-cyan-100 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            {title}
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{subtitle}</p>
        </div>

        <section className="glass-panel rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-xl shadow-indigo-950/25 ring-1 ring-white/5">
          {children}
        </section>

        {footer && (
          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            {footer}
          </p>
        )}
      </div>
    </div>
  );
}
