import { gql } from '@apollo/client';

export const getSavedArticles = gql`
  query getSavedArticles($userIdPiano: String!) {
    articlesForPiano(userIdPiano: $userIdPiano) {
      ... on Post {
        id
        title
        featuredImageUri
        date
        databaseId
        link
      }
      ... on Sponsor {
        id
        title
        featuredImageUri
        date
        databaseId
        link
      }
      ... on Magazine {
        id
        title
        featuredImageUri
        date
        databaseId
        link
      }
      ... on Event {
        id
        title
        featuredImageUri
        date
        databaseId
        link
      }
    }
  }
`;

export interface ArticleData {
  id: string;
  title: string;
  featuredImageUri: string;
  date: string;
  databaseId: number;
  link: string;
}

export interface RequestGetArticle {
  userIdPiano: string;
}

export interface ResponseGetArticle {
  articlesForPiano: ArticleData[];
}
