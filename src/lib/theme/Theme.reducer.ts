import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  darkMode: boolean;
}

export const initialState: ThemeState = {
  darkMode: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateDarkMode(
      state,
      { payload: { darkMode } }: { payload: { darkMode: boolean } }
    ) {
      state.darkMode = darkMode;
    },
  },
});

export const { updateDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
