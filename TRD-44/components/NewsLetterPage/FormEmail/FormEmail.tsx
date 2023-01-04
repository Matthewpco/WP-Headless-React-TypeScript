import React, { FC, useEffect, useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import cx from 'classnames';
import { Button } from '../../Button';
import styles from './FormEmail.module.scss';
import { useCreateNewsLetterSubscription } from '../useContextNewsletter';
import { ResponseNewsLetterSubscription } from '../../../graphql/createNewsletterSubscription';

interface Iprops {
    setEmail: (email: string) => void;
    quantity: number;
    className: string;
    closePopup: (arg: false) => void;
    subscriptionList: string[];
    checkRespons: (arg: ResponseNewsLetterSubscription) => void;
}

export const FormEmail: FC<Iprops> = ({
  setEmail, quantity, className, closePopup, subscriptionList, checkRespons}) => {
  const [guestEmail, setGuestEmail] = useState('');
  const { onSubmit } = useCreateNewsLetterSubscription();
  const [response, setResponse] = useState<ResponseNewsLetterSubscription>();

  useEffect(() => {
    if (!guestEmail) return;
    (async () => {
      const answer = await onSubmit(guestEmail, subscriptionList, window.location.pathname);
      if (answer) {
        setResponse(answer);
        checkRespons(answer);
      }
    })();
  }, [guestEmail]);

  useEffect(() => {
    if (guestEmail) setEmail(guestEmail);
    closePopup(false);
  }, [response]);

  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.title}>{`You have ${quantity} newsletters selected.`}</div>
      <div className={styles.subTitle}>
        Sign up to receive the latest stories, deals, news,
        data, highlights & insights you need to know for the industry
      </div>
      <Formik
        initialValues={{email: ''}}
        onSubmit={({email}) => {
            setGuestEmail(email);
        }}
        validate={({email}) => {
            if (!email) {
                return {email: 'Required'};
              } if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                return {email: 'Invalid email address'};
              }
              return {};
        }}
      >
        {({ isSubmitting}) => (
          <Form className={styles.form}>
            <div className={styles.container}>
              <Field name="email" placeholder="Enter your email" type="string" className={styles.input} />
              <ErrorMessage name="email">
                {(msg) => <div className={styles.errorMessage}>{msg}</div>}
              </ErrorMessage>
            </div>
            <Button
              className={styles.submitButton}
              disabled={isSubmitting}
              type="submit"
              color="primary"
              rounded
            >
              Sign Up
            </Button>
          </Form>
    )}
      </Formik>
    </div>
);
};
