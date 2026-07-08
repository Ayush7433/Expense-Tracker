import { PencilLine, Trash2 } from "lucide-react";
import Loader from "../common/Loader";

const formatDate = (dateValue) => {
  if (!dateValue) return "--";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));
};

const formatAmount = (amount) => {
  const value = Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `₹${value}`;
};

const ExpenseTable = ({
  expenses = [],
  loading = false,
  pagination = {},
  onEdit,
}) => {
  if (loading) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white shadow-sm">
        <Loader />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Expenses</h2>
          <p className="mt-1 text-sm text-gray-500">
            Showing {pagination.count || expenses.length} of{" "}
            {pagination.totalExpenses || 0} expenses
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50/80">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-16 text-center">
                  <div className="mx-auto max-w-md">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <PencilLine size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      No expenses found
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Your expense list is empty right now. Once expenses are
                      added, they will appear here.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense._id} className="hover:bg-gray-50/60">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {expense.title}
                      </p>
                      {expense.description ? (
                        <p className="mt-1 text-sm text-gray-500">
                          {expense.description}
                        </p>
                      ) : null}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {formatAmount(expense.amount)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                      {expense.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(expense.expenseDate || expense.createdAt)}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit?.(expense)}
                        title="Edit expense"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50"
                      >
                        <PencilLine size={16} />
                      </button>
                      <button
                        type="button"
                        disabled
                        title="Delete coming soon"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 transition"
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