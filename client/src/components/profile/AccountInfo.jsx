import { CalendarDays, ReceiptText, Mail } from "lucide-react";

const formatDate = (dateValue) => {
  if (!dateValue) return "Not available";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));
};

const AccountInfo = ({ user, totalExpenses = 0 }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">
        Account Information
      </h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Mail size={16} />
            Email
          </div>
          <p className="mt-2 font-semibold text-slate-900">
            {user?.email || "Not available"}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays size={16} />
            Member Since
          </div>
          <p className="mt-2 font-semibold text-slate-900">
            {formatDate(user?.createdAt)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ReceiptText size={16} />
            Total Expenses
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalExpenses}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;