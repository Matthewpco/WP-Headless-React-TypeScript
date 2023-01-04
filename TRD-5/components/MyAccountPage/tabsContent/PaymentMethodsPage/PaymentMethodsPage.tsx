import React, { FC, useEffect } from 'react';
import cx from 'classnames';
import { Container } from '../../../Container';
import styles from './PaymentMethodsPage.module.scss';

// we need this to add possibility to extend window by new property
declare const window: any;

export interface PaymentMethodsPageProps {
  className?: string;
}

export const PaymentMethodsPage: FC<PaymentMethodsPageProps> = ({ className }) => {
  useEffect(() => {
    if (localStorage.pianoUser) {
      window.tp = window.tp || [];
      window.tp.push(['init', () => {
        window.tp.myaccount.show({
          displayMode: 'inline',
          containerSelector: `.${styles.accountWrapper}`,
        });
      }]);
    }
  }, []);

  return (
    <Container className={cx(className, styles.root)}>
      <div className={styles.accountWrapper} />
    </Container>
  );
};
