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

    params.set("page", "1");
    setSearchParams(params);
  };

  const inputClass =
    "w-full min-h-[46px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-blue-950 dark:[color-scheme:dark]";

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
      <div className="flex w-full flex-col sm:w-auto">
        <label
          htmlFor="filter-start-date"
          className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400"
        >
          Start Date
        </label>
        <input
          id="filter-start-date"
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleChange}
          placeholder="Select Date"
          className={`${inputClass} ${startDate ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}`}
        />
      </div>

      <div className="flex w-full flex-col sm:w-auto">
        <label
          htmlFor="filter-end-date"
          className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400"
        >
          End Date
        </label>
        <input
          id="filter-end-date"
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleChange}
          placeholder="Select Date"
          className={`${inputClass} ${endDate ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}`}
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
