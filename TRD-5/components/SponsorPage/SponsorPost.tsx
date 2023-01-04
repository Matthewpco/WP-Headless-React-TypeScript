import React, { FC } from 'react';
import { SponsorArticle, SponsorArticleProps } from './SponsorArticle';
import styles from './SponsorPost.module.scss';

export const SponsorPost: FC<SponsorArticleProps> = (props) => (
  <SponsorArticle
    {...props}
    classNamePublishedDate={styles.publishedDate}
    classNameDescription={styles.description}
  />
);
