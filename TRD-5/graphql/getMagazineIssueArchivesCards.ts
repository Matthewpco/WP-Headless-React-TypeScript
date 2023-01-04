import { gql } from '@apollo/client';
import { IPageInfo } from '../components/PageInfo/IPageInfo';

export const getMagazineIssueArchivesCards = gql`
  query getMagazineIssueArchivesCards($perPage: Int, $paged: Int, $parent: ID!, $first: Int) {
    magazines(
      where: { perPage: $perPage, paged: $paged, parent: $parent }
      first: $first
    ) {
      nodes {
        databaseId
        title
        featuredImageUri
        uri
        markets {
          nodes {
            id
            name
          }
        }
        pdfUrl
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export interface RequestGetMagazine {
  perPage: number;
  paged: number;
  parent: number;
  first: number;
}

export interface MarketItem {
  id: string;
  name: string;
}

export interface NodesData {
  databasedId: number;
  title: string;
  featuredImageUri: string;
  uri: string;
  markets: {
    nodes: MarketItem[];
  };
  pdfUrl: string;
}

export interface MagazinesData {
  nodes: NodesData[];
  pageInfo: IPageInfo;
}

export interface ResponseGetMagazine {
  magazines: MagazinesData;
}
