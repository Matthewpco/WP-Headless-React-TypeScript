import React, { FC } from 'react';
import cx from 'classnames';
import { Field, FieldAttributes } from 'formik';
import styles from './NewsletterForm.module.scss';
import { Button } from '../Button';
import { Input } from '../Input';
import { Size } from '../../generic/types';

export interface NewsletterFormProps {
  className?: string;
  size?: Size;
  buttonText?: string;
}

export const NewsletterForm: FC<NewsletterFormProps> = ({
  size = 'medium',
  className,
  buttonText,
}) => (
  <div className={cx(styles.root, className)}>
    <Field name="email">
      {({ field }: FieldAttributes<any>) => (
        <Input
          {...field}
          value={field.value ?? ''}
          type="text"
          size={size}
          placeholder="Enter Your Email"
          className={styles.input}
          rounded
        />
      )}
    </Field>
    <Button
      className={styles.signUpButton}
      type="submit"
      color="primary"
      size={size}
      rounded
    >
      {buttonText ?? 'SIGN UP'}
    </Button>
  </div>
);
