"use client";

import type { Expense } from "@/lib/types";
import { formatAmount, getCategoryStyle } from "@/lib/utils";
import DashboardCard from "../DashboardCard";

interface DeleteExpenseViewProps {
  expenses: Expense[];
  loading: boolean;
  deletingId: number | null;
  onDelete: (id: number) => Promise<void>;
}

export default function DeleteExpenseView({
  expenses,
  loading,
  deletingId,
  onDelete,
}: DeleteExpenseViewProps) {
  return (
    <div className="mx-auto max-w-[1000px]">
      <DashboardCard title="Select expense to delete">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-muted)]">
                <th className="pb-3 pr-4 font-medium">ID</th>
                <th className="pb-3 pr-4 font-medium">Title</th>
                <th className="pb-3 pr-4 font-medium">Category</th>
                <th className="pb-3 pr-4 font-medium">Amount</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-[var(--text-muted)]">
                    Loading...
                  </td>
                </tr>
              ) : expenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-[var(--text-muted)]">
                    No expenses to delete
                  </td>
                </tr>
              ) : (
                expenses.map((expense) => {
                  const style = getCategoryStyle(expense.category);
                  return (
                    <tr
                      key={expense.id}
                      className="border-b border-[var(--border)]/60 last:border-0"
                    >
                      <td className="py-3 pr-4 tabular-nums">{expense.id}</td>
                      <td className="py-3 pr-4">{expense.title}</td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${style.bg} ${style.text}`}
                        >
                          {expense.category}
                        </span>
                      </td>
                      <td className="py-3 pr-4 tabular-nums">
                        {formatAmount(expense.amount)}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => onDelete(expense.id)}
                          disabled={deletingId === expense.id}
                          className="rounded-lg bg-red-500/15 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/25 disabled:opacity-50"
                        >
                          {deletingId === expense.id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
}
