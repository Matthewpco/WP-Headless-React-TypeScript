import { gql } from '@apollo/client';
import { fragmentSeoPost, SeoFullHead } from './fragmentSeo';

export const getBrandStudio = gql`
  ${fragmentSeoPost}

  query getBrandStudio($slug: ID!) {
    page(id: $slug, idType: URI) {
      title
      contentFiltered
      seo {
        ...fragmentSeoPost
      }
    }
  }
`;

export interface RequestGetBrandStudio {
  slug: string;
}

export interface DataGetBrandStudio {
  title: string;
  contentFiltered: string;
  seo: SeoFullHead;
}

export interface ResponseGetBrandStudio {
  page: DataGetBrandStudio;
}
