import { gql } from '@apollo/client';

export const getAuthorId = gql`
  query getAuthorId {
    themeSettings {
      contactAuthorFormId
    }
  }
`;

export const getPropsForm = gql`
  query getPropsForm($id: ID!) {
    form(id: $id, idType: DATABASE_ID) {
      title
      fields {
        nodes {
          fieldId
          type
          label
          required
          ... on EmailField {
            placeholder
          }
          ... on TextareaField {
            placeholder
          }
          ... on TextboxField {
            placeholder
          }
          ... on PhoneField {
            placeholder
          }
          ... on ListselectField {
            options {
              label
              value
            }
          }
        }
      }
    }
  }
`;

export interface PropsField {
  fieldId: number;
  label: string;
  required: boolean | null;
  type: string;
  placeholder: string;
  options?: {
    label: string;
    value: string;
  }[];
}

export interface ResponsePropsForm {
  form: {
    title: string;
    fields: {
      nodes: PropsField[];
    };
  };
}

export interface RequestPropsForm {
  // TODO: Revert to `number` and find suitable defaults besides an empty string.
  id: number | string;
}

export interface AuthorId {
  authorId: number;
}

export interface ResponseAuthorId {
  themeSettings: {
    contactAuthorFormId: number;
  };
}
