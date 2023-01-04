import React, { FC, useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import cx from 'classnames';
import { Container } from '../Container';

import { NavigationTabs } from './NavigationTabs';
import { PaymentMethodsPage } from './tabsContent/PaymentMethodsPage/PaymentMethodsPage';
import { ProfilePage } from './tabsContent/ProfilePage/ProfilePage';
import { BillingHistoryPage } from './tabsContent/BillingHistoryPage/BillingHistoryPage';
import { SubscriptionPage } from './tabsContent/SubscriptionPage/SubscriptionPage';
import { GiftPage } from './tabsContent/GiftPage/GiftPage';
import { EducationPage } from './tabsContent/EducationPage/EducationPage';
import { SavedArticlesPage } from './tabsContent/SavedArticlesPage/SavedArticlesPage';

import { IPianoUser } from '../../piano/types';

import styles from './MyAccountPage.module.scss';
import { PianoRepository } from '../../piano/pianoRepository';
import { NewsletterModule } from '../NewsLetterPage/NewsletterModule';

// we need this to add possibility to extend window by new property
declare const window: any;

export interface MyAccountPageProps { }

export const MyAccountPage: FC<MyAccountPageProps> = () => {
  const { push, pathname, query } = useRouter();

  const defaultTabsList = [
    'Profile',
    'Subscription',
    'Gift',
    'Payment methods',
    'Billing history',
    'Newsletter',
    'Saved Articles',
  ];
  const [tabs, setTabs] = useState(defaultTabsList);
  const [activeTab, setActiveTab] = useState(query.tab && !Array.isArray(query.tab) ? query.tab : 'Profile');
  const [pianoUser, setPianoUser] = useState<IPianoUser>({
    uid: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (localStorage.pianoUser) {
      setPianoUser(JSON.parse(localStorage.pianoUser));
    }
  }, []);

  useEffect(() => {
    if (!localStorage.pianoUser) {
      window.tp = window.tp || [];
      window.tp.push([
        'init',
        () => {
          window.tp.pianoId.show({
            screen: 'login',
            displayMode: 'inline',
            containerSelector: '#my-account-page',
            loggedIn: () => {
              const user = window.tp.pianoId.getUser();
              window.localStorage.setItem('pianoId', user.uid);
              window.localStorage.setItem('pianoUser', JSON.stringify(user));
              window.location.reload();
            },
          });
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (pianoUser.uid) {
      PianoRepository
        .getSubscriptions(pianoUser.uid)
        .then(({ active }) => {
          const subscriptionNames = active.map((item) => item.name);

          if (subscriptionNames.some((item) => item.toLowerCase().startsWith('education'))) {
            const newTabs = JSON.parse(JSON.stringify(defaultTabsList));
            newTabs.splice(2, 0, 'Education');
            setTabs(newTabs);
          }
        });
    }
  }, [pianoUser.uid]);

  const isTabVisible = (tabName: string) => (
    tabName === activeTab
  );

  const onChange = (tabName: string) => {
    push(
      {
        pathname: `${pathname}`,
        query: { tab: `${tabName}` },
      },
      undefined,
      { shallow: true },
    );
    setActiveTab(tabName);
  };

  return (
    <Container id="my-account-page" className={styles.root}>
      <Head>
        <title>My Account - The Real Deal</title>
        <meta name="description" content="Mange your The Real Deal profile, subscription and more." />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="My Account - The Real Deal" />
        <meta property="og:description" content="Mange your The Real Deal profile, subscription and more." />
        <meta property="og:url" content="https://therealdeal.com/my-account/" />
        <meta property="og:site_name" content="The Real Deal New York" />
        <meta property="og:image" content="/wp-content/uploads/2019/10/trd-logo-16x9.jpg" />
        <meta property="og:image:width" content="1600" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@trdny" />
      </Head>
      <h1 className={styles.accountName}>
        {`Hello, ${pianoUser.firstName} ${pianoUser.lastName}`}
      </h1>
      <div className={styles.accountBody}>
        <NavigationTabs
          values={tabs}
          value={activeTab}
          onChange={(tabName) => onChange(tabName)}
        />
        <div className={styles.accountContent}>
          <PaymentMethodsPage
            className={cx({ [styles.hiddenContent]: !isTabVisible('Payment methods') })}
          />

          <ProfilePage
            pianoUser={pianoUser}
            className={cx({ [styles.hiddenContent]: !isTabVisible('Profile') })}
          />

          <BillingHistoryPage
            pianoUser={pianoUser}
            className={cx({ [styles.hiddenContent]: !isTabVisible('Billing history') })}
          />

          <SubscriptionPage
            pianoUser={pianoUser}
            className={cx({ [styles.hiddenContent]: !isTabVisible('Subscription') })}
          />

          <EducationPage
            className={cx({ [styles.hiddenContent]: !isTabVisible('Education') })}
          />

          <GiftPage
            pianoUser={pianoUser}
            className={cx({ [styles.hiddenContent]: !isTabVisible('Gift') })}
          />

          <NewsletterModule
            className={cx({ [styles.hiddenContent]: !isTabVisible('Newsletter') })}
          />

          <SavedArticlesPage
            className={cx({ [styles.hiddenContent]: !isTabVisible('Saved Articles') })}
          />
        </div>
      </div>
    </Container>
  );
};
