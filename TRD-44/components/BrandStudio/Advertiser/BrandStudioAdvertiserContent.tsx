import React, { FC, useMemo } from 'react';
import parse from 'html-react-parser';
import { BrandStudioAdvertiserProps } from './BrandStudioAdvertiser';
import { decodeHtmlSpecialChars } from '../../../generic/utils';
import styles from './BrandStudioAdvertiserContent.module.scss';

export interface BrandStudioAdvertiserContentProps
  extends Pick<BrandStudioAdvertiserProps, 'content'> {}

export const BrandStudioAdvertiserContent: FC<BrandStudioAdvertiserContentProps> =
  ({ content }) => {
    const parsedContent = useMemo(
      () => parse(decodeHtmlSpecialChars(content)),
      [content],
    );

    return <div className={styles.root}>{parsedContent}</div>;
  };
