import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import ApiService from '../constants/apiService';
import authHeader from '../utils/authHeader';
import getToken from '../utils/getToken';

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const resLogin = await axios.post(ApiService.login, payload);
    const { token } = resLogin.data.data;

    localStorage.setItem('access_token', token);

    // fetch profile setelah login
    const resProfile = await axios.get(`${ApiService.users}/me`, {
      headers: authHeader(),
    });

    return {
      token,
      user: resProfile.data.data.user,
    };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

export const fetchProfile = createAsyncThunk(
  'users/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ApiService.users}/me`, {
        headers: authHeader(),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  },
);

const initialState = {
  login: {
    token: getToken(),
    status: 'idle',
    message: null,
  },
  profile: {
    data: null,
    status: 'idle', // idle | loading | success | error
    message: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.login.token = null;
      state.login.status = 'idle';
      state.login.message = null;

      state.profile.data = null;
      state.profile.status = 'idle';
      state.profile.message = null;

      localStorage.removeItem('access_token');
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.login.status = 'loading';
        state.login.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.status = 'success';
        state.login.token = action.payload.token;
        state.profile.data = action.payload.user;
        state.login.message = 'Login successful';
        localStorage.setItem('access_token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.login.status = 'error';
        state.login.message = action.payload;
        state.login.token = null;
        state.login.user = null;
        localStorage.removeItem('access_token');
      })

      // fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.profile.status = 'loading';
        state.profile.message = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile.status = 'success';
        state.profile.data = action.payload.data.user;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profile.status = 'error';
        state.profile.user = null;
        state.profile.message = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
