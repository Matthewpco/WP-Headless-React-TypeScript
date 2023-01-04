import React, { useCallback } from 'react';
import { useContextAds } from './ContextAds';
import { AdSize, AdUnit } from './units/AdUnit';
import { adSizes } from './config/adSizes';
const customAdSize: AdSize = [[300, 250]];
const outstreamInsert = 3;
const spaceBetweenAds = 5;
export const useAdsInsertComponent = (fullWidth = false) => {
  const { device } = useContextAds();
  return useCallback(
    (nodes: JSX.Element[], articleIndex: number) => {
      nodes.splice(
        outstreamInsert,
        0,
        <div
          key={`outstream-${articleIndex}`}
          style={{
            position: 'relative',
          }}
        >
          <AdUnit
            className="trd-ad trd-ad-dynamic trd-ad-center"
            id={`outstream-${articleIndex + 1}`}
            size={adSizes.outstream[device]}
          />
        </div>,
      );
      let lastInsert = 0;
      for (let i = outstreamInsert + 1; i < nodes.length; i += 1) {
        const prevNode = nodes[i - 1];
        if (!prevNode.type) {
          lastInsert += 1;
        } else if (i - lastInsert > spaceBetweenAds && prevNode.type === 'p') {
          const id = `div-id-for-mid-news-${articleIndex}-${i}`;
          nodes.splice(
            i,
            0,
            <AdUnit
              className="NoStyles trd-ad trd-ad-dynamic trd-ad-center"
              size={fullWidth && device === 'desktop'
              ? adSizes.news.desktopFull
              : adSizes.news[device]}
              key={id}
              id={id}
            />,
          );
          lastInsert = i;
        }
      }
    },
    [device],
  );
};