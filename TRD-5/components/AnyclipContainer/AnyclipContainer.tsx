import React, { FC, useEffect } from 'react';

declare const window: any;

export interface AnyclipContainerProps {
  src: string;
  containerId: string;
  folderName: string;
}

export const AnyclipContainer: FC<AnyclipContainerProps> = ({
  src,
  containerId,
  folderName,
}) => {
  useEffect(() => {
    window.ac_vh_params = {
      containerId,
      folderName,
    };

    const e = document.createElement('script');
    const n = document.getElementsByTagName('script')[0];
    e.type = 'text/javascript';
    e.async = true;
    e.src = src;
    n.parentNode?.insertBefore(e, n);

    return () => {
      e.remove();
      window.anyclip = undefined;
    };
  }, []);

  return <div id={containerId} />;
};
