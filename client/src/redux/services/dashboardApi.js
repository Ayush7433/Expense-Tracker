import api from "./axiosInstance";

export const getDashboardStatsApi = async () => {
    const response = await api.get(
        `/expenses/stats`
    );

    return response.data;
}