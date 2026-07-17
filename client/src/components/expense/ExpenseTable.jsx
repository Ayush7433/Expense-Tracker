import { PencilLine, Trash2 } from "lucide-react";
import Loader from "../common/Loader";
import { formatDate, formatAmount } from "../../utils/formatters";

const ExpenseTable = ({
  expenses = [],
  loading = false,
  pagination = {},
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Expenses
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
            Showing {pagination.count || expenses.length} of{" "}
            {pagination.totalExpenses || 0} expenses
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100 dark:divide-slate-800">
          <thead className="bg-gray-50/80 dark:bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-slate-300">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-slate-300">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-slate-300">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-slate-300">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-slate-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-16 text-center">
                  <div className="mx-auto max-w-md">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                      <PencilLine size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      No expenses found
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                      Your expense list is empty right now. Once expenses are
                      added, they will appear here.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr
                  key={expense._id}
                  className="hover:bg-gray-50/60 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4">
                    <div className="max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-md">
                      <p
                        className="truncate font-medium text-gray-900 dark:text-white"
                        title={expense.title}
                      >
                        {expense.title}
                      </p>
                      {expense.description ? (
                        <p
                          className="mt-1 truncate text-sm text-gray-500 dark:text-slate-400"
                          title={expense.description}
                        >
                          {expense.description}
                        </p>
                      ) : null}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatAmount(expense.amount)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className="inline-flex max-w-[150px] rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                      title={expense.category}
                    >
                      <span className="truncate">
                        {expense.category[0].toUpperCase() +
                          expense.category.slice(1)}
                      </span>
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-400">
                    {formatDate(expense.expenseDate || expense.createdAt)}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit?.(expense)}
                        title="Edit expense"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 hover:text-gray-700 bg-white text-gray-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300 transition cursor-pointer"
                      >
                        <PencilLine size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(expense)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 hover:bg-red-50 hover:text-red-600 bg-white text-gray-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-red-950/50 dark:hover:text-red-400 transition cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;
