import { gql } from '@apollo/client';
import { SponsorPost, fragmentSponsorPosts } from './fragmentSponsorPosts';
import { IPageInfo } from '../components/PageInfo/IPageInfo';

export const getSponsoredPosts = gql`
  ${fragmentSponsorPosts}

  query getSponsoredPosts($id: ID!, $page: Int, $market: String) {
    advertiser(id: $id, idType: SLUG) {
      sponsors(where: { paged: $page, market: $market }) {
        ...fragmentSponsorPosts
      }
    }
  }
`;

export interface GenericPostData {
  sponsors: {
    nodes: SponsorPost[];
    pageInfo: IPageInfo;
  };
}

export interface ResponseGetSponsoredPosts {
  advertiser: GenericPostData;
}
