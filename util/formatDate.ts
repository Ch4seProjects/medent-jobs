import type { Job } from "@/types/job";

export const formatPostedDate = (postedData: Job["postedDate"]) => {
  const now = new Date();
  const posted = new Date(postedData);

  const diffMs = now.getTime() - posted.getTime();

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}hr`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;

  const years = Math.floor(days / 365);
  return `${years}y`;
};

export const formatClosingDate = (closingDate: Job["closingDate"]) => {
  if (!closingDate) return "Open until filled";

  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(closingDate));
  return `Closes ${date}`;
};
