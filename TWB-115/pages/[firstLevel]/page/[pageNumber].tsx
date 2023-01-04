import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MarketPage } from '../../../components/MarketPage/MarketPage';
import {
  getServerSidePropsMarketPage as getStaticProps,
  MarketPageProps,
} from '../../../components/MarketPage/getServerSidePropsMarketPage';
import { ProgressIndicatorPage } from '../../../components/ProgressIndicator/ProgressIndicatorPage';

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export { getStaticProps };

const Page: NextPage<MarketPageProps> = ({
  marketHeroPosts,
  posts,
  marketMenu,
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <ProgressIndicatorPage />;
  }

  return (
    <MarketPage
      marketMenu={marketMenu}
      marketHeroPosts={marketHeroPosts}
      market={posts}
    />
  );
};

export default Page;
