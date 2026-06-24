"use client";

import { useEffect, useState } from "react";
import type { CreateExpensePayload, Expense } from "@/lib/types";
import { todayISO } from "@/lib/utils";
import DashboardCard from "../DashboardCard";
import ExpenseForm from "../ExpenseForm";

interface UpdateExpenseViewProps {
  expenses: Expense[];
  onUpdate: (id: number, payload: CreateExpensePayload) => Promise<void>;
}

export default function UpdateExpenseView({
  expenses,
  onUpdate,
}: UpdateExpenseViewProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (expenses.length === 0) {
      setSelectedId(null);
      return;
    }

    if (
      selectedId === null ||
      !expenses.some((expense) => expense.id === selectedId)
    ) {
      setSelectedId(expenses[0].id);
    }
  }, [expenses, selectedId]);

  const selected = expenses.find((expense) => expense.id === selectedId) ?? null;

  async function handleSubmit(payload: CreateExpensePayload) {
    if (!selected) return;

    setSuccessMessage(null);
    await onUpdate(selected.id, payload);
    setSuccessMessage(`Expense #${selected.id} updated successfully.`);
  }

  return (
    <div className="mx-auto max-w-[640px]">
      <DashboardCard title="Select Expense">
        {expenses.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">
            No expenses available to update.
          </p>
        ) : (
          <select
            value={selectedId ?? ""}
            onChange={(e) => {
              setSelectedId(Number(e.target.value));
              setSuccessMessage(null);
            }}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-input)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-teal)]"
          >
            {expenses.map((expense) => (
              <option key={expense.id} value={expense.id}>
                #{expense.id} — {expense.title} ({expense.category}) — €
                {expense.amount}
              </option>
            ))}
          </select>
        )}
      </DashboardCard>

      {successMessage && (
        <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {successMessage}
        </div>
      )}

      {selected && (
        <DashboardCard title="Request Body" className="mt-6">
          <ExpenseForm
            key={`${selected.id}-${selected.title}-${selected.category}-${selected.amount}`}
            initialValues={{
              title: selected.title,
              category: selected.category,
              amount: selected.amount,
              date: todayISO(),
            }}
            submitLabel="Update Expense"
            onSubmit={handleSubmit}
          />
        </DashboardCard>
      )}
    </div>
  );
}
