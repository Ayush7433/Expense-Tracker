import { useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginImage from "../assets/login.jpeg";
import loginImageDark from "../assets/Auth_Dark.png";
import AuthLayout from "../layouts/AuthLayout";
import FormField from "../components/common/FormField";
import AuthButton from "../components/common/AuthButton";
import AuthMessage from "../components/common/AuthMessage";
import { resetPasswordApi } from "../redux/services/authApi";
import { resetPasswordSchema } from "../utils/authSchema";

const ResetPassword = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  const { token } = useParams();
  const navigate = useNavigate();
  const [linkInvalid, setLinkInvalid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await resetPasswordApi(token, data.password);
      toast.success(response.message || "Password reset successful");
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
      if (error.response?.status === 400) {
        setLinkInvalid(true);
      }
    }
  };

  return (
    <AuthLayout
      image={themeMode === "dark" ? loginImageDark : loginImage}
      title="Reset Password"
      subtitle="Choose a new password for your account"
    >
      {linkInvalid ? (
        <AuthMessage
          type="error"
          title="Link invalid or expired"
          description="Please request a new password reset link."
          action={
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600"
            >
              Request a new link
            </Link>
          }
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            label="New Password"
            type="password"
            placeholder="Enter new password"
            error={errors.password?.message}
            {...register("password")}
          />

          <FormField
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <AuthButton loading={isSubmitting} loadingText="Resetting...">
            Reset Password
          </AuthButton>
        </form>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
