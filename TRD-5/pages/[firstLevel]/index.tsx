import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';
import {
  BasePageProps,
  getBasePageProps,
} from '../../generic/getBasePageProps';
import { PageBrandStudio } from '../../components/BrandStudio/PageBrandStudio';
import {
  client,
  getMarketHeroSectionPosts,
  RequestGetMarketHeroSectionPosts,
  ResponseGetMarketHeroSectionPosts,
} from '../../graphql';
import {
  getBrandStudio,
  RequestGetBrandStudio,
  ResponseGetBrandStudio,
} from '../../graphql/getBrandStudio';
import { MarketPage } from '../../components/MarketPage/MarketPage';
import {
  getMarketPosts,
  RequestGetMarketPosts,
  ResponseGetMarketPosts,
} from '../../graphql/getMarketPost';
import {
  getMarketMenu,
  ResponseGetMarketMenu,
} from '../../graphql/getMarketMenu';
import {
  getPage,
  RequestGetPage,
  ResponseGetPage,
} from '../../graphql/getPage';
import { IndustryEvents } from '../../components/IndustryEvent/Events/IndustryEvents';
import {
  getIndustryEvents,
  RequestGetIndustryEvents,
  ResponseGetIndustryEvents,
} from '../../components/IndustryEvent/Events/getIndustryEvents';
import { DefaultPage } from '../../components/DefaultPage/DefaultPage';
import { GeneralPage } from '../../components/GeneralPage/GeneralPage';
import { ProgressIndicatorPage } from '../../components/ProgressIndicator/ProgressIndicatorPage';
import { extractPageFromQuery } from '../../components/AuthorPage/utils/extractPageFromQuery';

export interface PageProps extends BasePageProps {
  templateValue: string;
  data: any;
}

export interface PageParams {
  [key: string]: string;
  firstLevel: string; // slug
}

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({
  params,
}) => {
  const [basePageProps, responsePage] = await Promise.all([
    getBasePageProps(params),
    client.query<ResponseGetPage, RequestGetPage>({
      query: getPage,
      variables: {
        slug: `/${params?.firstLevel ?? ''}`,
      },
    }),
  ]);

  const templateValue =
    responsePage?.data?.page?.template?.templateValue ?? null;

  if (templateValue === 'events-industry') {
    const { data } = await client.query<
      ResponseGetIndustryEvents,
      RequestGetIndustryEvents
    >({
      query: getIndustryEvents,
      variables: {
        slug: `/${params?.firstLevel ?? ''}`,
      },
    });

    return {
      props: {
        ...basePageProps,
        templateValue,
        data: data?.page,
      },
      revalidate: 300,
    };
  }

  if (templateValue === 'brand-studio') {
    const { data } = await client.query<
      ResponseGetBrandStudio,
      RequestGetBrandStudio
    >({
      query: getBrandStudio,
      variables: {
        slug: `/${params?.firstLevel ?? ''}`,
      },
    });

    return {
      props: {
        ...basePageProps,
        templateValue,
        data: data?.page,
      },
      revalidate: 300,
    };
  }

  if (templateValue === 'market') {
    const responseMarketHeroSectionPosts = await client.query<
      ResponseGetMarketHeroSectionPosts,
      RequestGetMarketHeroSectionPosts
    >({
      query: getMarketHeroSectionPosts,
      variables: {
        id: `${params?.firstLevel}`,
      },
    });

    const market =
      responseMarketHeroSectionPosts?.data?.page?.market.split('___')[0] ||
      undefined;
    const pageSeoTags = responseMarketHeroSectionPosts?.data?.page?.seo ?? {};

    const [marketPosts, responseMarketMenu] = await Promise.all([
      client.query<ResponseGetMarketPosts, RequestGetMarketPosts>({
        query: getMarketPosts,
        variables: {
          market,
          paged: extractPageFromQuery(params?.pageNumber),
        },
      }),
      client.query<ResponseGetMarketMenu>({
        query: getMarketMenu,
      }),
    ]);
    return {
      props: {
        ...basePageProps,
        templateValue,
        data: {
          marketHeroPosts:
            responseMarketHeroSectionPosts?.data?.page?.marketHeroSectionPosts ??
            {},
          market: marketPosts?.data?.posts?.nodes ?? [],
          marketMenu:
            responseMarketMenu?.data?.marketsMenu?.menuItems?.nodes ?? [],
          seo: pageSeoTags,
        },
      },
      revalidate: 300,
    };
  }

  return {
    props: {
      ...basePageProps,
      templateValue,
      data: responsePage?.data?.page,
    },
    revalidate: 300,
  };
};

const Page: NextPage<PageProps> = ({ templateValue, data }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <ProgressIndicatorPage />;
  }

  if (templateValue === 'market') {
    return <MarketPage {...data} />;
  }

  if (templateValue === 'brand-studio') {
    return <PageBrandStudio data={data} />;
  }

  if (templateValue === 'events-industry') {
    return <IndustryEvents data={data} />;
  }
  if (templateValue === 'general') {
    return (
      <GeneralPage
        seo={data?.seo ?? {}}
        content={data?.contentFiltered ?? ''}
      />
    );
  }

  if (templateValue === '') {
    return (
      <DefaultPage
        seo={data?.seo ?? {}}
        content={data?.contentFiltered ?? ''}
      />
    );
  }

  return <Error statusCode={404} />;
};

export default Page;
