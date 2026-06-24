import type {
  ApiError,
  CreateExpensePayload,
  Expense,
  FilteredExpense,
  MessageResponse,
  SpendingByCategory,
  TotalSpending,
  UpdateExpensePayload,
} from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

const BACKEND_HINT =
  "Make sure the backend is running: uv run python main.py (http://localhost:8000)";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
  } catch {
    throw new Error(`Failed to fetch. ${BACKEND_HINT}`);
  }

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({}));
    const message =
      error.detail ??
      (response.status >= 500
        ? `Server error (${response.status}). ${BACKEND_HINT}`
        : `Request failed (${response.status})`);
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export function getExpenses(): Promise<Expense[]> {
  return request<Expense[]>("/expenses");
}

export function getExpense(id: number): Promise<Expense> {
  return request<Expense>(`/expenses/${id}`);
}

export function createExpense(
  payload: CreateExpensePayload
): Promise<MessageResponse> {
  return request<MessageResponse>("/expenses", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateExpense(
  id: number,
  payload: UpdateExpensePayload
): Promise<MessageResponse> {
  return request<MessageResponse>(`/expenses/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteExpense(id: number): Promise<MessageResponse> {
  return request<MessageResponse>(`/expenses/${id}`, {
    method: "DELETE",
  });
}

export function filterExpensesByCategory(
  category: string
): Promise<FilteredExpense[]> {
  return request<FilteredExpense[]>(
    `/expenses/filter?category=${encodeURIComponent(category)}`
  );
}

export function getTotalSpending(): Promise<TotalSpending> {
  return request<TotalSpending>("/total-spending");
}

export function getSpendingByCategory(): Promise<SpendingByCategory> {
  return request<SpendingByCategory>("/spending-by-category");
}
