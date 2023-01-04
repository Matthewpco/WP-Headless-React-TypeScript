import { GetServerSideProps } from 'next';
import {
  BasePageProps,
  getBasePageProps,
} from '../../generic/getBasePageProps';
import {
  client,
  getMarketHeroSectionPosts,
  HeaderDropdownMenuItem,
  RequestGetMarketHeroSectionPosts,
  ResponseGetMarketHeroSectionPosts,
} from '../../graphql';
import type { HeroSectionPost } from '../../graphql/getMarketHeroSectionPosts';
import {
  getMarketPosts,
  RequestGetMarketPosts,
  ResponseGetMarketPosts,
} from '../../graphql/getMarketPost';
import {
  getMarketMenu,
  ResponseGetMarketMenu,
} from '../../graphql/getMarketMenu';

import { GenericPost } from '../../graphql/fragmentMarketPosts';
import { extractPageFromQuery } from '../AuthorPage/utils/extractPageFromQuery';

export interface MarketPageParams {
  [key: string]: string;
  firstLevel: string; // id
  pageNumber: string;
}

export interface MarketPageProps extends BasePageProps {
  marketHeroPosts?: HeroSectionPost[];
  posts?: GenericPost[];
  marketMenu?: HeaderDropdownMenuItem[];
}

export const getServerSidePropsMarketPage: GetServerSideProps<
  MarketPageProps,
  MarketPageParams
> = async ({ params }) => {
  const [basePageProps, responseMarketHeroSectionPosts, responseMarketMenu] =
    await Promise.all([
      getBasePageProps(params),
      client.query<
        ResponseGetMarketHeroSectionPosts,
        RequestGetMarketHeroSectionPosts
      >({
        query: getMarketHeroSectionPosts,
        variables: {
          id: `${params?.firstLevel}`,
        },
      }),
      client.query<ResponseGetMarketMenu>({
        query: getMarketMenu,
      }),
    ]);

  if (
    responseMarketHeroSectionPosts?.data?.page?.template.templateValue ===
    'market'
  ) {
    const market =
      responseMarketHeroSectionPosts?.data?.page?.market.split('___')[0] ||
      undefined;
    const marketPosts = await client.query<
      ResponseGetMarketPosts,
      RequestGetMarketPosts
    >({
      query: getMarketPosts,
      variables: {
        market,
        paged: extractPageFromQuery(params?.pageNumber),
      },
    });

    return {
      props: {
        ...basePageProps,
        marketHeroPosts:
          responseMarketHeroSectionPosts?.data?.page?.marketHeroSectionPosts ??
          null,
        posts: marketPosts?.data?.posts?.nodes ?? [],
        marketMenu:
          responseMarketMenu?.data?.marketsMenu?.menuItems?.nodes ?? [],
      },
      revalidate: 300,
    };
  }
  return {
    props: {
      ...basePageProps,
    },
    revalidate: 300,
  };
};
