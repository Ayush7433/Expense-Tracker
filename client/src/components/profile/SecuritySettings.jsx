import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, ShieldCheck } from "lucide-react";
import { logout } from "../../redux/slices/authSlice";
import LogoutConfirmationModal from "../common/LogoutConfirmationModal";

const SecuritySettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        Security Settings
      </h3>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <ShieldCheck size={18} />
          </div>

          <div className="flex-1">
            <p className="font-medium text-slate-900 dark:text-white">
              Session Management
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your session stays active until you log out.
            </p>
          </div>
        </div>

        <button
          onClick={handleLogoutClick}
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      <LogoutConfirmationModal
        open={isLogoutModalOpen}
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default SecuritySettings;
