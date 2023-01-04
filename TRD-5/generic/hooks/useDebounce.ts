import { useCallback, useRef } from 'react';

export const useDebounce = (delay: number) => {
  const refHandle = useRef(0);

  return useCallback(
    (handle: () => void) => {
      if (refHandle.current) {
        clearTimeout(refHandle.current);
      }

      refHandle.current = window.setTimeout(handle, delay);
    },
    [delay],
  );
};
