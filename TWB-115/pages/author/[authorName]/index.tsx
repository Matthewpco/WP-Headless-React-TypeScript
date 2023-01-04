import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AuthorPage } from '../../../components/AuthorPage/AuthorPage';
import {
  AuthorProps,
  getServerSidePropsAuthorPage as getStaticProps,
} from '../../../components/AuthorPage/getServerSidePropsAuthorPage';
import { useAds } from '../../../components/Ads/useAds';
import { initAdsBlogroll } from '../../../components/Ads/initAdsBlogroll';
import { ProgressIndicatorPage } from '../../../components/ProgressIndicator/ProgressIndicatorPage';

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export { getStaticProps };

const Page: NextPage<AuthorProps> = ({ author, propsField }) => {
  useAds(() => initAdsBlogroll(author?.slug?.slice(0, 35)));

  const router = useRouter();

  if (router.isFallback) {
    return <ProgressIndicatorPage />;
  }

  return <AuthorPage author={author} propsField={propsField} />;
};

export default Page;
