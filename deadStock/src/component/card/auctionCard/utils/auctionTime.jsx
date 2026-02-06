export const getTimeLeft = (endTime) => {
  if (!endTime) return "—";

  const now = Date.now();
  const diff = endTime.toMillis() - now;

  if (diff <= 0) return "Ended";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
};
