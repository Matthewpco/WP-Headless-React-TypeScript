import React, { createContext, FC, useEffect, useMemo, useState } from 'react';
import { FontSize } from '../../generic/types';
import { storage } from '../../generic/storage/storage';
import { IdStorage } from '../../generic/storage/IdStorage';

export interface ContextFontSizeValues {
  size: FontSize;
  onChange: (value: FontSize) => void;
}

export const ContextFontSize = createContext<ContextFontSizeValues>({
  size: 'small',
  onChange: () => undefined,
});
ContextFontSize.displayName = 'ContextFontSize';

export const ProviderFontSize: FC = ({ children }) => {
  const [size, setSize] = useState<FontSize>('small');

  useEffect(() => {
    setSize(storage.getItem<FontSize>(IdStorage.FontSize) ?? 'small');
  }, []);

  const values: ContextFontSizeValues = useMemo(
    () => ({
      size,
      onChange: (value) => {
        setSize(value);
        storage.setItem(IdStorage.FontSize, value);
      },
    }),
    [size, setSize],
  );

  return (
    <ContextFontSize.Provider value={values}>
      {children}
    </ContextFontSize.Provider>
  );
};
