import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './reducers/productsReducer';

const store = configureStore({
  reducer: {
    productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
