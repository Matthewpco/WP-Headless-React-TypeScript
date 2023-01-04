import { gql } from '@apollo/client';

export const getTrendingArticle = gql`
  query getTrendingArticle($count: Int, $slug: String) {
    trendingArticlesList(count: $count, slug: $slug) {
      articles {
        link
        title
        img {
          src
          alt
        }
      }
    }
  }
`;

interface Iimg {
  src: string;
  alt: string;
}

export interface TrendingArticle {
  link: string;
  title: string;
  img: Iimg[];
}

export interface ResponseGetTrendingArticle {
  trendingArticlesList: {
    articles: TrendingArticle[];
  };
}

export interface RequestGetTrendingArticle {
  count: number;
  slug?: string;
}
