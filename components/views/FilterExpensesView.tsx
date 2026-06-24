"use client";

import { useState } from "react";
import type { FilteredExpense } from "@/lib/types";
import { formatAmount } from "@/lib/utils";
import DashboardCard from "../DashboardCard";

interface FilterExpensesViewProps {
  categories: string[];
  onFilter: (category: string) => Promise<FilteredExpense[]>;
}

export default function FilterExpensesView({
  categories,
  onFilter,
}: FilterExpensesViewProps) {
  const [category, setCategory] = useState("");
  const [results, setResults] = useState<FilteredExpense[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category.trim()) {
      setError("Category is required");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await onFilter(category.trim());
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Filter failed");
      setResults(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-[640px]">
      <DashboardCard title="Query Parameter">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="filter-category"
              className="mb-1.5 block text-sm text-[var(--text-secondary)]"
            >
              category
            </label>
            <input
              id="filter-category"
              type="text"
              list="filter-categories"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Food"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-input)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-teal)]"
            />
            <datalist id="filter-categories">
              {categories.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
          </div>

          {error && (
            <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[var(--accent-teal)] px-5 py-2.5 text-sm font-medium text-[#0a0c10] disabled:opacity-60"
          >
            {loading ? "Filtering..." : "Filter Expenses"}
          </button>
        </form>
      </DashboardCard>

      {results && (
        <DashboardCard title="Response" className="mt-6">
          {results.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">[]</p>
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {results.map((item, index) => (
                <li
                  key={`${item.title}-${index}`}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span>{item.title}</span>
                  <span className="tabular-nums">{formatAmount(item.amount)}</span>
                </li>
              ))}
            </ul>
          )}
        </DashboardCard>
      )}
    </div>
  );
}
