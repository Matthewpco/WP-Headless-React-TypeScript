import { gql } from '@apollo/client';

export const getTopStories = gql`
  query getTopStories($market: MarketsTRD, $count: Int) {
    topArticlesList(market: $market, count: $count) {
      articles {
        link
        markets {
          name
          slug
        }
        title
      }
    }
}`;

export interface Imarkets {
  name: string;
  slug: string;
}

export interface ItopStories {
  link: string;
  markets: Imarkets[];
  title: string;
}

export interface ResponseGetTopStories {
  topArticlesList :{
      articles: ItopStories[];
  }
}

export interface RequestGetTopStories {
    market?: string;
    count?: number;
}
