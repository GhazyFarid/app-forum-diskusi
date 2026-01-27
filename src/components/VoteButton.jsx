import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

export default function VoteButton({
  type, count, isActive, onClick, disabled,
}) {
  const isUp = type === 'up';
  const activeColor = '#2563eb';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        marginRight: 12,
        padding: '6px 10px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: '#ffffff',
        border: `1px solid ${isActive ? activeColor : '#cbd5e1'}`,
        borderRadius: 6,
        fontSize: 14,
        color: isActive ? activeColor : '#0a0a0a',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {isUp ? <FaThumbsUp size={18} /> : <FaThumbsDown size={18} />}
      <span>{count}</span>
    </button>
  );
}
