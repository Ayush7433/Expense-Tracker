import api from "./axiosInstance";

export const getBudgetsApi = async (month) => {
  const response = await api.get(`/budgets/budgets`, { params: { month } });
  return response.data;
};

export const getBudgetStatusApi = async (month) => {
  const response = await api.get(`/budgets/budgets/status`, {
    params: { month },
  });
  return response.data;
};

export const createOrUpdateBudgetApi = async (budgetData) => {
  const response = await api.post(`/budgets/budgets`, budgetData);
  return response.data;
};

export const deleteBudgetApi = async (budgetId) => {
  const response = await api.delete(`/budgets/budgets/${budgetId}`);
  return response.data;
};
