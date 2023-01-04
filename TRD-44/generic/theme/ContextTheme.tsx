import React, { createContext, FC, useEffect, useMemo, useState } from 'react';
import { storage } from '../storage/storage';
import { IdStorage } from '../storage/IdStorage';
import { IdTheme } from './IdTheme';
import { useNativeTheme } from './useNativeTheme';

export interface ContextThemeValues {
  theme: IdTheme;
  onChange: (value: IdTheme) => void;
}

export const ContextTheme = createContext<ContextThemeValues>({
  theme: IdTheme.Light,
  onChange: () => undefined,
});
ContextTheme.displayName = 'ContextTheme';

export const ProviderTheme: FC = ({ children }) => {
  const { theme: nativeTheme, getTheme: getNativeTheme } = useNativeTheme();

  const [theme, setTheme] = useState(nativeTheme ?? IdTheme.Light);

  useEffect(() => {
    const initialNativeTheme = getNativeTheme();
    const initialStorageTheme = storage.getItem<IdTheme>(IdStorage.Theme);

    setTheme(initialStorageTheme ?? initialNativeTheme ?? IdTheme.Light);
  }, [getNativeTheme]);

  useEffect(() => {
    if (nativeTheme) {
      setTheme(nativeTheme);
      storage.setItem(IdStorage.Theme, nativeTheme);
    }
  }, [nativeTheme]);

  const values: ContextThemeValues = useMemo(
    () => ({
      theme,
      onChange: (value) => {
        setTheme(value);
        storage.setItem(IdStorage.Theme, value);
      },
    }),
    [theme, setTheme],
  );

  return (
    <ContextTheme.Provider value={values}>
      <div data-theme={theme}>{children}</div>
    </ContextTheme.Provider>
  );
};
