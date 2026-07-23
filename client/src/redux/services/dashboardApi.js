import api from "./axiosInstance";

export const getDashboardStatsApi = async (month) => {
  const params = month && month !== "all" ? { month } : {};
  const response = await api.get("/expenses/stats", { params });
  return response.data;
};
