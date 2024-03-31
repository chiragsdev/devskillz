export const calculateProgress = (totalLecture, watchedLectures) => {
  if (totalLecture === 0) return 0;
  const res = (watchedLectures / totalLecture) * 100;
  return res.toFixed(0);
};

// Function to format date
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}
