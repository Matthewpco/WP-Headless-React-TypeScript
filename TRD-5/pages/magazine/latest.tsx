import React from 'react';
import { NextPage } from 'next';
import {
  MagazinesDataProps,
  getServerSidePropsMagazinesPage as getServerSideProps,
} from '../../components/MagazinesPage/getServerSidePropsMagazinesPage';
import { MagazinesPage } from '../../components/MagazinesPage';
import { useAds } from '../../components/Ads/useAds';
import { initAdsMagazine } from '../../components/Ads/initAdsMagazine';

export { getServerSideProps };

const Page: NextPage<MagazinesDataProps> = ({ magazinesData }) => {
  useAds(() => initAdsMagazine(magazinesData.slug?.slice(0, 35)));

  return <MagazinesPage magazinesData={magazinesData} isLatest />;
};

export default Page;
