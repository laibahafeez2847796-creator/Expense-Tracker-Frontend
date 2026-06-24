"use client";

import { NAV_ITEMS, type NavItem } from "@/lib/nav";
import { ExpenseTrackerLogo } from "./icons";

interface SidebarProps {
  active: NavItem;
  onNavigate: (item: NavItem) => void;
}

const METHOD_STYLES: Record<string, string> = {
  GET: "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20",
  POST: "bg-sky-400/15 text-sky-300 ring-1 ring-sky-400/20",
  PUT: "bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/20",
  DELETE: "bg-rose-400/15 text-rose-300 ring-1 ring-rose-400/20",
};

export default function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside className="glass-panel flex h-full w-[280px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg-sidebar)] px-3 py-4 shadow-2xl shadow-indigo-950/40 ring-1 ring-white/5">
      <div className="sidebar-brand relative mb-5 overflow-hidden px-1">
        <div className="brand-glow pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-violet-500/30 blur-2xl" />
        <div className="brand-glow pointer-events-none absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-cyan-400/20 blur-2xl" />

        <div className="relative rounded-2xl border border-white/12 bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-cyan-500/15 p-4 shadow-xl shadow-purple-900/25">
          <div className="mb-3 flex items-center gap-3.5">
            <div className="brand-icon-ring relative flex h-[52px] w-[52px] shrink-0 items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-400 via-purple-500 to-cyan-400 opacity-80 blur-sm" />
              <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-[2px]">
                <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#080c1c]">
                  <ExpenseTrackerLogo className="h-8 w-8" />
                </div>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="bg-gradient-to-r from-white via-violet-100 to-cyan-100 bg-clip-text text-base font-bold leading-tight tracking-tight text-transparent">
                  Expense Tracker
                </h1>
                <span className="rounded-md bg-cyan-400/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-300 ring-1 ring-cyan-400/20">
                  v1
                </span>
              </div>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-300/90">
                Frontend
              </p>
            </div>
          </div>

          <p className="text-[11px] leading-relaxed text-violet-200/70">
            Smart expense management with a beautiful interface
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium text-violet-200/80 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              8 Endpoints
            </span>
            <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium text-violet-200/80 ring-1 ring-white/10">
              REST API
            </span>
          </div>
        </div>

        <div className="brand-divider mx-2 mt-4" />
      </div>

      <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        API Endpoints
      </p>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`group flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-indigo-500/30 via-purple-500/22 to-cyan-500/10 text-white shadow-lg shadow-purple-900/25 ring-1 ring-violet-400/30"
                  : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-white"
              }`}
            >
              <span
                className={`mt-0.5 shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${METHOD_STYLES[item.method]}`}
              >
                {item.method}
              </span>
              <span className="text-sm leading-snug">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export type { NavItem };
