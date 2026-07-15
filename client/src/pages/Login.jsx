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
import loginImage from "../assets/login.jpeg";
import AuthLayout from "../layouts/AuthLayout";
import FormField from "../components/common/FormField";
import AuthButton from "../components/common/AuthButton";

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
        })
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
    <AuthLayout
      image={loginImage}
      title="Welcome Back"
      subtitle="Login to continue to your dashboard"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <FormField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <AuthButton loading={loading} loadingText="Logging in...">
          Login
        </AuthButton>

        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-blue-600">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;