import { configureStore } from '@reduxjs/toolkit';

import productsReducer from '../redux/reducers/productsReducer';

const mockStore = configureStore({
  reducer: {
    productsReducer,
  },
});

export default mockStore;
