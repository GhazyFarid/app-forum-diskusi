import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { ApiService } from "../constants/apiService";
import { authHeader } from "../utils/authHeader";

export const upVoteComment = createAsyncThunk(
  "commentVote/up",
  async ({ threadId, commentId }, { rejectWithValue }) => {
    try {
      await axios.post(
        `${ApiService.threads}/${threadId}/comments/${commentId}/up-vote`,
        {},
        { headers: authHeader() },
      );
      return { commentId };
    } catch (e) {
      return rejectWithValue("Upvote comment failed");
    }
  },
);

export const downVoteComment = createAsyncThunk(
  "commentVote/down",
  async ({ threadId, commentId }, { rejectWithValue }) => {
    try {
      await axios.post(
        `${ApiService.threads}/${threadId}/comments/${commentId}/down-vote`,
        {},
        { headers: authHeader() },
      );
      return { commentId };
    } catch (e) {
      return rejectWithValue("Downvote comment failed");
    }
  },
);

export const neutralVoteComment = createAsyncThunk(
  "commentVote/neutral",
  async ({ threadId, commentId }, { rejectWithValue }) => {
    try {
      await axios.post(
        `${ApiService.threads}/${threadId}/comments/${commentId}/neutral-vote`,
        {},
        { headers: authHeader() },
      );
      return { commentId };
    } catch (e) {
      return rejectWithValue("Neutral comment failed");
    }
  },
);

const initialState = {
  status: "idle", // idle | loading | success | error
  message: null,
};

const voteCommentSlice = createSlice({
  name: "threadVote",
  initialState,
  reducers: {
    clearVoteCommentState: (state) => {
      state.status = "idle";
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // UP VOTE
      .addCase(upVoteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(upVoteComment.fulfilled, (state, action) => {
        state.status = "success";
        state.message = action.payload.message;
      })
      .addCase(upVoteComment.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      })

      // DOWN VOTE
      .addCase(downVoteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downVoteComment.fulfilled, (state, action) => {
        state.status = "success";
        state.message = action.payload.message;
      })
      .addCase(downVoteComment.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      })

      // NEUTRAL VOTE
      .addCase(neutralVoteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(neutralVoteComment.fulfilled, (state, action) => {
        state.status = "success";
        state.message = action.payload.message;
      })
      .addCase(neutralVoteComment.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      });
  },
});

export const { clearVoteCommentState } = voteCommentSlice.actions;
export default voteCommentSlice.reducer;
