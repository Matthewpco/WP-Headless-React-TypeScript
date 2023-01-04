import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

declare const window: any;

export interface IPianoScript {
  onInit: () => void;
}

export const PianoScript: FC<IPianoScript> = ({ onInit }) => {
  const { isFallback } = useRouter();

  const isSandbox =
    window.location.hostname === 'localhost' ||
    window.location.hostname.includes('dev.');
  const pianoAppId = isSandbox ? 'yVAGWJfOMP' : 'p7sVIGTDn5';

  // init piano
  useEffect((): void => {
    if (!isFallback) {
      window.tp = window.tp || [];
      window.tp.push(['setAid', pianoAppId]);
      window.tp.push(['setSandbox', isSandbox]);
      window.tp.push(['setUseTinypassAccounts', true]);
      window.tp.push([
        'init',
        () => {
          window.tp.experience.init();
          onInit();
        },
      ]);
    }
  }, [isFallback]);

  return (
    <Script
      strategy="lazyOnload"
      async
      defer
      src={`//${
        isSandbox ? 'sandbox' : 'experience'
      }.tinypass.com/xbuilder/experience/load?aid=${pianoAppId}`}
    />
  );
};
