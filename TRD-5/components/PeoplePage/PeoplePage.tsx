import React, { FC } from 'react';
import Error from 'next/error';
import { useGraphqlLazyQuery } from '../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../generic/graphql/IdGraphqlQuery';
import { Container } from '../Container';
import styles from '../TagPage/TagPage.module.scss';
import { GenericPost } from '../../graphql/fragmentAuthorPosts';
import { ArticleScroller } from '../ArticleScroller/ArticleScroller';
import {
  RequestGetPersonPost,
  ResponseGetPersonPosts,
} from '../../graphql/getPersonPosts';
import { PersonData } from '../../graphql/getPerson';
import { TagPost } from '../TagPage/TagPost';
import { ArticleHead } from '../ArticleHead';
import { TagHeading } from '../TagPage/TagHeading/TagHeading';
import { PageInfo } from '../PageInfo/PageInfo';
import { useAds } from '../Ads/useAds';
import { initAdsBlogroll } from '../Ads/initAdsBlogroll';
import { useInfPosts } from '../AuthorPage/utils/useInfPosts';

import { AdUnitFooter } from '../Ad/units/AdUnitFooter';

export interface PersonPageProps {
  person: PersonData;
  mostViewed: GenericPost[];
}

export const PeoplePage: FC<PersonPageProps> = ({ person, mostViewed }) => {
  useAds(() => initAdsBlogroll(person?.slug?.slice(0, 35)));

  const [fetchAuthorPosts] = useGraphqlLazyQuery<
    ResponseGetPersonPosts,
    RequestGetPersonPost
  >(IdGraphqlQuery.getPersonPosts);

  const { posts, market, setMarket, loadMoreRows } = useInfPosts(
    'tagName',
    fetchAuthorPosts,
    person?.posts?.nodes,
    (data) => data?.person?.posts?.nodes,
  );

  if (!person?.slug || !person?.posts?.nodes?.length) {
    return <Error statusCode={404} />;
  }

  return (
    <Container className={styles.root}>
      <ArticleHead seo={person?.seo} />


      <TagHeading
        markets={person?.markets}
        title={person?.name}
        mostViewed={mostViewed}
        market={market}
        setMarket={setMarket}
      />

      <PageInfo pageInfo={person?.posts?.pageInfo} />

      <div className={styles.content}>
        <ArticleScroller
          posts={posts}
          loadMoreRows={loadMoreRows}
          component={TagPost}
          fullWidth
        />
      </div>

      <AdUnitFooter />
    </Container>
  );
};
