import { gql } from '@apollo/client';
import { TopStories } from './getHomePage';

const fragmentArticle = `
nodes {
  title
  squareFeaturedImageUri(size: MEDIUM)
  featuredImageUri
  uri
  alternativeHeadline {
    subheadline
  }
  markets {
    nodes {
      name
      slug
    }
  }
  primarySector {
    name
    slug
  }
  date
}
`;

export const getSectionHomePage = gql`
  query getSectionHomePage($id: ID!, $market: String) {
    sector(id: $id, idType: SLUG) {
      posts(where: {market: $market, perPage: 6}) {
        ${fragmentArticle}
      } 
    }
    tag(id: $id, idType: SLUG) {
      posts(where: {market: $market, perPage: 6}) {
        ${fragmentArticle}
      }
    }
  }
`;

export interface RequestGetSectionHomePage {
  id: string;
  market?: string;
}

export interface ResponseGetSectionHomePage {
  sector?: {
    posts: {
      nodes: TopStories[];
    };
  };
  tag?: {
    posts: {
      nodes: TopStories[];
    };
  };
}
