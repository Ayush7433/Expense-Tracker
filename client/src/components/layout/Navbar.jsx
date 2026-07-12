import { Menu, Search } from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";

const pageMap = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Overview of your finances",
  },
  "/expenses": {
    title: "Expenses",
    subtitle: "Track and manage all expenses",
  },
  "/profile": {
    title: "Profile",
    subtitle: "Manage your account details",
  },
};

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();
  const pageInfo = pageMap[location.pathname] || {
    title: "Expense Tracker",
    subtitle: "Manage your finances",
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

        <div className="hidden w-full max-w-md md:block">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
            <Search size={18} className="text-slate-400" />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search expenses..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 sm:px-6 lg:hidden">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
          <Search size={18} className="text-slate-400" />
          <input
            type="search"
            name="search-mobile"
            id="search-mobile"
            placeholder="Search expenses..."
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
