# Expense Tracker Backend — API Documentation

Brief reference for frontend integration.

---

## What's New — Authentication

The following **authentication features** were recently added to the backend:

| Feature | Details |
|---------|---------|
| **POST `/signup`** | Register a new user (name, email, password) |
| **POST `/login`** | Log in and receive a JWT `access_token` |
| **GET `/profile`** | Protected route — requires `Authorization: Bearer <token>` |
| **Password security** | Passwords hashed with **bcrypt** before storage |
| **JWT tokens** | Issued on login, verified by auth middleware |
| **Custom `/docs` UI** | Authentication button, login modal, lock icons turn black after login |
| **Postman collection** | `postman/Expense_Tracker_Auth.postman_collection.json` |
| **Automated tests** | `tests/test_auth.py` — 9 auth test cases |

**Quick start for auth**

1. `POST /signup` — create an account  
2. `POST /login` — get `access_token`  
3. `GET /profile` with header `Authorization: Bearer <access_token>`

Or open `http://localhost:8000/docs` → click **Authentication** → log in with your email and password.

---

## Table of Contents

**New — Authentication**
- [What's New — Authentication](#whats-new--authentication)
- [Authentication Overview](#2-authentication)
- [Authentication Endpoints](#3-authentication-endpoints) — signup, login, profile

**Expense API (existing)**
- [Base URL](#1-base-url)
- [Expense Endpoints](#4-expense-endpoints)
- [Quick Reference Table](#5-quick-reference-table)
- [Frontend Examples](#6-frontend-examples-fetch)

**Other**
- [CORS](#7-cors)
- [Rate Limiting](#8-rate-limiting)
- [Error Format](#12-error-format)
- [Testing](#13-testing)

---

## 1. Base URL

```
http://localhost:8000
```

**Start the server**

```powershell
.venv\Scripts\python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

> **Note:** If `uv run uvicorn main:app --reload` fails with a path error (common when the project folder contains double spaces), use the `.venv\Scripts\python` command above.

**General notes**
- Use `Content-Type: application/json` for `POST` and `PUT` requests
- Interactive docs: `http://localhost:8000/docs`
- OpenAPI schema: `http://localhost:8000/openapi.json`
- Default Redoc URL is disabled; use `/docs` for the custom Swagger UI

---

## 2. Authentication *(new)*

The API now supports **JWT (JSON Web Token)** authentication. Passwords are hashed with **bcrypt** before storage.

### How it works

1. Register a user with `POST /signup`
2. Log in with `POST /login` to receive an `access_token`
3. Send the token on protected requests:

```
Authorization: Bearer <access_token>
```

### Protected endpoints

| Endpoint | Auth required |
|----------|---------------|
| `/profile` | Yes |
| All other endpoints | No |

> Expense endpoints do **not** require a token at the API level. Lock icons in `/docs` are for testing convenience only.

### Interactive docs (custom Swagger UI)

The default FastAPI docs are replaced with a custom page at `http://localhost:8000/docs`.

| Feature | Description |
|---------|-------------|
| **Authentication button** | Top-right button opens a login modal |
| **Lock icons** | Shown on the **left** of each endpoint row |
| **Before login** | Lock icons are grey |
| **After login** | Lock icons turn **black** and the JWT is saved in the browser |
| **Username field** | Use your registered **email** address |

**Test credentials** (if already registered):

| Field | Value |
|-------|--------|
| Username | `jane@example.com` |
| Password | `secret123` |

**Custom docs files**

| File | Purpose |
|------|---------|
| `static/docs.html` | Custom Swagger UI page |
| `static/docs-auth.css` | Lock icons, modal, and button styles |
| `static/docs-auth.js` | Login modal logic (calls `POST /login`) |
| `docs_ui.py` | Wires custom docs and OpenAPI Bearer scheme |

### Postman collection

Import `postman/Expense_Tracker_Auth.postman_collection.json`.

| Folder | Auth | Description |
|--------|------|-------------|
| **Authentication** | None | Signup and login requests |
| **Profile** | Bearer `{{accessToken}}` | Lock icon on folder; token set once at folder level |

**Steps**
1. Run **3. Login - Correct Credentials** — saves `accessToken` automatically
2. Run profile tests **6 → 9** in the Profile folder

See `AUTH_TESTING.md` for all 9 auth test cases with expected responses.

---

## 3. Authentication Endpoints *(new)*

### 1. Signup

| Item | Value |
|------|-------|
| **Method** | `POST` |
| **Endpoint** | `/signup` |
| **Auth required** | No |

**Request body**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | User's full name (min 1 character) |
| `email` | string | Yes | Valid email address |
| `password` | string | Yes | Password (min 6 characters) |

**Success response — `201 Created`**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

**Error responses**

| Status | When | Response |
|--------|------|----------|
| `400 Bad Request` | Email already registered | `{"detail": "Email already registered"}` |
| `400 Bad Request` | Validation error | `{"detail": "<field>: <message>"}` |

---

### 2. Login

| Item | Value |
|------|-------|
| **Method** | `POST` |
| **Endpoint** | `/login` |
| **Auth required** | No |

**Request body**

```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Registered email |
| `password` | string | Yes | Account password |

**Success response — `200 OK`**

```json
{
  "message": "Login successful",
  "access_token": "<jwt>",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

**Error responses**

| Status | When | Response |
|--------|------|----------|
| `401 Unauthorized` | Wrong password | `{"detail": "Invalid password"}` |
| `404 Not Found` | Email not registered | `{"detail": "User not found"}` |
| `400 Bad Request` | Validation error | `{"detail": "<field>: <message>"}` |

---

### 3. Get Profile

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **Endpoint** | `/profile` |
| **Auth required** | Yes |

**Headers**

```
Authorization: Bearer <access_token>
```

**Request body** | None

**Success response — `200 OK`**

```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

**Error responses**

| Status | When | Response |
|--------|------|----------|
| `401 Unauthorized` | No token provided | `{"detail": "Authorization token required"}` |
| `401 Unauthorized` | Invalid token | `{"detail": "Invalid token"}` |
| `401 Unauthorized` | Expired token | `{"detail": "Token has expired"}` |
| `404 Not Found` | User no longer exists | `{"detail": "User not found"}` |

---

## 4. Expense Endpoints

### 4. Create Expense

| Item | Value |
|------|-------|
| **Method** | `POST` |
| **Endpoint** | `/expenses` |
| **Auth required** | No |
| **Rate limit** | 5 creates per client IP per day |

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
| `400 Bad Request` | Validation error |
| `429 Too Many Requests` | More than 5 expense creates in one day from the same IP |

**429 response body**

```json
{
  "detail": "Daily expense limit reached (5 per day)"
}
```

---

### 5. Get All Expenses

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **Endpoint** | `/expenses` |
| **Auth required** | No |

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

---

### 6. Get Single Expense

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **Endpoint** | `/expenses/{expense_id}` |
| **Auth required** | No |

**Path parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `expense_id` | integer | Yes | ID of the expense |

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
| `400 Bad Request` | Invalid `expense_id` |

**404 response body**

```json
{
  "detail": "Expense not found"
}
```

---

### 7. Update Expense

| Item | Value |
|------|-------|
| **Method** | `PUT` |
| **Endpoint** | `/expenses/{expense_id}` |
| **Auth required** | No |

**Path parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `expense_id` | integer | Yes | ID of the expense to update |

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
| `400 Bad Request` | Invalid path ID or request body |

---

### 8. Delete Expense

| Item | Value |
|------|-------|
| **Method** | `DELETE` |
| **Endpoint** | `/expenses/{expense_id}` |
| **Auth required** | No |

**Path parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `expense_id` | integer | Yes | ID of the expense to delete |

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
| `400 Bad Request` | Invalid `expense_id` |

---

### 9. Filter Expenses by Category

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **Endpoint** | `/expenses/filter` |
| **Auth required** | No |

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
| `400 Bad Request` | `category` query parameter is missing |

---

### 10. Total Spending

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **Endpoint** | `/total-spending` |
| **Auth required** | No |

**Success response — `200 OK`**

```json
{
  "totalSpent": 2500
}
```

---

### 11. Spending by Category

| Item | Value |
|------|-------|
| **Method** | `GET` |
| **Endpoint** | `/spending-by-category` |
| **Auth required** | No |

**Success response — `200 OK`**

```json
{
  "Food": 2000,
  "Transport": 500,
  "Entertainment": 1200
}
```

---

## 5. Quick Reference Table

| # | Method | Endpoint | Auth | Status Codes |
|---|--------|----------|------|--------------|
| 1 | POST | `/signup` | No | `201`, `400` |
| 2 | POST | `/login` | No | `200`, `400`, `401`, `404` |
| 3 | GET | `/profile` | Yes | `200`, `401`, `404` |
| 4 | POST | `/expenses` | No | `200`, `400`, `429` |
| 5 | GET | `/expenses` | No | `200` |
| 6 | GET | `/expenses/{expense_id}` | No | `200`, `404`, `400` |
| 7 | PUT | `/expenses/{expense_id}` | No | `200`, `404`, `400` |
| 8 | DELETE | `/expenses/{expense_id}` | No | `200`, `404`, `400` |
| 9 | GET | `/expenses/filter?category={category}` | No | `200`, `400` |
| 10 | GET | `/total-spending` | No | `200` |
| 11 | GET | `/spending-by-category` | No | `200` |

---

## 6. Frontend Examples (fetch)

```javascript
const BASE_URL = "http://localhost:8000";

// Signup
await fetch(`${BASE_URL}/signup`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Jane Doe",
    email: "jane@example.com",
    password: "secret123",
  }),
});

// Login — save the token
const loginResponse = await fetch(`${BASE_URL}/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "jane@example.com",
    password: "secret123",
  }),
});
const { access_token } = await loginResponse.json();

// Get profile (protected)
const profileResponse = await fetch(`${BASE_URL}/profile`, {
  headers: { Authorization: `Bearer ${access_token}` },
});
const profile = await profileResponse.json();

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

// Update expense
await fetch(`${BASE_URL}/expenses/1`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ amount: 900 }),
});

// Delete expense
await fetch(`${BASE_URL}/expenses/1`, { method: "DELETE" });

// Filter by category
const filtered = await fetch(`${BASE_URL}/expenses/filter?category=Food`);
const foodExpenses = await filtered.json();

// Total spending
const total = await fetch(`${BASE_URL}/total-spending`);
const { totalSpent } = await total.json();

// Spending by category
const byCategory = await fetch(`${BASE_URL}/spending-by-category`);
const categoryTotals = await byCategory.json();
```

---

## 7. CORS

CORS is enabled for the frontend at:

```
http://localhost:3000
```

| Setting | Value |
|---------|-------|
| **Allowed origin** | `http://localhost:3000` |
| **Allowed methods** | `GET`, `POST`, `PUT`, `DELETE` |
| **Allowed headers** | `Content-Type`, `Authorization` |

Requests from other origins receive no CORS headers, so browser clients on other ports are blocked. Update `ALLOWED_ORIGIN` in `middleware.py` if your frontend uses a different URL.

---

## 8. Rate Limiting

`POST /expenses` is limited to **5 creates per client IP per day**.

| Detail | Value |
|--------|-------|
| **Limit** | 5 per IP per calendar day |
| **Storage** | `rate_limits.json` (persists across server restarts) |
| **Status code** | `429 Too Many Requests` |

```json
{
  "detail": "Daily expense limit reached (5 per day)"
}
```

Failed creates (validation errors) do not count against the limit.

---

## 9. Middleware & Logging

Middleware runs in this order (outermost first):

| Middleware | File | Purpose |
|------------|------|---------|
| `JWTAuthMiddleware` | `auth_middleware.py` | Verifies JWT on `/profile` |
| `ExpenseRateLimitMiddleware` | `middleware.py` | Limits `POST /expenses` to 5/day per IP |
| `RequestLoggingMiddleware` | `middleware.py` | Logs method, path, params, request/response bodies |
| `FrontendCORSMiddleware` | `middleware.py` | CORS for `http://localhost:3000` |

**Request logs** appear in the server console:

```
GET /expenses | params=None | request_body=None | response_body=[...] | status=200
```

---

## 10. JWT Configuration

| Setting | Default | Environment variable |
|---------|---------|---------------------|
| Secret key | `dev-expense-tracker-secret-change-in-production` | `JWT_SECRET` |
| Algorithm | `HS256` | — |
| Token expiry | 60 minutes | `JWT_EXPIRE_MINUTES` |

Set `JWT_SECRET` in production to a strong random value.

**Token payload**

```json
{
  "sub": "1",
  "email": "jane@example.com",
  "exp": 1234567890
}
```

---

## 11. Data Storage

Data is stored in local JSON files (gitignored):

| File | Contents |
|------|----------|
| `users.json` | Registered users (passwords stored as bcrypt hashes) |
| `expenses.json` | Expense records |
| `rate_limits.json` | Daily expense create counts per client IP |

---

## 12. Error Format

All errors return JSON in this shape:

```json
{
  "detail": "Error message here"
}
```

| Status | Meaning |
|--------|---------|
| `200` | Success |
| `201` | Resource created |
| `400` | Bad request / validation error |
| `401` | Unauthorized (missing or invalid token) |
| `404` | Resource not found |
| `429` | Rate limit exceeded |
| `500` | Internal server error |

---

## 13. Testing

### Authentication tests *(new)*

```powershell
.venv\Scripts\python -m pytest tests/test_auth.py -v
```

Covers all 9 auth scenarios: signup, login, and profile with valid/invalid/expired/missing tokens.

### Postman *(new auth collection)*

1. Import `postman/Expense_Tracker_Auth.postman_collection.json`
2. Confirm `baseUrl` is `http://127.0.0.1:8000`
3. Run **Authentication → 3. Login** to save the token
4. Run **Profile → 6–9** to test protected access

### Interactive docs *(new custom UI)*

1. Open `http://localhost:8000/docs`
2. Click **Authentication** (top right)
3. Log in with `jane@example.com` / `secret123`
4. Lock icons turn black — test **GET /profile**

### Related auth files

| File | Description |
|------|-------------|
| `AUTH_TESTING.md` | Full auth test case reference |
| `postman/Expense_Tracker_Auth.postman_collection.json` | Postman collection |
| `tests/test_auth.py` | Automated test suite |
| `auth.py` | bcrypt hashing + JWT create/verify |
| `auth_middleware.py` | Protects `/profile` |
| `user_store.py` | User storage |
