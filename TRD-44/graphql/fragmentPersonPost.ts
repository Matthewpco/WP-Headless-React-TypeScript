import { gql } from '@apollo/client';
import { Article } from './getArticle';

export const fragmentPersonPost = gql`
  fragment fragmentPersonPost on PersonToPostConnection {
    nodes {
        id
        title
        uri
        featuredImageUri
        date
        alternativeHeadline {
          subheadline
        }
        markets {
          nodes {
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
    }
}
`;

export interface AuthorPost
    extends Pick<
    Article,
  | 'markets'
    | 'title'
    | 'featuredImageUri'
    | 'uri'
    | 'alternativeHeadline'
    | 'date'
    > {
    id: string;
}
