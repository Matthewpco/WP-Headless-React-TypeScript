import { gql } from '@apollo/client';
import { fragmentSeoPost } from './fragmentSeo';
import { Article } from './getArticle';

export const getHomePage = gql`
  ${fragmentSeoPost}

  query getHomePage {
    pageByType(uri: "") {
      __typename
      ... on HomePage {
        page {
          contentFiltered
          seo {
            ...fragmentSeoPost
          }
        }
        latestStoriesLink {
          target
          title
          url
        }
        siteTitle
        topStories {
          title
          squareFeaturedImageUri(size: MEDIUM)
          featuredImageUri
          featuredImageCaption
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
          primarySector {
            name
            slug
          }
          date
        }
        mostViewed {
          title
          link
          time
        }
      }
    }
  }
`;

export interface TopStories
  extends Pick<
    Article,
    | 'markets'
    | 'primarySector'
    | 'title'
    | 'uri'
    | 'date'
    | 'featuredImageUri'
    | 'alternativeHeadline'
    | 'featuredImageCaption'
  > {
  squareFeaturedImageUri: string;
}

export interface MostViewed {
  link: string;
  title: string;
  time: string;
}

export interface HomePageProps {
  page: Pick<Article, 'contentFiltered' | 'seo'>;
  siteTitle: string;
  topStories: TopStories[];
  mostViewed: MostViewed[];
  latestStoriesLink: {
    target: string;
    title: string;
    url: string;
  };
}

export interface ResponseGetHomePage {
  pageByType: HomePageProps;
}
