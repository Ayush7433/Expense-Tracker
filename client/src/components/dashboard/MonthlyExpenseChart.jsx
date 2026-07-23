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

const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Format "2026-07" → "Jan 2026" */
const formatMonthLabel = (month) => {
  const [year, mon] = month.split("-").map(Number);
  return `${MONTH_NAMES_SHORT[mon - 1]} ${year}`;
};

/** Format "2026-07-05" → "Jul 5" */
const formatDayLabel = (day) => {
  const [, mon, d] = day.split("-").map(Number);
  return `${MONTH_NAMES_SHORT[mon - 1]} ${d}`;
};

/**
 * MonthlyExpenseChart
 * Props:
 *  - data:  array of { month: "YYYY-MM", total } (monthly)
 *          OR { day: "YYYY-MM-DD", total } (daily)
 *  - mode: "monthly" | "daily"
 */
const MonthlyExpenseChart = ({ data = [], mode = "monthly" }) => {
  const isDark = useSelector((state) => state.theme.mode === "dark");

  const chartData =
    mode === "daily"
      ? data.map((item) => ({
        label: formatDayLabel(item.day),
        amount: item.total,
      }))
      : data.map((item) => ({
        label: formatMonthLabel(item.month),
        amount: item.total,
      }));

  const title =
    mode === "daily" ? "Daily Expense Trend" : "Monthly Expense Trend";

  return (
    <ChartCard
      title={title}
      isEmpty={chartData.length === 0}
      emptyTitle="Nothing to show"
      emptyDescription={
        mode === "daily"
          ? "No expenses recorded for this month."
          : "Monthly spending trends will appear here."
      }
      delay={0.15}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#334155" : "#e5e7eb"}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 12 }}
            stroke={isDark ? "#334155" : "#e5e7eb"}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 12 }}
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
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default MonthlyExpenseChart;

