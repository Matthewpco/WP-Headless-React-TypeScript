import { gql } from '@apollo/client';
import { MarketSection } from './getArticle';

export const getPostsForSlider = gql`
  query getPostsForSlider($id: ID!) {
    sector(id: $id, idType: SLUG) {
      posts(where: { paywall: SUBSCRIBER_ONLY }) {
        nodes {
          id
          uri
          title
          featuredImageUri
          featuredImageCaption
          primarySector {
            name
            slug
          }
        }
      }
    }
  }
`;

export interface PostForSlider {
  id: string;
  uri: string;
  title: string;
  featuredImageUri: string;
  featuredImageCaption: string;
  primarySector: MarketSection;
}

export interface ResponseGetPostsForSlider {
  sector: {
    posts: {
      nodes: PostForSlider[];
    };
  };
}

export interface RequestGetPostsForSlider {
  id: string;
}
