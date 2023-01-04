import React, { FC, useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import cx from 'classnames';
import Error from 'next/error';
import { Button } from '../Button';
import { FormEmail } from './FormEmail/FormEmail';
import styles from './NewsLetterPage.module.scss';
import { Container } from '../Container';
import Tick from '../../assets/icons/tick.svg';
import {
  useContextNewsletter,
  useUpdateNewsLetterSubscription,
} from './useContextNewsletter';
import { PopUpMessage } from './PopUpMessage/PopUpMessage';
import { ResponseNewsLetterSubscription } from '../../graphql/createNewsletterSubscription';
import { useHost } from '../../generic/hooks';
import { extractEmailFromLocalstorage } from './extractEmailFromLocalstorage';

// we need this to add possibility to extend window by new property

export interface NewsLetterPageProps {
  className?: string;
}

export const NewsletterModule: FC<NewsLetterPageProps> = ({ className }) => {
  const [email, setEmail] = useState(extractEmailFromLocalstorage() ?? '');
  const { onSubmit: onSubmitUpdate } = useUpdateNewsLetterSubscription();
  const [subscribedLetter, setSubscribedLetter] = useState<string[]>([]);
  const [allLetter, setAllLetter] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [shadow, setShadow] = useState<boolean>(false);
  const { data, error } = useContextNewsletter(email);
  const [message, setMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const checkResponse = (response: ResponseNewsLetterSubscription) => {
    if (response.successMessage) {
      setShowMessage(true);
      return;
    }
    setMessage('Something went wrong. Your are not unsubscribed or subscribed');
    setShowMessage(true);
  };

  const submit = async () => {
    const response = await onSubmitUpdate(
      email,
      subscribedLetter,
      window.location.pathname,
    );
    if (response) {
      checkResponse(response);
      return;
    }
    setMessage('Something went wrong.');
    setShowMessage(true);
  };

  useEffect(() => {
    if (data) {
      const subscribedLetters: string[] = [];
      const allLetters: string[] = [];
      data.forEach((newsLetterCategory) => {
        newsLetterCategory.list.forEach((newsLetter) => {
          allLetters.push(newsLetter.value);
          if (newsLetter.subscribed) subscribedLetters.push(newsLetter.value);
        });
      });
      setAllLetter(allLetters);
      if (subscribedLetter.length) return;
      setSubscribedLetter(subscribedLetters);
    }
  }, [data]);

  const hostName = useHost();

  if (error) {
    return <Error statusCode={404} />;
  }
  return (
    <div>
      {subscribedLetter && data ? (
        <Container className={cx(styles.root, className)}>
          <div className={styles.heading}>
            <h1 className={styles.title}>
              Get the best of The Real Deal in your inbox
            </h1>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              checked: subscribedLetter,
            }}
            onSubmit={() => {
              if (!email) {
                setShadow(true);
                return;
              }
              submit();
            }}
          >
            {({ values }) => (
              <Form className={styles.form}>
                <div className={styles.navigation}>
                  <div className={styles.tabs}>
                    <Button
                      type="button"
                      className={cx(
                        styles.tabsButton,
                        activeTab === 'All' && styles.activeTab,
                      )}
                      onClick={() => {
                        setActiveTab('All');
                      }}
                    >
                      All
                    </Button>
                    {data.map((item) => (
                      <Button
                        key={item.name}
                        type="button"
                        className={cx(
                          styles.tabsButton,
                          activeTab === item.name && styles.activeTab,
                        )}
                        onClick={() => {
                          setActiveTab(item.name);
                        }}
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button
                  className={cx(styles.subscribeAll, styles.subscribeToAll)}
                  bordered
                  rounded
                  type="submit"
                  onClick={() => {
                    const selectedTab = data.find(
                      (item) => item.name === activeTab,
                    );
                    const selectedItems =
                      selectedTab?.list.map((el) => el.value) ?? [];
                    setMessage('Your are now subscribed to all newsletters');
                    if (activeTab === 'All') {
                      return setSubscribedLetter(allLetter);
                    }
                    return setSubscribedLetter([
                      ...subscribedLetter,
                      ...selectedItems,
                    ]);
                  }}
                >
                  Subscribe to all
                </Button>
                <div>
                  {data.map((item) => (
                    <div
                      key={item.name}
                      hidden={
                        activeTab === 'All' ? false : activeTab !== item.name
                      }
                    >
                      <div className={styles.titleDepart}>{item.name}</div>
                      <p className={styles.subTitleDepart}>
                        {item.description}
                      </p>
                      <div className={styles.content}>
                        {item.list.map((el) => (
                          <div className={styles.card} key={el.label}>
                            <label className={styles.label}>
                              {el.label}
                              <Field type="checkbox" name={el.value} hidden />
                              <button
                                className={cx(
                                  styles.checkbox,
                                  values.checked.includes(el.value) &&
                                    styles.chosenCheckbox,
                                )}
                                type="submit"
                                onClick={() => {
                                  if (values.checked.includes(el.value)) {
                                    const newArr = subscribedLetter.filter(
                                      (i) => i !== el.value,
                                    );
                                    setSubscribedLetter(newArr);
                                    setMessage('You are now unsubscribed');
                                    return;
                                  }
                                  setSubscribedLetter([
                                    ...subscribedLetter,
                                    el.value,
                                  ]);
                                  setMessage('You are now subscribed');
                                }}
                              >
                                <Tick />
                              </button>
                            </label>
                            <img
                              className={styles.image}
                              src={`${hostName}${el.image}`}
                              alt={el.label}
                              loading="lazy"
                            />
                            <div className={styles.titleCheckbox}>
                              {el.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <Button
                    className={cx(styles.subscribeAll, styles.unsubscribeAll)}
                    bordered
                    rounded
                    disabled={!email}
                    type="submit"
                    onClick={() => {
                      const selectedTab = data.find(
                        (item) => item.name === activeTab,
                      );
                      const selectedItems =
                        selectedTab?.list.map((el) => el.value) ?? [];
                      const filteredItems = subscribedLetter.filter(
                        (item) => !selectedItems.includes(item),
                      );
                      setMessage(
                        'Your are now unsubscribed from all newsletters',
                      );
                      if (activeTab === 'All') {
                        return setSubscribedLetter([]);
                      }
                      return setSubscribedLetter(filteredItems);
                    }}
                  >
                    Unsubscribe to all
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          {!email && (
            <FormEmail
              checkRespons={checkResponse}
              className={shadow ? styles.formOpened : styles.formClosed}
              quantity={subscribedLetter.length}
              setEmail={setEmail}
              closePopup={setShadow}
              subscriptionList={subscribedLetter}
            />
          )}
          {showMessage && (
            <PopUpMessage
              className={styles.message}
              message={message}
              closePopUp={setShowMessage}
            />
          )}
        </Container>
      ) : (
        <div className={styles.waitingBlock}> </div>
      )}
    </div>
  );
};
