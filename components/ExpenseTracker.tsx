"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createExpense,
  deleteExpense,
  filterExpensesByCategory,
  getExpense,
  getExpenses,
  getSpendingByCategory,
  getTotalSpending,
  updateExpense,
} from "@/lib/api";
import type { CreateExpensePayload, Expense } from "@/lib/types";
import AppTopBar from "./AppTopBar";
import Sidebar, { type NavItem } from "./Sidebar";
import CreateExpenseView from "./views/CreateExpenseView";
import DeleteExpenseView from "./views/DeleteExpenseView";
import FilterExpensesView from "./views/FilterExpensesView";
import GetAllExpensesView from "./views/GetAllExpensesView";
import GetExpenseView from "./views/GetExpenseView";
import SpendingByCategoryView from "./views/SpendingByCategoryView";
import TotalSpendingView from "./views/TotalSpendingView";
import UpdateExpenseView from "./views/UpdateExpenseView";
import { useAuth } from "./auth/AuthProvider";

export default function ExpenseTracker() {
  const { user, logout } = useAuth();
  const [activeNav, setActiveNav] = useState<NavItem>("get-all-expenses");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [spendingByCategory, setSpendingByCategory] = useState<Record<
    string,
    number
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [apiOnline, setApiOnline] = useState(true);

  const loadSummaries = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const [total, byCategory] = await Promise.all([
        getTotalSpending(),
        getSpendingByCategory(),
      ]);
      setTotalSpent(total.totalSpent);
      setSpendingByCategory(byCategory);
      setApiOnline(true);
    } catch (err) {
      setApiOnline(false);
      setError(err instanceof Error ? err.message : "Failed to load summaries");
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getExpenses();
      setExpenses(data);
      setApiOnline(true);
    } catch (err) {
      setApiOnline(false);
      setError(err instanceof Error ? err.message : "Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    await Promise.all([loadExpenses(), loadSummaries()]);
  }, [loadExpenses, loadSummaries]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const categories = [
    ...new Set([
      ...expenses.map((e) => e.category),
      ...(spendingByCategory ? Object.keys(spendingByCategory) : []),
    ]),
  ].sort();

  async function handleCreate(payload: CreateExpensePayload) {
    try {
      await createExpense(payload);
      setApiOnline(true);
      setError(null);
      await refreshAll();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create expense";
      setError(message);
      throw new Error(message);
    }
  }

  async function handleUpdate(id: number, payload: CreateExpensePayload) {
    try {
      await updateExpense(id, payload);
      setApiOnline(true);
      setError(null);
      try {
        await refreshAll();
      } catch (err) {
        setError(
          err instanceof Error
            ? `Updated, but failed to refresh: ${err.message}`
            : "Updated, but failed to refresh data"
        );
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update expense";
      setError(message);
      throw new Error(message);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this expense?")) return;

    setDeletingId(id);
    try {
      await deleteExpense(id);
      setApiOnline(true);
      await refreshAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete expense");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar active={activeNav} onNavigate={setActiveNav} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopBar
          activeNav={activeNav}
          totalExpenses={expenses.length}
          totalSpent={totalSpent}
          loading={loading || summaryLoading}
          apiOnline={apiOnline}
          userName={user?.name}
          onRefresh={refreshAll}
          onLogout={logout}
        />

        {error && (
          <div className="mx-6 mt-4 flex items-start justify-between gap-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-400">{error}</p>
            <button
              type="button"
              onClick={() => setError(null)}
              className="shrink-0 text-sm text-red-300 hover:text-red-200"
            >
              Dismiss
            </button>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {activeNav === "get-all-expenses" && (
            <GetAllExpensesView expenses={expenses} loading={loading} />
          )}

          {activeNav === "create-expense" && (
            <CreateExpenseView onSubmit={handleCreate} />
          )}

          {activeNav === "filter-expenses" && (
            <FilterExpensesView
              categories={categories}
              onFilter={filterExpensesByCategory}
            />
          )}

          {activeNav === "get-expense" && (
            <GetExpenseView onFetch={getExpense} />
          )}

          {activeNav === "update-expense" && (
            <UpdateExpenseView expenses={expenses} onUpdate={handleUpdate} />
          )}

          {activeNav === "delete-expense" && (
            <DeleteExpenseView
              expenses={expenses}
              loading={loading}
              deletingId={deletingId}
              onDelete={handleDelete}
            />
          )}

          {activeNav === "get-total-spending" && (
            <TotalSpendingView totalSpent={totalSpent} loading={summaryLoading} />
          )}

          {activeNav === "get-spending-by-category" && (
            <SpendingByCategoryView
              spendingByCategory={spendingByCategory}
              loading={summaryLoading}
            />
          )}
        </main>
      </div>
    </div>
  );
}
