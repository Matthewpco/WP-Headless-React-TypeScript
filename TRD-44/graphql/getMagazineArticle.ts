import { gql } from '@apollo/client';
import { Category } from './getMagazineForHomepage';
import { Article } from './getArticle';
import { fragmentSeoPost } from './fragmentSeo';
import { MarketItem } from './getMagazineIssueArchivesCards';

export const fragmentMagazineArticle = gql`
  ${fragmentSeoPost}

  fragment fragmentMagazineArticle on Magazine {
    title
    databaseId
    uri
    link
    date
    slug
    featuredImageUri
    featuredImageCaption
    contentFiltered
    tags {
      nodes {
        id
        slug
        name
        uri
      }
    }
    bylineInformation {
      authors {
        id
        firstName
        lastName
        uri
      }
      researchers {
        id
        firstName
        lastName
        uri
      }
    }
    template {
      templateValue
    }
    magazineCategories {
      nodes {
        id
        name
        uri
      }
    }
    markets {
      nodes {
        id
        name
      }
    }
    seo {
      ...fragmentSeoPost
    }
  }
`;

export const getMagazineArticle = gql`
  ${fragmentMagazineArticle}

  query getMagazineArticle($name: ID!) {
    magazine(id: $name, idType: URI) {
      ...fragmentMagazineArticle
    }
  }
`;

export interface RequestGetMagazineArticle {
  name: string;
}

export interface MagazineArticle
  extends Pick<
    Article,
    | 'title'
    | 'databaseId'
    | 'uri'
    | 'date'
    | 'featuredImageUri'
    | 'featuredImageCaption'
    | 'contentFiltered'
    | 'bylineInformation'
    | 'template'
    | 'seo'
    | 'tags'
    | 'slug'
  > {
  magazineCategories: {
    nodes: Category[];
  };
  markets: {
    nodes: MarketItem[];
  };
}

export interface ResponseGetMagazineArticle {
  magazine: MagazineArticle;
}
