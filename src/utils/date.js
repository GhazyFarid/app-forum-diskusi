export function daysAgo(dateString) {
  const created = new Date(dateString);
  const now = new Date();

  const diffMs = now - created;

  if (diffMs < 0) return "hari ini";

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) {
    return `${seconds} detik lalu`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} menit lalu`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} jam lalu`;
  }

  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}
