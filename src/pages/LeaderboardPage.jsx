import { useEffect } from 'react';
import { FaTrophy } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLeaderboards } from '../reducer/leaderboardReducer';
import LeaderboardItem from '../components/LeaderboardItem';

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const { leaderboards, status, message } = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  if (status === 'loading') {
    return <p style={{ textAlign: 'center', marginTop: 40 }}>Loading...</p>;
  }

  if (status === 'error') {
    return <p style={{ textAlign: 'center', marginTop: 40, color: 'red' }}>{message}</p>;
  }

  const sortedLeaderboards = [...leaderboards].sort((a, b) => b.score - a.score);

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
      <h2
        style={{
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <FaTrophy size={22} color="#f59e0b" />
        Leaderboard Pengguna Aktif
      </h2>

      {sortedLeaderboards.map((item, index) => (
        <LeaderboardItem key={item.user.id} rank={index + 1} user={item.user} score={item.score} />
      ))}
    </div>
  );
}
