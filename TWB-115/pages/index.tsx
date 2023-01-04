import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { HomePage } from '../components/HomePage/HomePage';
import { BasePageProps, getBasePageProps } from '../generic/getBasePageProps';
import {
  getHomePage,
  HomePageProps,
  ResponseGetHomePage,
} from '../graphql/getHomePage';
import { client, HeaderDropdownMenuItem } from '../graphql';
import { getMarketMenu, ResponseGetMarketMenu } from '../graphql/getMarketMenu';
import { useAds } from '../components/Ads/useAds';
import { initAdsHomepage } from '../components/Ads/initAdsHomepage';

export interface HomeProps extends BasePageProps {
  marketMenu: HeaderDropdownMenuItem[];
  homePageProps: HomePageProps;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  res,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, stale-while-revalidate=59',
  );

  const [basePageProps, responseMarketMenu, responseTopBlock] =
    await Promise.all([
      getBasePageProps({ param: '/' }),
      client.query<ResponseGetMarketMenu>({
        query: getMarketMenu,
      }),
      client.query<ResponseGetHomePage>({
        query: getHomePage,
      }),
    ]);
  return {
    props: {
      ...basePageProps,
      marketMenu: responseMarketMenu?.data?.marketsMenu?.menuItems?.nodes ?? [],
      homePageProps:
        (responseTopBlock?.data as ResponseGetHomePage)?.pageByType ?? null,
    },
  };
};

const Home: NextPage<HomeProps> = ({ marketMenu, homePageProps }) => {
  useAds(initAdsHomepage);

  return <HomePage marketMenu={marketMenu} homePage={homePageProps} />;
};

export default Home;
