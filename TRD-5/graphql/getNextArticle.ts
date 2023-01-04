import { gql } from '@apollo/client';
import { Article } from './getArticle';
import { fragmentArticle, fragmentSponsorArticle } from './fragmentArticle';

export const getNextArticle = gql`
  ${fragmentArticle}

  query getNextArticle($id: Int!) {
    previousPost(postID: $id) {
      ...fragmentArticle
    }
  }
`;

export const getNextSponsorArticle = gql`
  ${fragmentSponsorArticle}

  query getNextSponsorArticle($id: Int!) {
    previousSponsor(postID: $id) {
      ...fragmentSponsorArticle
    }
  }
`;

export interface ResponseGetNextArticle {
  previousPost: Article;
  previousSponsor: Article;
}

export interface RequestGetNextArticle {
  id: number;
}
