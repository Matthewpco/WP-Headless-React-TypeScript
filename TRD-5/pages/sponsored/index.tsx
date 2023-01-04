import React from 'react';
import { NextPage } from 'next';
import {
  getServerSidePropsSponsoredPage as getServerSideProps,
  SponsoredProps,
} from '../../components/SponsoredPage/getServerSidePropsSponsoredPage';
import { SponsoredPage } from '../../components/SponsoredPage/SponsoredPage';

export { getServerSideProps };

const Page: NextPage<SponsoredProps> = ({ sponsors }) => (
  <SponsoredPage sponsors={sponsors} />
);

export default Page;
