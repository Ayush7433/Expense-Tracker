import { formatDate, formatAmount } from "../../utils/formatters";

const RecentExpenses = ({ expenses = [] }) => {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recent Expenses
        </h3>

        <span className="text-sm text-gray-500 dark:text-slate-400">
          {expenses.length} Expenses
        </span>
      </div>

      {/* Empty State */}
      {expenses.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-gray-200 dark:border-slate-700">
          <p className="text-gray-500 dark:text-slate-400">
            No recent expenses found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="flex flex-row items-center justify-between gap-3 rounded-2xl border border-gray-100 px-4 py-4 transition-all hover:border-blue-200 hover:bg-blue-50/40 dark:border-slate-800 dark:hover:border-blue-900 dark:hover:bg-blue-950/30 w-full overflow-hidden"
            >
              {/* Left — icon + title + category */}
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex shrink-0 h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950/50 text-lg sm:text-xl">
                  💸
                </div>

                <div className="min-w-0 flex-1">
                  <h4
                    className="truncate font-semibold text-gray-900 dark:text-white text-sm sm:text-base"
                    title={expense.title}
                  >
                    {expense.title}
                  </h4>

                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className="inline-flex max-w-[90px] sm:max-w-[140px] rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                      title={expense.category}
                    >
                      <span className="truncate">{expense.category}</span>
                    </span>

                    <span className="hidden sm:block truncate text-xs text-gray-500 dark:text-slate-400">
                      {formatDate(expense.expenseDate || expense.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right — amount always pinned to the right */}
              <div className="shrink-0 text-right pl-2">
                <p
                  className="text-sm sm:text-base font-bold text-gray-900 dark:text-white whitespace-nowrap"
                  title={formatAmount(expense.amount)}
                >
                  {formatAmount(expense.amount)}
                </p>
                <p className="sm:hidden text-xs text-gray-400 dark:text-slate-500 mt-0.5">
                  {formatDate(expense.expenseDate || expense.createdAt)}
                </p>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default RecentExpenses;
