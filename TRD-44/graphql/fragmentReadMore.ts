// TO DO delete this component after release
import { gql } from '@apollo/client';

export const fragmentReadMore = gql`
  fragment fragmentReadMore on ReadMoreList {
    articles {
      link
      markets {
        name
        slug
      }
      category {
        name
        slug
      }
      title
      img {
        src
        alt
      }
    }
  }
`;

export interface ReadMoreMarket {
  name: string;
  slug: string;
}

export interface ReadMoreCategory {
  name: string;
  slug: string;
}

export interface ReadMoreImage {
  src: string;
  alt: string;
}

export interface ReadMoreItem {
  link: string;
  title: string;
  img: [ReadMoreImage];
  markets: ReadMoreMarket[];
  category: ReadMoreCategory[];
}

export interface ResponseReadMore {
  articles: ReadMoreItem[];
}
