import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { MagazinesDataProps } from '../../../components/MagazinesPage/getServerSidePropsMagazinesPage';
import { MagazinesPage } from '../../../components/MagazinesPage';
import {
  BasePageProps,
  getBasePageProps,
} from '../../../generic/getBasePageProps';
import { client } from '../../../graphql';
import {
  DataGetMagazine,
  getMagazine,
  RequestGetMagazine,
  ResponseGetMagazine,
} from '../../../graphql/getMagazine';
import { useAds } from '../../../components/Ads/useAds';
import { initAdsMagazine } from '../../../components/Ads/initAdsMagazine';
import { ProgressIndicatorPage } from '../../../components/ProgressIndicator/ProgressIndicatorPage';

export interface MagazinePageParams {
  [key: string]: string;
  magazineName: string;
}

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export interface MagazinePageProps extends BasePageProps {
  magazinesData: DataGetMagazine;
}

export const getStaticProps: GetServerSideProps<
  MagazinePageProps,
  MagazinePageParams
> = async ({ params }) => {
  const [basePageProps, responseMagazines] = await Promise.all([
    getBasePageProps({ param: 'magazine', ...params }),
    client.query<ResponseGetMagazine, RequestGetMagazine>({
      query: getMagazine,
      variables: {
        name: `${params?.magazineName}`,
        page: 1,
      },
    }),
  ]);

  return {
    props: {
      ...basePageProps,
      magazinesData: responseMagazines?.data?.magazine,
    },
    revalidate: 300,
  };
};

const Page: NextPage<MagazinesDataProps> = ({ magazinesData }) => {
  useAds(() => initAdsMagazine(magazinesData.slug?.slice(0, 35)));

  const router = useRouter();

  if (router.isFallback) {
    return <ProgressIndicatorPage />;
  }

  return <MagazinesPage magazinesData={magazinesData} />;
};

export default Page;
