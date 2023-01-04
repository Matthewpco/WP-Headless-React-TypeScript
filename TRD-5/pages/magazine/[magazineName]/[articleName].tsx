import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  BasePageProps,
  getBasePageProps,
} from '../../../generic/getBasePageProps';
import {
  client,
  getRecommendedStories,
  getTopStories,
  getTrendingArticle,
  ItopStories,
  RequestGetRecommendedStories,
  RequestGetTopStories,
  RequestGetTrendingArticle,
  ResponseGetRecommendedStories,
  ResponseGetTopStories,
  ResponseGetTrendingArticle,
  TrendingArticle,
} from '../../../graphql';
import {
  getMagazineArticle,
  MagazineArticle,
  RequestGetMagazineArticle,
  ResponseGetMagazineArticle,
} from '../../../graphql/getMagazineArticle';
import { useAds } from '../../../components/Ads/useAds';
import { initAdsMagazineArticle } from '../../../components/Ads/initAdsMagazineArticle';
import { ProgressIndicatorPage } from '../../../components/ProgressIndicator/ProgressIndicatorPage';
import { ProviderWithProps } from '../../../generic/provider-tree/ProviderTreeProps';
import { ProviderFontSize } from '../../../components/FontSize';
import { ProviderTree } from '../../../generic/provider-tree/ProviderTree';
import { ArticlePage } from '../../../components/Page/ArticlePage';
import { IdGraphqlQuery } from '../../../generic/graphql/IdGraphqlQuery';
import { IUseArticlesParams } from '../../../components/Page/useArticle.hook';

export interface MagazineArticlePageProps extends BasePageProps {
  article: MagazineArticle;
  trendingArticle: TrendingArticle[];
  topStories: ItopStories[];
  recommendedStories: ItopStories[];
}

export interface MagazineArticlePageParams {
  [key: string]: string;
  magazineName: string;
  articleName: string;
}

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetServerSideProps<
  MagazineArticlePageProps,
  MagazineArticlePageParams
> = async ({ params }) => {
  const [
    basePageProps,
    responseGetMagazineArticle,
    responseTrendingArticle,
    responseTopStories,
    responseRecommendedStories,
  ] = await Promise.all([
    getBasePageProps({ param: 'magazine', ...params }),
    client.query<ResponseGetMagazineArticle, RequestGetMagazineArticle>({
      query: getMagazineArticle,
      variables: {
        name: `/magazine/${params?.magazineName}/${params?.articleName}`,
      },
    }),
    client.query<ResponseGetTrendingArticle, RequestGetTrendingArticle>({
      query: getTrendingArticle,
      variables: {
        count: 4,
        slug: params?.articleName,
      },
    }),
    client.query<ResponseGetTopStories, RequestGetTopStories>({
      query: getTopStories,
      variables: {
        count: 4,
      },
    }),
    client.query<ResponseGetRecommendedStories, RequestGetRecommendedStories>({
      query: getRecommendedStories,
      variables: {
        count: 4,
      },
    }),
  ]);

  return {
    props: {
      ...basePageProps,
      article: responseGetMagazineArticle?.data?.magazine,
      trendingArticle:
        responseTrendingArticle?.data.trendingArticlesList.articles ?? [],
      topStories: responseTopStories?.data.topArticlesList.articles ?? [],
      recommendedStories:
        responseRecommendedStories?.data.recommendedArticlesList.articles ?? [],
    },
    revalidate: 300,
  };
};

const providers: ProviderWithProps<unknown>[] = [
  { provider: ProviderFontSize },
];

const extractPostFromResponse: IUseArticlesParams['extractPostFromResponse'] = (
  response,
) => response?.data?.previousMagazines?.[0];

const Page: NextPage<MagazineArticlePageProps> = (props) => {
  const { article } = props;

  useAds(() => initAdsMagazineArticle(article));

  const router = useRouter();

  if (router.isFallback) {
    return <ProgressIndicatorPage />;
  }

  return (
    <ProviderTree providers={providers}>
      <ArticlePage
        {...(props as any)}
        isFreeAccess
        nextArticleQuery={IdGraphqlQuery.getNextMagazineArticle}
        extractPostFromResponse={extractPostFromResponse}
      />
    </ProviderTree>
  );
};

export default Page;
