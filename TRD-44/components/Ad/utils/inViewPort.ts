export const inViewPort = (query: string, offset = 0): boolean => {
  const element = document.querySelector(query);

  if (!element) {
    return false;
  }

  const elementClientRect = element.getBoundingClientRect();

  return (
    elementClientRect.bottom > 0 &&
    elementClientRect.right > 0 &&
    elementClientRect.left <
      (window.innerWidth || document.documentElement.clientWidth) &&
    elementClientRect.top <
      (window.innerHeight || document.documentElement.clientHeight) + offset
  );
};
