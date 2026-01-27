import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import ApiService from '../constants/apiService';

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(ApiService.register, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Register failed');
    }
  },
);

const initialState = {
  data: null,
  message: null,
  status: 'idle', // idle | loading | success | error
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    clearDataRegister: (state) => {
      state.data = null;
      state.message = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload.data.user;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
        state.message = action.payload;
      });
  },
});

export const { clearDataRegister } = registerSlice.actions;
export default registerSlice.reducer;
