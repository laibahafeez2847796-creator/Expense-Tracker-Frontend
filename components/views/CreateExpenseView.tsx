"use client";

import type { CreateExpensePayload } from "@/lib/types";
import DashboardCard from "../DashboardCard";
import ExpenseForm from "../ExpenseForm";

interface CreateExpenseViewProps {
  onSubmit: (payload: CreateExpensePayload) => Promise<void>;
}

export default function CreateExpenseView({ onSubmit }: CreateExpenseViewProps) {
  return (
    <div className="mx-auto max-w-[640px]">
      <DashboardCard title="Request Body">
        <ExpenseForm submitLabel="Create Expense" onSubmit={onSubmit} />
      </DashboardCard>
    </div>
  );
}
