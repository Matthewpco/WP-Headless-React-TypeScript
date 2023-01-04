import { gql } from '@apollo/client';
import { GenericPost, fragmentAuthorPosts } from './fragmentAuthorPosts';
import { IPageInfo } from '../components/PageInfo/IPageInfo';

export const getAuthorPosts = gql`
  ${fragmentAuthorPosts}

  query getAuthorPosts($id: ID!, $page: Int, $market: String) {
    user(id: $id, idType: URI) {
      posts(where: { paged: $page, market: $market }) {
        ...fragmentAuthorPosts
      }
    }
  }
`;

export interface GenericPostData {
  posts: {
    nodes: GenericPost[];
    pageInfo: IPageInfo;
  };
}

export interface ResponseGetAuthorPosts {
  user: GenericPostData;
}
