import { FC, useEffect } from 'react';

interface CustomScriptProps {
  id: string;
  link: string;
}

export const CustomScriptLink: FC<CustomScriptProps> = ({ id, link }) => {
  useEffect(() => {
    const e = document.createElement('script');
    const n = document.getElementsByTagName('script')[0];
    e.id = id;
    e.type = 'text/javascript';
    e.async = true;
    e.src = link;
    n.parentNode?.insertBefore(e, n);

    return () => e.remove();
  }, []);

  return null;
};
