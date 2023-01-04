import React, { FC, useEffect, useState } from 'react';
import { useContextAds } from '../ContextAds';
import { inViewPort } from '../utils/inViewPort';
import { displayAd } from '../utils/displayAd';
import { removeAd } from '../utils/removeAd';
import { refreshAd } from '../utils/refreshAd';

declare const window: any;

export type AdSize =
  | 'fluid'
  | 'OutOfPage'
  | [number, number][]
  | ('fluid' | 'OutOfPage' | [number, number])[];

export interface IAdUnit {
  id: string;
  size: AdSize;
  lazyload?: number;
  className?: string;
  destroyOnUnmount?: boolean;
  loadImmediately?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

const refreshInterval = 60 * 1000; // 60s

export const AdUnit: FC<IAdUnit> = React.forwardRef(
  (
    {
      id,
      size,
      lazyload = 0,
      className,
      destroyOnUnmount = true,
      loadImmediately = false,
    },
    ref?: React.Ref<HTMLDivElement>,
  ) => {
    const {
      isReady,
      registerAd,
      unregisterAd,
      registeredAds,
      topLevelAdUnit,
      device,
    } = useContextAds();
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [isInViewPort, setIsInViewPort] = useState(false);

    const isReadyToLoad =
      isReady && (isInViewPort || loadImmediately) && !isDisplayed;

    useEffect(() => {
      setIsDisplayed(false);
    }, [topLevelAdUnit]);

    useEffect(() => {
      const onScroll = () => {
        if (inViewPort(`#${id}`, lazyload)) {
          if (!isInViewPort) {
            setIsInViewPort(true);
          }
        } else if (isInViewPort) {
          setIsInViewPort(false);
        }
      };
      onScroll();

      window.addEventListener('scroll', onScroll);

      return () => window.removeEventListener('scroll', onScroll);
    }, [isInViewPort]);

    useEffect(() => {
      const slotName = `/${window.networkCode}/${window.topLevelAdUnit}/${window.s1}`;

      if (isReadyToLoad) {
        const activeItem = registeredAds.current.find(
          (item) => item.id === `${slotName}/${id}`,
        );
        if (activeItem) {
          refreshAd(id, activeItem.slot, size === 'OutOfPage');
        } else {
          displayAd(id, size, slotName, device, (slot) => {
            setIsDisplayed(true);
            registerAd({ id: `${slotName}/${id}`, slot });
          });
        }
      }
    }, [isReadyToLoad, id]);

    // only listening to unmount
    useEffect(
      () => () => {
        if (destroyOnUnmount) {
          const slotName = `/${window.networkCode}/${window.topLevelAdUnit}/${window.s1}`;
          const activeItem = registeredAds.current.find(
            (item) => item.id === `${slotName}/${id}`,
          );

          if (activeItem) {
            removeAd(id, activeItem.slot, slotName, device);
            unregisterAd(activeItem.id);
          }
        }
      },
      [id],
    );

    useEffect(() => {
      const slotName = `/${window.networkCode}/${window.topLevelAdUnit}/${window.s1}`;
      const handle = window.setInterval(() => {
        const activeItem = registeredAds.current.find(
          (item) => item.id === `${slotName}/${id}`,
        );

        if (activeItem && (inViewPort(`#${id}`) || loadImmediately)) {
          refreshAd(id, activeItem.slot, size === 'OutOfPage');
        }
      }, refreshInterval);

      return () => window.clearInterval(handle);
    }, [id, isReady]);

    return <div id={id} className={className} ref={ref} />;
  },
);