import { gql } from '@apollo/client';
import { ResponseNewsLetterSubscription } from './createNewsletterSubscription';

export const updateNewsletterSubscription = gql`
  mutation updateNewsletterSubscription(
    $email: String!
    $lists: [String]
    $place: String
  ) {
    updateNewsletterSubscription(
      input: { email: $email, lists: $lists, place: $place }
    ) {
      errors {
        key
        value
      }
      successMessage
    }
  }
`;

interface Error {
  key: string;
  value: string;
}

export interface RequestUpdateNewsletterSubscription {
  email: string;
  lists?: string[];
  place?: string;
}

export interface ResponseUpdateNewsletterSubscription {
  updateNewsletterSubscription: ResponseNewsLetterSubscription
}
