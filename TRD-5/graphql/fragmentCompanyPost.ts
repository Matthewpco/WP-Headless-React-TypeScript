import { gql } from '@apollo/client';
import { Article } from './getArticle';

export const fragmentCompanyPost = gql`
  fragment fragmentCompanyPost on CompanyToPostConnection {
    nodes {
        id
        title
        featuredImageUri
        uri
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
