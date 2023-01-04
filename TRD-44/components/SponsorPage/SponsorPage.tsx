import React, { FC } from 'react';
import Error from 'next/error';
import { Container } from '../Container';
import {
  RequestGetSponsoredPage,
  SponsoredData,
} from '../../graphql/getSponseredPage';
import { SponsorHeading } from './SponsorHeading/SponsorHeading';
import styles from './SponsorPage.module.scss';
import { ResponseGetSponsoredPosts } from '../../graphql/getSponsoredPost';
import { ArticleScroller } from '../ArticleScroller/ArticleScroller';
import { SponsorPost } from './SponsorPost';
import { useGraphqlLazyQuery } from '../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../generic/graphql/IdGraphqlQuery';
import { PageInfo } from '../PageInfo/PageInfo';
import { useInfPosts } from '../AuthorPage/utils/useInfPosts';
import { AdUnitFooter } from '../Ad/units/AdUnitFooter';

export interface SponsorPageProps {
  sponsor: SponsoredData;
}

export const SponsorPage: FC<SponsorPageProps> = ({ sponsor }) => {
  const [fetchSponsoredPosts] = useGraphqlLazyQuery<
    ResponseGetSponsoredPosts,
    RequestGetSponsoredPage
  >(IdGraphqlQuery.getSponsoredPosts);

  const { posts, market, setMarket, loadMoreRows } = useInfPosts(
    'sponsorName',
    fetchSponsoredPosts,
    sponsor?.sponsors?.nodes,
    (data) => data?.advertiser?.sponsors?.nodes,
  );

  if (!sponsor?.slug || !sponsor?.sponsors?.nodes?.length) {
    return <Error statusCode={404} />;
  }

  return (
    <Container className={styles.root}>
      <SponsorHeading
        sponsor={sponsor}
        className={styles.sponsorHeading}
        market={market}
        setMarket={setMarket}
      />

      <PageInfo pageInfo={sponsor?.sponsors?.pageInfo} />

      <div className={styles.container}>
        <ArticleScroller
          posts={posts}
          loadMoreRows={loadMoreRows}
          component={SponsorPost}
          fullWidth
        />
      </div>

      <AdUnitFooter />
    </Container>
  );
};
