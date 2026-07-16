import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "../common/ChartCard";

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
    const date = expense.expenseDate || expense.createdAt;

    if (!date) return;

    const key = getMonthLabel(date);
    const amount = Number(expense.amount || 0);

    monthlyMap[key] = (monthlyMap[key] || 0) + amount;
  });

  const chartData = Object.entries(monthlyMap).map(([month, amount]) => ({
    month,
    amount,
  }));

  return (
    <ChartCard
      title="Monthly Expense Trend"
      isEmpty={expenses.length === 0}
      emptyTitle="Nothing to show"
      emptyDescription="Monthly spending trends will appear here."
      delay={0.15}
    >
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
    </ChartCard>
  );
};

export default MonthlyExpenseChart;
