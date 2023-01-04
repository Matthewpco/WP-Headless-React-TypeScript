import { gql } from '@apollo/client';
import { fragmentMagazineArticle, MagazineArticle } from './getMagazineArticle';

export const getNextMagazineArticle = gql`
  ${fragmentMagazineArticle}

  query getNextArticle($id: Int!) {
    previousMagazines(postID: $id, amount: 1) {
      ...fragmentMagazineArticle
    }
  }
`;

export interface ResponseGetNextMagazineArticle {
  previousMagazines: MagazineArticle[];
}

export interface RequestGetNextMagazineArticle {
  id: number;
}
