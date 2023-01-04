import React, { FC } from 'react';
import styles from './MagazinePreviewCardWrapper.module.scss';
import { MagazinePreviewCard } from '../MagazinePreviewCard';
import { NodesData } from '../../graphql/getMagazineIssueArchivesCards';
import { ArticleScrollerBaseComponentProps } from '../ArticleScroller/ArticleScroller';
import { WithAdBlock } from '../ArticleScroller/WithAdBlock';

export const MagazinePreviewCardWrapper: FC<
  ArticleScrollerBaseComponentProps<WithAdBlock<NodesData[]>>
> = ({ article }) => (
  <div className={styles.cardsWrapper}>
    {Array.isArray(article) &&
      article.map((item) => <MagazinePreviewCard {...item} />)}
  </div>
);
