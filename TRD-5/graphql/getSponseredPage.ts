import { gql } from '@apollo/client';
import { SponsorPost, fragmentSponsorPosts } from './fragmentSponsorPosts';
import { IPageInfo } from '../components/PageInfo/IPageInfo';

export const getSponsoredPage = gql`
  ${fragmentSponsorPosts}

  query getSponsoredPage($id: ID!, $page: Int, $market: String) {
    advertiser(id: $id, idType: SLUG) {
      logoImageUri
      contentFiltered
      slug
      name
      description
      advertiserFields {
        website
        notShowLogo
        notShowSponsoredBy
      }
      markets {
        label
        value
      }
      sponsors(where: { paged: $page, market: $market }) {
        ...fragmentSponsorPosts
      }
    }
  }
`;

export interface RequestGetSponsoredPage {
  id: string;
  page?: number;
  market?: string;
}

interface Imarkets {
  label: string;
  value: string;
}

export interface SponsoredData {
  logoImageUri: string;
  contentFiltered: string;
  slug: string;
  name: string;
  description: string;
  advertiserFields: {
    website: string;
    notShowLogo: boolean;
    notShowSponsoredBy: boolean;
  };
  markets: Imarkets[];
  sponsors: {
    nodes: SponsorPost[];
    pageInfo: IPageInfo;
  };
}

export interface ResponseGetSponsoredPage {
  advertiser: SponsoredData;
}
