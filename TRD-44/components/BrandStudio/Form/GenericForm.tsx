import React, { FC, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../../AuthorPage/FormToAuthor/FormToAuthor.module.scss';
import { PropsField } from '../../../graphql';
import {
  RequestSubmitForm,
  ResponseSubmitForm,
} from '../../../graphql/submitForm';
import { Button } from '../../Button';
import { useGraphqlMutation } from '../../../generic/graphql/useGraphqlMutation';
import { IdGraphqlMutation } from '../../../generic/graphql/IdGraphqlMutation';

export interface FormToAuthorProps {
  className?: string;
  fields: PropsField[];
  databaseId: number;
}

export enum IdFieldType {
  email = 'email',
  textbox = 'textbox',
  phone = 'phone',
  textarea = 'textarea',
  submit = 'submit',
  listselect = 'listselect',
}

const mapFieldTypeComponent = new Map<IdFieldType, string>([
  [IdFieldType.textarea, 'textarea'],
  [IdFieldType.submit, 'button'],
  [IdFieldType.listselect, 'select'],
]);

const mapFieldTypeInputType = new Map<IdFieldType, string | undefined>([
  [IdFieldType.submit, 'submit'],
  [IdFieldType.phone, 'tel'],
  [IdFieldType.email, 'email'],
  [IdFieldType.textbox, 'text'],
]);

export const GenericForm: FC<FormToAuthorProps> = ({
  className,
  fields,
  databaseId,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submit, { data }] = useGraphqlMutation<
    ResponseSubmitForm,
    RequestSubmitForm
  >(IdGraphqlMutation.submitForm);

  const [initialValues, formFields, validations] = useMemo(() => {
    const initialValuesInner: { [key: string]: string } = {};
    const formFieldsInner: any[] = [];
    const validationsInner: { [key: string]: Yup.StringSchema } = {};

    fields.forEach(
      ({ fieldId, type, options, placeholder, label, required }) => {
        if (type !== IdFieldType.submit) {
          if (type === IdFieldType.listselect) {
            initialValuesInner[fieldId] = options?.[0]?.value ?? '';
          } else {
            initialValuesInner[fieldId] = '';
          }
        }

        if (type !== IdFieldType.submit) {
          validationsInner[fieldId] = Yup.string().required(
            'This field is required',
          );
        }

        formFieldsInner.push({
          component: mapFieldTypeComponent.get(type as IdFieldType),
          type: mapFieldTypeInputType.get(type as IdFieldType),
          name: fieldId,
          placeholder,
          options,
          label,
          required,
        });
      },
    );

    return [
      initialValuesInner,
      formFieldsInner,
      Yup.object().shape(validationsInner),
    ];
  }, [fields]);

  useEffect(() => {
    if (data?.submitForm?.message) {
      setIsSubmitted(true);
    }
  }, [data]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        submit({
          formId: databaseId,
          data: Object.entries(values).map(([name, value]: any) => ({
            id: parseInt(name, 10),
            value,
          })),
        });
      }}
      validationSchema={validations}
    >
      {({ resetForm }) => {
        if (isSubmitted) {
          return (
            <div className={cx(className, styles.root)}>
              <div className={cx(styles.thankYou, styles.message)}>
                {data?.submitForm?.success
                  ? 'Thank you!'
                  : 'Something went wrong. Please try again later'}
              </div>

              <div className={styles.submitButton2}>
                <Button
                  color="primary"
                  rounded
                  onClick={() => {
                    setIsSubmitted(false);
                    resetForm();
                  }}
                >
                  New Letter
                </Button>
              </div>
            </div>
          );
        }

        return (
          <Form className={cx(className, styles.root)}>
            {formFields.map(({ options, label, required, ...item }) => {
              if (item.type === IdFieldType.submit) {
                return (
                  <Button
                    color="primary"
                    type="submit"
                    key={item.name}
                    className={cx(styles.submitButton, styles.submitButton2)}
                  >
                    {label}
                  </Button>
                );
              }

              return (
                <div className={styles.input} key={item.name}>
                  {label && (
                    <label className={styles.label}>
                      {label}
                      {required && (
                        <span className={styles.labelRequired}>*</span>
                      )}
                    </label>
                  )}
                  <Field {...item}>
                    {options?.map(
                      ({ label: optionLabel, value: optionValue }: any) => (
                        <option key={optionValue} value={optionValue}>
                          {optionLabel}
                        </option>
                      ),
                    )}
                  </Field>
                  <ErrorMessage name={`${item.name}`}>
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                </div>
              );
            })}
          </Form>
        );
      }}
    </Formik>
  );
};
