import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/slices/authSlice";
import { loginUserApi } from "../redux/services/authApi";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/login.jpeg";
import AuthLayout from "../layouts/AuthLayout";
import FormField from "../components/common/FormField";
import AuthButton from "../components/common/AuthButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/authSchema";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {

    dispatch(loginStart());

    try {
      const response = await loginUserApi(data);

      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        }),
      );

      toast.success(response.message || "Login Successful");
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email")}
        />

        <FormField
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
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
