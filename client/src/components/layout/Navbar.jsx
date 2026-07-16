import { Menu } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchInput from "../common/SearchInput";
import UserAvatar from "../common/UserAvatar";

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
  const { user } = useSelector((state) => state.auth);

  const pageInfo = pageMap[location.pathname] || {
    title: "Expense Tracker",
    subtitle: "Manage your finances",
    showSearch: false,
  };

  const name = user?.name || "U";
  const avatarUrl = user?.avatarUrl || null;

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

        <Link
          to="/profile"
          className="ml-2 flex-shrink-0 rounded-full transition hover:ring-2 hover:ring-blue-500 hover:ring-offset-2"
          title="Go to Profile"
        >
          <UserAvatar avatarUrl={avatarUrl} name={name} className="h-10 w-10 text-sm" />
        </Link>
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
