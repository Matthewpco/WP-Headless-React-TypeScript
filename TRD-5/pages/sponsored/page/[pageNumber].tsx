import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  getServerSidePropsSponsoredPage as getStaticProps,
  SponsoredProps,
} from '../../../components/SponsoredPage/getServerSidePropsSponsoredPage';
import { SponsoredPage } from '../../../components/SponsoredPage/SponsoredPage';
import { ProgressIndicatorPage } from '../../../components/ProgressIndicator/ProgressIndicatorPage';

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export { getStaticProps };

const Page: NextPage<SponsoredProps> = ({ sponsors }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <ProgressIndicatorPage />;
  }
  return <SponsoredPage sponsors={sponsors} />;
};

export default Page;
