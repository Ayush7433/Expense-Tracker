import { createSlice } from "@reduxjs/toolkit";
import { getInitialTheme, applyTheme } from "../../utils/theme";

const initialState = {
  mode: getInitialTheme(), // 'light' | 'dark'
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
      applyTheme(state.mode);
    },
    toggleTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      applyTheme(state.mode);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
