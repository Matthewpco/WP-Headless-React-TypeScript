import React, { FC } from 'react';
import cx from 'classnames';
import { Container } from '../../../Container';
import { Button } from '../../../Button';
import { Link } from '../../../Link';
import styles from './EducationPage.module.scss';

export interface EducationPageProps {
  className?: string;
}

export const EducationPage: FC<EducationPageProps> = ({ className }) => (
  <Container className={cx(className, styles.root)}>
    <img
      className={styles.trdEduLogo}
      alt="The real deal education logo"
      src="/trd-edu.png"
      loading="lazy"
    />
    <div className={styles.trdEduDescription}>
      TRD Education helps you stay on top of the real estate market and your
      license.
    </div>
    <div className={styles.trdEduBenefitsWrapper}>
      All standard subscription benefits plus:
      <div className={styles.benefitsButtonsWrapper}>
        <Link
          href="https://trdpro.theceshop.com/"
          className={styles.benefitsButtonWrapper}
        >
          <Button rounded className={styles.benefitsButton} size="large">
            CE SHOP
          </Button>
        </Link>
        <Link
          href="https://therealdeal.com/videos/master-classes/#/"
          className={styles.benefitsButtonWrapper}
        >
          <Button rounded className={styles.benefitsButton} size="large">
            MASTER CLASSES
          </Button>
        </Link>
      </div>
    </div>
    <div className={styles.trdEduGuideWrapper}>
      <div className={styles.trdEduGuideTitle}>
        How to redeem your CE SHOP voucher:
      </div>
      <ol className={styles.trdEduGuideList}>
        <li>
          Visit
          <Link
            className={styles.trdProLink}
            href="https://trdpro.theceshop.com/"
          >
            trdpro.ceshop.com
          </Link>
        </li>
        <li>
          Select your state&apos;s continuing education course and add to cart
        </li>
        <li>
          Check out with your unique promo code BELOW for 100% off the list
          price
        </li>
      </ol>
      <Link href="#">
        <Button rounded color="primary" className={styles.getCodeButton}>
          GET CE SHOP CODE
        </Button>
      </Link>
    </div>
  </Container>
);
