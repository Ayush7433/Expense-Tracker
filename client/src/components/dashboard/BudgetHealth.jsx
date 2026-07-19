import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Wallet } from "lucide-react";

const getBarColor = (percentage) => {
  if (percentage > 100) return "bg-red-500";
  if (percentage >= 70) return "bg-amber-500";
  return "bg-green-500";
};

const getLabel = (category) => {
  if (category === "overall") return "Overall";
  return category.charAt(0).toUpperCase() + category.slice(1);
};

const BudgetHealth = ({ overall, categories = [] }) => {
  const budgeted = [
    ...(overall && overall.limit > 0 ? [overall] : []),
    ...categories.filter((item) => item.limit > 0),
  ].sort((a, b) => (b.percentage || 0) - (a.percentage || 0));

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Budget Health
        </h3>
        <Link
          to="/budgets"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View all
        </Link>
      </div>

      {budgeted.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center py-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <Wallet size={24} />
          </div>
          <h4 className="mt-4 font-semibold text-gray-900 dark:text-white">
            No budgets set yet
          </h4>
          <p className="mt-1 max-w-xs text-sm text-gray-500 dark:text-slate-400">
            Set a monthly limit for your categories to track your spending health here.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {budgeted.slice(0, 5).map((item) => (
            <div key={item.category}>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                  {item.percentage > 100 ? (
                    <AlertTriangle size={14} className="text-red-500" />
                  ) : item.percentage >= 70 ? (
                    <AlertTriangle size={14} className="text-amber-500" />
                  ) : (
                    <CheckCircle2 size={14} className="text-green-500" />
                  )}
                  {getLabel(item.category)}
                </span>
                <span className="text-gray-500 dark:text-slate-400">
                  {item.percentage}% used
                </span>
              </div>

              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
                <div
                  className={`h-full rounded-full ${getBarColor(item.percentage)}`}
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BudgetHealth;