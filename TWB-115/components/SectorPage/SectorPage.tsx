import React, { FC } from 'react';
import Error from 'next/error';
import { Container } from '../Container';
import styles from '../TagPage/TagPage.module.scss';
import { GenericPost } from '../../graphql/fragmentAuthorPosts';
import { ArticleScroller } from '../ArticleScroller/ArticleScroller';
import {
  RequestGetSectorPost,
  ResponseGetSectorPosts,
} from '../../graphql/getSectorPosts';
import { TagHeading } from '../TagPage/TagHeading/TagHeading';
import { SectorData } from '../../graphql/getSector';
import { AuthorPost } from '../AuthorPage/AuthorPost';
import { ArticleHead } from '../ArticleHead';
import { useGraphqlLazyQuery } from '../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../generic/graphql/IdGraphqlQuery';
import { PageInfo } from '../PageInfo/PageInfo';
import { useAds } from '../Ads/useAds';
import { initAdsBlogroll } from '../Ads/initAdsBlogroll';
import { useInfPosts } from '../AuthorPage/utils/useInfPosts';

import { AdUnitFooter } from '../Ad/units/AdUnitFooter';

export interface SectorPageProps {
  sector: SectorData;
  mostViewed: GenericPost[];
}

export const SectorPage: FC<SectorPageProps> = ({ sector, mostViewed }) => {
  useAds(() => initAdsBlogroll(sector?.slug?.slice(0, 35)));

  const [fetchAuthorPosts] = useGraphqlLazyQuery<
    ResponseGetSectorPosts,
    RequestGetSectorPost
  >(IdGraphqlQuery.getSectorPosts);

  const { posts, market, setMarket, loadMoreRows } = useInfPosts(
    'sectorName',
    fetchAuthorPosts,
    sector?.posts?.nodes,
    (data) => data?.sector?.posts?.nodes,
  );

  if (!sector?.slug || !sector?.posts?.nodes?.length) {
    return <Error statusCode={404} />;
  }

  return (
    <Container className={styles.root}>
      <ArticleHead seo={sector?.seo} />


      <TagHeading
        markets={sector?.markets}
        title={sector?.name}
        mostViewed={mostViewed}
        market={market}
        setMarket={setMarket}
      />

      <PageInfo pageInfo={sector?.posts?.pageInfo} />

      <div className={styles.content}>
        <ArticleScroller
          posts={posts}
          loadMoreRows={loadMoreRows}
          component={AuthorPost}
          fullWidth
        />
      </div>

      <AdUnitFooter />
    </Container>
  );
};
