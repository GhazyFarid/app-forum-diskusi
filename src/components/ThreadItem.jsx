import { useNavigate } from 'react-router-dom';
import { BiComment, BiUser } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import daysAgo from '../utils/date';
import VoteButton from './VoteButton';
import { htmlPreview } from '../utils/textUtils';
import { downVoteThread, neutralVoteThread, upVoteThread } from '../reducer/voteThreadReducer';

export default function ThreadItem({ thread, userId = '' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localThread, setLocalThread] = useState({
    ...thread,
    upVotesBy: thread.upVotesBy ?? [],
    downVotesBy: thread.downVotesBy ?? [],
  });

  useEffect(() => {
    setLocalThread({
      ...thread,
      upVotesBy: thread.upVotesBy ?? [],
      downVotesBy: thread.downVotesBy ?? [],
    });
  }, [thread]);

  const hasUpVoted = localThread.upVotesBy.includes(userId);
  const hasDownVoted = localThread.downVotesBy.includes(userId);

  const handleUpVote = () => {
    if (!userId) {
      alert('Please login first!');
      return;
    }

    // Sudah upvote
    if (hasUpVoted) {
      setLocalThread((prev) => ({
        ...prev,
        upVotesBy: prev.upVotesBy.filter((id) => id !== userId),
      }));

      // onNeutralVote();
      dispatch(neutralVoteThread(localThread.id));
      return;
    }

    // Belum upvote
    setLocalThread((prev) => ({
      ...prev,
      upVotesBy: [...prev.upVotesBy, userId],
      downVotesBy: prev.downVotesBy.filter((id) => id !== userId),
    }));

    // onUpVote();
    dispatch(upVoteThread(localThread.id));
  };

  const handleDownVote = () => {
    if (!userId) {
      alert('Please login first!');
      return;
    }

    // Sudah downvote
    if (hasDownVoted) {
      setLocalThread((prev) => ({
        ...prev,
        downVotesBy: prev.downVotesBy.filter((id) => id !== userId),
      }));

      // onNeutralVote();
      dispatch(neutralVoteThread(localThread.id));
      return;
    }

    // Belum downvote
    setLocalThread((prev) => ({
      ...prev,
      downVotesBy: [...prev.downVotesBy, userId],
      upVotesBy: prev.upVotesBy.filter((id) => id !== userId),
    }));

    // onDownVote();
    dispatch(downVoteThread(localThread.id));
  };

  const handleClickDetail = () => {
    navigate(`/threads/${localThread.id}`);
  };

  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          padding: '4px 10px',
          fontSize: 12,
          fontWeight: 500,
          backgroundColor: '#eff6ff',
          color: '#2563eb',
          borderRadius: 999,
          marginBottom: 8,
        }}
      >
        #
        {localThread.category}
      </div>

      <button
        type="button"
        onClick={handleClickDetail}
        style={{
          all: 'unset',
          cursor: 'pointer',
          color: '#111827',
          margin: '6px 0 8px',
          fontSize: '1.17em', // ukuran default h3
          fontWeight: 600,
          display: 'block',
        }}
      >
        {localThread.title}
      </button>

      <p
        style={{
          color: '#374151',
          lineHeight: 1.6,
          marginBottom: 16,
        }}
      >
        {htmlPreview(localThread.body, 31)}
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #e5e7eb',
          paddingTop: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <VoteButton
            type="up"
            count={localThread.upVotesBy.length}
            isActive={hasUpVoted}
            onClick={handleUpVote}
          />
          <VoteButton
            type="down"
            count={localThread.downVotesBy.length}
            isActive={hasDownVoted}
            onClick={handleDownVote}
          />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 12,
            color: '#6b7280',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <BiComment size={14} />
            {localThread.totalComments}
          </span>

          <span>{daysAgo(localThread.createdAt)}</span>

          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <BiUser size={14} />
            {localThread.ownerName}
          </span>
        </div>
      </div>
    </div>
  );
}
