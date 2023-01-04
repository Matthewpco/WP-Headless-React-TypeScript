import React, { FC } from 'react';
import styles from './BrandStudioAdvertiser.module.scss';
import { BrandStudioAdvertiserContent } from './BrandStudioAdvertiserContent';
import { BrandStudioAdvertiserSlider } from './BrandStudioAdvertiserSlider';

export interface BrandStudioAdvertiserProps {
  content: string;
  advertiser: string;
  postCount: number;
}

export const BrandStudioAdvertiser: FC<BrandStudioAdvertiserProps> = ({
  content,
  advertiser,
  postCount,
}) => (
  <section className={styles.root}>
    <BrandStudioAdvertiserContent content={content} />
    <BrandStudioAdvertiserSlider
      advertiser={advertiser}
      postCount={postCount}
    />
  </section>
);
