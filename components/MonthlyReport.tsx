"use client";

import { abbreviateCategory } from "@/lib/utils";
import DashboardCard from "./DashboardCard";

interface MonthlyReportProps {
  spendingByCategory: Record<string, number> | null;
  loading: boolean;
}

function BarChart({
  data,
  accentClass,
  mutedClass,
  showPercent = false,
}: {
  data: { label: string; value: number }[];
  accentClass: string;
  mutedClass: string;
  showPercent?: boolean;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex h-[220px] items-end justify-between gap-2 px-1 pt-8">
      {data.map((item, index) => {
        const height = Math.max((item.value / max) * 100, item.value > 0 ? 8 : 4);
        const isAccent = index % 2 === 0;

        return (
          <div
            key={item.label}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div className="relative flex h-[160px] w-full items-end justify-center">
              <div
                className={`w-full max-w-[42px] rounded-t-md transition-all ${
                  isAccent ? accentClass : mutedClass
                }`}
                style={{ height: `${height}%` }}
                title={`${item.label}: ${item.value}`}
              />
            </div>
            <span className="text-[10px] text-[var(--text-muted)]">
              {item.label}
            </span>
            {showPercent && total > 0 && (
              <span className="text-[10px] tabular-nums text-[var(--text-secondary)]">
                {Math.round((item.value / total) * 100)}%
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function MonthlyReport({
  spendingByCategory,
  loading,
}: MonthlyReportProps) {
  const entries = spendingByCategory
    ? Object.entries(spendingByCategory).sort(([, a], [, b]) => b - a)
    : [];

  const trendData =
    entries.length > 0
      ? entries.slice(0, 7).map(([category, value]) => ({
          label: abbreviateCategory(category),
          value,
        }))
      : [
          { label: "P0", value: 0 },
          { label: "G3", value: 0 },
          { label: "H9", value: 0 },
          { label: "I5", value: 0 },
          { label: "D4", value: 0 },
          { label: "K7", value: 0 },
          { label: "B5", value: 0 },
        ];

  const dayData =
    entries.length > 0
      ? entries.slice(0, 5).map(([category, value]) => ({
          label: category.length > 8 ? category.slice(0, 7) + "…" : category,
          value,
        }))
      : [
          { label: "Food", value: 0 },
          { label: "Transport", value: 0 },
          { label: "Services", value: 0 },
          { label: "Bills", value: 0 },
          { label: "Other", value: 0 },
        ];

  return (
    <DashboardCard title="Monthly Report">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-1 text-sm font-medium text-[var(--text-secondary)]">
            Category Spending Trend
          </h3>
          {loading ? (
            <div className="flex h-[220px] items-center justify-center text-sm text-[var(--text-muted)]">
              Loading chart...
            </div>
          ) : (
            <BarChart
              data={trendData}
              accentClass="bg-[var(--accent-teal)]"
              mutedClass="bg-[var(--border)]"
            />
          )}
        </div>

        <div>
          <h3 className="mb-1 text-sm font-medium text-[var(--text-secondary)]">
            Day-to-Day Expenses
          </h3>
          {loading ? (
            <div className="flex h-[220px] items-center justify-center text-sm text-[var(--text-muted)]">
              Loading chart...
            </div>
          ) : (
            <BarChart
              data={dayData}
              accentClass="bg-[var(--accent-purple)]"
              mutedClass="bg-[var(--border)]"
              showPercent
            />
          )}
        </div>
      </div>
    </DashboardCard>
  );
}
