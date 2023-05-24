import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { Product } from '../../interfaces/Product';
import { NewProduct } from '../../interfaces/NewProduct';
import { UpdatedProduct } from '../../interfaces/UpdatedProduct';
import store from '../store';

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

export const getFilteredProducts = createAsyncThunk(
  'getFilteredProducts',
  async (id: number) => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?categoryId=${id}`
      );
      return response.data as Product[];
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

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

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async ({
    updatedProduct,
    id,
  }: {
    updatedProduct: UpdatedProduct;
    id: number;
  }) => {
    const state = store.getState();
    const { user } = state.userReducer;

    if (user?.role === 'admin') {
      try {
        const response = await axios.put(
          `https://api.escuelajs.co/api/v1/products/${id}`,
          updatedProduct
        );
        return response.data as Product;
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    } else {
      throw new Error('Unauthorized access');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (id: number) => {
    const state = store.getState();
    const { user } = state.userReducer;

    if (user?.role === 'admin') {
      try {
        const response = await axios.delete(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        return response.data as boolean;
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    } else {
      throw new Error('Unauthorized access');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    cleanUpProductReducer: () => {
      return initialState;
    },
    sortByPrice: (state, action) => {
      state.products.sort((a, b) => {
        if (action.payload === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    },
  },
  extraReducers: (build) => {
    build.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      action.payload instanceof AxiosError
        ? (state.error = action.payload.message)
        : (state.products = action.payload);
    });
    build.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    build.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Failed to GET products.';
    });
    build.addCase(getFilteredProducts.fulfilled, (state, action) => {
      action.payload instanceof AxiosError
        ? (state.error = action.payload.message)
        : (state.products = action.payload);
    });
    build.addCase(createProduct.fulfilled, (state, action) => {
      action.payload instanceof AxiosError
        ? (state.error = action.payload.message)
        : state.products.push(action.payload);
    });
    build.addCase(updateProduct.fulfilled, (state, action) => {
      const updatedProduct = action.payload;
      if (updatedProduct instanceof AxiosError) {
        state.error = updatedProduct.message;
      } else {
        const index = state.products.findIndex(
          (product) => product.id === updatedProduct.id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      }
    });
    build.addCase(updateProduct.rejected, (state) => {
      state.error = 'Unauthorized access';
    });
    build.addCase(deleteProduct.fulfilled, (state, action) => {
      const productId = action.meta.arg;
      if (!action.payload) {
        state.error = 'Failed to delete product.';
      } else {
        state.products = state.products.filter(
          (product) => product.id !== productId
        );
      }
    });
    build.addCase(deleteProduct.rejected, (state) => {
      state.error = 'Unauthorized access';
    });
  },
});

export const { cleanUpProductReducer, sortByPrice } = productsSlice.actions;
const productsReducer = productsSlice.reducer;
export default productsReducer;
