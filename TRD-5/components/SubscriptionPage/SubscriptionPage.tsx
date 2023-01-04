import React, { FC, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import cx from 'classnames';
import { Button } from '../Button';
import { Switch } from '../Switch/Switch';
import { Container } from '../Container';
import CustomerCenterIcon from '../../assets/icons/customer-center.svg';
import styles from './SubscriptionPage.module.scss';
import { Accordion } from '../Accordion/Accordion';
import { GiftSection } from '../GiftSection/GiftSection';
import { showSubscriptionModal } from './showSubscriptionModal';
import { SubscriptionPageSlider } from './SubscriptionPageSlider';
import { Link } from '../Link';

export interface SubscriptionPageProps {}

export const SubscriptionPage: FC<SubscriptionPageProps> = () => {
  const [
    includeMonthlyPrintMagazineForTrial,
    setIncludeMonthlyPrintMagazineForTrial,
  ] = useState(false);
  const [
    includeMonthlyPrintMagazineForAnnual,
    setIncludeMonthlyPrintMagazineForAnnual,
  ] = useState(false);

  return (
    <Container className={styles.root}>
      <Head>
        <title>Subscription - The Real Deal</title>
        <meta
          name="description"
          content="Join the millions of real estate, finance, legal, and investment professionals who rely on The Real Deal’s award-winning content to stay competitive."
        />
      </Head>
      <div className={styles.choosePlanContainer}>
        <h2 className={styles.title}>Pick the plan that’s right for you</h2>
        <div className={styles.plansContainer}>
          <div className={styles.planContainer}>
            <h3 className={styles.planName}>Monthly</h3>
            <div className={styles.planCost}>29</div>
            <div className={styles.planRenews}>Cancel Anytime</div>
            <Button
              className={styles.subscribeButton}
              bordered
              rounded
              onClick={() => {
                showSubscriptionModal('OFWS2MC61J22', 'TMMU990217GW');
              }}
            >
              $29/MONTH
            </Button>
            <div className={styles.includeMonthlyPrintMagazinePlaceholder} />
          </div>

          <div
            className={cx(styles.planContainer, styles.planContainerPrimary)}
          >
            <h3 className={styles.planName}>Annual Trial</h3>
            <div className={styles.planCost}>1
            </div>
            <div className={styles.planRenews}>
              <span>New Subscribers Only</span>
              <span>Renews At $199 - Cancel Anytime</span>
            </div>
            <Button
              className={styles.subscribeButton}
              rounded
              color="primary"
              onClick={() => {
                showSubscriptionModal(
                  'OFWS2MC61J22',
                  includeMonthlyPrintMagazineForTrial
                    ? 'TMWJCCSSW6M4'
                    : 'TMSX1E1CMTTG',
                );
              }}
            >
              $1 FOR 1 MONTH
            </Button>

            <div className={styles.includeMonthlyPrintMagazineWrapper}>
              <Switch
                id="includeMonthlyPrintMagazineForTrial"
                value={includeMonthlyPrintMagazineForTrial}
                onChange={(isSelected: boolean) => {
                  setIncludeMonthlyPrintMagazineForTrial(isSelected);
                }}
              />
              <label
                className={styles.includeMonthlyPrintMagazineLabel}
                htmlFor="includeMonthlyPrintMagazineForTrial"
              >
                Include Monthly Print Magazine
              </label>
            </div>
          </div>

          <div className={styles.planContainer}>
            <h3 className={styles.planName}>Annual</h3>
            <div className={styles.planCost}>199</div>
            <div className={styles.planRenews}>Cancel Anytime</div>
            <Button
              className={styles.subscribeButton}
              bordered
              rounded
              onClick={() => {
                showSubscriptionModal(
                  'OFWS2MC61J22',
                  includeMonthlyPrintMagazineForAnnual
                    ? 'TMSF506PDW0N'
                    : 'TMIRI4T7E7AP',
                );
              }}
            >
              $199/YEAR
            </Button>

            <div className={styles.includeMonthlyPrintMagazineWrapper}>
              <Switch
                id="includeMonthlyPrintMagazineForAnnual"
                value={includeMonthlyPrintMagazineForAnnual}
                onChange={(isSelected: boolean) => {
                  setIncludeMonthlyPrintMagazineForAnnual(isSelected);
                }}
              />
              <label
                className={styles.includeMonthlyPrintMagazineLabel}
                htmlFor="includeMonthlyPrintMagazineForAnnual"
              >
                Include Monthly Print Magazine
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.slider}>
        <SubscriptionPageSlider />
      </div>

      <div className={styles.subscriberBenefitsContainer}>
        <div className={styles.subscriberBenefitsContent}>
          <Image width={560} height={440} src="/subscriber-benefits.png" />
          <div className={styles.subscriberBenefitsListWrapper}>
            <h2 className={styles.title}>Subscriber Benefits</h2>
            <ul className={styles.subscriberBenefitsList}>
              <li className={styles.subscriberBenefit}>
                Unlimited digital access
              </li>
              <li className={styles.subscriberBenefit}>
                Fewer ads, more content
              </li>
              <li className={styles.subscriberBenefit}>
                Insights, Reports, and Rankings
              </li>
              <li className={styles.subscriberBenefit}>
                Daily Dirt subscriber newsletter
              </li>
              <li className={styles.subscriberBenefit}>
                Annual Data Book (digital + print)
              </li>
              <li className={styles.subscriberBenefit}>
                Discounts to all TRDevents + TRDstore
              </li>
              <li className={styles.subscriberBenefit}>
                Exclusive Master Class videos
              </li>
            </ul>

            <Button
              className={styles.tryItButton}
              rounded
              color="primary"
              onClick={() => {
                showSubscriptionModal('OFWS2MC61J22', 'TMSX1E1CMTTG');
                // for localhost!!!!!!!
                // showSubscriptionModal('OFC8OJORNIXZ', 'TMSX1E1CMTTG');
              }}
            >
              TRY UNLIMITED ACCESS
            </Button>
            <div className={styles.subscriberBenefitSubHead}>
              $1 for first month. Renews at $199 annually.
            </div>
          </div>
        </div>
      </div>
      <div className={styles.faqContainer}>
        <div className={styles.title}>Frequently asked questions</div>
        <div className={styles.faqContent}>
          <div className={styles.accordionContainer}>
            <Accordion
              data={[
                {
                  title: 'Where do I enter my password?',
                  content:
                    'Our login system does not require you to set a password for new accounts. When you wish to login to your account you can visit the login page https://therealdeal.com/login/ and enter your email. We will then send you an email verification which will act as your password and log you in to your account.',
                },
                {
                  title: 'What are the cancellation and refund policies?',
                  content:
                    'Your subscription will automatically renew, unless you cancel. The Real Deal does not issue refunds after you have been charged. You may cancel your monthly subscription at any time before the next billing cycle to avoid future charges. Annual subscribers who cancel will not be issued a refund and their subscription will not renew.',
                },
                {
                  title:
                    "If I don’t have a digital subscription, can I still access to The Real Deal's online content?",
                  content:
                    'Yes. The Real Deal readers can view limited content and access 5 complimentary articles during a 30-day period. If you reach your usage limit, you will need to wait for a new 30-day period to start before you can begin reading again.',
                },
                {
                  title:
                    'What payment methods are accepted, and how are subscriptions billed?',
                  content:
                    'As a The Real Deal subscriber, you can pay via debit or credit card and PayPal. The payment method associated with your account will be charged automatically on an annual or monthly basis depending on your subscription package.',
                },
              ]}
            />
          </div>
          <div className={styles.customerCenterContainer}>
            <CustomerCenterIcon />
            <h3 className={styles.customerCenterTitle}>Need help? Visit our</h3>
            <Link
              passHref
              href="https://help.therealdeal.com/knowledge/subscriptions"
            >
              <Button rounded color="primary">
                CUSTOMER CENTER
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <GiftSection showSubscriptionModal={showSubscriptionModal} />
    </Container>
  );
};
