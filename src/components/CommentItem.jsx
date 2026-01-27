import { useEffect, useState } from 'react';

import VoteButton from './VoteButton';
import daysAgo from '../utils/date';
import { safeHtml } from '../utils/textUtils';

export default function CommentItem({
  comment, userId, onUpVote, onDownVote, onNeutralVote,
}) {
  const [localComment, setLocalComment] = useState(comment);

  useEffect(() => {
    setLocalComment(comment);
  }, [comment]);

  const hasUpVoted = localComment.upVotesBy.includes(userId);
  const hasDownVoted = localComment.downVotesBy.includes(userId);

  const handleUpVote = () => {
    if (!userId) {
      alert('Please login first!');
      return;
    }

    if (hasUpVoted) {
      setLocalComment((prev) => ({
        ...prev,
        upVotesBy: prev.upVotesBy.filter((id) => id !== userId),
      }));

      onNeutralVote();
      return;
    }

    setLocalComment((prev) => ({
      ...prev,
      upVotesBy: [...prev.upVotesBy, userId],
      downVotesBy: prev.downVotesBy.filter((id) => id !== userId),
    }));

    onUpVote();
  };

  const handleDownVote = () => {
    if (!userId) {
      alert('Please login first!');
      return;
    }

    if (hasDownVoted) {
      setLocalComment((prev) => ({
        ...prev,
        downVotesBy: prev.downVotesBy.filter((id) => id !== userId),
      }));

      onNeutralVote();
      return;
    }

    setLocalComment((prev) => ({
      ...prev,
      downVotesBy: [...prev.downVotesBy, userId],
      upVotesBy: prev.upVotesBy.filter((id) => id !== userId),
    }));

    onDownVote();
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        padding: 16,
        marginBottom: 16,
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        backgroundColor: '#ffffff',
      }}
    >
      <img
        src={localComment.owner.avatar}
        alt={localComment.owner.name}
        style={{ width: 36, height: 36, borderRadius: '50%' }}
      />

      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 6,
            fontSize: 13,
            color: '#6b7280',
          }}
        >
          <span style={{ fontWeight: 500, color: '#111827' }}>{localComment.owner.name}</span>
          <span>{daysAgo(localComment.createdAt)}</span>
        </div>

        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={safeHtml(localComment.content)}
        />

        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <VoteButton
            type="up"
            count={localComment.upVotesBy.length}
            isActive={hasUpVoted}
            onClick={handleUpVote}
          />
          <VoteButton
            type="down"
            count={localComment.downVotesBy.length}
            isActive={hasDownVoted}
            onClick={handleDownVote}
          />
        </div>
      </div>
    </div>
  );
}
