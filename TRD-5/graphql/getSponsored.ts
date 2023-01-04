import { gql } from '@apollo/client';
import { GenericPost } from './fragmentAuthorPosts';
import { IPageInfo } from '../components/PageInfo/IPageInfo';

export const getSponsored = gql`
  query getSponsored($page: Int) {
    sponsors(where: { paged: $page }) {
      nodes {
        id
        title
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
        date
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export interface RequestGetSponsored {
  page: number;
}

export interface ResponseGetSponsored {
  sponsors: {
    nodes: GenericPost[];
  };
  pageInfo: IPageInfo;
}
