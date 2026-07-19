import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import expenseReducer from "./slices/expenseSlice";
import dashboardReducer from "./slices/dashboardSlice";
import themeReducer from "./slices/themeSlice";
import budgetReducer from "./slices/budgetSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
    dashboard: dashboardReducer,
    theme: themeReducer,
    budget: budgetReducer,
  },
});
