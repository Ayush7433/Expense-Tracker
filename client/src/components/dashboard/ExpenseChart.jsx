import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

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
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3>Expenses by category</h3>

      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              name="name"
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
    </div>
  );
};

export default ExpenseChart;
