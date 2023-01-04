import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  getServerSidePropsSectorPage as getStaticProps,
  SectorProps,
} from '../../../../components/SectorPage/getServerSidePropsSectorPage';
import { SectorPage } from '../../../../components/SectorPage/SectorPage';
import { useAds } from '../../../../components/Ads/useAds';
import { initAdsBlogroll } from '../../../../components/Ads/initAdsBlogroll';
import { ProgressIndicatorPage } from '../../../../components/ProgressIndicator/ProgressIndicatorPage';

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export { getStaticProps };

const Page: NextPage<SectorProps> = ({ sector, mostViewed }) => {
  useAds(() => initAdsBlogroll(sector?.slug?.slice(0, 35)));

  const router = useRouter();

  if (router.isFallback) {
    return <ProgressIndicatorPage />;
  }

  return <SectorPage sector={sector} mostViewed={mostViewed} />;
};

export default Page;
