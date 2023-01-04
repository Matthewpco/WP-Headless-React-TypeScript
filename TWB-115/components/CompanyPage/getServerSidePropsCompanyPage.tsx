import { GetServerSideProps } from 'next';
import {
  BasePageProps,
  getBasePageProps,
} from '../../generic/getBasePageProps';

import {
  CompanyData,
  getCompany,
  RequestGetCompany,
  ResponseGetCompany,
} from '../../graphql/getCompany';
import { client } from '../../graphql';
import { GenericPost } from '../../graphql/fragmentAuthorPosts';
import { extractPageFromQuery } from '../AuthorPage/utils/extractPageFromQuery';

export interface CompanyProps extends BasePageProps {
  company: CompanyData;
  mostViewed: GenericPost[];
}

export interface AuthorPageParams {
  [key: string]: string;
  tagName: string;
  pageNumber: string;
}

export const getServerSidePropsCompanyPage: GetServerSideProps<
  CompanyProps,
  AuthorPageParams
> = async ({ params }) => {
  const [basePageProps, responseCompany] = await Promise.all([
    getBasePageProps({ param: 'company', ...params }),
    client.query<ResponseGetCompany, RequestGetCompany>({
      query: getCompany,
      variables: {
        id: params?.companyName ?? '',
        slug: params?.companyName ?? '',
        page: extractPageFromQuery(params?.pageNumber),
      },
    }),
  ]);

  return {
    props: {
      ...basePageProps,
      company: responseCompany?.data?.company,
      mostViewed: responseCompany?.data?.mostViewed,
    },
    revalidate: 300,
  };
};
