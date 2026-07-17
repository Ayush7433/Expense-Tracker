import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerUserApi } from "../redux/services/authApi";
import loginImage from "../assets/login.jpeg";
import loginImageDark from "../assets/Auth_Dark.png";
import AuthLayout from "../layouts/AuthLayout";
import FormField from "../components/common/FormField";
import AuthButton from "../components/common/AuthButton";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utils/authSchema";
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const themeMode = useSelector((state) => state.theme.mode);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUserApi({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success(response.message || "Registration Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout
      image={themeMode === "dark" ? loginImageDark : loginImage}
      title="Create Account"
      subtitle="Start tracking your expenses"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          label="Name"
          type="text"
          placeholder="Enter your name"
          error={errors.name?.message}
          {...register("name")}
        />

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

        <FormField
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <AuthButton loading={isSubmitting} loadingText="Creating Account...">
          Create Account
        </AuthButton>

        <p className="text-center text-sm text-gray-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
