import { gql } from '@apollo/client';
import { Article } from './getArticle';

export const fragmentMarketPost = gql`
  fragment fragmentMarketPost on RootQueryToPostConnection {
    nodes {
      id
      title
      featuredImageUri
      uri
      alternativeHeadline {
        subheadline
      }
      sectors {
        nodes {
          name
        }
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
`;

export interface GenericPost
  extends Pick<
    Article,
    | 'sectors'
    | 'markets'
    | 'title'
    | 'featuredImageUri'
    | 'uri'
    | 'alternativeHeadline'
    | 'date'
  > {
  id: string;
}
