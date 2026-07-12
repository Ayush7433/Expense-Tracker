import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, ShieldCheck } from "lucide-react";
import { logout } from "../../redux/slices/authSlice";

const SecuritySettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">
        Security Settings
      </h3>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <ShieldCheck size={18} />
          </div>

          <div className="flex-1">
            <p className="font-medium text-slate-900">Session Management</p>
            <p className="mt-1 text-sm text-slate-500">
              Your session stays active until you log out.
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;