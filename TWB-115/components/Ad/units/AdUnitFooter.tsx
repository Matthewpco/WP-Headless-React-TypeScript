import React, { FC } from 'react';
import { AdUnit, IAdUnit } from './AdUnit';
import { adSizes } from '../config/adSizes';
import { useContextAds } from '../ContextAds';

export interface IAdUnitFooter
  extends Pick<IAdUnit, 'lazyload'>,
    Partial<Pick<IAdUnit, 'id'>> {}

export const AdUnitFooter: FC<IAdUnitFooter> = ({
  id = 'div-id-for-footer',
  lazyload,
}) => {
  const { device } = useContextAds();

  return (
    <AdUnit
      className="trd-ad trd-ad-center"
      id={id}
      lazyload={lazyload}
      size={adSizes.footer[device]}
    />
  );
};
