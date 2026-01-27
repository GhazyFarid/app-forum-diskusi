import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ThreadsPage from '../pages/ThreadsPage';
import ThreadDetailPage from '../pages/ThreadDetailPage';
import MainLayout from '../pages/MainLayout';
import LeaderboardPage from '../pages/LeaderboardPage';
import CreateThreadPage from '../pages/CreateThreadPage';
import { fetchProfile } from '../reducer/authReducer';

export default function AppRoutes() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => Boolean(state.auth.login.token));

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ThreadsPage />} />
          <Route path="/threads/:id" element={<ThreadDetailPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />

          <Route
            path="/threads/new"
            element={isAuthenticated ? <CreateThreadPage /> : <div />}
          />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
