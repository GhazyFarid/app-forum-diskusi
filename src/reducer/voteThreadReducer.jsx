import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import ApiService from '../constants/apiService';
import authHeader from '../utils/authHeader';

export const upVoteThread = createAsyncThunk(
  'threadVote/upVoteThread',
  async (threadId, { getState, rejectWithValue }) => {
    try {
      await axios.post(`${ApiService.threads}/${threadId}/up-vote`, {}, { headers: authHeader() });

      const userId = getState().users.profile.data.id;

      return { threadId, userId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Up vote failed');
    }
  },
);

export const downVoteThread = createAsyncThunk(
  'threadVote/downVoteThread',
  async (threadId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ApiService.threads}/${threadId}/down-vote`,
        {},
        { headers: authHeader() },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Down vote failed');
    }
  },
);

export const neutralVoteThread = createAsyncThunk(
  'threadVote/neutralVoteThread',
  async (threadId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ApiService.threads}/${threadId}/neutral-vote`,
        {},
        { headers: authHeader() },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Neutral vote failed');
    }
  },
);

const initialState = {
  status: 'idle', // idle | loading | success | error
  message: null,
};

const threadVoteSlice = createSlice({
  name: 'threadVote',
  initialState,
  reducers: {
    clearThreadVoteState: () => ({
      status: 'idle',
      message: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      // UP VOTE
      .addCase(upVoteThread.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(upVoteThread.fulfilled, (state, action) => ({
        ...state,
        status: 'success',
        message: action.payload?.message ?? null,
      }))
      .addCase(upVoteThread.rejected, (state, action) => ({
        ...state,
        status: 'error',
        message: action.payload,
      }))

      // DOWN VOTE
      .addCase(downVoteThread.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(downVoteThread.fulfilled, (state, action) => ({
        ...state,
        status: 'success',
        message: action.payload?.message ?? null,
      }))
      .addCase(downVoteThread.rejected, (state, action) => ({
        ...state,
        status: 'error',
        message: action.payload,
      }))

      // NEUTRAL VOTE
      .addCase(neutralVoteThread.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(neutralVoteThread.fulfilled, (state, action) => ({
        ...state,
        status: 'success',
        message: action.payload?.message ?? null,
      }))
      .addCase(neutralVoteThread.rejected, (state, action) => ({
        ...state,
        status: 'error',
        message: action.payload,
      }));
  },
});

export const { clearThreadVoteState } = threadVoteSlice.actions;
export default threadVoteSlice.reducer;
