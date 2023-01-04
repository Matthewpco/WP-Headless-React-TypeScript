import { gql } from '@apollo/client';

const seoFullHeadFields = `
  title
  fullHead
`;

export const fragmentSeoPost = gql`
  fragment fragmentSeoPost on PostTypeSEO {
    ${seoFullHeadFields}
  }
`;

export const fragmentSeoTaxonomy = gql`
  fragment fragmentSeoTaxonomy on TaxonomySEO {
    ${seoFullHeadFields}
  }
`;

export const fragmentSeoUser = gql`
  fragment fragmentSeoUser on SEOUser {
    ${seoFullHeadFields}
  }
`;

export interface SeoFullHead {
  title: string;
  fullHead: string;
}
