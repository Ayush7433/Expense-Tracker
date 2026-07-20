import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import ChartCard from "../common/ChartCard";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatMonthLabel = (month) => {
  const [year, mon] = month.split("-").map(Number);
  return `${MONTH_NAMES[mon - 1]} ${year}`;
};

const MonthlyExpenseChart = ({ data = [] }) => {
  const isDark = useSelector((state) => state.theme.mode === "dark");

  const chartData = data.map((item) => ({
    month: formatMonthLabel(item.month),
    amount: item.total,
  }));

  return (
    <ChartCard
      title="Monthly Expense Trend"
      isEmpty={chartData.length === 0}
      emptyTitle="Nothing to show"
      emptyDescription="Monthly spending trends will appear here."
      delay={0.15}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#334155" : "#e5e7eb"}
          />
          <XAxis
            dataKey="month"
            tick={{ fill: isDark ? "#94a3b8" : "#64748b" }}
            stroke={isDark ? "#334155" : "#e5e7eb"}
          />
          <YAxis
            tick={{ fill: isDark ? "#94a3b8" : "#64748b" }}
            stroke={isDark ? "#334155" : "#e5e7eb"}
          />
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
