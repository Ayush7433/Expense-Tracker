import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  isAuthenticated: !!tokenFromStorage,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.loading = false;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearAuthError,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;
