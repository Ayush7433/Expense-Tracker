import { ChevronLeft, ChevronRight, Calendar, Infinity } from "lucide-react";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const formatMonthLabel = (month) => {
  const [year, mon] = month.split("-").map(Number);
  return `${MONTH_NAMES[mon - 1]} ${year}`;
};

const shiftMonth = (month, delta) => {
  const [year, mon] = month.split("-").map(Number);
  const date = new Date(year, mon - 1 + delta, 1);
  const newYear = date.getFullYear();
  const newMonth = String(date.getMonth() + 1).padStart(2, "0");
  return `${newYear}-${newMonth}`;
};

/**
 * DashboardFilterBar
 * Props:
 *  - month: "YYYY-MM" | "all"
 *  - onChange: (newMonth: string) => void
 */
const DashboardFilterBar = ({ month, onChange }) => {
  const isAllTime = month === "all";

  const switchToMonthly = () => {
    if (isAllTime) {
      const now = new Date();
      const cur = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      onChange(cur);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1 rounded-2xl border border-gray-100 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <button
          type="button"
          onClick={switchToMonthly}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all ${!isAllTime
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
        >
          <Calendar size={14} />
          Monthly
        </button>

        <button
          type="button"
          onClick={() => onChange("all")}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all ${isAllTime
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
        >
          <Infinity size={14} />
          All Time
        </button>
      </div>

      {!isAllTime && (
        <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => onChange(shiftMonth(month, -1))}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="min-w-[130px] text-center text-sm font-semibold text-gray-900 dark:text-white">
            {formatMonthLabel(month)}
          </span>

          <button
            type="button"
            onClick={() => onChange(shiftMonth(month, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardFilterBar;

