export const calculateProgress = (totalLecture, watchedLectures) => {
  if (totalLecture === 0) return 0;
  const res = (watchedLectures / totalLecture) * 100;
  return res.toFixed(0);
};
