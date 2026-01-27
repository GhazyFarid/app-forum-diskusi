import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import { getAllThreads } from '../reducer/threadReducer';
import { fetchAllUsers } from '../reducer/userReducer';
import ThreadItem from '../components/ThreadItem';

export default function ThreadsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status: statusProfile, data: dataProfile } = useSelector((i) => i.auth.profile);

  const {
    status: threadsStatus,
    message: threadsMessage,
    threads,
  } = useSelector((i) => i.threads.getAllThreads);

  const {
    status: usersStatus,
    message: usersMessage,
    data: dataUsers,
  } = useSelector((i) => i.users);
  const userId = dataProfile?.id ?? '';

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(getAllThreads());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const categories = useMemo(() => {
    const set = new Set(threads.map((t) => t.category));
    return Array.from(set);
  }, [threads]);

  const usersById = useMemo(() => (dataUsers || []).reduce(
    (acc, user) => ({
      ...acc,
      [user.id]: user,
    }),
    {},
  ), [dataUsers]);

  const filteredThreads = useMemo(() => {
    const source = selectedCategory
      ? threads.filter((t) => t.category === selectedCategory)
      : threads;

    return source.map((thread) => {
      const owner = usersById[thread.ownerId];

      return {
        ...thread,
        ownerName: owner?.name ?? 'Unknown',
      };
    });
  }, [threads, selectedCategory, usersById]);

  const isLoading = statusProfile === 'loading' || threadsStatus === 'loading' || usersStatus === 'loading';

  const isError = threadsStatus === 'error' || usersStatus === 'error';

  const errorMessage = threadsMessage || usersMessage;

  if (isLoading) {
    return <p style={{ textAlign: 'center', marginTop: 40 }}>Loading...</p>;
  }

  if (isError) {
    return <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>;
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '24px 16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginBottom: 16,
          flexWrap: 'wrap',
        }}
      >
        {categories.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              type="button"
              key={category}
              onClick={() => setSelectedCategory(isActive ? null : category)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#2563eb' : '#6b7280',
                textDecoration: isActive ? 'underline' : 'none',
              }}
            >
              #
              {category}
            </button>
          );
        })}
      </div>

      <h2 style={{ marginBottom: 24 }}>Diskusi Tersedia</h2>

      {threads.length === 0 && <p style={{ color: '#6b7280' }}>Belum ada thread</p>}

      {filteredThreads.length === 0 && (
        <p style={{ color: '#6b7280' }}>Tidak ada thread untuk kategori ini</p>
      )}

      {filteredThreads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} userId={userId} />
      ))}

      {userId && (
        <button
          type="button"
          onClick={() => navigate('/threads/new')}
          style={{
            position: 'fixed',
            right: 24,
            bottom: 24,
            width: 56,
            height: 56,
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#2563eb',
            color: '#fff',
            fontSize: 20,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          }}
        >
          <FaPlus />
        </button>
      )}
    </div>
  );
}
