/**
 * Shared category options used across the application.
 * Previously duplicated in ExpenseForm.jsx and FilterBar.jsx.
 */

export const CATEGORY_OPTIONS = [
  { label: "Food", value: "food" },
  { label: "Travel", value: "travel" },
  { label: "Shopping", value: "shopping" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Bills", value: "bills" },
  { label: "Other", value: "other" },
];

/**
 * Same list but with an "All Categories" option prepended.
 * Used by filter dropdowns.
 */
export const CATEGORY_FILTER_OPTIONS = [
  { label: "All Categories", value: "" },
  ...CATEGORY_OPTIONS,
];
