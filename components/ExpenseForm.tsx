"use client";

import { useState } from "react";
import type { CreateExpensePayload } from "@/lib/types";
import { todayISO } from "@/lib/utils";

const SUGGESTED_CATEGORIES = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Health",
  "Marketing",
  "Sales",
  "Operations",
  "Finance",
  "Other",
];

interface ExpenseFormProps {
  initialValues?: {
    title: string;
    category: string;
    amount: number;
    date: string;
  };
  submitLabel: string;
  onSubmit: (payload: CreateExpensePayload) => Promise<void>;
  onCancel?: () => void;
}

const inputClass =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--bg-input)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent-teal)] focus:ring-2 focus:ring-[var(--accent-teal)]/20";

export default function ExpenseForm({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: ExpenseFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [category, setCategory] = useState(initialValues?.category ?? "");
  const [amount, setAmount] = useState(
    initialValues?.amount ? String(initialValues.amount) : ""
  );
  const [date, setDate] = useState(initialValues?.date ?? todayISO());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsedAmount = parseFloat(amount);
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!category.trim()) {
      setError("Category is required");
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Amount must be a positive number");
      return;
    }
    if (!date) {
      setError("Date is required");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        title: title.trim(),
        category: category.trim(),
        amount: parsedAmount,
        date,
      });
      if (!initialValues?.title) {
        setTitle("");
        setCategory("");
        setAmount("");
        setDate(todayISO());
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="mb-1.5 block text-sm text-[var(--text-secondary)]">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Office Supplies"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-1.5 block text-sm text-[var(--text-secondary)]">
            Category
          </label>
          <input
            id="category"
            type="text"
            list="categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Marketing"
            className={inputClass}
          />
          <datalist id="categories">
            {SUGGESTED_CATEGORIES.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
        </div>

        <div>
          <label htmlFor="amount" className="mb-1.5 block text-sm text-[var(--text-secondary)]">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="date" className="mb-1.5 block text-sm text-[var(--text-secondary)]">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[var(--accent-teal)] px-5 py-2.5 text-sm font-medium text-[#0a0c10] transition hover:bg-[var(--accent-teal-dim)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-[var(--border)] px-5 py-2.5 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
