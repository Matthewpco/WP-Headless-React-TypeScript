export const findNext = <T>(arr: T[], current: T) => {
  const currentIndex = arr.findIndex((item) => item === current);
  const nextIndex = (currentIndex + 1) % arr.length;

  return arr[nextIndex];
};
