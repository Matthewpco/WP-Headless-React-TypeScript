import React, { FC } from 'react';
import cx from 'classnames';
import { DataGetBrandStudio } from '../../graphql/getBrandStudio';
import { ArticleBody } from '../ArticleBody';
import styles from './PageBrandStudio.module.scss';
import stylesClients from './BrandStudioClients.module.scss';
import stylesDesc from './BrandStudioDesc.module.scss';
import stylesHeading from './BrandStudioHeading.module.scss';
import stylesSection from './BrandStudioSection.module.scss';
import stylesVideos from './BrandStudioVideos.module.scss';
import stylesHubspot from './BrandStudioHubSpot.module.scss';
import { ArticleHead } from '../ArticleHead';

export interface PageBrandStudioProps {
  data: DataGetBrandStudio;
}

export const PageBrandStudio: FC<PageBrandStudioProps> = ({ data }) => (
  <div>
    <ArticleHead seo={data.seo} />
    <ArticleBody
      as="main"
      className={cx(
        styles.root,
        stylesClients.root,
        stylesDesc.root,
        stylesHeading.root,
        stylesSection.root,
        stylesVideos.root,
        stylesHubspot.root,
      )}
      content={data?.contentFiltered ?? ''}
    />
  </div>
);
