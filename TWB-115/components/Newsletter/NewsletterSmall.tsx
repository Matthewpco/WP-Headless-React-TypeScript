import React, { FC, useEffect, useMemo, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import cx from 'classnames';
import { NewsletterForm } from './NewsletterForm';
import styles from './NewsletterSmall.module.scss';
import {
  useContextNewsletter,
  useCreateNewsLetterSubscription,
} from '../NewsLetterPage/useContextNewsletter';
import { extractEmailFromLocalstorage } from '../NewsLetterPage/extractEmailFromLocalstorage';
import CloseButton from '../../assets/icons/closeButton.svg';
import { RequestUpdateNewsletterSubscription } from '../../graphql/updateNewsletterSubscription';

export interface NewsletterSmallProps {
  market?: string;
  marketTitle: string;
  place?: string;
  className?: string;
  isClosable?: boolean;

  title?: string;
  message?: string;
  cta?: string;
  success?: string;
  error?: string;
}

type OnSubmit = (
  values: RequestUpdateNewsletterSubscription,
  formikHelpers: FormikHelpers<RequestUpdateNewsletterSubscription>,
) => void;

export const NewsletterSmall: FC<NewsletterSmallProps> = ({
  marketTitle,
  className,
  title,
  message,
  cta,
  isClosable = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const email = useMemo(() => extractEmailFromLocalstorage(), []);
  const [unSubscribedLetters, setUnSubscribedLetters] = useState<string[]>([]);
  const { data } = useContextNewsletter(email);

  useEffect(() => {
    if (data) {
      const letters: string[] = [];
      const higthPriorityNewsletters: string[] = [];
      let subscribedNational = false;
      data.forEach((newsLetterCategory) => {
        newsLetterCategory.list.forEach((newsLetter) => {
          if (!newsLetter.subscribed) {
            if (newsLetter.label === marketTitle) {
              higthPriorityNewsletters.push(newsLetter.value);
              return;
            }
            if (newsLetter.label === 'National') {
              subscribedNational = true;
              return;
            }
            letters.push(newsLetter.value);
          }
        });
      });
      if (subscribedNational) higthPriorityNewsletters.push('National Weekly');
      setUnSubscribedLetters([...higthPriorityNewsletters, ...letters]);
    }
  }, [data]);

  const { onSubmit } = useCreateNewsLetterSubscription();

  const onSubmitForm: OnSubmit = (values) => {
    onSubmit(values.email, [unSubscribedLetters[0]], window.location.pathname);
    setUnSubscribedLetters(unSubscribedLetters.slice(1));
  };

  const initialValues: RequestUpdateNewsletterSubscription = {
    email: email ?? '',
  };

  if (!unSubscribedLetters.length) return null;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmitForm}
    >
      <Form>
        <section
          className={cx(styles.root, className, {
            [styles.hidden]: !isOpen,
          })}
        >
          <h3 className={styles.title}>
            {title ?? `Sign Up for the ${unSubscribedLetters[0]} Newsletter`}
          </h3>

          {isClosable && (
            <CloseButton
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            />
          )}

          <NewsletterForm
            size="medium"
            className={styles.form}
            buttonText={cta}
          />
          <p className={styles.paragraph}>
            {message ??
              'By signing up, you agree to TheRealDeal Terms of Use and acknowledge the data practices in our Privacy Policy.'}
          </p>
        </section>
      </Form>
    </Formik>
  );
};
