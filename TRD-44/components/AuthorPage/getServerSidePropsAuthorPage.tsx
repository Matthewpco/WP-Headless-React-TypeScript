import { GetServerSideProps } from 'next';
import {
  BasePageProps,
  getBasePageProps,
} from '../../generic/getBasePageProps';
import {
  client,
  getAuthorId,
  getPropsForm,
  PropsField,
  RequestPropsForm,
  ResponseAuthorId,
  ResponsePropsForm,
} from '../../graphql';
import {
  AuthorData,
  getAuthor,
  RequestGetAuthor,
  ResponseGetAuthor,
} from '../../graphql/getAuthor';
import { extractPageFromQuery } from './utils/extractPageFromQuery';

export interface AuthorProps extends BasePageProps {
  propsField: PropsField[];
  author: AuthorData;
}

export interface AuthorPageParams {
  [key: string]: string;
  authorName: string;
  pageNumber: string;
}

export const getServerSidePropsAuthorPage: GetServerSideProps<
  AuthorProps,
  AuthorPageParams
> = async ({ params }) => {
  const [basePageProps, responseAuthor, responseAuthorId] = await Promise.all([
    getBasePageProps({ param: 'author', ...params }),
    client.query<ResponseGetAuthor, RequestGetAuthor>({
      query: getAuthor,
      variables: {
        id: `/author/${params?.authorName}`,
        page: extractPageFromQuery(params?.pageNumber),
      },
    }),
    client.query<ResponseAuthorId>({
      query: getAuthorId,
    }),
  ]);

  const responsePropsForm = await client.query<
    ResponsePropsForm,
    RequestPropsForm
  >({
    query: getPropsForm,
    variables: {
      id: responseAuthorId?.data.themeSettings.contactAuthorFormId ?? '',
    },
  });

  return {
    props: {
      ...basePageProps,
      author: responseAuthor?.data?.user,
      propsField: responsePropsForm?.data.form.fields.nodes ?? [],
    },
    revalidate: 300,
  };
};
