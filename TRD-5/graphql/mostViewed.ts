import { gql } from '@apollo/client';

export const mostViewed = gql`
  mutation mostViewed($id: Int!) {
    countPostView(input: { postID: $id }) {
      success
    }
  }
`;

export interface RequestMostViewed {
  id: number;
}

export interface ResponseMostViewed {
  countPostView: {
    success: boolean;
  };
}
