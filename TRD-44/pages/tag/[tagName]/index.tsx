import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  TagProps,
  getServerSidePropsTagPage as getStaticProps,
} from '../../../components/TagPage/getServerSidePropsTagPage';
import { TagPage } from '../../../components/TagPage/TagPage';
import { useAds } from '../../../components/Ads/useAds';
import { initAdsBlogroll } from '../../../components/Ads/initAdsBlogroll';
import { ProgressIndicatorPage } from '../../../components/ProgressIndicator/ProgressIndicatorPage';

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export { getStaticProps };

const Page: NextPage<TagProps> = ({ tag, mostViewed }) => {
  useAds(() => initAdsBlogroll(tag?.slug?.slice(0, 35)));

  const router = useRouter();

  if (router.isFallback) {
    return <ProgressIndicatorPage />;
  }

  return <TagPage tag={tag} mostViewed={mostViewed} />;
};

export default Page;
