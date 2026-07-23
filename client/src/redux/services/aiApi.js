import api from "./axiosInstance";

/**
 * Sends free-text expense description to the backend for AI parsing.
 * Returns { success, parsed: { title, amount, category, expenseDate, description } }
 * or throws on failure (validation error, AI service error, etc.)
 */
export const parseExpenseTextApi = async (text) => {
  const response = await api.post("/ai/parse-expense", { text });
  return response.data;
};
