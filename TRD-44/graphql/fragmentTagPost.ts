import { gql } from '@apollo/client';
import { Article } from './getArticle';

export const fragmentTagPost = gql`
  fragment fragmentTagPost on TagToPostConnection {
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
