import React from 'react';
import { ErrorMessage, Field } from 'formik';
import styles from './FormToAuthor.module.scss';
import { IFormToAuthorInputProps } from './FormToAuthor';

export const renderErrorMessageFormToAuthor = (msg: string) => (
  <div className={styles.errorMessage}>{msg}</div>
);

export const renderFormControlFormToAuthor = (
  item: IFormToAuthorInputProps,
) => (
  <div className={styles.input} key={`${item.name}`}>
    <Field {...item} />
    <ErrorMessage name={`${item.name}`}>{renderErrorMessageFormToAuthor}</ErrorMessage>
  </div>
);
