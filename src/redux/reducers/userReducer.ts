import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { User } from '../../interfaces/User';
import { LoginData } from '../../interfaces/LoginData';
import { RegisterData } from '../../interfaces/RegisterData';

const initialState: {
  loggedIn: boolean;
  loading: boolean;
  error: string;
  user?: User;
} = {
  loggedIn: false,
  loading: false,
  error: '',
};

export const loginUser = createAsyncThunk(
  'loginUser',
  async (loginData: LoginData) => {
    try {
      const response = await axios.post(
        'https://api.escuelajs.co/api/v1/auth/login',
        loginData
      );
      return getUserData(response.data.access_token);
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const getUserData = async (token: string) => {
  try {
    const response = await axios.get(
      'https://api.escuelajs.co/api/v1/auth/profile',
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data as User;
  } catch (e) {
    const error = e as AxiosError;
    return error;
  }
};

export const registerUser = createAsyncThunk(
  'registerUser',
  async (registerData: RegisterData) => {
    try {
      const response = await axios.post(
        'https://api.escuelajs.co/api/v1/users/',
        registerData
      );
      return response.data as User;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: () => {
      return initialState;
    },
  },
  extraReducers: (build) => {
    build.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message;
      } else {
        state.user = action.payload;
        state.loggedIn = true;
      }
    });
    build.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message;
      } else {
        state.user = action.payload;
        state.loggedIn = true;
      }
    });
  },
});
export const { logoutUser } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
