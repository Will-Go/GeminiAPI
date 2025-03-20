const LOCALE = "es-ES";

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  return date.toLocaleString(LOCALE, options);
};

const timeAgo = (isoDate: string): string => {
  const now = new Date().getTime(); // Convert to timestamp
  const past = new Date(isoDate).getTime(); // Convert to timestamp (UTC)
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60)
    return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60)
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7)
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;

  // If more than 7 days, format the date as "Feb 4, 2024"
  return new Date(isoDate).toLocaleDateString(LOCALE, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Ensures 24-hour format
  });
};

export { formatDate, timeAgo };
