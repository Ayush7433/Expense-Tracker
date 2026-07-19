import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../redux/slices/dashboardSlice";
import { fetchBudgetStatus } from "../redux/slices/budgetSlice";
import { formatAmountShort } from "../utils/formatters";
import Loader from "../components/common/Loader";
import PageHeader from "../components/common/PageHeader";
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
import BudgetHealth from "../components/dashboard/BudgetHealth";

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);
  const { overall, categories: budgetCategories } = useSelector(
    (state) => state.budget,
  );

  useEffect(() => {
    dispatch(fetchDashboardData());
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    dispatch(fetchBudgetStatus(currentMonth));
  }, [dispatch]);

  if (dashboard.loading && dashboard.recentExpenses.length === 0) {
    return <Loader message="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your expenses and financial activity"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          title="Total Expenses"
          value={dashboard.totalExpenses}
          icon={<Calculator size={22} />}
          color="blue"
        />

        <StatsCard
          title="Total Amount"
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
          title="This Month Expense"
          value={formatAmountShort(dashboard.thisMonthExpense)}
          icon={<CalendarDays size={22} />}
          color="blue"
        />
      </div>

      <BudgetHealth overall={overall} categories={budgetCategories} />

      <div className="grid gap-6 xl:grid-cols-2">
        <ExpenseChart expenses={dashboard.chartExpenses} />
        <MonthlyExpenseChart expenses={dashboard.chartExpenses} />
      </div>

      <RecentExpenses expenses={dashboard.recentExpenses} />
    </div>
  );
};

export default Dashboard;
