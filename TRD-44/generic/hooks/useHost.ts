import { useEffect, useState } from 'react';

export const useHost = (): string => {
  const [hostName, setHostName] = useState('');

  useEffect(() => {
    if (window === undefined || process.env.NODE_ENV === 'production') {
      return;
    }

    const host = window.location.hostname;
    setHostName(
      host.includes('localhost') && process.env.NEXT_PUBLIC_WP_URL
        ? process.env.NEXT_PUBLIC_WP_URL
        : `https://${host}`,
    );
  }, []);

  return hostName;
};
