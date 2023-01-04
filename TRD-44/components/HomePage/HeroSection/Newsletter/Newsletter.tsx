import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { Button } from '../../../Button';
import {
  useContextNewsletter,
  useCreateNewsLetterSubscription,
} from '../../../NewsLetterPage/useContextNewsletter';
import styles from './Newsletter.module.scss';
import { ResponseNewsLetterSubscription } from '../../../../graphql/createNewsletterSubscription';
import { PopUpMessage } from '../../../NewsLetterPage/PopUpMessage/PopUpMessage';
import { List } from '../../../List';
import Tick from '../../../../assets/icons/tick.svg';
import { Confetti } from './Confetti/Confetti';
import { useDebounce } from '../../../../generic/hooks';
import { extractEmailFromLocalstorage } from '../../../NewsLetterPage/extractEmailFromLocalstorage';
import { Link } from '../../../Link';

export const Newsletter = () => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [email, setEmail] = useState(extractEmailFromLocalstorage() ?? '');
  const [unsubscribedLetter, setUnsubscribedLetter] = useState<string[]>([]);
  const [initialValues, setInitialValues] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const { onSubmit: onSubmitNewsletter } = useCreateNewsLetterSubscription();
  const { data, error } = useContextNewsletter(email);

  useEffect(() => {
    if (!email) return;

    if (data) {
      const unsubscribedLetters: string[] = [];
      data.forEach((newsLetterCategory) => {
        newsLetterCategory.list.forEach((newsLetter) => {
          if (!newsLetter.subscribed) {
            unsubscribedLetters.push(newsLetter.value);
          }
        });
      });
      setUnsubscribedLetter(unsubscribedLetters);
    }
  }, [data]);

  const checkResponse = (response: ResponseNewsLetterSubscription) => {
    if (response.successMessage) {
      setMessage('You are now subscribed');
      setShowMessage(true);
      return;
    }
    setMessage('Something went wrong. Your are not unsubscribed or subscribed');
    setShowMessage(true);
  };

  const submitGuest = async (guestEmail: string) => {
    const response = await onSubmitNewsletter(
      guestEmail,
      ['National Weekly'],
      window.location.pathname,
    );
    checkResponse(response);
  };

  const submit = async (values: string[]) => {
    const response = await onSubmitNewsletter(
      email,
      values,
      window.location.pathname,
    );
    checkResponse(response);
  };

  const debounce = useDebounce(4500);

  const addConfetti = () => {
    setShowConfetti(true);
    const { body } = document;
    body.classList.add('blocked-1');
    debounce(() => {
      setShowConfetti(false);
      body.classList.remove('blocked-1');
    });
  };

  if (error || (!unsubscribedLetter.length && email)) {
    return <div />;
  }

  return (
    <div>
      {showConfetti && <Confetti />}
      <div className={styles.title}>Get the latest Real Estate news</div>
      <div className={styles.root}>
        {!email ? (
          <Formik
            initialValues={{ guestEmail: '' }}
            onSubmit={({ guestEmail }) => {
              setEmail(guestEmail);
              submitGuest(guestEmail);
              addConfetti();
            }}
            validate={({ guestEmail }) => {
              if (!guestEmail) {
                return { guestEmail: 'Required' };
              }
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(guestEmail)
              ) {
                return { guestEmail: 'Invalid email address' };
              }
              return {};
            }}
          >
            {({ isSubmitting }) => (
              <>
                <div className={styles.subTitle}>
                  National headlines delivered weekly
                </div>
                <Form className={styles.form}>
                  <div className={styles.container}>
                    <Field
                      name="guestEmail"
                      placeholder="Enter your email"
                      type="string"
                      className={styles.input}
                    />
                    <ErrorMessage name="guestEmail">
                      {(msg) => (
                        <div className={styles.errorMessage}>{msg}</div>
                      )}
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
              </>
            )}
          </Formik>
        ) : (
          <Formik
            enableReinitialize
            initialValues={{
              checked: initialValues,
            }}
            onSubmit={(values) => {
              submit(values.checked);
              const newArr = unsubscribedLetter.filter(
                (item) => !values.checked.includes(item),
              );
              setUnsubscribedLetter(newArr);
              addConfetti();
            }}
          >
            {({ values }) =>
              unsubscribedLetter && (
                <Form className={cx(styles.formCheckbox, styles.form)}>
                  <ul>
                    <List
                      items={unsubscribedLetter.slice(0, 3)}
                      render={(item) => (
                        <li key={item}>
                          <button
                            type="button"
                            className={cx(
                              styles.checkbox,
                              values.checked.includes(item) &&
                                styles.chosenCheckbox,
                            )}
                            onClick={() => {
                              if (values.checked.includes(item)) {
                                const newArr = initialValues.filter(
                                  (i) => i !== item,
                                );
                                setInitialValues(newArr);
                              } else {
                                const newArr = [...values.checked, item];
                                setInitialValues(newArr);
                              }
                            }}
                          >
                            <Tick />
                          </button>
                          <Field type="checkbox" name={item} hidden />
                          <label className={styles.label}>{item}</label>
                        </li>
                      )}
                    />
                  </ul>
                  <Button
                    className={styles.submitButton}
                    type="submit"
                    color="primary"
                    rounded
                  >
                    Sign Up
                  </Button>
                  <Link className={styles.linkNewsletter} href="/newsletter">
                    View all newsletters
                  </Link>
                </Form>
              )
            }
          </Formik>
        )}
        <div className={styles.description}>
          <Link href="#">
            By signing up, you agree to TheRealDeal Terms of Use and acknowledge
            the data practices in our Privacy Policy.
          </Link>
        </div>
        {showMessage && (
          <PopUpMessage
            className={styles.message}
            message={message}
            closePopUp={setShowMessage}
          />
        )}
      </div>
    </div>
  );
};
