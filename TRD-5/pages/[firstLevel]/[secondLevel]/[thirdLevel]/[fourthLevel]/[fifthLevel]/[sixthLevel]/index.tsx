import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  ArticlePage,
  ArticleProps,
} from '../../../../../../../components/Page/ArticlePage';
import { getServerSidePropsArticle as getStaticProps } from '../../../../../../../components/Page/getServerSidePropsArticle';
import { initAdsArticles } from '../../../../../../../components/Ads/initAdsArticles';
import { useAds } from '../../../../../../../components/Ads/useAds';
import { ProgressIndicatorPage } from '../../../../../../../components/ProgressIndicator/ProgressIndicatorPage';
import { IdGraphqlQuery } from '../../../../../../../generic/graphql/IdGraphqlQuery';
import { IUseArticlesParams } from '../../../../../../../components/Page/useArticle.hook';

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export { getStaticProps };

const extractPostFromResponse: IUseArticlesParams['extractPostFromResponse'] = (
  response,
) => response?.data?.previousPost;

const Page: NextPage<ArticleProps> = (props) => {
  useAds(() => initAdsArticles(props?.article));

  const router = useRouter();

  if (router.isFallback) {
    return <ProgressIndicatorPage />;
  }

  return (
    <>
      <ArticlePage
        {...props}
        nextArticleQuery={IdGraphqlQuery.getNextArticle}
        extractPostFromResponse={extractPostFromResponse}
      />
    </>
  );
};

export default Page;
