import { GetServerSideProps } from 'next';
import {
  BasePageProps,
  getBasePageProps,
} from '../../generic/getBasePageProps';
import { client } from '../../graphql';
import { GenericPost } from '../../graphql/fragmentAuthorPosts';
import {
  getSponsored,
  RequestGetSponsored,
  ResponseGetSponsored,
} from '../../graphql/getSponsored';
import { extractPageFromQuery } from '../AuthorPage/utils/extractPageFromQuery';

export interface SponsoredProps extends BasePageProps {
  sponsors: GenericPost[];
}

export interface AuthorPageParams {
  [key: string]: string;
  tagName: string;
  year: string;
  pageNumber: string;
}

export const getServerSidePropsSponsoredPage: GetServerSideProps<
  SponsoredProps,
  AuthorPageParams
> = async ({ params }) => {
  const [basePageProps, responseTag] = await Promise.all([
    getBasePageProps({param: 'sponsored', ...params}),
    client.query<ResponseGetSponsored, RequestGetSponsored>({
      query: getSponsored,
      variables: {
        page: extractPageFromQuery(params?.pageNumber),
      },
    }),
  ]);

  return {
    props: {
      ...basePageProps,
      sponsors: responseTag?.data?.sponsors?.nodes,
    },
  };
};
