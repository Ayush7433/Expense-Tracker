import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDashboardStatsApi } from "../services/dashboardApi";
import { getExpenseApi } from "../services/expenseApi";

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const [statResponse, recentResponse, chartResponse] = await Promise.all([
        getDashboardStatsApi(),
        getExpenseApi({ page: 1, limit: 5 }),
        getExpenseApi({ page: 1, limit: 1000 }),
      ]);

      return {
        stats: statResponse?.stats || {},
        recentExpenses: recentResponse?.expenses || [],
        chartExpenses: chartResponse?.expenses || [],
      };
    } catch (error) {
      const message =
        error.response?.data?.messaage ||
        error.messaage ||
        "Failed to load dashboard data";
      return rejectWithValue(message);
    }
  },
);

const initialState = {
    totalExpenses: 0,
    totalAmount: 0,
    averageExpense: 0,
    highestExpense: 0,
    lowestExpense: 0,
    thisMonthExpense: 0,
    recentExpenses: [],
    chartExpenses: [],
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        clearDashboardError : (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchDashboardData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchDashboardData.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;

            const stats = action.payload?.stats || {};

            state.totalExpenses = stats.totalExpenses || 0;
            state.totalAmount = stats.totalAmount || 0;
            state.averageExpense = stats.averageExpense || 0;
            state.highestExpense = stats.highestExpense || 0;
            state.lowestExpense = stats.lowestExpense || 0;
            state.thisMonthExpense = stats.thisMonthExpense || 0;

            state.recentExpenses = action.payload?.recentExpenses || [];
            state.chartExpenses = action.payload?.chartExpenses || [];
        })
        .addCase(fetchDashboardData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to load dashboard data";
        })
    }
});

export const {clearDashboardError} = dashboardSlice.actions
export default dashboardSlice.reducer;