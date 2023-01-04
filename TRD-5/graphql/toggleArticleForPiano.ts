import { gql } from '@apollo/client';

export const toggleArticleForPiano = gql`
  mutation toggleArticleForPiano($databaseId: Int!, $userIdPiano: String!) {
    toggleArticleForPiano(
      input: { databaseId: $databaseId, userIdPiano: $userIdPiano }
    ) {
      message
      success
    }
  }
`;

export interface ToggleArticleData {
  message: string;
  success: boolean;
}

export interface RequestToggleArticle {
  databaseId: number;
  userIdPiano: string;
}

export interface ResponseToggleArticle {
  toggleArticleForPiano: ToggleArticleData;
}
