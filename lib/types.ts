export interface Expense {
  id: number;
  title: string;
  category: string;
  amount: number;
}

export interface FilteredExpense {
  title: string;
  amount: number;
}

export interface CreateExpensePayload {
  title: string;
  category: string;
  amount: number;
  date: string;
}

export interface UpdateExpensePayload {
  title?: string;
  category?: string;
  amount?: number;
  date?: string;
}

export interface TotalSpending {
  totalSpent: number;
}

export type SpendingByCategory = Record<string, number>;

export interface MessageResponse {
  message: string;
}

export interface ApiError {
  detail?: string;
}
