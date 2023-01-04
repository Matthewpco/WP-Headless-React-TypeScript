import { gql } from '@apollo/client';
import { GenericPost } from './fragmentMarketPosts';
import { IPageInfo } from '../components/PageInfo/IPageInfo';

export const getMarketPosts = gql`
  query getMarketPosts($market: String, $paged: Int) {
    posts: postsAndMagazines(where: { market: $market, paged: $paged }) {
      nodes {
        ... on Post {
          title
          id
          uri
          sectors {
            nodes {
              name
            }
          }
          alternativeHeadline {
            subheadline
          }
          featuredImageUri
          featuredImageCaption
          date
          bylineInformation {
            authors {
              firstName
              lastName
            }
          }
        }
        ... on Magazine {
          title
          id
          uri
          sectors {
            nodes {
              name
            }
          }
          featuredImageUri
          date
          bylineInformation {
            authors {
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;

export interface GenericPostData {
  nodes: GenericPost[];
  pageInfo: IPageInfo;
}

export interface ResponseGetMarketPosts {
  posts: GenericPostData;
}

export interface RequestGetMarketPosts {
  market: string | undefined;
  paged?: number;
}
