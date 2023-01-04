import { gql } from '@apollo/client';
import { GenericPostData } from './getAuthorPosts';
import { fragmentTagPost } from './fragmentTagPost';
import { RequestGetTag } from './getTag';

export const getTagPosts = gql`
  ${fragmentTagPost}

  query getTagPosts($id: ID!, $page: Int, $market: String) {
    tag(id: $id, idType: SLUG) {
      posts(where: { paged: $page, market: $market }) {
        ...fragmentTagPost
      }
    }
  }
`;

export interface RequestGetTagPost
  extends Pick<RequestGetTag, 'id' | 'page' | 'market'> {}

export interface ResponseGetTagPosts {
  tag: GenericPostData;
}
