import { GetServerSideProps } from 'next';
import {
  BasePageProps,
  getBasePageProps,
} from '../../generic/getBasePageProps';
import { client } from '../../graphql';
import {
  getSponsoredPage,
  RequestGetSponsoredPage,
  ResponseGetSponsoredPage,
  SponsoredData,
} from '../../graphql/getSponseredPage';
import { extractPageFromQuery } from '../AuthorPage/utils/extractPageFromQuery';

export interface SponsorProps extends BasePageProps {
  sponsor: SponsoredData;
}

export interface SponsorPageParams {
  [key: string]: string;
  sponsorName: string;
  pageNumber: string;
}

export const getServerSidePropsSponsorPage: GetServerSideProps<
  SponsorProps,
  SponsorPageParams
> = async ({ params }) => {
  const [basePageProps, responseSponsor] = await Promise.all([
    getBasePageProps({ param: 'sponsored', ...params }),
    client.query<ResponseGetSponsoredPage, RequestGetSponsoredPage>({
      query: getSponsoredPage,
      variables: {
        id: params?.sponsorName ?? '',
        page: extractPageFromQuery(params?.pageNumber),
      },
    }),
  ]);

  return {
    props: {
      ...basePageProps,
      sponsor: responseSponsor?.data?.advertiser,
    },
    revalidate: 300,
  };
};
