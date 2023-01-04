import React, { FC } from 'react';
import { AdUnit } from './AdUnit';
import { adSizes } from '../config/adSizes';
import { useContextAds } from '../ContextAds';

export const AdUnitHeader: FC = () => {
  const { device } = useContextAds();

  return (
    <AdUnit
      className="trd-ad trd-ad-dynamic trd-ad-center"
      id="div-id-for-top"
      size={adSizes.top[device]}
    />
  );
};
