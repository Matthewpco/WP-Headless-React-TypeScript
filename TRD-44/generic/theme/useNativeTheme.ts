import { useCallback, useEffect, useState } from 'react';
import { IdTheme } from './IdTheme';
import { isClientSide } from '../utils';

const getNextTheme = (matches: boolean) =>
  matches ? IdTheme.Dark : IdTheme.Light;

export const useNativeTheme = () => {
  const [theme, setTheme] = useState<IdTheme>();

  useEffect(() => {
    const mqListener = (e: MediaQueryListEvent) =>
      setTheme(getNextTheme(e.matches));

    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');

    darkThemeMq.addEventListener('change', mqListener);

    return () => darkThemeMq.removeEventListener('change', mqListener);
  }, []);

  const getTheme = useCallback(() => {
    if (!isClientSide()) {
      return null;
    }

    return getNextTheme(
      window.matchMedia('(prefers-color-scheme: dark)').matches,
    );
  }, []);

  return { theme, getTheme };
};
