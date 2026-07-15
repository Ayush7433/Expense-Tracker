import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import EmptyChart from "../common/EmptyChart";
import { motion } from "framer-motion";

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#A855F7",
  "#F59E0B",
  "#EF4444",
  "#64748B",
];

const ExpenseChart = ({ expenses = [] }) => {
  const categoryMap = {};

  expenses.forEach((expense) => {
    const category = expense.category || "other";
    const amount = Number(expense.amount || 0);

    categoryMap[category] = (categoryMap[category] || 0) + amount;
  });

  const chartData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
    >
      <h3 className="text-lg font-semibold text-gray-900">
        Expenses by category
      </h3>

      {expenses.length > 0 ? (
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={110}
                paddingAngle={4}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <EmptyChart
          title="No category data"
          description="Your category breakdown will appear here after you add expenses."
        />
      )}
    </motion.div>
  );
};

export default ExpenseChart;
