import { CalendarDays, ReceiptText, Mail } from "lucide-react";
import { formatDateLong } from "../../utils/formatters";

const AccountInfo = ({ user, totalExpenses = 0 }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        Account Information
      </h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Mail size={16} />
            Email
          </div>
          <p
            className="mt-2 truncate font-semibold text-slate-900 dark:text-white"
            title={user?.email || ""}
          >
            {user?.email || "Not available"}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <CalendarDays size={16} />
            Member Since
          </div>
          <p className="mt-2 truncate font-semibold text-slate-900 dark:text-white">
            {formatDateLong(user?.createdAt)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <ReceiptText size={16} />
            Total Expenses
          </div>
          <p className="mt-2 truncate font-semibold text-slate-900 dark:text-white">
            {totalExpenses}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
