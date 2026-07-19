import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBudgetsApi, getBudgetStatusApi } from "../services/budgetApi";

const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

export const fetchBudgets = createAsyncThunk(
  "budget/fetchBudgets",
  async (month, { rejectWithValue }) => {
    try {
      const response = await getBudgetsApi(month);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load budgets";
      return rejectWithValue(message);
    }
  },
);

export const fetchBudgetStatus = createAsyncThunk(
  "budget/fetchBudgetStatus",
  async (month, { rejectWithValue }) => {
    try {
      const response = await getBudgetStatusApi(month);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load budget status";
      return rejectWithValue(message);
    }
  },
);

const initialState = {
  selectedMonth: getCurrentMonth(),
  budgets: [],
  categories: [],
  overall: null,
  loading: false,
  error: null,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    clearBudgetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.budgets = action.payload?.budgets || [];
      })
      .addCase(fetchBudgetStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBudgetStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload?.categories || [];
        state.overall = action.payload?.overall || null;
      })
      .addCase(fetchBudgetStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load budget status";
      });
  },
});

export const { setSelectedMonth, clearBudgetError } = budgetSlice.actions;
export default budgetSlice.reducer;
