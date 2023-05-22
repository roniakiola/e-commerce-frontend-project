import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { User } from '../../interfaces/User';

const initialState: {
  loggedIn: boolean;
  loading: boolean;
  error: string;
} = {
  loggedIn: false,
  loading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (build) => {},
});

export const {} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
