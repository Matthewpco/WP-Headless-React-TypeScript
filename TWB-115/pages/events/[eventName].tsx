import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';
import cx from 'classnames';
import {
  BasePageProps,
  getBasePageProps,
} from '../../generic/getBasePageProps';
import { client } from '../../graphql';
import {
  DataSingleIndustryEvent,
  getSingleIndustryEvent,
  RequestSingleIndustryEvent,
  ResponseSingleIndustryEvent,
} from '../../components/IndustryEvent/Single/getSingleIndustryEvent';
import { useAds } from '../../components/Ads/useAds';
import { initAdsArticles } from '../../components/Ads/initAdsArticles';
import { ProgressIndicatorPage } from '../../components/ProgressIndicator/ProgressIndicatorPage';
import { ArticleHead } from '../../components/ArticleHead';
import stylesHubSpot from '../../components/BrandStudio/BrandStudioHubSpot.module.scss';
import stylesClientList from '../../components/PageEvents/ClientList.module.scss';
import stylesPotsHyperlinks from '../../components/DefaultPage/PotsHyperlinks.module.scss';
import { ArticleBody } from '../../components/ArticleBody';

export interface EventPageProps extends BasePageProps {
  industryEvent: DataSingleIndustryEvent;
}

export interface EventPageParams {
  [key: string]: string;
  eventName: string;
}

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetServerSideProps<
  EventPageProps,
  EventPageParams
> = async ({ params }) => {
  const [basePageProps, responseGetEvent] = await Promise.all([
    getBasePageProps({ param: 'events', ...params }),
    client.query<ResponseSingleIndustryEvent, RequestSingleIndustryEvent>({
      query: getSingleIndustryEvent,
      variables: {
        id: `/events/${params?.eventName ?? ''}`,
      },
    }),
  ]);

  return {
    props: {
      ...basePageProps,
      industryEvent: responseGetEvent?.data?.event,
    },
    revalidate: 300,
  };
};

const Page: NextPage<EventPageProps> = ({ industryEvent }) => {
  useAds(() => initAdsArticles(industryEvent));

  const router = useRouter();

  if (router.isFallback) {
    return <ProgressIndicatorPage />;
  }

  if (!industryEvent) {
    return <Error statusCode={404} />;
  }

  return (
    <main>
      <ArticleHead seo={industryEvent?.seo} />
      <ArticleBody
        className={cx(
          stylesHubSpot.root,
          stylesClientList.root,
          stylesPotsHyperlinks.root,
        )}
        content={industryEvent?.contentFiltered ?? ''}
      />
    </main>
  );
};

export default Page;
