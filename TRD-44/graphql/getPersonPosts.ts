import { gql } from '@apollo/client';
import { GenericPostData } from './getAuthorPosts';
import { RequestGetPerson } from './getPerson';
import { fragmentPersonPost } from './fragmentPersonPost';

export const getPersonPosts = gql`
  ${fragmentPersonPost}

  query getPersonPosts($id: ID!, $page: Int, $market: String) {
    person(id: $id, idType: SLUG) {
      posts(where: { paged: $page, market: $market }) {
        ...fragmentPersonPost
      }
    }
  }
`;

export interface RequestGetPersonPost
  extends Pick<RequestGetPerson, 'id' | 'page' | 'market'> {}

export interface ResponseGetPersonPosts {
  person: GenericPostData;
}
