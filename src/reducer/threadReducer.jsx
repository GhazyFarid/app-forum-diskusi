import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { ApiService } from "../constants/apiService";
import { authHeader } from "../utils/authHeader";

export const createThread = createAsyncThunk(
  "threads/createThread",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(ApiService.threads, payload, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Create thread failed",
      );
    }
  },
);

export const getAllThreads = createAsyncThunk(
  "threads/getAllThreads",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(ApiService.threads);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch threads failed",
      );
    }
  },
);

export const getThreadById = createAsyncThunk(
  "threads/getThreadById",
  async (threadId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ApiService.threads}/${threadId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch thread detail failed",
      );
    }
  },
);

const initialState = {
  createThread: {
    status: "idle", // idle | loading | success | error
    message: null,
  },
  getAllThreads: {
    threads: [],
    status: "idle", // idle | loading | success | error
    message: null,
  },
  getThreadById: {
    data: null,
    status: "idle", // idle | loading | success | error
    message: null,
  },
};

const threadSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    clearThreadDetail: (state) => {
      state.getThreadById.data = null;
      state.getThreadById.status = "idle";
      state.getThreadById.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createThread
      .addCase(createThread.pending, (state) => {
        state.createThread.status = "loading";
        state.createThread.message = null;
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.createThread.status = "success";
        state.createThread.message = action.payload.message;
      })
      .addCase(createThread.rejected, (state, action) => {
        state.createThread.status = "error";
        state.createThread.message = action.payload;
      })

      // getAllThreads
      .addCase(getAllThreads.pending, (state) => {
        state.getAllThreads.status = "loading";
        state.getAllThreads.message = null;
      })
      .addCase(getAllThreads.fulfilled, (state, action) => {
        state.getAllThreads.status = "success";
        state.getAllThreads.threads = action.payload.data.threads;
      })
      .addCase(getAllThreads.rejected, (state, action) => {
        state.getAllThreads.status = "error";
        state.getAllThreads.message = action.payload;
        state.getAllThreads.threads = [];
      })

      // getThreadById
      .addCase(getThreadById.pending, (state) => {
        state.getThreadById.status = "loading";
        state.getThreadById.message = null;
      })
      .addCase(getThreadById.fulfilled, (state, action) => {
        state.getThreadById.status = "success";
        state.getThreadById.data = action.payload.data.detailThread;
      })
      .addCase(getThreadById.rejected, (state, action) => {
        state.getThreadById.status = "error";
        state.getThreadById.message = action.payload;
        state.getThreadById.data = null;
      });
  },
});

export const { clearThreadDetail } = threadSlice.actions;
export default threadSlice.reducer;
