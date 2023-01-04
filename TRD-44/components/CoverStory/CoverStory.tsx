import React, { FC } from 'react';
import styles from './CoverStory.module.scss';
import { Closing } from '../Closing';
import { ArticleScrollerBaseComponentProps } from '../ArticleScroller/ArticleScroller';
import { FormattedArticle } from '../MagazineDisplay/MagazineDisplay';

export interface CoverStoryProps
  extends ArticleScrollerBaseComponentProps<FormattedArticle> {
  className?: string;
}

export const CoverStory: FC<CoverStoryProps> = ({ article }) => (
  <Closing
    className={styles.coverFlexDirection}
    classNameCoverHeaderSize={styles.coverHeaderSize}
    article={article}
  />
);
