import { gql } from '@apollo/client';
import { GenericPostData } from './getAuthorPosts';
import { RequestGetSector } from './getSector';
import { fragmentSectorPost } from './fragmentSectorPost';

export const getSectorPosts = gql`
  ${fragmentSectorPost}

  query getSectorPosts($id: ID!, $page: Int, $market: String) {
    sector(id: $id, idType: SLUG) {
      posts(where: { paged: $page, market: $market }) {
        ...fragmentSectorPost
      }
    }
  }
`;

export interface RequestGetSectorPost
  extends Pick<RequestGetSector, 'id' | 'page' | 'market'> {}

export interface ResponseGetSectorPosts {
  sector: GenericPostData;
}
