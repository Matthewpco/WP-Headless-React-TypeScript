import React, { FC, useEffect, useState } from 'react';
import cx from 'classnames';
import { Container } from '../../../Container';
import { PianoRepository } from '../../../../piano/pianoRepository';
import { IPianoUser, IBillingHistoryData } from '../../../../piano/types';
import { Button } from '../../../Button';
import { Link } from '../../../Link';
// TODO: uncomment it when we will have invoice template
// import PrinterIcon from '../../../../assets/icons/printer.svg';

import styles from './BillingHistoryPage.module.scss';

export interface BillingHistoryPageProps {
  pianoUser: IPianoUser;
  className?: string;
}

export const BillingHistoryPage: FC<BillingHistoryPageProps> = ({ pianoUser, className }) => {
  const [billingHistoryData, setBillingHistoryData] = useState<IBillingHistoryData[]>([]);
  const noSubscriptions = billingHistoryData.length === 0;

  useEffect(() => {
    if (pianoUser.uid) {
      PianoRepository
        .getBillingHistory(pianoUser.uid)
        .then((data) => {
          setBillingHistoryData(data);
        });
    }
  }, [pianoUser.uid]);

  const renderSubscribeBlock = () => (
    <div className={styles.noSubscriptionsWrapper}>
      <p className={styles.noSubscriptionsLabel}>
        You have no active subscriptions
      </p>
      <Link
        href="/subscription/?utm_source=my-account&utm_medium=no-active-subscription&utm_campaign=my-account&tpcc=my-account"
      >
        <Button className={styles.subscribeButton} color="primary">
          Subscribe now
        </Button>
      </Link>
    </div>
  );

  const renderBillingHistory = () => (
    <table className={styles.billingHistoryTable}>
      <thead>
        <tr>
          <td> Product Name </td>
          <td> Date </td>
          <td> Payment Method </td>
          <td> Price </td>
          <td> Status </td>
          <td> </td>
        </tr>
      </thead>
      <tbody>
        {billingHistoryData.map((value) => (
          <tr key={value.name}>
            <td>
              {value.name}
            </td>
            <td>
              {value.paymentDate}
            </td>
            <td>
              {value.paymentMethod}
            </td>
            <td>
              {`${value.price}`}
            </td>
            <td>
              {value.status}
            </td>
            <td>
              {
                // TODO: uncomment it when we will have invoice template
                /*
                  <Link href="#">
                    <PrinterIcon className={styles.icon} />
                  </Link>
                */
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <Container className={cx(className, styles.root)}>
      {noSubscriptions && renderSubscribeBlock()}
      {!noSubscriptions && renderBillingHistory()}
    </Container>
  );
};
