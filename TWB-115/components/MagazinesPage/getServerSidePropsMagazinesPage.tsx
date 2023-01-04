import { GetServerSideProps } from 'next';
import {
  BasePageProps,
  getBasePageProps,
} from '../../generic/getBasePageProps';
import { client } from '../../graphql';
import {
  getMagazineForHomepage,
  MagazinesData,
  RequestGetMagazines,
  ResponseGetMagazines,
} from '../../graphql/getMagazineForHomepage';

export interface MagazinesDataProps extends BasePageProps {
  magazinesData: MagazinesData;
}

export const getServerSidePropsMagazinesPage: GetServerSideProps<MagazinesDataProps> =
  async () => {
    const [basePageProps, responseMagazines] = await Promise.all([
      getBasePageProps({param1: 'magazine', param2: 'latest' }),
      client.query<ResponseGetMagazines, RequestGetMagazines>({
        query: getMagazineForHomepage,
        variables: {
          page: 1,
        },
      }),
    ]);

    return {
      props: {
        ...basePageProps,
        magazinesData: responseMagazines?.data?.magazineForHomepage,
      },
    };
  };
