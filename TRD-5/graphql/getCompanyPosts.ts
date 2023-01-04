import { gql } from '@apollo/client';
import { GenericPostData } from './getAuthorPosts';
import { RequestGetCompany } from './getCompany';
import { fragmentCompanyPost } from './fragmentCompanyPost';

export const getCompanyPosts = gql`
  ${fragmentCompanyPost}

  query getCompanyPosts($id: ID!, $page: Int, $market: String) {
    company(id: $id, idType: SLUG) {
      posts(where: { paged: $page, market: $market }) {
        ...fragmentCompanyPost
      }
    }
  }
`;

export interface RequestGetCompanyPost
  extends Pick<RequestGetCompany, 'id' | 'page' | 'market'> {}

export interface ResponseGetCompanyPosts {
  company: GenericPostData;
}
