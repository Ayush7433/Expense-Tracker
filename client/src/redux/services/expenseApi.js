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

export const getExpenseApi = async (params = {}) => {
  const searchParam = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParam.append(key, String(value));
    }
  });

  const queryString = searchParam.toString();
  const url = queryString
    ? `${API_BASE_URL}/expenses/expenses?${queryString}`
    : `${API_BASE_URL}/expenses/expenses`;

  const response = await axios.get(url, getAuthHeaders());
  return response.data;
};

export const createExpenseApi = async (expenseData) => {
    const response = await axios.post(
        `${API_BASE_URL}/expenses/expenses`,
        expenseData,
        getAuthHeaders()
    );

    return response.data;
}

export const updateExpenseApi = async (expenseId, expenseData) => {
    const response = await axios.put(
        `${API_BASE_URL}/expenses/expenses/${expenseId}`,
        expenseData,
        getAuthHeaders()
    );

    return response.data
}

export const deleteExpenseApi = async (expenseId) => {
  const response = await axios.delete(
    `${API_BASE_URL}/expenses/expenses/${expenseId}`,
    getAuthHeaders()
  );

  return response.data;
}