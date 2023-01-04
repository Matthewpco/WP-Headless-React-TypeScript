import { gql } from '@apollo/client';
import { GenericPost } from './fragmentAuthorPosts';
import { fragmentTagPost } from './fragmentTagPost';
import { fragmentSeoTaxonomy, SeoFullHead } from './fragmentSeo';
import { IPageInfo } from '../components/PageInfo/IPageInfo';

export const getTag = gql`
  ${fragmentTagPost}
  ${fragmentSeoTaxonomy}

  query getTag($id: ID!, $slug: String!, $page: Int, $market: String) {
    tag(id: $id, idType: SLUG) {
      id
      slug
      name
      markets {
        label
        value
      }
      posts(where: { paged: $page, market: $market }) {
        ...fragmentTagPost
      }
      seo {
        ...fragmentSeoTaxonomy
      }
    }
    mostViewed(slug: $slug, tax: "tag", postsNum: 3) {
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

export interface RequestGetTag {
  id: string;
  slug: string;
  page?: number;
  market?: string;
}

export interface TagData {
  markets: Markets[];
  id: string;
  slug: string;
  name: string;
  posts: {
    nodes: GenericPost[];
    pageInfo: IPageInfo;
  };
  seo: SeoFullHead;
}

export interface ResponseGetTag {
  tag: TagData;
  mostViewed: GenericPost[];
}
