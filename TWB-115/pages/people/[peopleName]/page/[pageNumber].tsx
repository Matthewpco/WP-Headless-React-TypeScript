import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  PersonProps,
  getServerSidePropsPeoplePage as getStaticProps,
} from '../../../../components/PeoplePage/getServerSidePropsPeoplePage';
import { PeoplePage } from '../../../../components/PeoplePage/PeoplePage';
import { ProgressIndicatorPage } from '../../../../components/ProgressIndicator/ProgressIndicatorPage';

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export { getStaticProps };

const Page: NextPage<PersonProps> = ({ person, mostViewed }) => {
  const router = useRouter();

  if (router.isFallback) {
   return <ProgressIndicatorPage />;
  }
  return (
    <PeoplePage person={person} mostViewed={mostViewed} />
);
};

export default Page;
