import { GetServerSideProps } from 'next';
import {
  BasePageProps,
  getBasePageProps,
} from '../../generic/getBasePageProps';
import { client } from '../../graphql';
import {
  getTag,
  RequestGetTag,
  ResponseGetTag,
  TagData,
} from '../../graphql/getTag';
import { GenericPost } from '../../graphql/fragmentAuthorPosts';
import { extractPageFromQuery } from '../AuthorPage/utils/extractPageFromQuery';

export interface TagProps extends BasePageProps {
  tag: TagData;
  mostViewed: GenericPost[];
}

export interface AuthorPageParams {
  [key: string]: string;
  tagName: string;
  pageNumber: string;
}

export const getServerSidePropsTagPage: GetServerSideProps<
  TagProps,
  AuthorPageParams
> = async ({ params }) => {
  const [basePageProps, responseTag] = await Promise.all([
    getBasePageProps(params),
    client.query<ResponseGetTag, RequestGetTag>({
      query: getTag,
      variables: {
        id: params?.tagName ?? '',
        slug: params?.tagName ?? '',
        page: extractPageFromQuery(params?.pageNumber),
      },
    }),
  ]);
  return {
    props: {
      ...basePageProps,
      tag: responseTag?.data?.tag,
      mostViewed: responseTag?.data?.mostViewed,
    },
    revalidate: 300,
  };
};
