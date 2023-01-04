import React, { FC, useEffect, useState } from 'react';
import cx from 'classnames';
import { Container } from '../../../Container';
import { PianoRepository } from '../../../../piano/pianoRepository';
import { IPianoUser, ISubscriptionData } from '../../../../piano/types';
import { Button } from '../../../Button';
import { Link } from '../../../Link';
import CheckedIcon from '../../../../assets/icons/checked.svg';
import PrintIcon from '../../../../assets/icons/print.svg';
import DigitalIcon from '../../../../assets/icons/digital.svg';

import styles from './SubscriptionPage.module.scss';

export interface SubscriptionPageProps {
  pianoUser: IPianoUser;
  className?: string;
}

export const SubscriptionPage: FC<SubscriptionPageProps> = ({
  pianoUser,
  className,
}) => {
  const [activeTabName, setActiveTabName] = useState('active');
  const [activeSubscriptions, setActiveSubscriptions] = useState<
    ISubscriptionData[]
  >([]);
  const [expiredSubscriptions, setExpiredSubscriptions] = useState<
    ISubscriptionData[]
  >([]);
  const noActiveSubscriptions = activeSubscriptions.length === 0;

  useEffect(() => {
    if (pianoUser.uid) {
      PianoRepository.getSubscriptions(pianoUser.uid).then(
        ({ active, expired }) => {
          setActiveSubscriptions(active);
          setExpiredSubscriptions(expired);
        },
      );
    }
  }, [pianoUser.uid]);

  const renderSubscribeBlock = () => (
    <div className={styles.noSubscriptionsWrapper}>
      <p className={styles.noSubscriptionsLabel}>
        You have no active subscriptions
      </p>
      <Link href="/subscription/?utm_source=my-account&utm_medium=no-active-subscription&utm_campaign=my-account&tpcc=my-account">
        <Button className={styles.subscribeButton} color="primary" size="large">
          SUBSCRIBE NOW
        </Button>
      </Link>
    </div>
  );

  const renderCancelLabel = () => (
    <div className={styles.cancelSubscriptionLabel}>
      In order to cancel your subscription, please contact
      <Link
        className={styles.customerServiceLink}
        href="https://help.therealdeal.com/knowledge/subscriptions"
      >
        customer service
      </Link>
      .
    </div>
  );

  const renderActiveSubscriptions = () => (
    <div>
      <table className={styles.subscriptionTable}>
        <tbody>
          {activeSubscriptions.map((value) => (
            <tr key={value.name}>
              <td>
                <CheckedIcon />
              </td>
              <td>
                {value.hasPrint ? (
                  <PrintIcon className={styles.icon} />
                ) : (
                  <DigitalIcon className={styles.icon} />
                )}
              </td>
              <td>{value.name}</td>
              <td>{value.billingPlan}</td>
              <td>
                <div className={styles.nextBillDateLabel}>Access Expires</div>
                <div className={styles.nextBillDateValue}>
                  {value.nextBillDate}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderCancelLabel()}
    </div>
  );

  const renderExpiredSubscriptions = () => (
    <div>
      <table className={styles.subscriptionTable}>
        <tbody>
          {expiredSubscriptions.map((value) => (
            <tr key={value.name}>
              <td> </td>
              <td>
                {value.hasPrint ? (
                  <PrintIcon className={styles.icon} />
                ) : (
                  <DigitalIcon className={styles.icon} />
                )}
              </td>
              <td>{value.name}</td>
              <td>{value.billingPlan}</td>
              <td>
                <div className={styles.nextBillDateLabel}>Ended on</div>
                <div className={styles.nextBillDateValue}>
                  {value.nextBillDate}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderCancelLabel()}
    </div>
  );

  return (
    <Container className={cx(className, styles.root)}>
      <div className={styles.buttonsContainer}>
        <Button
          rounded
          size="large"
          className={cx(styles.button, {
            [styles.buttonActive]: activeTabName === 'active',
          })}
          onClick={() => setActiveTabName('active')}
        >
          Active
        </Button>
        <Button
          rounded
          size="large"
          className={cx(styles.button, {
            [styles.buttonActive]: activeTabName === 'expired',
          })}
          onClick={() => setActiveTabName('expired')}
        >
          Expired
        </Button>
      </div>
      {noActiveSubscriptions &&
        activeTabName === 'active' &&
        renderSubscribeBlock()}
      {!noActiveSubscriptions &&
        activeTabName === 'active' &&
        renderActiveSubscriptions()}
      {activeTabName === 'expired' && renderExpiredSubscriptions()}
    </Container>
  );
};
