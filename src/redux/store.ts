import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './reducers/productsReducer';
import userReducer from './reducers/userReducer';
import cartReducer from './reducers/cartReducer';
import categoryReducer from './reducers/categoryReducer';

const store = configureStore({
  reducer: {
    productsReducer,
    userReducer,
    cartReducer,
    categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
