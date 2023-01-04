import { gql } from '@apollo/client';

export const createNewsLetterSubscription = gql`
  mutation createNewsLetterSubscription(
    $email: String!
    $lists: [String]!
    $place: String
  ) {
    createNewsletterSubscription(
      input: { email: $email, lists: $lists, place: $place }
    ) {
      errors {
        key
        value
      }
      successMessage
      errorMessage
    }
  }
`;

interface Error {
  key: string;
  value: string;
}

export interface RequestNewsLetterSubscription {
  email: string;
  lists: string[];
  place?: string;
}

export interface ResponseNewsLetterSubscription {
  successMessage: string;
  errorMessage: string;
  errors: Error[];
}

export interface ResponseCreateNewsLetterSubscription {
  createNewsletterSubscription: ResponseNewsLetterSubscription;
}
