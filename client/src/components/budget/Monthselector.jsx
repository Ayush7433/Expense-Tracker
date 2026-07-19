import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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

const MonthSelector = ({ month, onChange }) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <button
        type="button"
        onClick={() => onChange(shiftMonth(month, -1))}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
      >
        <ChevronLeft size={18} />
      </button>

      <span className="min-w-[140px] text-center text-sm font-semibold text-slate-900 dark:text-white">
        {formatMonthLabel(month)}
      </span>

      <button
        type="button"
        onClick={() => onChange(shiftMonth(month, 1))}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default MonthSelector;
