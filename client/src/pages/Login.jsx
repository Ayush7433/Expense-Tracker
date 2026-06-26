import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/slices/authSlice";
import { loginUserApi } from "../redux/services/authApi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginStart());

    try {
      const data = await loginUserApi(formData);

      dispatch(
        loginSuccess({
          user: data.user,
          token: data.token,
        }),
      );

      toast.success(data.message || "Login Successful");
      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";

      dispatch(loginFailure(message));
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              $
            </div>
            <h1 className="mt-8 text-4xl font-bold text-gray-900 leading-tight">
              Take Control of
              <span className="block text-blue-600">Your Expenses</span>
            </h1>
            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              Track, manage, and analyze your spending with a modern expense
              dashboard.
            </p>
          </div>

          <div className="rounded-3xl bg-white/80 backdrop-blur p-6 shadow-lg border border-white/60">
            <div className="h-40 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 text-xl font-semibold">
              Expense Tracker
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="mt-2 text-gray-500">
                Login to continue to your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-blue-600 text-white py-3.5 font-semibold hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="text-blue-600 font-medium">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
