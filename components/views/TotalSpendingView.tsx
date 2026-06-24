"use client";

import { formatAmount } from "@/lib/utils";
import DashboardCard from "../DashboardCard";

interface TotalSpendingViewProps {
  totalSpent: number;
  loading: boolean;
}

export default function TotalSpendingView({
  totalSpent,
  loading,
}: TotalSpendingViewProps) {
  return (
    <div className="mx-auto max-w-[640px]">
      <DashboardCard title="Response">
        {loading ? (
          <p className="text-sm text-[var(--text-muted)]">Loading...</p>
        ) : (
          <div className="rounded-xl bg-[var(--bg-input)] p-6">
            <p className="text-xs text-[var(--text-muted)]">totalSpent</p>
            <p className="mt-2 text-4xl font-bold tabular-nums text-[var(--accent-teal)]">
              {formatAmount(totalSpent)}
            </p>
          </div>
        )}
      </DashboardCard>
    </div>
  );
}
