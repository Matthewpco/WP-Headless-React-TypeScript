import { gql } from '@apollo/client';
import { SeoFullHead } from './fragmentSeo';

export const getMagazineForHomepage = gql`
  query getMagazineForHomepage($page: Int) {
    magazineForHomepage(page: $page) {
      title
      link
      img {
        src
        alt
      }
      issueArchivesLink {
        target
        title
        url
      }
      articles {
        authors {
          id
          uri
          firstName
          lastName
        }
        title
        link
        markets {
          nodes {
            name
            slug
          }
        }
        excerpt
        img {
          src
          alt
        }
        category {
          name
          slug
        }
      }
    }
  }
`;

export interface Markets {
  name: string;
  slug: string;
}

export interface Image {
  src: string;
  alt: string;
}

export interface Category {
  name: string;
  slug: 'issue' | 'closing' | 'cover-story';
}

export interface Authors {
  firstName: string;
  lastName: string;
  id: string;
  uri: string;
}

export interface ArticlesData {
  authors: Authors[];
  link: string;
  markets: {
    nodes: Markets[];
  };
  title: string;
  img: Image[];
  excerpt: string;
  category: Category[];
}

export interface MagazinesData {
  title: string;
  link: string;
  img: Image[];
  slug: string;
  articles: ArticlesData[];
  seo?: SeoFullHead;
  issueArchivesLink: {
    target: string;
    title: string;
    url: string;
  };
}

export interface RequestGetMagazines {
  page?: number;
}

export interface ResponseGetMagazines {
  magazineForHomepage: MagazinesData;
}
