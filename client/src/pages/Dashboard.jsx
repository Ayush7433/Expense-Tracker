import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardData,
  setDashboardMonth,
} from "../redux/slices/dashboardSlice";
import { formatAmountShort } from "../utils/formatters";
import Loader from "../components/common/Loader";
import PageHeader from "../components/common/PageHeader";
import StatsCard from "../components/dashboard/StatsCard";
import DashboardFilterBar from "../components/dashboard/DashboardFilterBar";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Tag,
} from "lucide-react";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import MonthlyExpenseChart from "../components/dashboard/MonthlyExpenseChart";
import RecentExpenses from "../components/dashboard/RecentExpenses";
import BudgetHealth from "../components/dashboard/BudgetHealth";

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);
  const { overall, categories: budgetCategories } = useSelector(
    (state) => state.budget,
  );

  const dashboardMonth = dashboard.dashboardMonth;

  // Fetch dashboard data whenever month filter changes
  useEffect(() => {
    dispatch(fetchDashboardData(dashboardMonth));
  }, [dispatch, dashboardMonth]);

  const handleMonthChange = (newMonth) => {
    dispatch(setDashboardMonth(newMonth));
  };

  if (dashboard.loading && dashboard.recentExpenses.length === 0) {
    return <Loader message="Loading dashboard..." />;
  }

  // Format top category label
  const topCategoryLabel = dashboard.topCategory
    ? dashboard.topCategory.charAt(0).toUpperCase() +
    dashboard.topCategory.slice(1)
    : "—";

  const isMonthly = dashboardMonth !== "all";

  return (
    <div className="space-y-6">
      {/* Page header + filter bar */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Dashboard"
          subtitle="Overview of your expenses and financial activity"
        />
        <DashboardFilterBar month={dashboardMonth} onChange={handleMonthChange} />
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          title={isMonthly ? "Expenses This Month" : "Total Expenses"}
          value={dashboard.totalExpenses}
          icon={<Calculator size={22} />}
          color="blue"
        />

        <StatsCard
          title={isMonthly ? "Amount Spent This Month" : "Total Amount Spent"}
          value={formatAmountShort(dashboard.totalAmount)}
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
          value={formatAmountShort(dashboard.highestExpense)}
          icon={<ArrowUpRight size={22} />}
          color="orange"
        />

        <StatsCard
          title="Lowest Expense"
          value={formatAmountShort(dashboard.lowestExpense)}
          icon={<ArrowDownRight size={22} />}
          color="red"
        />

        <StatsCard
          title="Top Category"
          value={topCategoryLabel}
          icon={<Tag size={22} />}
          color="blue"
        />
      </div>

      <BudgetHealth overall={overall} categories={budgetCategories} />

      <div className="grid gap-6 xl:grid-cols-2">
        <ExpenseChart data={dashboard.categoryBreakdown} />
        <MonthlyExpenseChart
          data={dashboard.chartBreakdown}
          mode={dashboard.chartMode}
        />
      </div>

      <RecentExpenses expenses={dashboard.recentExpenses} />
    </div>
  );
};

export default Dashboard;

