import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export const getDashboardStatsApi = async () => {
    const response = await axios.get(
        `${API_BASE_URL}/expenses/stats`,
        getAuthHeaders()
    );

    return response.data;
}