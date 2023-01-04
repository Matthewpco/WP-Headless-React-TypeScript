import { gql } from '@apollo/client';
import { GenericPost } from './fragmentAuthorPosts';
import { fragmentCompanyPost } from './fragmentCompanyPost';
import { fragmentSeoTaxonomy, SeoFullHead } from './fragmentSeo';

export const getCompany = gql`
  ${fragmentCompanyPost}
  ${fragmentSeoTaxonomy}

  query getCompany($id: ID!, $slug: String!, $page: Int, $market: String) {
    company(id: $id, idType: SLUG) {
      id
      slug
      name
      markets {
        label
        value
      }
      posts(where: { paged: $page, market: $market}) {
        ...fragmentCompanyPost
      }
      seo {
        ...fragmentSeoTaxonomy
      }
    }
    mostViewed(slug: $slug, tax: "company", postsNum: 3) {
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

export interface RequestGetCompany {
    id: string;
    slug: string;
    page?: number;
    market?: string;
}

export interface CompanyData {
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

export interface ResponseGetCompany {
    company: CompanyData;
    mostViewed: GenericPost[];
}
