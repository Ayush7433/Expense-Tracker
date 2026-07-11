const formatDate = (dateValue) => {
  if (!dateValue) return "--";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));
};

const RecentExpenses = ({ expenses = [] }) => {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>

        <div className="mt-5 space-y-5">
          {expenses.length === 0 ? (
            <p className="text-sm text-gray-500">No recent expenses found.</p>
          ) : (
            expenses.map((expense) => (
              <div
                key={expense._id}
                className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-4"
              >
                <div>
                  <p className="font-medium text-gray-400">{expense.title}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {expense.category}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ₹{Number(expense.amount || 0).toLocaleString("en-IN")}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {formatDate(expense.expenseDate || expense.createdAt)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentExpenses;
