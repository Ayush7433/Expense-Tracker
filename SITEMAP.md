# Expense Tracker — Application Sitemap

This sitemap documents the user-facing routes and the main navigation flow for the Expense Tracker React application. It is based on the current project routes and page components.

## 1. Public routes

| Route | Page | Purpose |
|---|---|---|
| `/` | Root redirect | Redirects authenticated users to Dashboard and unauthenticated users to Login. |
| `/login` | Login | Sign in to an existing account. |
| `/register` | Register | Create a new account. |
| `/forgot-password` | Forgot Password | Request a password-reset email. |
| `/reset-password/:token` | Reset Password | Set a new password using a valid reset token. |
| `*` | Not Found | Show a themed 404 page with a context-aware way back. |

## 2. Protected application routes

These routes require an authenticated user. The authenticated area uses the shared Dashboard layout (Navbar, Sidebar, and page content).

| Route | Page | Main content / actions |
|---|---|---|
| `/dashboard` | Dashboard | Expense summary statistics, category breakdown, spending trends, recent expenses, and budget health. |
| `/expenses` | Expenses | List expenses; search and filter by category/date; paginate; add, edit, and delete expenses; use AI Quick Add; export CSV/PDF. |
| `/budgets` | Budgets | View monthly budget overview; create or edit category and overall limits; switch between months; review budget progress. |
| `/profile` | Profile | View account information and upload/change the profile avatar. |

## 3. Navigation hierarchy

```text
Expense Tracker
├── Public
│   ├── Login (/login)
│   │   └── Forgot Password (/forgot-password)
│   ├── Register (/register)
│   ├── Reset Password (/reset-password/:token)
│   └── Not Found (*)
│
└── Authenticated application
    ├── Dashboard (/dashboard)
    ├── Expenses (/expenses)
    │   ├── Add Expense
    │   ├── AI Quick Add
    │   ├── Edit Expense
    │   ├── Delete Expense
    │   └── Export CSV / PDF
    ├── Budgets (/budgets)
    │   ├── Monthly Overview
    │   ├── Category Budget
    │   └── Overall Monthly Budget
    └── Profile (/profile)
        └── Avatar Upload
```

## 4. Important route and access behavior

- The root route (`/`) is a redirect entry point, not a standalone page.
- Dashboard, Expenses, Budgets, and Profile are protected by authentication.
- Login, Register, Forgot Password, and Reset Password are public authentication flows.
- The Not Found route handles unmatched URLs and provides a route back appropriate to the user's authentication state.
- Theme selection (light/dark) is a global preference and is available throughout the application; it is not a separate page.

## 5. Related backend API areas

The following are API route groups, not browser pages:

| API area | Responsibility |
|---|---|
| `/api/auth` | Registration, login, and password reset |
| `/api/expenses` | Expense CRUD, listing/filtering, dashboard statistics, and export |
| `/api/budgets` | Monthly budget management and budget status |
| `/api/users` | User profile and avatar operations |
| `/api/ai` | Natural-language expense parsing for Quick Add |

---
*Keep this document in sync with the route configuration in `client/src/App.jsx` whenever pages or paths change.*