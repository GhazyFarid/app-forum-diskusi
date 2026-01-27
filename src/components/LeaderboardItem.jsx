export default function LeaderboardItem({ rank, user, score }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: 16,
        marginBottom: 12,
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        backgroundColor: '#ffffff',
      }}
    >
      <div
        style={{
          width: 32,
          textAlign: 'center',
          fontWeight: 700,
          fontSize: 18,
        }}
      >
        #
        {rank}
      </div>

      <img
        src={user.avatar}
        alt={user.name}
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
        }}
      />

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{user.name}</div>
        <div style={{ fontSize: 13, color: '#6b7280' }}>{user.email}</div>
      </div>

      <div
        style={{
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        {score}
      </div>
    </div>
  );
}
