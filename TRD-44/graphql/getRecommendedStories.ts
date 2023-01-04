import { gql } from '@apollo/client';
import { ItopStories } from './getTopStories';

export const getRecommendedStories = gql`
  query getRecommendedStories($market: MarketsTRD, $count: Int) {
    recommendedArticlesList(market: $market, count: $count) {
      articles {
        link
        markets {
          name
          slug
        }
        title
      }
    }
  }
`;

export interface Imarkets {
  name: string;
  slug: string;
}

export interface IrecommendedStories {
  url: string;
  title: string;
}

export interface ResponseGetRecommendedStories {
  recommendedArticlesList: {
    articles: ItopStories[];
  };
}

export interface RequestGetRecommendedStories {
  market?: string;
  count?: number;
}
