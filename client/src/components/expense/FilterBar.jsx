import { useSearchParams } from "react-router-dom";
import { CATEGORY_FILTER_OPTIONS } from "../../constants/categories";

const FilterBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";

  const handleChange = (e) => {
    const value = e.target.value;

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    // Whenever filter changes
    params.set("page", "1");

    setSearchParams(params);
  };

  return (
    <select
      value={selectedCategory}
      onChange={handleChange}
      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:ring-blue-950"
    >
      {CATEGORY_FILTER_OPTIONS.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  );
};

export default FilterBar;
