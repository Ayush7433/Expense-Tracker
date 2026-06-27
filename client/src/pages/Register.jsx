import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerUserApi } from "../redux/services/authApi";
import loginImage from "../assets/login.jpeg"

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

    if(formData.password.length < 8){
      return toast.error("Password must have atleast 8 characters")
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
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex justify-center items-center px-4">
    //   <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border">
    //     <div className="text-center mb-8">
    //       <h1 className="text-3xl font-bold">Create Account</h1>

    //       <p className="text-gray-500 mt-2">Start tracking your expenses</p>
    //     </div>

    //     <form onSubmit={handleSubmit} className="space-y-5">
    //       <input
    //         type="text"
    //         name="name"
    //         placeholder="Full Name"
    //         value={formData.name}
    //         onChange={handleChange}
    //         className="w-full border rounded-xl p-3"
    //         required
    //       />

    //       <input
    //         type="email"
    //         name="email"
    //         placeholder="Email Address"
    //         value={formData.email}
    //         onChange={handleChange}
    //         className="w-full border rounded-xl p-3"
    //         required
    //       />

    //       <input
    //         type="password"
    //         name="password"
    //         placeholder="Password"
    //         value={formData.password}
    //         onChange={handleChange}
    //         className="w-full border rounded-xl p-3"
    //         required
    //       />

    //       <input
    //         type="password"
    //         name="confirmPassword"
    //         placeholder="Confirm Password"
    //         value={formData.confirmPassword}
    //         onChange={handleChange}
    //         className="w-full border rounded-xl p-3"
    //         required
    //       />

    //       <button disabled={loading} className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition cursor-pointer">
    //         {loading ? "Creating Account..." : "Create Account"}
    //       </button>

    //       <p className="text-center text-sm">
    //         Already have an account? {" "}
    //         <Link to='/login' className="text-blue-600 font-semibold">Login</Link>
    //       </p>
    //     </form>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-50 to-indigo-100">
              <img src={loginImage} className="h-160 " alt="" />
            </div>
    
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="max-w-md mx-auto">
                <div className="mb-10 text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                  <p className="mt-2 text-gray-500">
                    Start tracking your expense
                  </p>
                </div>
    
                <form onSubmit={handleSubmit} className="space-y-3">
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                      required
                    />
                  </div>
                  
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                      required
                    />
                  </div>
    
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-blue-600 text-white py-3.5 font-semibold hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
    
                  <p className="text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-medium">
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Register;
