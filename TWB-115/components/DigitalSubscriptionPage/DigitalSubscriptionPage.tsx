import React, { FC } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import cx from 'classnames';
import { Button } from '../Button';
import { Container } from '../Container';
import CustomerCenterIcon from '../../assets/icons/customer-center.svg';
import styles from '../SubscriptionPage/SubscriptionPage.module.scss';
import { Accordion } from '../Accordion/Accordion';
import { NewsletterSmall } from '../Newsletter';
import { GiftSection } from '../GiftSection/GiftSection';
import { Link } from '../Link';

// we need this to add possibility to extend window by new property
declare const window: any;

export interface DigitalSubscriptionPageProps {}

export const DigitalSubscriptionPage: FC<DigitalSubscriptionPageProps> = () => {
  const showSubscriptionModal = (offerId: string, termId: string) => {
    window.tp.push([
      'init',
      () => {
        window.tp.offer.startCheckout({
          offerId,
          termId: [termId],
        });
      },
    ]);
  };

  return (
    <Container className={styles.root}>
      <Head>
        <title>Subscription - The Real Deal</title>
        <meta
          name="description"
          content="Join the millions of real estate, finance, legal, and investment professionals who rely on The Real Deal’s award-winning content to stay competitive."
        />
      </Head>
      <div className={styles.subscriberBenefitsContainer}>
        <div className={styles.subscriberBenefitsContent}>
          <Image width={560} height={440} src="/subscriber-benefits.png" />
          <div className={styles.subscriberBenefitsListWrapper}>
            <h2 className={styles.title}>The authority of real estate news</h2>
            <ul className={styles.subscriberBenefitsList}>
              <li className={styles.subscriberBenefit}>
                Unlimited digital access
              </li>
              <li className={styles.subscriberBenefit}>
                Fewer ads, more content
              </li>
              <li className={styles.subscriberBenefit}>
                Annual Data Book (digital + print)
              </li>
              <li className={styles.subscriberBenefit}>
                Insights, Reports, and Rankings
              </li>
              <li className={styles.subscriberBenefit}>
                Daily Dirt subscriber newsletter
              </li>
              <li className={styles.subscriberBenefit}>
                Exclusive Master Class videos
              </li>
              <li className={styles.subscriberBenefit}>
                Discounts to all
                <em>TRD</em>
                events +<em>TRD</em>
                store
              </li>
            </ul>

            <Button
              className={styles.tryItButton}
              rounded
              color="primary"
              onClick={() => {
                showSubscriptionModal('OFWS2MC61J22', 'TMSX1E1CMTTG');
                // for localhost!!!!!!!
                // showSubscriptionModal('OFC8OJORNIXZ', 'TMX69UVY5OA2');
              }}
            >
              TRY IT
            </Button>
            <p className={styles.subscriberBenefitsPlanRenews}>
              $1 FOR FIRST MONTH. RENEWS AT $199 YEARLY.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.choosePlanContainer}>
        <h2 className={styles.title}>Pick the plan that’s right for you</h2>
        <div className={styles.plansContainer}>
          <div className={styles.planContainer}>
            <h3 className={styles.planName}>Monthly</h3>
            <div className={styles.planCost}>29</div>
            <div className={styles.planRenews}>
              <span>Renews at $29 monthly</span>
            </div>
            <Button
              className={styles.subscribeButton}
              bordered
              rounded
              onClick={() => {
                showSubscriptionModal('OFWS2MC61J22', 'TM7XS2ZXAFY6');
                // for localhost!!!!!!!
                // showSubscriptionModal('OFC8OJORNIXZ', 'TM89JTU3EY1N');
              }}
            >
              SUBSCRIBE
            </Button>
            <div className={styles.includeMonthlyPrintMagazinePlaceholder} />
          </div>

          <div
            className={cx(styles.planContainer, styles.planContainerPrimary)}
          >
            <h3 className={styles.planName}>Annual</h3>
            <div className={styles.planCost}>1</div>
            <div className={styles.planRenews}>
              <span>$1 for 1 month</span>
              <span>Renews at $199 yearly</span>
            </div>
            <Button
              className={styles.subscribeButton}
              rounded
              color="primary"
              onClick={() => {
                showSubscriptionModal('OFWS2MC61J22', 'TMSX1E1CMTTG');
                // for localhost!!!!!!!
                // showSubscriptionModal('OFC8OJORNIXZ', '');
              }}
            >
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </div>

      <NewsletterSmall
        market="national"
        marketTitle="National"
        title="Top stories delivered to your inbox"
        className={styles.newsletterComponent}
      />

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
