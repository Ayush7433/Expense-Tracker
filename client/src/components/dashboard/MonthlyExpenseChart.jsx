import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import EmptyChart from "../common/EmptyChart";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
        delay: 0.15,
      }}
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
    >
      <h3 className="text-lg font-semibold text-gray-900">
        Monthly Expense Trend
      </h3>

      {expenses.length > 0 ? (
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
      ) : (
        <EmptyChart
          title="Nothing to show"
          description="Monthly spending trends will appear here."
        />
      )}
    </motion.div>
  );
};

export default MonthlyExpenseChart;
