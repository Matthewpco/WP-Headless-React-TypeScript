import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SponsorPage } from '../../../components/SponsorPage/SponsorPage';
import {
  getServerSidePropsSponsorPage as getStaticProps,
  SponsorProps,
} from '../../../components/SponsorPage/getServerSidePropsSponsorPage';
import { ProgressIndicatorPage } from '../../../components/ProgressIndicator/ProgressIndicatorPage';
import { useAds } from '../../../components/Ads/useAds';
import { initAdsBlogroll } from '../../../components/Ads/initAdsBlogroll';

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export { getStaticProps };

const Page: NextPage<SponsorProps> = ({ sponsor }) => {
  useAds(() => initAdsBlogroll(sponsor?.slug?.slice(0, 35)));

  const router = useRouter();

  if (router.isFallback) {
    return <ProgressIndicatorPage />;
  }

  return <SponsorPage sponsor={sponsor} />;
};

export default Page;
