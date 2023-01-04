import { gql } from '@apollo/client';

export const getPostsByAdvertiser = gql`
  query getPostsByAdvertiser($slug: String!, $postNum: Int!) {
    postsByAdvertiserBlock(slug: $slug, postsNum: $postNum) {
      id
      title
      featuredImageUri
      uri
    }
  }
`;

export interface RequestGetPostsByAdvertiser {
  slug: string;
  postNum: number;
}

export interface GetPostsByAdvertiserItem {
  id: string;
  title: string;
  featuredImageUri: string;
  uri: string;
}

export interface ResponseGetPostsByAdvertiser {
  postsByAdvertiserBlock: GetPostsByAdvertiserItem[];
}
