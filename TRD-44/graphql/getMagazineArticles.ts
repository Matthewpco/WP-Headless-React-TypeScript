import { gql } from '@apollo/client';
import { Category, MagazinesData } from './getMagazineForHomepage';
import { ArticleAuthor } from './getArticle';
import { fragmentSeoPost, SeoFullHead } from './fragmentSeo';

export const getMagazineArticles = gql`
  query getMagazine($name: ID!, $page: Int) {
    magazine(id: $name, idType: URI) {
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
    }
  }
`;

export interface RequestGetMagazineArticles {
  name: string;
  page: number;
}

export interface GetMagazineArticlesItem {
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
}

export interface DataGetMagazineArticles {
  articles: GetMagazineArticlesItem[];
}

export interface ResponseGetMagazineArticles {
  magazine: DataGetMagazineArticles;
}
