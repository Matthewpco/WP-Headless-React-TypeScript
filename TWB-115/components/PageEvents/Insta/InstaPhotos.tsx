import React, { FC } from 'react';
import { InstaPhotosItem } from './pipeInstaPhotos';
import styles from './InstaPhotos.module.scss';
import { List } from '../../List';

export interface InstaPhotosProps {
  title: string;
  medias: InstaPhotosItem[];
}

const renderMedia = ({ id, mediaUrl }: InstaPhotosItem) => (
  <img
    key={id}
    src={mediaUrl}
    className={styles.image}
    alt="instagram"
    loading="lazy"
  />
);

export const InstaPhotos: FC<InstaPhotosProps> = ({ title, medias }) => (
  <section className={styles.root}>
    <h3 className={styles.title}>{title}</h3>
    <div className={styles.content}>
      <List items={medias} render={renderMedia} />
    </div>
  </section>
);
