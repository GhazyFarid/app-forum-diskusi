import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { ApiService } from "../constants/apiService";
import { authHeader } from "../utils/authHeader";

export const createComment = createAsyncThunk(
  "threads/createComment",
  async ({ threadId, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ApiService.threads}/${threadId}/comments`,
        { content }, { headers: authHeader(),}
      );

      return response.data.data.comment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: null,
  message: null,
  status: "idle", // idle | loading | success | error
};

const leaderboardsSlice = createSlice({
  name: "leaderboards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.status = "loading";
        state.message = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = "success";
        state.leaderboards = action.payload;
        state.message = action.payload.message;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.leaderboards = [];
        state.message = action.payload;
        state.status = "error";
      });
  },
});

export default leaderboardsSlice.reducer;
