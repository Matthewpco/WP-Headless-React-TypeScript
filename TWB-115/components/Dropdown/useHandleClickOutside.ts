import { useEffect, RefObject } from 'react';

/**
 * Hook that handles clicks outside of the passed ref
 */
export function useHandleClickOutside(
  ref: RefObject<HTMLInputElement>,
  handler: (event: MouseEvent) => void,
) {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      handler(event);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
