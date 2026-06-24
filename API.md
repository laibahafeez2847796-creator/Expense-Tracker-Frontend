# Expense Tracker Backend — API Documentation

Brief reference for frontend integration.

---

## 1. Base URL

```
http://localhost:8000
```

**Notes**
- Start the server with `uv run python main.py` or `uv run uvicorn main:app --reload`
- Use `Content-Type: application/json` for `POST` and `PUT` requests
- Interactive docs: `http://localhost:8000/docs`

---

## 2–6. Endpoints

### 1. Create Expense

| Item | Value |
|------|-------|
| **Method** | `POST` |
| **Endpoint** | `/expenses` |
| **Path parameters** | None |
| **Query parameters** | None |

**Request body**

```json
{
  "title": "Burger",
  "category": "Food",
  "amount": 800,
  "date": "2026-06-24"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Expense title |
| `category` | string | Yes | Expense category |
| `amount` | number | Yes | Expense amount |
| `date` | string | Yes | Date in `YYYY-MM-DD` format |

**Success response — `200 OK`**

```json
{
  "message": "Expense created successfully"
}
```

**Error responses**

| Status | When |
|--------|------|
| `422 Unprocessable Entity` | Missing or invalid request body fields |

---

### 2. Get All Expenses

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **Endpoint** | `/expenses` |
| **Path parameters** | None |
| **Query parameters** | None |
| **Request body** | None |

**Success response — `200 OK`**

```json
[
  {
    "id": 1,
    "title": "Burger",
    "category": "Food",
    "amount": 800
  },
  {
    "id": 2,
    "title": "Uber",
    "category": "Transport",
    "amount": 500
  }
]
```

**Error responses**

| Status | When |
|--------|------|
| None | Always returns `200` (empty array if no expenses) |

---

### 3. Get Single Expense

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **Endpoint** | `/expenses/{expense_id}` |
| **Request body** | None |

**Path parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `expense_id` | integer | Yes | ID of the expense |

**Query parameters** | None

**Success response — `200 OK`**

```json
{
  "id": 1,
  "title": "Burger",
  "category": "Food",
  "amount": 800
}
```

**Error responses**

| Status | When |
|--------|------|
| `404 Not Found` | Expense with given ID does not exist |
| `422 Unprocessable Entity` | Invalid `expense_id` (not an integer) |

**404 response body**

```json
{
  "detail": "Expense not found"
}
```

---

### 4. Update Expense

| Item | Value |
|------|-------|
| **Method** | `PUT` |
| **Endpoint** | `/expenses/{expense_id}` |

**Path parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `expense_id` | integer | Yes | ID of the expense to update |

**Query parameters** | None

**Request body** (all fields optional — send only fields you want to change)

```json
{
  "title": "Updated title",
  "category": "Food",
  "amount": 900,
  "date": "2026-06-25"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | No | New title |
| `category` | string | No | New category |
| `amount` | number | No | New amount |
| `date` | string | No | New date in `YYYY-MM-DD` format |

**Success response — `200 OK`**

```json
{
  "message": "Expense updated successfully"
}
```

**Error responses**

| Status | When |
|--------|------|
| `404 Not Found` | Expense with given ID does not exist |
| `422 Unprocessable Entity` | Invalid path ID or invalid request body |

---

### 5. Delete Expense

| Item | Value |
|------|-------|
| **Method** | `DELETE` |
| **Endpoint** | `/expenses/{expense_id}` |
| **Request body** | None |

**Path parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `expense_id` | integer | Yes | ID of the expense to delete |

**Query parameters** | None

**Success response — `200 OK`**

```json
{
  "message": "Expense deleted successfully"
}
```

**Error responses**

| Status | When |
|--------|------|
| `404 Not Found` | Expense with given ID does not exist |
| `422 Unprocessable Entity` | Invalid `expense_id` |

---

### 6. Filter Expenses by Category

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **Endpoint** | `/expenses/filter` |
| **Path parameters** | None |
| **Request body** | None |

**Query parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `category` | string | Yes | Category to filter by (exact match) |

**Example request**

```
GET /expenses/filter?category=Food
```

**Success response — `200 OK`**

```json
[
  {
    "title": "Burger",
    "amount": 800
  },
  {
    "title": "Pizza",
    "amount": 1200
  }
]
```

**Error responses**

| Status | When |
|--------|------|
| `422 Unprocessable Entity` | `category` query parameter is missing |

---

### 7. Total Spending

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **Endpoint** | `/total-spending` |
| **Path parameters** | None |
| **Query parameters** | None |
| **Request body** | None |

**Success response — `200 OK`**

```json
{
  "totalSpent": 2500
}
```

**Error responses**

| Status | When |
|--------|------|
| None | Always returns `200` |

---

### 8. Spending by Category

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **Endpoint** | `/spending-by-category` |
| **Path parameters** | None |
| **Query parameters** | None |
| **Request body** | None |

**Success response — `200 OK`**

```json
{
  "Food": 2000,
  "Transport": 500,
  "Entertainment": 1200
}
```

**Error responses**

| Status | When |
|--------|------|
| None | Always returns `200` (empty object `{}` if no expenses) |

---

## Quick Reference Table

| # | Method | Endpoint | Status Codes |
|---|--------|----------|--------------|
| 1 | POST | `/expenses` | `200`, `422` |
| 2 | GET | `/expenses` | `200` |
| 3 | GET | `/expenses/{expense_id}` | `200`, `404`, `422` |
| 4 | PUT | `/expenses/{expense_id}` | `200`, `404`, `422` |
| 5 | DELETE | `/expenses/{expense_id}` | `200`, `404`, `422` |
| 6 | GET | `/expenses/filter?category={category}` | `200`, `422` |
| 7 | GET | `/total-spending` | `200` |
| 8 | GET | `/spending-by-category` | `200` |

---

## Frontend Example (fetch)

```javascript
const BASE_URL = "http://localhost:8000";

// Create expense
await fetch(`${BASE_URL}/expenses`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Burger",
    category: "Food",
    amount: 800,
    date: "2026-06-24",
  }),
});

// Get all expenses
const response = await fetch(`${BASE_URL}/expenses`);
const expenses = await response.json();

// Filter by category
const filtered = await fetch(`${BASE_URL}/expenses/filter?category=Food`);
const foodExpenses = await filtered.json();
```

---

## CORS Note

If your frontend runs on a different port (e.g. `http://localhost:5173`), you may need CORS enabled on the backend. Ask to add CORS middleware if browser requests are blocked.
