import { configureStore } from "@reduxjs/toolkit";
import { themeReducer as theme } from "lib/theme";
import { isMainnet } from "lib/utils";
import { combineReducers } from "redux";
import { reducer as form } from "redux-form/dist/redux-form";
import { load, save } from "redux-localstorage-simple";
import logger from "redux-logger";

const PERSISTED_KEYS: string[] = ["theme"];

const reducer = combineReducers({
  theme,
  form,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(isMainnet ? [] : [logger])
      .concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({
    states: PERSISTED_KEYS,
    disableWarnings: true,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
