import React from "react";
import logo from "../../assets/Logo.png";
import { House, LogOut, NotebookText, UserRound, Wallet } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-10">
          <div className=" flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-blue-400 flex items-center justify-center text-white">
              <Wallet size={18} />
            </div>
            <h2 className="text-lg font-semibold">Expense Tracker</h2>
          </div>

          <div>
            <ul className="flex flex-col gap-3">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex gap-3 px-4 py-3 rounded-lg items-center ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`
                  }
                >
                  <House size={16} /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/expenses"
                  className={({ isActive }) =>
                    `flex gap-3 px-4 py-3 rounded-lg items-center transition-all ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`
                  }
                >
                  <NotebookText size={16} />
                  Expense
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex gap-3 px-4 py-3 rounded-lg items-center transition-all ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`
                  }
                >
                  <UserRound size={16} />
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <button onClick={() => dispatch(logout())} className="flex gap-3 items-center w-full px-4 py-3 rounded-lg bg-black text-white hover:bg-gray-700 transition-colors delay-100 cursor-pointer"><LogOut size={16} /> Logout</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
