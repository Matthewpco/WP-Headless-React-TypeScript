import { gql } from '@apollo/client';
import { Article } from './getArticle';

export const fragmentSponsorPosts = gql`
  fragment fragmentSponsorPosts on AdvertiserToSponsorConnection {
    nodes {
      id
      title
      featuredImageUri
      uri
      excerpt
      markets {
        nodes {
          name
          slug
        }
      }
      date
      archiveDate
      isArchive
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
`;

export interface SponsorPost
  extends Pick<
    Article,
    'markets' | 'title' | 'featuredImageUri' | 'uri' | 'date'
  > {
  id: string;
  excerpt: string;
  archiveDate: string;
  isArchive: boolean;
}
