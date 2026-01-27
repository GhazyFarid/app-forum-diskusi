import { configureStore } from '@reduxjs/toolkit';
import register from '../reducer/registerReducer';
import auth from '../reducer/authReducer';
import threads from '../reducer/threadReducer';
import users from '../reducer/userReducer';
import leaderboards from '../reducer/leaderboardReducer';

const store = configureStore({
  reducer: {
    register,
    auth,
    threads,
    users,
    leaderboards,
  },
});

export default store;
