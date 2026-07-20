import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";
import ChartCard from "../common/ChartCard";

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#A855F7",
  "#F59E0B",
  "#EF4444",
  "#64748B",
];

const ExpenseChart = ({ data = [] }) => {
  const isDark = useSelector((state) => state.theme.mode === "dark");

  const chartData = data.map((item) => ({
    name: item.category,
    value: item.total,
  }));

  return (
    <ChartCard
      title="Expenses by category"
      isEmpty={chartData.length === 0}
      emptyTitle="No category data"
      emptyDescription="Your category breakdown will appear here after you add expenses."
    >
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
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1e293b" : "#ffffff",
              border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
              borderRadius: "12px",
              color: isDark ? "#f1f5f9" : "#111827",
            }}
          />
          <Legend wrapperStyle={{ color: isDark ? "#cbd5e1" : "#374151" }} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default ExpenseChart;
