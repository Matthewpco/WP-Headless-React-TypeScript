import { gql } from '@apollo/client';
import { GenericPost } from './fragmentAuthorPosts';
import { fragmentSectorPost } from './fragmentSectorPost';
import { fragmentSeoTaxonomy, SeoFullHead } from './fragmentSeo';

export const getSector = gql`
  ${fragmentSectorPost}
  ${fragmentSeoTaxonomy}

  query getSector($id: ID!, $slug: String!, $page: Int, $market: String) {
    sector(id: $id, idType: SLUG) {
      id
      slug
      name
      markets {
        label
        value
      }
      posts(where: { paged: $page, market: $market }) {
        ...fragmentSectorPost
      }
      seo {
        ...fragmentSeoTaxonomy
      }
    }
    mostViewed(slug: $slug, tax: "sector", postsNum: 3) {
      id
      title
      featuredImageUri
      uri
      alternativeHeadline {
        subheadline
      }
      markets {
        nodes {
          name
          slug
        }
      }
      date
    }
  }
`;

export interface Markets {
  label: string;
  value: string;
}

export interface RequestGetSector {
  id: string;
  slug: string;
  page?: number;
  market?: string;
}

export interface  SectorData {
  markets: Markets[];
  id: string;
  slug: string;
  name: string;
  posts: {
    nodes: GenericPost[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
  seo: SeoFullHead;
}

export interface ResponseGetSector {
  sector: SectorData;
  mostViewed: GenericPost[];
}
