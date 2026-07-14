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
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
      <Search size={18} className="text-slate-400" />

      <input
        type="search"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
    </div>
  );
};

export default SearchInput;
