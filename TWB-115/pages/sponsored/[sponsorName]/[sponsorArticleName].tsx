import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { getBasePageProps } from '../../../generic/getBasePageProps';
import {
  client,
  getRecommendedStories,
  getSponsor,
  getSponsorArticle,
  getTopStories,
  getTrendingArticle,
  RequestGetArticle,
  RequestGetRecommendedStories,
  RequestGetSponsor,
  RequestGetTopStories,
  RequestGetTrendingArticle,
  ResponseGetRecommendedStories,
  ResponseGetSponsor,
  ResponseGetSponsorArticle,
  ResponseGetTopStories,
  ResponseGetTrendingArticle,
} from '../../../graphql';
import { ArticlePage, ArticleProps } from '../../../components/Page/ArticlePage';
import { useAds } from '../../../components/Ads/useAds';
import { initAdsSponsoredArticle } from '../../../components/Ads/initAdsSponsoredArticle';
import { ProgressIndicatorPage } from '../../../components/ProgressIndicator/ProgressIndicatorPage';
import { IdGraphqlQuery } from '../../../generic/graphql/IdGraphqlQuery';
import { IUseArticlesParams } from '../../../components/Page/useArticle.hook';
import { SponsorArticleWrapper } from '../../../components/sponsorTempalate';

export interface ArticlePageParams {
  [key: string]: string;
  sponsorName: string;
  sponsorArticleName: string;
}

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetServerSideProps<
  ArticleProps,
  ArticlePageParams
> = async ({ params }) => {
  const [
    basePageProps,
    responseArticle,
    responseSponsor,
    responseTrendingArticle,
    responseTopStories,
    responseRecommendedStories,
  ] = await Promise.all([
    getBasePageProps({ param: 'sponsored', ...params }),
    client.query<ResponseGetSponsorArticle, RequestGetArticle>({
      query: getSponsorArticle,
      variables: {
        uri: params?.sponsorArticleName ?? '',
      },
    }),
    client.query<ResponseGetSponsor, RequestGetSponsor>({
      query: getSponsor,
      variables: {
        uri: params?.sponsorArticleName ?? '',
      },
    }),
    client.query<ResponseGetTrendingArticle, RequestGetTrendingArticle>({
      query: getTrendingArticle,
      variables: {
        count: 4,
        slug: params?.sponsorArticleName,
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
      article: responseArticle?.data?.sponsor ?? undefined,
      sponsors: responseSponsor?.data?.sponsor?.advertisers?.nodes ?? [],
      trendingArticle:
        responseTrendingArticle?.data?.trendingArticlesList?.articles ?? [],
      topStories: responseTopStories?.data?.topArticlesList?.articles ?? [],
      recommendedStories:
        responseRecommendedStories?.data?.recommendedArticlesList?.articles ??
        [],
    },
    revalidate: 300,
  };
};

const extractPostFromResponse: IUseArticlesParams['extractPostFromResponse'] = (response) =>
  response?.data?.previousSponsor;

const Page = (props: ArticleProps) => {
  const { article } = props;

  useAds(() => initAdsSponsoredArticle(article));

  const router = useRouter();

  if (router.isFallback) {
    return <ProgressIndicatorPage />;
  }

  if (!article) {
    return <Error statusCode={404} />;
  }

  return (
    <ArticlePage
      {...props}
      isFreeAccess
      showHeaderAd
      nextArticleQuery={IdGraphqlQuery.getNextSponsorArticle}
      extractPostFromResponse={extractPostFromResponse}
      template={SponsorArticleWrapper as any}
    />
  );
};

export default Page;
