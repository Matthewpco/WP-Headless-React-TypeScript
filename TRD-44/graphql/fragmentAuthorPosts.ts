import { gql } from '@apollo/client';
import { Article } from './getArticle';

export const fragmentAuthorPosts = gql`
  fragment fragmentAuthorPosts on UserToPostConnection {
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
      primarySector {
        name
        slug
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
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
`;

export interface GenericPost
  extends Pick<
    Article,
    | 'markets'
    | 'primarySector'
    | 'title'
    | 'featuredImageUri'
    | 'uri'
    | 'alternativeHeadline'
    | 'date'
  > {
  id: string;
}
