import { Menu, Search } from "lucide-react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import SearchInput from "../common/SearchInput";

const pageMap = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Overview of your finances",
    showSearch: false,
  },
  "/expenses": {
    title: "Expenses",
    subtitle: "Track and manage all expenses",
    showSearch: true,
  },
  "/profile": {
    title: "Profile",
    subtitle: "Manage your account details",
    showSearch: false,
  },
};

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();

  const pageInfo = pageMap[location.pathname] || {
    title: "Expense Tracker",
    subtitle: "Manage your finances",
    showSearch: false,
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex h-20 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          onClick={onMenuClick}
          className="flex h-11 w-11 items-center justify-center rounded-2xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">
            {pageInfo.title}
          </h1>
          <p className="truncate text-xs text-slate-500 sm:text-sm">
            {pageInfo.subtitle}
          </p>
        </div>

        {pageInfo.showSearch && (
          <div className="hidden w-full max-w-md md:block">
            <SearchInput placeholder="Search expenses..." />
          </div>
        )}
      </div>

      {pageInfo.showSearch && (
        <div className="px-4 pb-4 sm:px-6 lg:hidden">
          <SearchInput placeholder="Search expenses..." />
        </div>
      )}
    </header>
  );
};

export default Navbar;
