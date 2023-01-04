import { gql } from '@apollo/client';
import { GenericPost } from './fragmentMarketPosts';
import { fragmentSeoPost, SeoFullHead } from './fragmentSeo';

export const getMarketHeroSectionPosts = gql`
  ${fragmentSeoPost}

  query getMarketHeroSectionPosts($id: ID!) {
    page(id: $id, idType: URI) {
      seo {
        ...fragmentSeoPost
      }
      template {
        templateValue
      }
      market
      marketHeroSectionPosts {
        type
        post {
          title
          id
          uri
          sectors {
            nodes {
              name
            }
          }
          alternativeHeadline {
            subheadline
          }
          featuredImageUri
          featuredImageCaption
          date
          bylineInformation {
            authors {
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;

interface IAuthor {
  firstName: string;
  lastName: string;
}

export interface HeroSection extends GenericPost {
  featuredImageCaption: string;
  bylineInformation: {
    authors: IAuthor[];
  };
}

export interface HeroSectionPost {
  post: HeroSection;
  type: string;
}

export interface ResponseGetMarketHeroSectionPosts {
  page: {
    template: {
      templateValue: string;
    };
    market: string;
    marketHeroSectionPosts: HeroSectionPost[];
    seo: SeoFullHead;
  };
}
export interface RequestGetMarketHeroSectionPosts {
  id: string;
}
