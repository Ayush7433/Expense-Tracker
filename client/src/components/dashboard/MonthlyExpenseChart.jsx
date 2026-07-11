import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const getMonthLabel = (dateValue) => {
  const date = new Date(dateValue);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const MonthlyExpenseChart = ({ expenses = [] }) => {
  const monthlyMap = {};

  expenses.forEach((expense) => {
    if (!expense.expenseDate || !expense.createdAt) return;

    const key = getMonthLabel(expense.expenseDate || expense.createdAt);
    const amount = Number(expense.amount || 0);

    monthlyMap[key] = (monthlyMap[key] || 0) + amount;
  });

  const chartData = Object.entries(monthlyMap).map(([month, amount]) => ({
    month,
    amount,
  }));

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">
        Monthly Expense Trend
      </h3>

      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyExpenseChart;
