import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import reducer from './reducer';

const store = configureStore({
  reducer,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;
