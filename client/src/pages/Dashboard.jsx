import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../redux/slices/dashboardSlice";
import Loader from "../components/common/Loader";
import StatsCard from "../components/dashboard/StatsCard";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
} from "lucide-react";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import MonthlyExpenseChart from "../components/dashboard/MonthlyExpenseChart";
import RecentExpenses from "../components/dashboard/RecentExpenses";

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (dashboard.loading && dashboard.recentExpenses.length === 0) {
    return <Loader message="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        <p className="mt-2 text-sm text-gray-500">
          Overview of your expenses and financial activity
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          title="Total Expenses"
          value={dashboard.totalExpenses}
          icon={<Calculator size={22} />}
          color="blue"
        />

        <StatsCard
          title="Total Amount"
          value={`₹${Number(dashboard.totalAmount || 0).toLocaleString("en-IN")}`}
          icon={<DollarSign size={22} />}
          color="green"
        />

        <StatsCard
          title="Average Expense"
          value={`₹${Number(dashboard.averageExpenses || 0).toFixed(2)}`}
          icon={<TrendingUp size={22} />}
          color="purple"
        />

        <StatsCard
          title="Highest Expense"
          value={`₹${Number(dashboard.highestExpense || 0).toLocaleString("en-IN")}`}
          icon={<ArrowUpRight size={22} />}
          color="orange"
        />

        <StatsCard
          title="Lowest Expense"
          value={`₹${Number(dashboard.lowestExpense || 0).toLocaleString("en-IN")}`}
          icon={<ArrowDownRight size={22} />}
          color="red"
        />

        <StatsCard
          title="This Month Expense"
          value={`₹${Number(dashboard.thisMonthExpense || 0).toLocaleString("en-IN")}`}
          icon={<CalendarDays size={22} />}
          color="blue"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ExpenseChart expenses={dashboard.chartExpenses} />
        <MonthlyExpenseChart expenses={dashboard.chartExpenses} />
      </div>

      <RecentExpenses expenses={dashboard.recentExpenses} />
    </div>
  );
};

export default Dashboard;
