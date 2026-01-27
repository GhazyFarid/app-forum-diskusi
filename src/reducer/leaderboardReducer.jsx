import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import ApiService from '../constants/apiService';

export const fetchLeaderboards = createAsyncThunk(
  'leaderboards/fetchLeaderboards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(ApiService.leaderboards);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  leaderboards: [],
  message: null,
  status: 'idle', // idle | loading | success | error
};

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (state) => {
        state.status = 'loading';
        state.message = null;
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.status = 'success';
        state.leaderboards = action.payload.leaderboards;
        state.message = action.payload.message;
      })
      .addCase(fetchLeaderboards.rejected, (state, action) => {
        state.leaderboards = [];
        state.message = action.payload;
        state.status = 'error';
      });
  },
});

export default leaderboardsSlice.reducer;
