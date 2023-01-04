export const extractPageFromQuery = (page: string | string[] | undefined) => {
  if (page) {
    return parseInt(page as string, 10);
  }

  return 1;
};
