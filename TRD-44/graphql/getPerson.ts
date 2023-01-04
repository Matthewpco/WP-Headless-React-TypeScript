import { gql } from '@apollo/client';
import { GenericPost } from './fragmentAuthorPosts';
import { fragmentPersonPost } from './fragmentPersonPost';
import { fragmentSeoTaxonomy, SeoFullHead } from './fragmentSeo';

export const getPerson = gql`
  ${fragmentPersonPost}
  ${fragmentSeoTaxonomy}

  query getPerson($id: ID!, $slug: String!, $page: Int, $market: String) {
    person(id: $id, idType: SLUG) {
      id
      slug
      name
      markets {
        label
        value
      }
      posts(where: { paged: $page, market: $market }) {
        ...fragmentPersonPost
      }
      seo {
        ...fragmentSeoTaxonomy
      }
    }
    mostViewed(slug: $slug, tax: "people", postsNum: 3) {
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

export interface RequestGetPerson {
  id: string;
  slug: string;
  page?: number;
  market?: string;
}

export interface PersonData {
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

export interface ResponseGetPerson {
  person: PersonData;
  mostViewed: GenericPost[];
}
