import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";

const SearchInput = ({ placeholder = "Search...", debounceDelay = 400 }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(() => {
    return searchParams.get("search") || "";
  });

  const debouncedSearch = useDebounce(search, debounceDelay);
  const currentSearchParam = searchParams.get("search") || "";

  // Sync internal state if URL param is cleared or changed externally (e.g., Reset button)
  useEffect(() => {
    setSearch(currentSearchParam);
  }, [currentSearchParam]);

  // Update URL after debounce
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    } else {
      params.delete("search");
    }

    // Reset pagination whenever search changes
    params.set("page", "1");

    setSearchParams(params, { replace: true });
  }, [debouncedSearch]);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:bg-slate-900 dark:focus-within:ring-blue-900/40">
      <Search size={18} className="text-slate-400 dark:text-slate-500" />

      <input
        type="search"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
      />
    </div>
  );
};

export default SearchInput;
