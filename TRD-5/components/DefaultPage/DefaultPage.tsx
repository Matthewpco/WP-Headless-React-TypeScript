import React, { FC } from 'react';
import cx from 'classnames';
import styles from './DefaultPage.module.scss';
import stylesAdvertising from './AdvertisingPage.module.scss';
import stylesHubSpot from '../BrandStudio/BrandStudioHubSpot.module.scss';
import stylesClientList from '../PageEvents/ClientList.module.scss';
import stylesPotsHyperlinks from './PotsHyperlinks.module.scss';
import { ArticleHead } from '../ArticleHead';
import { ArticleBody } from '../ArticleBody';
import { SeoFullHead } from '../../graphql';
import { useAds } from '../Ads/useAds';
import { initAdsHomepage } from '../Ads/initAdsHomepage';

export interface DefaultPageProps {
  seo: SeoFullHead;
  content: string;
}

export const DefaultPage: FC<DefaultPageProps> = ({ seo, content }) => {
  useAds(initAdsHomepage);

  return (
    <>
      <ArticleHead seo={seo} />
      <main className={styles.root}>
        <ArticleBody
          className={cx(
            stylesHubSpot.root,
            stylesClientList.root,
            styles.content,
            stylesAdvertising.root,
            stylesPotsHyperlinks.root,
          )}
          content={content}
        />
      </main>
    </>
  );
};
