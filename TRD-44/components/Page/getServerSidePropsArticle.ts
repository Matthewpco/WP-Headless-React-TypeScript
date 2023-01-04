import { GetServerSideProps } from 'next';
import { ArticleProps } from './ArticlePage';
import { getBasePageProps } from '../../generic/getBasePageProps';
import {
  client,
  getArticle,
  getRecommendedStories,
  getTopStories,
  getTrendingArticle,
  RequestGetArticle,
  RequestGetRecommendedStories,
  RequestGetTopStories,
  RequestGetTrendingArticle,
  ResponseGetArticle,
  ResponseGetRecommendedStories,
  ResponseGetTopStories,
  ResponseGetTrendingArticle,
} from '../../graphql';
import {
  mostViewed,
  RequestMostViewed,
  ResponseMostViewed,
} from '../../graphql/mostViewed';
import { identity } from '../../generic/utils';

// market/subMarket/year/month/day/slug
// market/year/month/day/slug
// year/month/day/slug
export interface ArticlePageParams {
  [key: string]: string;
  firstLevel: string;
  secondLevel: string;
  thirdLevel: string;
  fourthLevel: string;
  fifthLevel: string;
  sixthLevel: string;
}

const generateUri = (params: ArticlePageParams | undefined) =>
  `/${[
    params?.firstLevel,
    params?.secondLevel,
    params?.thirdLevel,
    params?.fourthLevel,
    params?.fifthLevel,
    params?.sixthLevel,
  ]
    .filter(identity)
    .join('/')}`;

export const getServerSidePropsArticle: GetServerSideProps<
  ArticleProps,
  ArticlePageParams
> = async ({ params }) => {
  const [
    basePageProps,
    responseArticle,
    responseTrendingArticle,
    responseTopStories,
    responseRecommendedStories,
  ] = await Promise.all([
    getBasePageProps(params),
    client.query<ResponseGetArticle, RequestGetArticle>({
      query: getArticle,
      variables: {
        uri: generateUri(params),
      },
    }),
    client.query<ResponseGetTrendingArticle, RequestGetTrendingArticle>({
      query: getTrendingArticle,
      variables: {
        count: 4,
        slug: params?.sixthLevel ?? params?.fifthLevel ?? params?.fourthLevel,
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

  client
    .query<ResponseMostViewed, RequestMostViewed>({
      query: mostViewed,
      variables: { id: responseArticle?.data?.post?.databaseId },
    })
    .catch(() => {
      //
    });

  return {
    props: {
      ...basePageProps,
      article: responseArticle?.data?.post ?? null,
      trendingArticle:
        responseTrendingArticle?.data.trendingArticlesList.articles ?? [],
      topStories: responseTopStories?.data.topArticlesList.articles ?? [],
      recommendedStories:
        responseRecommendedStories?.data.recommendedArticlesList.articles ?? [],
    },
    revalidate: 5,
  };
};
