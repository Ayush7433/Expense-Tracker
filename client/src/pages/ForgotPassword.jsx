import { useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginImage from "../assets/login.jpeg";
import loginImageDark from "../assets/Auth_Dark.png";
import AuthLayout from "../layouts/AuthLayout";
import FormField from "../components/common/FormField";
import AuthButton from "../components/common/AuthButton";
import AuthMessage from "../components/common/AuthMessage";
import { forgotPasswordApi } from "../redux/services/authApi";
import { forgotPasswordSchema } from "../utils/authSchema";

const ForgotPassword = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await forgotPasswordApi(data.email);
      toast.success(response.message || "Reset link sent");
      setSubmitted(true);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <AuthLayout
      image={themeMode === "dark" ? loginImageDark : loginImage}
      title="Forgot Password"
      subtitle="Enter your email and we'll send you a reset link"
    >
      {submitted ? (
        <AuthMessage
          type="success"
          title="Check your email"
          description="If an account exists for that email, a reset link is on its way. It expires in 15 minutes."
          action={
            <Link to="/login" className="text-sm font-medium text-blue-600">
              Back to Login
            </Link>
          }
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
          />

          <AuthButton loading={isSubmitting} loadingText="Sending...">
            Send Reset Link
          </AuthButton>

          <p className="text-center text-sm text-gray-500 dark:text-slate-400">
            Remembered your password?{" "}
            <Link to="/login" className="font-medium text-blue-600">
              Login
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
