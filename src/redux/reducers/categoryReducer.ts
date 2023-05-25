import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category } from '../../interfaces/Category';
import axios, { AxiosError } from 'axios';

const initialState: {
  categories: Category[];
  error: string | null;
} = {
  categories: [],
  error: '',
};

export const getAllCategories = createAsyncThunk(
  'getAllCategories',
  async () => {
    try {
      const response = await axios.get(
        'https://api.escuelajs.co/api/v1/categories'
      );
      return response.data as Category[];
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getAllCategories.fulfilled, (state, action) => {
      action.payload instanceof AxiosError
        ? (state.error = action.payload.message)
        : (state.categories = action.payload);
    });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
