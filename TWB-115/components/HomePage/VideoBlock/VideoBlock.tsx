import React, { FC, memo, useEffect, useRef } from 'react';
import styles from './VideoBlock.module.scss';

export interface VideoData {
  ar: string;
  plid: string;
  pubname: string;
  src: string;
  widgetname: string;
  section_id: string;
}

declare const window: any;

export const VideoBlock: FC<VideoData> = memo(
  ({ ar, plid, pubname, src, widgetname, section_id }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!ref.current) {
        return () => undefined;
      }

      window.ac_vh_params = {
        containerId: section_id,
        folderName: widgetname,
      };

      const e = document.createElement('script');
      e.type = 'text/javascript';
      e.async = true;
      e.src = src;
      e.setAttribute('data-ar', ar);
      e.setAttribute('data-plid', plid);
      e.setAttribute('pubname', pubname);
      e.setAttribute('widgetname', widgetname);
      ref.current?.appendChild(e);

      return () => {
        e.remove();
        window.anyclip = undefined;
      };
    }, []);

    return <section className={styles.root} id={section_id} ref={ref} />;
  },
  () => true,
);
