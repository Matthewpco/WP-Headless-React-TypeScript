import React, { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { Container } from '../Container';
import styles from './SponsoredPage.module.scss';
import { GenericPost } from '../../graphql/fragmentAuthorPosts';
import { ArticleScroller } from '../ArticleScroller/ArticleScroller';
import { WithAdBlock } from '../ArticleScroller/WithAdBlock';
import { RequestGetSponsored, ResponseGetSponsored } from '../../graphql/getSponsored';
import { TagPost } from '../TagPage/TagPost';
import { useGraphqlLazyQuery } from '../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../generic/graphql/IdGraphqlQuery';
import { useAds } from '../Ads/useAds';
import { initAdsBlogroll } from '../Ads/initAdsBlogroll';

import { AdUnitFooter } from '../Ad/units/AdUnitFooter';

export interface TagPageProps {
  sponsors: GenericPost[];
}

export const SponsoredPage: FC<TagPageProps> = ({ sponsors }) => {
  const { query } = useRouter();

  useAds(() => initAdsBlogroll('sponsored'));

  const [fetchSponsored] = useGraphqlLazyQuery<
    ResponseGetSponsored,
    RequestGetSponsored
  >(IdGraphqlQuery.getSponsored);

  const [page, setPage] = useState(
    query.pageNumber ? parseInt(query.pageNumber as string, 10) : 1,
  );
  const [posts, setPosts] = useState<WithAdBlock<GenericPost>[]>(
    (() => {
      const newArr: WithAdBlock<GenericPost>[] = sponsors?.slice() ?? [];
      newArr.splice(5, 0, { type: 'ad', id: 6 });
      return newArr;
    })(),
  );

  const loadMoreRows = useCallback(async () => {
    const response = await fetchSponsored({
      page: page + 1,
    });

    const newPosts: WithAdBlock<GenericPost>[] =
      response.data?.sponsors?.nodes?.slice() ?? [];
    if (newPosts.length) {
      newPosts.splice(5, 0, { type: 'ad', id: posts.length + 5 });
      newPosts.splice(0, 0, { type: 'ad', id: posts.length });
    }

    setPage(page + 1);
    setPosts([...posts, ...newPosts]);

    return Promise.resolve();
  }, [page, posts]);

  if (!sponsors?.length) {
    return <Error statusCode={404} />;
  }

  return (
    <Container className={styles.root}>

      <h1 className={styles.title}>Sponsored Content</h1>

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
