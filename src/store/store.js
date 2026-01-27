import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../reducer/registerReducer";
import authReducer from "../reducer/authReducer";
import threadsReducer from "../reducer/threadReducer";
import userReducer from '../reducer/userReducer';
import leaderboardsReducer from '../reducer/leaderboardReducer';

export const store = configureStore({
  reducer: {
    register: registerReducer,
    auth: authReducer,
    threads: threadsReducer,
    users: userReducer,
    leaderboards: leaderboardsReducer
  },
});
