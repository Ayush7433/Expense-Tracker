import React from "react";
import logo from "../../assets/Logo.png";
import logoDark from "../../assets/Logo_Dark.png";
import { House, LogOut, NotebookText, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Sidebar = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const logoSrc = themeMode === "dark" ? logoDark : logo;

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-600 dark:bg-cyan-900 text-white shadow-lg shadow-blue-200 dark:shadow-slate-950"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
    }`;

  const handleLogout = () => {
    dispatch(logout());
    onClose?.();
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 dark:bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white/95 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-slate-950/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col px-4 py-5">
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex items-center gap-3 px-2 pb-6">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-blue-600 shadow-md shadow-blue-200 dark:shadow-slate-950/50">
                <img
                  src={logoSrc}
                  alt="Expense Tracker Logo"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  Expense Tracker
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Track and manage expenses
                </p>
              </div>
            </div>

            <div className="mt-2 space-y-1">
              <NavLink to="/dashboard" className={linkClass} onClick={onClose}>
                <House size={18} />
                Dashboard
              </NavLink>

              <NavLink to="/expenses" className={linkClass} onClick={onClose}>
                <NotebookText size={18} />
                Expenses
              </NavLink>

              <NavLink to="/profile" className={linkClass} onClick={onClose}>
                <UserRound size={18} />
                Profile
              </NavLink>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-[15px] font-medium text-white shadow-lg shadow-slate-200 dark:shadow-slate-950 transition-all duration-200 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 active:scale-[0.99] cursor-pointer"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
