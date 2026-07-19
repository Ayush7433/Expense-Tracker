import { Pencil } from "lucide-react";

const getBarColor = (percentage) => {
  if (percentage === null) return "bg-slate-200 dark:bg-slate-700";
  if (percentage > 100) return "bg-red-500";
  if (percentage >= 70) return "bg-amber-500";
  return "bg-green-500";
};

const getStatusTextColor = (percentage) => {
  if (percentage > 100) return "text-red-600 dark:text-red-400";
  if (percentage >= 70) return "text-amber-600 dark:text-amber-400";
  return "text-green-600 dark:text-green-400";
};

const getLabel = (category) => {
  if (category === "overall") return "Overall";
  return category.charAt(0).toUpperCase() + category.slice(1);
};

const BudgetCard = ({ data, onEdit, highlight = false }) => {
  const { category, spent, limit, remaining, percentage } = data;
  const hasBudget = limit > 0;
  const barWidth = percentage === null ? 0 : Math.min(percentage, 100);

  return (
    <div
      className={`rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${
        highlight ? "sm:col-span-2 xl:col-span-3" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-white">
            {getLabel(category)}
          </h3>
          {hasBudget ? (
            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              ₹{spent.toLocaleString()} of ₹{limit.toLocaleString()} spent
            </p>
          ) : (
            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              No budget set
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onEdit(data)}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition hover:bg-gray-50 hover:text-gray-700 dark:border-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          title="Set/Edit budget"
        >
          <Pencil size={16} />
        </button>
      </div>

      {hasBudget && (
        <>
          <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
            <div
              className={`h-full rounded-full transition-all ${getBarColor(percentage)}`}
              style={{ width: `${barWidth}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className={`font-semibold ${getStatusTextColor(percentage)}`}>
              {percentage}% used
            </span>
            <span
              className={
                remaining < 0
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-500 dark:text-slate-400"
              }
            >
              {remaining < 0
                ? `₹${Math.abs(remaining).toLocaleString()} over budget`
                : `₹${remaining.toLocaleString()} remaining`}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default BudgetCard;
