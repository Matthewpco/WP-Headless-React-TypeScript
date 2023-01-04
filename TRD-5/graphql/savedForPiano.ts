import { gql } from '@apollo/client';

export const savedForPiano = gql`
  query savedForPiano($id: ID!, $userIdPiano: String!) {
    post(id: $id, idType: URI) {
      savedForPiano(userIdPiano: $userIdPiano)
    }
  }
`;

export interface savedArticle {
  savedForPiano: boolean;
}

export interface RequestSavedForPiano {
  id: string;
  userIdPiano: string;
}

export interface ResponseSavedForPiano {
  post: savedArticle;
}
