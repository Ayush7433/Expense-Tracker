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
              className="flex items-center justify-between rounded-2xl border border-gray-100 px-5 py-4 transition-all hover:border-blue-200 hover:bg-blue-50/40"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl">
                  💸
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">
                    {expense.title}
                  </h4>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      {expense.category}
                    </span>

                    <span className="text-sm text-gray-500">
                      {formatDate(
                        expense.expenseDate || expense.createdAt
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
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