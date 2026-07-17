import { RefreshCw } from "lucide-react";

/**
 * Reusable error banner with optional retry button.
 * Extracted from the inline error block in Expenses.jsx.
 *
 * @param {string}   message  - The error message to display.
 * @param {Function} [onRetry] - Optional retry handler. If provided, a retry button is shown.
 */
const ErrorBanner = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 dark:border-red-900 dark:bg-red-950/50 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium text-red-700 dark:text-red-400">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorBanner;
