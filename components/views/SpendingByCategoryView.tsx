"use client";

import { formatAmount } from "@/lib/utils";
import DashboardCard from "../DashboardCard";
import MonthlyReport from "../MonthlyReport";

interface SpendingByCategoryViewProps {
  spendingByCategory: Record<string, number> | null;
  loading: boolean;
}

export default function SpendingByCategoryView({
  spendingByCategory,
  loading,
}: SpendingByCategoryViewProps) {
  const entries = spendingByCategory
    ? Object.entries(spendingByCategory).sort(([, a], [, b]) => b - a)
    : [];

  return (
    <div className="mx-auto max-w-[1000px]">
      <DashboardCard title="Response">
        {loading ? (
          <p className="text-sm text-[var(--text-muted)]">Loading...</p>
        ) : entries.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">{`{}`}</p>
        ) : (
          <div className="space-y-3">
            {entries.map(([category, amount]) => (
              <div
                key={category}
                className="flex items-center justify-between rounded-xl bg-[var(--bg-input)] px-4 py-3 text-sm"
              >
                <span className="font-medium">{category}</span>
                <span className="tabular-nums text-[var(--text-secondary)]">
                  {formatAmount(amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </DashboardCard>

      <div className="mt-6">
        <MonthlyReport
          spendingByCategory={spendingByCategory}
          loading={loading}
        />
      </div>
    </div>
  );
}
