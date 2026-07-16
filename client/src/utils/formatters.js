/**
 * Shared formatting utilities for dates and currency amounts.
 * Centralizes logic previously duplicated across RecentExpenses,
 * ExpenseTable, AccountInfo, and Dashboard.
 */

/**
 * Formats a date value into a human-readable string.
 *
 * @param {string|Date} dateValue - The date to format.
 * @param {Object} [options] - Intl.DateTimeFormat options override.
 * @returns {string} Formatted date string, or "--" if invalid.
 */
export const formatDate = (dateValue, options) => {
  if (!dateValue) return "--";

  const defaults = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options || defaults).format(
    new Date(dateValue),
  );
};

/**
 * Formats a long-form date (e.g. "July 16, 2026").
 * Used on the profile / account info page.
 *
 * @param {string|Date} dateValue
 * @returns {string}
 */
export const formatDateLong = (dateValue) => {
  if (!dateValue) return "Not available";

  return formatDate(dateValue, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Formats a number as Indian-locale currency (₹).
 *
 * @param {number|string} amount
 * @returns {string} e.g. "₹1,23,456.00"
 */
export const formatAmount = (amount) => {
  const value = Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `₹${value}`;
};

/**
 * Formats a number as Indian-locale currency without decimals.
 * Used on dashboard stat cards.
 *
 * @param {number|string} amount
 * @returns {string} e.g. "₹1,23,456"
 */
export const formatAmountShort = (amount) => {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
};
