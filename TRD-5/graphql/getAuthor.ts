import { gql } from '@apollo/client';
import { fragmentAuthorPosts, GenericPost } from './fragmentAuthorPosts';
import { fragmentSeoUser, SeoFullHead } from './fragmentSeo';
import { IPageInfo } from '../components/PageInfo/IPageInfo';

export const getAuthor = gql`
  ${fragmentAuthorPosts}
  ${fragmentSeoUser}

  query getAuthor($id: ID!, $page: Int, $market: String) {
    user(id: $id, idType: URI) {
      databaseId
      slug
      description
      firstName
      lastName
      profileImageUri
      twitterProfileUrl
      linkedinProfileUrl
      markets {
        label
        value
      }
      posts(where: { paged: $page, market: $market }) {
        ...fragmentAuthorPosts
      }
      seo {
        ...fragmentSeoUser
      }
    }
  }
`;

export interface RequestGetAuthor {
  id: string;
  page?: number;
  market?: string;
}

interface Imarkets {
  label: string;
  value: string;
}
export interface AuthorData {
  databaseId: number;
  slug: string;
  description: string;
  firstName: string;
  lastName: string;
  profileImageUri: string;
  twitterProfileUrl: string;
  linkedinProfileUrl: string;
  markets: Imarkets[];
  posts: {
    nodes: GenericPost[];
    pageInfo: IPageInfo;
  };
  seo: SeoFullHead;
}

export interface ResponseGetAuthor {
  user: AuthorData;
}
