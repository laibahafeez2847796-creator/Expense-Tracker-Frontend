"use client";

import { useState } from "react";
import type { Expense } from "@/lib/types";
import { formatAmount, getCategoryStyle } from "@/lib/utils";
import DashboardCard from "../DashboardCard";

interface GetExpenseViewProps {
  onFetch: (id: number) => Promise<Expense>;
}

export default function GetExpenseView({ onFetch }: GetExpenseViewProps) {
  const [expenseId, setExpenseId] = useState("");
  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = parseInt(expenseId, 10);
    if (isNaN(id)) {
      setError("Enter a valid expense ID");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await onFetch(id);
      setExpense(data);
    } catch (err) {
      setExpense(null);
      setError(err instanceof Error ? err.message : "Expense not found");
    } finally {
      setLoading(false);
    }
  }

  const style = expense ? getCategoryStyle(expense.category) : null;

  return (
    <div className="mx-auto max-w-[640px]">
      <DashboardCard title="Path Parameter">
        <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
          <div className="min-w-[200px] flex-1">
            <label
              htmlFor="get-expense-id"
              className="mb-1.5 block text-sm text-[var(--text-secondary)]"
            >
              expense_id
            </label>
            <input
              id="get-expense-id"
              type="number"
              min="1"
              value={expenseId}
              onChange={(e) => setExpenseId(e.target.value)}
              placeholder="e.g. 1"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-input)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-teal)]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[var(--accent-teal)] px-5 py-2.5 text-sm font-medium text-[#0a0c10] disabled:opacity-60"
          >
            {loading ? "Loading..." : "Get Expense"}
          </button>
        </form>

        {error && (
          <p className="mt-4 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}
      </DashboardCard>

      {expense && style && (
        <DashboardCard title="Response" className="mt-6">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-[var(--text-muted)]">id</dt>
              <dd className="mt-1 font-medium tabular-nums">{expense.id}</dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--text-muted)]">title</dt>
              <dd className="mt-1 font-medium">{expense.title}</dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--text-muted)]">category</dt>
              <dd className="mt-1">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${style.bg} ${style.text}`}
                >
                  {expense.category}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--text-muted)]">amount</dt>
              <dd className="mt-1 font-medium tabular-nums">
                {formatAmount(expense.amount)}
              </dd>
            </div>
          </dl>
        </DashboardCard>
      )}
    </div>
  );
}
