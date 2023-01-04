import React, { FC } from 'react';
import cx from 'classnames';
import { AdUnit } from './AdUnit';
import { adSizes } from '../config/adSizes';
import { useContextAds } from '../ContextAds';
import styles from '../Ad.module.scss';
export interface IAdUnitHomePage {
  id: string;
}
export const AdUnitHomePage: FC<IAdUnitHomePage> = ({ id }) => {
  const { device } = useContextAds();
  return (
    <AdUnit
      className={cx(styles.rootHomepage, 'trd-ad', 'trd-ad-center')}
      id={`homepage-mid-${id}`}
      size={adSizes.home[device]}
    />
  );
};