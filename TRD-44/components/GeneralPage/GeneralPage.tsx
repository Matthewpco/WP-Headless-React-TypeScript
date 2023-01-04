// Template for general Perposes - Copied and cleand from Default Template
import React, { FC } from 'react';
import cx from 'classnames';
import styles from './GeneralPage.module.scss';
import stylesHubSpot from '../BrandStudio/BrandStudioHubSpot.module.scss';
import stylesPotsHyperlinks from '../DefaultPage/PotsHyperlinks.module.scss';
import { ArticleHead } from '../ArticleHead';
import { ArticleBody } from '../ArticleBody';
import { SeoFullHead } from '../../graphql';
import { useAds } from '../Ads/useAds';
import { initAdsHomepage } from '../Ads/initAdsHomepage';

export interface GeneralPageProps {
  seo: SeoFullHead;
  content: string;
}

export const GeneralPage: FC<GeneralPageProps> = ({ seo, content }) => {
  useAds(initAdsHomepage);

  return (
    <>
      <ArticleHead seo={seo} />
      <main className={styles.root}>
        <ArticleBody
          className={cx(
            stylesHubSpot.root,
            styles.content,
            stylesPotsHyperlinks.root,
          )}
          content={content}
        />
      </main>
    </>
  );
};
