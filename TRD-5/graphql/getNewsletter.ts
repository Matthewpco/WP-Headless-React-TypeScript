import { gql } from '@apollo/client';

export const getNewsletter = gql`
  query getNewsletter($email: String) {
    newsletterSubscriptionsList(email: $email) {
      name
      list {
        label
        subscribed
        value
      }
    }
  }
`;

export interface NewsletterSubject {
  label: string;
  subscribed: boolean;
  value: string;
}

export interface NewsletterSection {
  name: string;
  list: NewsletterSubject[];
}

export interface RequestGetNewsletter {
  email?: string;
}

export interface ResponseGetNewsletter {
  newsletterSubscriptionsList: NewsletterSection[];
}
