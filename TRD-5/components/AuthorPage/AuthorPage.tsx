import React, { FC } from 'react';
import Error from 'next/error';
import { Container } from '../Container';
import { AuthorData, RequestGetAuthor } from '../../graphql/getAuthor';
import type { PropsField } from '../../graphql';
import { AuthorHeading } from './AuthorHeading/AuthorHeading';
import styles from './AuthorPage.module.scss';
import { ResponseGetAuthorPosts } from '../../graphql/getAuthorPosts';
import { ArticleScroller } from '../ArticleScroller/ArticleScroller';
import { AuthorPost } from './AuthorPost';
import { ArticleHead } from '../ArticleHead';
import { PageInfo } from '../PageInfo/PageInfo';
import { useGraphqlLazyQuery } from '../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../generic/graphql/IdGraphqlQuery';
import { useInfPosts } from './utils/useInfPosts';

import { AdUnitFooter } from '../Ad/units/AdUnitFooter';
import { AdUnit } from '../Ad/units/AdUnit';
import { adSizes } from '../Ad/config/adSizes';
import { useContextAds } from '../Ad/ContextAds';

export interface AuthorPageProps {
  propsField: PropsField[];
  author: AuthorData;
}

export const AuthorPage: FC<AuthorPageProps> = ({ author, propsField }) => {
  const { device } = useContextAds();

  const [fetchAuthorPosts] = useGraphqlLazyQuery<
    ResponseGetAuthorPosts,
    RequestGetAuthor
  >(IdGraphqlQuery.getAuthorPosts);

  const { posts, market, setMarket, loadMoreRows } = useInfPosts(
    'authorName',
    fetchAuthorPosts,
    author?.posts?.nodes,
    (data) => data?.user?.posts?.nodes,
    (id) => `/author/${id}`,
  );

  if (!author?.slug || !author?.posts?.nodes?.length) {
    return <Error statusCode={404} />;
  }

  return (
    <Container className={styles.root}>
      <ArticleHead seo={author?.seo} />


      <AuthorHeading
        author={author}
        className={styles.authorHeading}
        propsField={propsField}
        market={market}
        setMarket={setMarket}
      />

      <PageInfo pageInfo={author?.posts?.pageInfo} />

      <div className={styles.container}>
        <div className={styles.center}>
          <ArticleScroller
            posts={posts}
            loadMoreRows={loadMoreRows}
            component={AuthorPost}
          />
        </div>

        <aside className={styles.right}>
          <AdUnit
            id="div-id-for-right-1"
            size={adSizes.right[device]}
            className="trd-ad trd-ad-center"
          />

          <AdUnit
            id="div-id-for-right-2"
            size={adSizes.right[device]}
            className="trd-ad trd-ad-center"
          />
        </aside>
      </div>

      <AdUnitFooter />
    </Container>
  );
};
