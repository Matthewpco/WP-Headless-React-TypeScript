import React, { FC, useEffect, useState } from 'react';
import cx from 'classnames';
import { Container } from '../../../Container';
import { PianoRepository } from '../../../../piano/pianoRepository';
import { IPianoUser, IGiftData } from '../../../../piano/types';
import { Button } from '../../../Button';
import { Link } from '../../../Link';
import CheckedIcon from '../../../../assets/icons/checked.svg';
import PrintIcon from '../../../../assets/icons/print.svg';
import DigitalIcon from '../../../../assets/icons/digital.svg';

import styles from './GiftPage.module.scss';

export interface GiftPageProps {
  pianoUser: IPianoUser;
  className?: string;
}

export const GiftPage: FC<GiftPageProps> = ({ pianoUser, className }) => {
  const [activeGifts, setActiveGifts] = useState<IGiftData[]>([]);
  const [expiredGifts, setExpiredGifts] = useState<IGiftData[]>([]);

  const allGifts = [...activeGifts, ...expiredGifts];

  useEffect(() => {
    if (pianoUser.uid) {
      PianoRepository
        .getGifts(pianoUser.uid)
        .then(({ active, expired }) => {
          setActiveGifts(active);
          setExpiredGifts(expired);
        });
    }
  }, [pianoUser.uid]);

  const renderGiveAGiftBlock = () => (
    <div className={styles.noSubscriptionsWrapper}>
      <p className={styles.noSubscriptionsLabel}>
        You have not given any gifts
      </p>
      <Link
        href="/subscription/?utm_source=my-account&utm_medium=give-gift&utm_campaign=my-account&tpcc=my-account#gifts"
      >
        <Button className={styles.subscribeButton} color="primary" size="large">
          GIVE A GIFT
        </Button>
      </Link>
    </div>
  );

  const renderGifts = (data: IGiftData[]) => (
    <div>
      <div className={styles.buttonsContainer}>
        <Link
          href="/subscription/?utm_source=my-account&utm_medium=give-gift&utm_campaign=my-account&tpcc=my-account#gifts"
        >
          <Button
            rounded
            size="large"
            className={styles.button}
          >
            GIVE A GIFT
          </Button>
        </Link>
      </div>
      <table className={styles.subscriptionTable}>
        <tbody>
          {data.map((value) => (
            <tr key={value.name}>
              <td>
                <CheckedIcon />
              </td>
              <td>
                {
                  value.isPrint
                    ? <PrintIcon className={styles.icon} />
                    : <DigitalIcon className={styles.icon} />
                }
              </td>
              <td>
                <div className={styles.nextBillDateLabel}>
                  {value.recipient}
                </div>
                <div className={styles.nextBillDateValue}>
                  {value.name}
                </div>
              </td>
              <td>
                <div className={styles.nextBillDateLabel}>
                  Price
                </div>
                <div className={styles.nextBillDateValue}>
                  {value.price}
                </div>
              </td>
              <td>
                <div className={styles.nextBillDateLabel}>
                  {value.timeText === 'Refunded' ? '' : 'Created on'}
                </div>
                <div className={styles.nextBillDateValue}>
                  {value.timeText}
                </div>
              </td>
              <td>
                <div className={styles.nextBillDateLabel}>
                  {`Redeemed ${value.redeemedDate ? 'on' : ''}`}
                </div>
                <div className={styles.nextBillDateValue}>
                  {`${value.redeemedDate || 'Not yet'}`}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <Container className={cx(className, styles.root)}>
      {allGifts && allGifts.length === 0 && renderGiveAGiftBlock()}
      {allGifts && allGifts.length && renderGifts(allGifts)}
    </Container>
  );
};
