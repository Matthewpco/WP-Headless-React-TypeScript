import React, { FC } from 'react';
import cx from 'classnames';
import styles from './ArticleUtils.module.scss';
import { SocialShare, SocialShareProps } from '../SocialShare';
import { FontSizeToggle } from '../FontSize';

export interface ArticleUtilsProps
  extends Pick<SocialShareProps, 'sharedUrl' | 'sharedTitle'> {
  className?: string;
}

export const ArticleUtils: FC<ArticleUtilsProps> = ({
  sharedUrl,
  sharedTitle,
  className,
}) => (
  <div className={cx(styles.root, className)}>
    <FontSizeToggle />
    <SocialShare
      sharedUrl={sharedUrl}
      sharedTitle={sharedTitle}
      shortVersion
      showTitle={false}
      className={styles.socialShare}
    />
  </div>
);
