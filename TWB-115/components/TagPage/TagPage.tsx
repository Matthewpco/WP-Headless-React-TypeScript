import React, { FC } from 'react';
import Error from 'next/error';
import { Container } from '../Container';
import styles from './TagPage.module.scss';
import { GenericPost } from '../../graphql/fragmentAuthorPosts';
import { ArticleScroller } from '../ArticleScroller/ArticleScroller';
import { RequestGetTagPost, ResponseGetTagPosts } from '../../graphql/getTagPosts';
import { TagHeading } from './TagHeading/TagHeading';
import { TagData } from '../../graphql/getTag';
import { TagPost } from './TagPost';
import { ArticleHead } from '../ArticleHead';
import { useGraphqlLazyQuery } from '../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../generic/graphql/IdGraphqlQuery';
import { PageInfo } from '../PageInfo/PageInfo';
import { useInfPosts } from '../AuthorPage/utils/useInfPosts';

import { AdUnitFooter } from '../Ad/units/AdUnitFooter';

export interface TagPageProps {
  tag: TagData;
  mostViewed: GenericPost[];
}

export const TagPage: FC<TagPageProps> = ({ tag, mostViewed }) => {
  const [fetchAuthorPosts] = useGraphqlLazyQuery<
    ResponseGetTagPosts,
    RequestGetTagPost
  >(IdGraphqlQuery.getTagPosts);

  const { posts, market, setMarket, loadMoreRows } = useInfPosts(
    'tagName',
    fetchAuthorPosts,
    tag?.posts?.nodes,
    (data) => data?.tag?.posts?.nodes,
  );

  if (!tag?.slug || !tag?.posts?.nodes?.length) {
    return <Error statusCode={404} />;
  }

  return (
    <Container className={styles.root}>
      <ArticleHead seo={tag?.seo} />


      <TagHeading
        className={styles.tagHeading}
        markets={tag?.markets}
        title={tag?.name}
        mostViewed={mostViewed}
        market={market}
        setMarket={setMarket}
      />

      <PageInfo pageInfo={tag?.posts?.pageInfo} />

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
