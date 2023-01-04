import { gql } from '@apollo/client';

export const createLetterToAuthor = gql`
  mutation createLetterToAuthor($values: [InputField]!) {
    submitFormToAuthor(input: {data: $values}) {
        clientMutationId
        message
        success
        errors {
          fieldId
          message
          slug
        }
    }
  }
`;

interface Error {
  fieldId: string;
  message: string;
}

export interface Iquery {
  id: number;
  value: string;
}

export interface RequestCreateLetterToAthor {
  values: Iquery[];
}

export interface ResponseCreateLetterToAthor {
    submitFormToAuthor: {
        clientMutationId: number | null;
        message: string;
        success: boolean;
        errors: Error;
      }
}
