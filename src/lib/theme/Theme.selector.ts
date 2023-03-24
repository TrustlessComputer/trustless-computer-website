import { RootState } from "lib/store";
import { createSelector } from "reselect";

import { colors } from "./Theme";
import { ThemeState } from "./Theme.reducer";

export const themeSelector = createSelector(
  (state: RootState) => state.theme,
  (theme: ThemeState) => theme
);

export const darkModeSelector = createSelector(
  themeSelector,
  (theme) => theme.darkMode
);

export const colorsSelector = createSelector(darkModeSelector, (darkMode) =>
  colors(darkMode)
);
