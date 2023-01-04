import React, {
  createContext,
  FC,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { getDevice } from './utils/getDevice';
import { removeAd } from './utils/removeAd';

declare const window: any;

export type Device = 'desktop' | 'tablet' | 'mobile';

export interface IRegisteredAd {
  id: string;
  slot: any;
}

export interface IContextAds {
  isReady: boolean;
  device: Device;
  topLevelAdUnit: string;
  registeredAds: MutableRefObject<IRegisteredAd[]>;
  registerAd: (value: IRegisteredAd) => void;
  unregisterAd: (value: string) => void;
}

const contextAdsDefault: IContextAds = {
  isReady: false,
  device: 'desktop',
  topLevelAdUnit: 'trd-ny',
  registeredAds: { current: [] },
  registerAd: () => undefined,
  unregisterAd: () => undefined,
};

const ContextAds = createContext<IContextAds>(contextAdsDefault);

export const useContextAds = () => useContext<IContextAds>(ContextAds);

export const ProviderAds: FC = ({ children }) => {
  const { asPath } = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [device, setDevice] = useState<Device>('desktop');
  const [topLevelAdUnit, setTopLevelAdUnit] = useState<string>('trd-ny');
  const registeredAdsRef = useRef<IRegisteredAd[]>([]);

  const registerAd = useCallback((value: IRegisteredAd) => {
    registeredAdsRef.current = [...registeredAdsRef.current, value];
  }, []);

  const unregisterAd = useCallback((value: string) => {
    registeredAdsRef.current = registeredAdsRef.current.filter(
      ({ id }) => id !== value,
    );
  }, []);

  useEffect(() => {
    registeredAdsRef.current.forEach(({ id, slot }) => {
      const [one, two, three, four] = id.split('/');
      removeAd(four, slot, `${one}/${two}/${three}`, device);
    });
    registeredAdsRef.current = [];
  }, [topLevelAdUnit]);

  useEffect(() => {
    if (isReady) {
      setIsReady(false);
    }

    const handle = window.setInterval(() => {
      if (
        window.trd_ad_init &&
        window.googletag &&
        window.pbjs &&
        window.dataLayer &&
        window.slotName
      ) {
        window.clearInterval(handle);
        setTopLevelAdUnit(window.updateTopLevelAdUnit());
        setDevice(getDevice());
        setIsReady(true);
      }
    }, 500);

    return () => window.clearInterval(handle);
  }, [asPath]);

  const value: IContextAds = useMemo(
    () => ({
      isReady,
      device,
      topLevelAdUnit,
      registeredAds: registeredAdsRef,
      registerAd,
      unregisterAd,
    }),
    [
      isReady,
      device,
      topLevelAdUnit,
      registerAd,
      unregisterAd,
      registeredAdsRef,
    ],
  );

  return <ContextAds.Provider value={value}>{children}</ContextAds.Provider>;
};
