export type NavItem =
  | "get-all-expenses"
  | "create-expense"
  | "filter-expenses"
  | "get-expense"
  | "update-expense"
  | "delete-expense"
  | "get-total-spending"
  | "get-spending-by-category";

export const NAV_ITEMS: {
  id: NavItem;
  method: "GET" | "POST" | "PUT" | "DELETE";
  label: string;
  endpoint: string;
  description: string;
}[] = [
  {
    id: "get-all-expenses",
    method: "GET",
    label: "Get All Expenses",
    endpoint: "/expenses",
    description: "View every expense in your account",
  },
  {
    id: "create-expense",
    method: "POST",
    label: "Create Expense",
    endpoint: "/expenses",
    description: "Add a new expense record",
  },
  {
    id: "filter-expenses",
    method: "GET",
    label: "Filter Expenses",
    endpoint: "/expenses/filter",
    description: "Find expenses by category",
  },
  {
    id: "get-expense",
    method: "GET",
    label: "Get Expense",
    endpoint: "/expenses/{expense_id}",
    description: "Fetch a single expense by ID",
  },
  {
    id: "update-expense",
    method: "PUT",
    label: "Update Expense",
    endpoint: "/expenses/{expense_id}",
    description: "Edit an existing expense",
  },
  {
    id: "delete-expense",
    method: "DELETE",
    label: "Delete Expense",
    endpoint: "/expenses/{expense_id}",
    description: "Remove an expense permanently",
  },
  {
    id: "get-total-spending",
    method: "GET",
    label: "Get Total Spending",
    endpoint: "/total-spending",
    description: "See your overall spending total",
  },
  {
    id: "get-spending-by-category",
    method: "GET",
    label: "Get Spending By Category",
    endpoint: "/spending-by-category",
    description: "Breakdown of spending per category",
  },
];

export function getNavMeta(id: NavItem) {
  return NAV_ITEMS.find((item) => item.id === id)!;
}
