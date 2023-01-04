import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  CompanyProps,
  getServerSidePropsCompanyPage as getStaticProps,
} from '../../../../components/CompanyPage/getServerSidePropsCompanyPage';
import { CompanyPage } from '../../../../components/CompanyPage/CompanyPage';
import { useAds } from '../../../../components/Ads/useAds';
import { initAdsBlogroll } from '../../../../components/Ads/initAdsBlogroll';
import { ProgressIndicatorPage } from '../../../../components/ProgressIndicator/ProgressIndicatorPage';

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export { getStaticProps };

const Page: NextPage<CompanyProps> = ({ company, mostViewed }) => {
  useAds(() => initAdsBlogroll(company?.slug?.slice(0, 35)));

  const router = useRouter();

  if (router.isFallback) {
    return <ProgressIndicatorPage />;
  }

  return <CompanyPage company={company} mostViewed={mostViewed} />;
};

export default Page;
