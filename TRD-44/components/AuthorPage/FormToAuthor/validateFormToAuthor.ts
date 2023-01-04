import {
  IFormToAuthorInitialValues,
  IFormToAuthorValidate,
} from './FormToAuthor';

export const validateFormToAuthor = (
  values: IFormToAuthorInitialValues,
  validate: IFormToAuthorValidate,
) => {
  const errors: IFormToAuthorInitialValues = {};

  Object.keys(values).forEach((i) => {
    if (validate[i].required && !values[i]) {
      errors[i] = 'Please fill in this field';
    } else {
      switch (validate[i].type) {
        case 'email':
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[i])) {
            errors[i] = 'Please enter a valid e-mail address';
          }
          break;
        case 'textbox':
          if (values[i].length > 20) {
            errors[i] = 'Must be 20 characters or less';
          }
          break;
        case 'textarea':
          if (values[i].length > 2500) {
            errors[i] = 'Must be 2500 characters or less';
          }
          break;
        default:
          break;
      }
    }
  });

  return errors;
};
