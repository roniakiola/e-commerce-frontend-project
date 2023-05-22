import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './reducers/productsReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    productsReducer,
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
