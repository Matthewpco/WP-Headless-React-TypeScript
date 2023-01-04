import { gql } from '@apollo/client';

export const submitForm = gql`
  mutation submitForm($formId: Int, $data: [InputField]) {
    submitForm(input: { formId: $formId, data: $data }) {
      errors {
        fieldId
        message
        slug
      }
      message
      success
    }
  }
`;

export interface InputField {
  id: number;
  value: string;
}

export interface RequestSubmitForm {
  formId: number;
  data: InputField[];
}

export interface SubmitFormError {
  fieldId: number;
  message: string;
  slug: string;
}

export interface DataSubmitForm {
  message: string;
  success: boolean;
  errors: SubmitFormError[];
}

export interface ResponseSubmitForm {
  submitForm: DataSubmitForm;
}
