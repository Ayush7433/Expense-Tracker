import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDashboardStatsApi } from "../services/dashboardApi";
import { getExpenseApi } from "../services/expenseApi";

const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (month, { rejectWithValue }) => {
    try {
      const [statResponse, recentResponse] = await Promise.all([
        getDashboardStatsApi(month),
        getExpenseApi({ page: 1, limit: 5 }),
      ]);

      return {
        stats: statResponse?.stats || {},
        recentExpenses: recentResponse?.expenses || [],
        categoryBreakdown: statResponse?.categoryBreakdown || [],
        // Legacy field for backward compat (all-time mode)
        monthlyBreakdown: statResponse?.monthlyBreakdown || [],
        // New fields
        chartBreakdown: statResponse?.chartBreakdown || [],
        chartMode: statResponse?.chartMode || "monthly",
        topCategory: statResponse?.topCategory || null,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load dashboard data";
      return rejectWithValue(message);
    }
  },
);

const initialState = {
  dashboardMonth: getCurrentMonth(), // "YYYY-MM" or "all"
  totalExpenses: 0,
  totalAmount: 0,
  averageExpenses: 0,
  highestExpense: 0,
  lowestExpense: 0,
  topCategory: null,
  recentExpenses: [],
  categoryBreakdown: [],
  monthlyBreakdown: [],
  chartBreakdown: [],
  chartMode: "monthly", // "monthly" | "daily"
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardMonth: (state, action) => {
      state.dashboardMonth = action.payload;
    },
    clearDashboardError: (state) => {
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
        state.averageExpenses = stats.averageExpenses || 0;
        state.highestExpense = stats.highestExpense || 0;
        state.lowestExpense = stats.lowestExpense || 0;
        state.topCategory = action.payload?.topCategory || null;

        state.recentExpenses = action.payload?.recentExpenses || [];
        state.categoryBreakdown = action.payload?.categoryBreakdown || [];
        state.monthlyBreakdown = action.payload?.monthlyBreakdown || [];
        state.chartBreakdown = action.payload?.chartBreakdown || [];
        state.chartMode = action.payload?.chartMode || "monthly";
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load dashboard data";
      });
  },
});

export const { setDashboardMonth, clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;

