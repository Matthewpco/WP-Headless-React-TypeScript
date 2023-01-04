export const extractEmailFromLocalstorage = (): string | undefined => {
  try {
    const user = JSON.parse(localStorage.pianoUser);
    return user?.email;
  } catch {
    return undefined;
  }
};
