import React, { FC } from 'react';
import cx from 'classnames';
import { Link } from '../Link';
import { Button } from '../Button';
import styles from './Meter.module.scss';

export interface MeterProps {
  className?: string;
  count: number;
}

export const Meter: FC<MeterProps> = ({ className, count }) => (
  <div className={cx(className, styles.root)}>
    <div className={styles.wrapper}>
      <div>
        <span className={styles.blackText}>You have123 </span>
        <span className={styles.redText}>{count}</span>
        <span className={styles.blackText}> free articles left</span>
      </div>
      <Link passHref href="/subscription" className={styles.subscribeButton}>
        <Button rounded color="primary" className={styles.subscribeButton}>
          SUBSCRIBE
        </Button>
      </Link>
    </div>
  </div>
);
