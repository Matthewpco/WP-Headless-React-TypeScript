import { gql } from '@apollo/client';
import { Category, MagazinesData } from './getMagazineForHomepage';
import { ArticleAuthor } from './getArticle';
import { fragmentSeoPost, SeoFullHead } from './fragmentSeo';

export const getMagazine = gql`
  ${fragmentSeoPost}

  query getMagazine($name: ID!, $page: Int) {
    magazine(id: $name, idType: URI) {
      title
      uri
      slug
      issueArchivesLink {
        target
        title
        url
      }
      articles(page: $page) {
        title
        uri
        featuredImageUri
        excerpt
        bylineInformation {
          authors {
            id
            firstName
            lastName
            uri
          }
        }
        markets {
          nodes {
            name
            slug
          }
        }
        magazineCategories {
          nodes {
            name
            slug
          }
        }
      }
      seo {
        ...fragmentSeoPost
      }
    }
  }
`;

export interface RequestGetMagazine {
  name: string;
  page: number;
}

export interface GetMagazineArticle {
  title: string;
  uri: string;
  featuredImageUri: string;
  excerpt: string;
  bylineInformation: {
    authors: ArticleAuthor[];
  };
  magazineCategories: {
    nodes: Category[];
  };
  markets: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  seo: SeoFullHead;
}

export interface DataGetMagazine
  extends Pick<MagazinesData, 'issueArchivesLink'> {
  title: string;
  uri: string;
  articles: GetMagazineArticle[];
}

export interface ResponseGetMagazine {
  magazine: DataGetMagazine;
}
