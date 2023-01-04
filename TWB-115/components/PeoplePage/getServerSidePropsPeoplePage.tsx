import { GetServerSideProps } from 'next';
import {
  BasePageProps,
  getBasePageProps,
} from '../../generic/getBasePageProps';
import {
  getPerson,
  PersonData,
  RequestGetPerson,
  ResponseGetPerson,
} from '../../graphql/getPerson';
import { client } from '../../graphql';
import { GenericPost } from '../../graphql/fragmentAuthorPosts';
import { extractPageFromQuery } from '../AuthorPage/utils/extractPageFromQuery';

export interface PersonProps extends BasePageProps {
  person: PersonData;
  mostViewed: GenericPost[];
}

export interface AuthorPageParams {
  [key: string]: string;
  tagName: string;
  pageNumber: string;
}

export const getServerSidePropsPeoplePage: GetServerSideProps<
  PersonProps,
  AuthorPageParams
> = async ({ params }) => {
  const [basePageProps, responsePerson] = await Promise.all([
    getBasePageProps({ param: 'people', ...params }),
    client.query<ResponseGetPerson, RequestGetPerson>({
      query: getPerson,
      variables: {
        id: params?.peopleName ?? '',
        slug: params?.peopleName ?? '',
        page: extractPageFromQuery(params?.pageNumber),
      },
    }),
  ]);

  return {
    props: {
      ...basePageProps,
      person: responsePerson?.data?.person,
      mostViewed: responsePerson?.data?.mostViewed,
    },
    revalidate: 300,
  };
};
