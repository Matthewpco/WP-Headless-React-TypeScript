import React from 'react';
import { NextPage } from 'next';
import {
  CardsData,
  getServerSidePropsMagazineIssueArchivesPage as getServerSideProps,
} from '../../components/MagazineIssueArchivesPage/getServerSidePropsMagazineIssueArchivesPage';
import { MagazineIssueArchivesPage } from '../../components/MagazineIssueArchivesPage';
import { useAds } from '../../components/Ads/useAds';
import { initAdsMagazine } from '../../components/Ads/initAdsMagazine';

export { getServerSideProps };

const Page: NextPage<CardsData> = ({ cardsData }) => {
  useAds(() => initAdsMagazine('magazine'));

  return <MagazineIssueArchivesPage cardsData={cardsData} />;
};

export default Page;
