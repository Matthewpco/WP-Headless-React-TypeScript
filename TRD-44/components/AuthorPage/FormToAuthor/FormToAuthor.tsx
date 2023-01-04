import React, { FC, useMemo, useRef, useState } from 'react';
import cx from 'classnames';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import { ReCaptcha } from 'react-recaptcha-v3';
import styles from './FormToAuthor.module.scss';
import { Button } from '../../Button';
import CloseButton from '../../../assets/icons/closeButton.svg';
import { Size } from '../../../generic/types';
import { Iquery, PropsField } from '../../../graphql';
import { useFormToAuthor } from './FormToAuthorHook';
import { PopUpMessage } from './PopUpMessage';
import { formToAuthorController } from './formToAuthorController';
import { validateFormToAuthor } from './validateFormToAuthor';
import { List } from '../../List';
import {
  renderErrorMessageFormToAuthor,
  renderFormControlFormToAuthor,
} from './renderFormControlFormToAuthor';

export interface FormToAuthorProps {
  className?: string;
  size?: Size;
  onClose: (arg: false) => void;
  authorName: string;
  propsField: PropsField[];
  databaseId: number;
}

export interface IFormToAuthorInitialValues {
  [key: string]: string;
}

export interface IFormToAuthorValidate {
  [key: string]: {
    type: string;
    required: boolean | null;
  };
}

export interface IFormToAuthorInputProps {
  name: string;
  type: string;
  placeholder?: string;
  as: string;
}

export const FormToAuthor: FC<FormToAuthorProps> = ({
  size = 'medium',
  className,
  onClose,
  propsField,
  databaseId,
  authorName,
}) => {
  const { onSubmit } = useFormToAuthor();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [responseStatus, setResponseStatus] = useState<boolean>(false);
  const { initialValues, inputProps, validate, propsButton, fieldId } = useMemo(
    () => formToAuthorController(propsField),
    [],
  );

  const onSubmitForm = async (
    values: IFormToAuthorInitialValues,
    actions: FormikHelpers<{
      [x: string]: string;
    }>,
  ) => {
    const submit = async (args: Iquery[]) => {
      const response = await onSubmit(args);
      setResponseStatus(response?.success ?? false);
      if (response) {
        setMessage(response.message);
      } else {
        setMessage('Something went wrong');
      }
      setShowMessage(true);
    };

    const args = Object.entries(values).map((item) => ({
      id: +item[0],
      value: item[1],
    }));
    args.push({ id: fieldId, value: `${databaseId}` });
    await submit(args);
    actions.resetForm({ values: initialValues });
    actions.setSubmitting(false);
  };

  const refRecaptcha = useRef<any>();

  if (showMessage || Object.keys(initialValues).length === 0) {
    return (
      <PopUpMessage
        className={className}
        responseStatus={responseStatus}
        message={message || 'Something went wrong'}
        onClose={() => {
          onClose(false);
          setShowMessage(false);
        }}
      />
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => onSubmitForm(values, actions)}
      validate={(values) => validateFormToAuthor(values, validate)}
    >
      {({ isSubmitting, resetForm, setFieldValue }) => (
        <Form className={cx(className, styles.root)}>
          <CloseButton
            className={styles.closeButton}
            onClick={() => {
              onClose(false);
              resetForm({ values: initialValues });
            }}
          />
          <div className={styles.authorName}>{`Contact ${authorName}`}</div>
          <List items={inputProps} render={renderFormControlFormToAuthor} />
          <ReCaptcha
            ref={refRecaptcha}
            sitekey="6Le1IdIUAAAAAOthoiGq4NNfmiLaxYrl8oAywLtG"
            action="submit"
            verifyCallback={() => setFieldValue('captchaVerified', 'true')}
          />
          <ErrorMessage name="captchaVerified">
            {renderErrorMessageFormToAuthor}
          </ErrorMessage>
          <div className={styles.submitButton}>
            <Button
              disabled={isSubmitting}
              type="submit"
              color="primary"
              size={size}
              rounded
            >
              {propsButton || 'SEND'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
