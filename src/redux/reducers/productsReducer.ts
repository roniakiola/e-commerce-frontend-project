import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { Product } from '../../interfaces/Product';
import { NewProduct } from '../../interfaces/NewProduct';

const initialState: {
  products: Product[];
  loading: boolean;
  error: string | null;
} = {
  products: [],
  loading: false,
  error: '',
};

export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
  try {
    const response = await axios.get(
      'https://api.escuelajs.co/api/v1/products'
    );
    return response.data as Product[];
  } catch (e) {
    const error = e as AxiosError;
    return error;
  }
});

export const createProduct = createAsyncThunk(
  'createProduct',
  async (newProduct: NewProduct) => {
    try {
      const response = await axios.post(
        'https://api.escuelajs.co/api/v1/products/',
        newProduct
      );
      return response.data as Product;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    cleanUpProductReducer: (state) => {
      return initialState;
    },
  },
  extraReducers: (build) => {
    build.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      action.payload instanceof AxiosError
        ? (state.error = action.payload.message)
        : (state.products = action.payload);
    });
    build.addCase(getAllProducts.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    build.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Failed to GET products.';
    });
    build.addCase(createProduct.fulfilled, (state, action) => {
      action.payload instanceof AxiosError
        ? (state.error = action.payload.message)
        : state.products.push(action.payload);
    });
  },
});

export const { cleanUpProductReducer } = productsSlice.actions;
const productsReducer = productsSlice.reducer;
export default productsReducer;
