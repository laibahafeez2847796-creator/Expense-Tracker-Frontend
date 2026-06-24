"use client";

import type { Expense } from "@/lib/types";
import { formatAmount, getCategoryStyle } from "@/lib/utils";
import DashboardCard from "../DashboardCard";

interface GetAllExpensesViewProps {
  expenses: Expense[];
  loading: boolean;
}

export default function GetAllExpensesView({
  expenses,
  loading,
}: GetAllExpensesViewProps) {
  return (
    <div className="mx-auto max-w-[1000px]">
      <DashboardCard title="Response">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-muted)]">
                <th className="pb-3 pr-4 font-medium">ID</th>
                <th className="pb-3 pr-4 font-medium">Title</th>
                <th className="pb-3 pr-4 font-medium">Category</th>
                <th className="pb-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-[var(--text-muted)]">
                    Loading...
                  </td>
                </tr>
              ) : expenses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-[var(--text-muted)]">
                    []
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
                      <td className="py-3 tabular-nums">
                        {formatAmount(expense.amount)}
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
