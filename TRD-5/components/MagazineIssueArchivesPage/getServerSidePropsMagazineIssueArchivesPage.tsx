import { GetServerSideProps } from 'next';
import {
  BasePageProps,
  getBasePageProps,
} from '../../generic/getBasePageProps';
import { client } from '../../graphql';
import {
  getMagazineIssueArchivesCards,
  NodesData,
  RequestGetMagazine,
  ResponseGetMagazine,
} from '../../graphql/getMagazineIssueArchivesCards';

export interface CardsData extends BasePageProps {
  cardsData: NodesData[];
}

export const getServerSidePropsMagazineIssueArchivesPage: GetServerSideProps<CardsData> =
  async () => {
    const [basePageProps, responseMagazine] = await Promise.all([
      getBasePageProps({param: 'magazine'}),
      client.query<ResponseGetMagazine, RequestGetMagazine>({
        query: getMagazineIssueArchivesCards,
        variables: {
          perPage: 16,
          paged: 1,
          parent: 0,
          first: 16,
        },
      }),
    ]);

    return {
      props: {
        ...basePageProps,
        cardsData: responseMagazine?.data?.magazines?.nodes,
      },
    };
  };
