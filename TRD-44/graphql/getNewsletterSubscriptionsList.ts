import { gql } from '@apollo/client';

export const newsletterSubscriptionsList = gql`
  query newsletterSubscriptionsList($email: String) {
    newsletterSubscriptionsList(email: $email) {
      tabName
      description
      name
      list {
        label
        subscribed
        value
        image
        description
      }
    }
  }
`;

export interface NewsletterSection {
    label: string;
    subscribed: boolean;
    value: string;
    image: string;
    description: string;
  }

export interface NewsletterSubject {
  tabName: string;
  description: string;
  name: string;
  list: NewsletterSection[]
}

export interface RequestGetNewsletter {
  email?: string;
}

export interface ResponseGetNewsletter {
  newsletterSubscriptionsList: NewsletterSubject[];
}
