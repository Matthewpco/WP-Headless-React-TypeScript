import { GetServerSideProps } from 'next';
import {
  BasePageProps,
  getBasePageProps,
} from '../../generic/getBasePageProps';
import { client } from '../../graphql';
import {
  getSector,
  RequestGetSector,
  ResponseGetSector,
  SectorData,
} from '../../graphql/getSector';
import { GenericPost } from '../../graphql/fragmentAuthorPosts';
import { extractPageFromQuery } from '../AuthorPage/utils/extractPageFromQuery';

export interface SectorProps extends BasePageProps {
  sector: SectorData;
  mostViewed: GenericPost[];
}

export interface AuthorPageParams {
  [key: string]: string;
  sectorName: string;
  subsectorName: string;
  pageNumber: string;
}

export const getServerSidePropsSectorPage: GetServerSideProps<
  SectorProps,
  AuthorPageParams
> = async ({ params }) => {
  const [basePageProps, responseSector] = await Promise.all([
    getBasePageProps({ param: 'sector', ...params }),
    client.query<ResponseGetSector, RequestGetSector>({
      query: getSector,
      variables: {
        id: params?.subsectorName ?? params?.sectorName ?? '',
        slug: params?.subsectorName ?? params?.sectorName ?? '',
        page: extractPageFromQuery(params?.pageNumber),
      },
    }),
  ]);

  return {
    props: {
      ...basePageProps,
      sector: responseSector?.data?.sector,
      mostViewed: responseSector?.data?.mostViewed,
    },
    revalidate: 300,
  };
};
