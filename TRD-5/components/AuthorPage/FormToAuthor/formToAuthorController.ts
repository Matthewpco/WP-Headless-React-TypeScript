import { PropsField } from '../../../graphql';
import {
  IFormToAuthorInitialValues,
  IFormToAuthorInputProps,
  IFormToAuthorValidate,
} from './FormToAuthor';

export const formToAuthorController = (fields: PropsField[]) => {
  const inputProps: IFormToAuthorInputProps[] = [];
  const initialValues: IFormToAuthorInitialValues = {
    captchaVerified: '',
  };
  const validate: IFormToAuthorValidate = {
    captchaVerified: { required: true, type: 'hidden' },
  };
  let propsButton: string = '';
  let fieldId: number = -1;

  fields.forEach((item) => {
    if (item.type !== 'hidden') {
      if (item.type !== 'submit') {
        initialValues[item.fieldId] = '';
        let type = '';
        let as = '';
        switch (item.type) {
          case 'email':
            type = item.type;
            break;
          case 'textbox':
            type = 'text';
            break;
          default:
            as = item.type;
        }
        inputProps.push({
          type,
          as,
          placeholder: item.placeholder,
          name: `${item.fieldId}`,
        });
        validate[item.fieldId] = {
          required: item.required,
          type: item.type,
        };
      } else {
        propsButton = item.label;
      }
    } else {
      fieldId = item.fieldId;
    }
  });

  return { inputProps, initialValues, validate, propsButton, fieldId };
};
