import React, { FC } from 'react';
import Error from 'next/error';
import { useGraphqlLazyQuery } from '../../generic/graphql/useGraphqlLazyQuery';
import { IdGraphqlQuery } from '../../generic/graphql/IdGraphqlQuery';
import { Container } from '../Container';
import styles from '../TagPage/TagPage.module.scss';
import { GenericPost } from '../../graphql/fragmentAuthorPosts';
import { ArticleScroller } from '../ArticleScroller/ArticleScroller';
import { RequestGetCompanyPost, ResponseGetCompanyPosts } from '../../graphql/getCompanyPosts';
import { CompanyData } from '../../graphql/getCompany';
import { TagPost } from '../TagPage/TagPost';
import { ArticleHead } from '../ArticleHead';
import { TagHeading } from '../TagPage/TagHeading/TagHeading';
import { PageInfo } from '../PageInfo/PageInfo';
import { useInfPosts } from '../AuthorPage/utils/useInfPosts';

import { AdUnitFooter } from '../Ad/units/AdUnitFooter';

export interface CompanyPageProps {
  company: CompanyData;
  mostViewed: GenericPost[];
}

export const CompanyPage: FC<CompanyPageProps> = ({ company, mostViewed }) => {
  const [fetchAuthorPosts] = useGraphqlLazyQuery<
    ResponseGetCompanyPosts,
    RequestGetCompanyPost
  >(IdGraphqlQuery.getCompanyPosts);

  const { posts, market, setMarket, loadMoreRows } = useInfPosts(
    'companyName',
    fetchAuthorPosts,
    company?.posts?.nodes,
    (data) => data?.company?.posts?.nodes,
  );

  if (!company?.slug || !company?.posts?.nodes?.length) {
    return <Error statusCode={404} />;
  }

  return (
    <Container className={styles.root}>
      <ArticleHead seo={company?.seo} />


      <TagHeading
        markets={company?.markets}
        title={company?.name}
        mostViewed={mostViewed}
        market={market}
        setMarket={setMarket}
      />

      <PageInfo pageInfo={company?.posts?.pageInfo} />

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
