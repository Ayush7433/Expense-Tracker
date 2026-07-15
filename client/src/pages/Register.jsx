import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerUserApi } from "../redux/services/authApi";
import loginImage from "../assets/login.jpeg";
import AuthLayout from "../layouts/AuthLayout";
import FormField from "../components/common/FormField";
import AuthButton from "../components/common/AuthButton";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return toast.error("All fields are required");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (formData.password.length < 8) {
      return toast.error("Password must have at least 8 characters");
    }

    try {
      setLoading(true);

      const data = await registerUserApi({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success(data.message || "Registration Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      image={loginImage}
      title="Create Account"
      subtitle="Start tracking your expenses"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

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

        <FormField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
        />

        <AuthButton loading={loading} loadingText="Creating Account...">
          Create Account
        </AuthButton>

        <p className="text-center text-sm text-gray-500">
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