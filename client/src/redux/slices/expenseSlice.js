import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { getExpenseApi } from "../services/expenseApi";

export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async (params = {}, { rejecteWithValue }) => {
    try {
      return await getExpenseApi(params);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error fetching expenses";

      return rejecteWithValue(message);
    }
  },
);

const initialState = {
  expenses: [],
  loading: false,
  error: null,
  pagination: {
    count: 0,
    totalExpenses: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  },
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    clearExpenseError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.expenses = action.payload?.expenses || [];

        state.pagination = {
            count: action.payload?.count || 0,
            totalExpenses: action.payload?.totalExpenses || 0,
            currentPage: action.payload?.currentPage || 1,
            totalPages: action.payload?.totalPages || 1,
            limit: action.payload?.limit || 10,
        };
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching expenses";
      })
  },
});

export const {clearExpenseError} = expenseSlice.actions;
export default expenseSlice.reducer;
