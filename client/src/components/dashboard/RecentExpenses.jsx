import { formatDate, formatAmount } from "../../utils/formatters";

const RecentExpenses = ({ expenses = [] }) => {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Recent Expenses
        </h3>

        <span className="text-sm text-gray-500">
          {expenses.length} Expenses
        </span>
      </div>

      {/* Empty State */}
      {expenses.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500">
            No recent expenses found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-gray-100 px-4 py-4 sm:px-5 transition-all hover:border-blue-200 hover:bg-blue-50/40 w-full overflow-hidden"
            >
              {/* Left */}
              <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                <div className="flex shrink-0 h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-blue-100 text-lg sm:text-xl">
                  💸
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-semibold text-gray-900" title={expense.title}>
                    {expense.title}
                  </h4>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex max-w-[80px] sm:max-w-[120px] rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700" title={expense.category}>
                      <span className="truncate">{expense.category}</span>
                    </span>

                    <span className="truncate text-xs sm:text-sm text-gray-500 hidden sm:block">
                      {formatDate(
                        expense.expenseDate || expense.createdAt
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="mt-2 sm:mt-0 shrink-0 text-right max-w-[80px] sm:max-w-[90px] sm:ml-2 md:max-w-[150px] lg:max-w-[200px]">
                <p className="truncate text-base sm:text-lg font-bold text-gray-900" title={formatAmount(expense.amount)}>
                  {formatAmount(expense.amount)}
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