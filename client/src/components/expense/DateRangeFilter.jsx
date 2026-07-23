import { useSearchParams } from "react-router-dom";

const DateRangeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    // reset pagination whenever filter changes
    params.set("page", "1");

    setSearchParams(params);
  };

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
      <div className="flex w-full flex-col sm:w-auto">
        <label className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:ring-blue-950 dark:[color-scheme:dark]"
        />
      </div>

      <div className="flex w-full flex-col sm:w-auto">
        <label className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          End Date
        </label>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:ring-blue-950 dark:[color-scheme:dark]"
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
