import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { ApiService } from "../constants/apiService";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(ApiService.users);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

const initialState = {
  data: [],
  status: "idle", // idle | loading | success | error
  message: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsersState: (state) => {
      state.data = [];
      state.status = "idle";
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
        state.message = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.data.users;
        state.message = action.payload.message;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "error";
        state.data = [];
        state.message = action.payload;
      });
  },
});

export const { clearUsersState } = usersSlice.actions;
export default usersSlice.reducer;
