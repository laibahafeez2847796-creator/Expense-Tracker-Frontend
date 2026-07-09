"use client";

import type { NavItem } from "@/lib/nav";
import { getNavMeta } from "@/lib/nav";
import { formatAmount } from "@/lib/utils";

interface AppTopBarProps {
  activeNav: NavItem;
  totalExpenses: number;
  totalSpent: number;
  loading: boolean;
  apiOnline: boolean;
  userName?: string;
  onRefresh: () => void;
  onLogout: () => void;
}

const METHOD_STYLES: Record<string, string> = {
  GET: "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/25",
  POST: "bg-sky-400/15 text-sky-300 ring-1 ring-sky-400/25",
  PUT: "bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/25",
  DELETE: "bg-rose-400/15 text-rose-300 ring-1 ring-rose-400/25",
};

export default function AppTopBar({
  activeNav,
  totalExpenses,
  totalSpent,
  loading,
  apiOnline,
  userName,
  onRefresh,
  onLogout,
}: AppTopBarProps) {
  const meta = getNavMeta(activeNav);
  const now = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="app-topbar sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg-topbar)] px-6 py-4 backdrop-blur-xl lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${METHOD_STYLES[meta.method]}`}
            >
              {meta.method}
            </span>
            <code className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-violet-200/80">
              {meta.endpoint}
            </code>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                apiOnline
                  ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20"
                  : "bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/20"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  apiOnline ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
                }`}
              />
              {apiOnline ? "API Online" : "API Offline"}
            </span>
          </div>

          <h2 className="bg-gradient-to-r from-white via-violet-100 to-cyan-100 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            {meta.label}
          </h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {meta.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="topbar-stat">
            <span className="topbar-stat__label">Expenses</span>
            <span className="topbar-stat__value">
              {loading ? "—" : totalExpenses}
            </span>
          </div>
          <div className="topbar-stat">
            <span className="topbar-stat__label">Total Spent</span>
            <span className="topbar-stat__value">
              {loading ? "—" : formatAmount(totalSpent)}
            </span>
          </div>
          <div className="topbar-stat hidden sm:block">
            <span className="topbar-stat__label">Today</span>
            <span className="topbar-stat__value text-sm">{now}</span>
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-4 py-2.5 text-sm font-medium text-white transition hover:from-indigo-500/30 hover:to-purple-500/30 disabled:opacity-50"
          >
            <svg
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Refresh
          </button>

          {userName && (
            <div className="topbar-stat hidden md:flex">
              <span className="topbar-stat__label">Signed in</span>
              <span className="topbar-stat__value truncate text-sm">
                {userName}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-200 transition hover:bg-rose-500/20"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
