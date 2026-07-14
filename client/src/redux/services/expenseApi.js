import api from "./axiosInstance";


export const getExpenseApi = async (params = {}) => {
  const searchParam = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParam.append(key, String(value));
    }
  });

  const queryString = searchParam.toString();
  const url = queryString
    ? `/expenses/expenses?${queryString}`
    : `/expenses/expenses`;

  const response = await api.get(url);
  return response.data;
};

export const createExpenseApi = async (expenseData) => {
  const response = await api.post(`/expenses/expenses`, expenseData);

  return response.data;
};

export const updateExpenseApi = async (expenseId, expenseData) => {
  const response = await api.put(
    `/expenses/expenses/${expenseId}`,
    expenseData,
  );

  return response.data;
};

export const deleteExpenseApi = async (expenseId) => {
  const response = await api.delete(`/expenses/expenses/${expenseId}`);

  return response.data;
};
