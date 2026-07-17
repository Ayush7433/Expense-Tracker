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
import { useSelector } from "react-redux";

const getMonthLabel = (dateValue) => {
  const date = new Date(dateValue);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const MonthlyExpenseChart = ({ expenses = [] }) => {
  const isDark = useSelector((state) => state.theme.mode === "dark");
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
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e5e7eb"} />
         <XAxis dataKey="month" tick={{ fill: isDark ? "#94a3b8" : "#64748b" }} stroke={isDark ? "#334155" : "#e5e7eb"} />
         <YAxis tick={{ fill: isDark ? "#94a3b8" : "#64748b" }} stroke={isDark ? "#334155" : "#e5e7eb"} />
         <Tooltip
           contentStyle={{
             backgroundColor: isDark ? "#1e293b" : "#ffffff",
             border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
             borderRadius: "12px",
             color: isDark ? "#f1f5f9" : "#111827",
           }}
         />
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
