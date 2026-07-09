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

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  user: User;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  token_type: string;
  user: User;
}

export interface ProfileResponse {
  message: string;
  user: User;
}
