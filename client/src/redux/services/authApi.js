import api from "./axiosInstance";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const loginUserApi = async (credentals) => {
  const response = await api.post(`/auth/login`, credentals);
  return response.data;
};

export const registerUserApi = async (userData) => {
  const response = await api.post(`/auth/register`, userData);
  return response.data;
};

export const uploadAvatarApi = async (formData) => {
  const response = await api.post(`/users/avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const forgotPasswordApi = async (email) => {
  const response = await api.post(`/auth/forgot-password`, { email });
  return response.data;
};

export const resetPasswordApi = async (token, password) => {
  const response = await api.post(`/auth/reset-password/${token}`, {
    password,
  });
  return response.data;
};
