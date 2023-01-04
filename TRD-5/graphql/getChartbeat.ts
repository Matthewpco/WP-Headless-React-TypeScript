import { gql } from '@apollo/client';

export const getChartbeat = gql`
  query getChartbeat($uri: String!) {
    chartbeat(uri: $uri) {
      type
      title
      authors
      sections
      post_id
    }
  }
`;

export interface RequestGetChartbeat {
  uri: string;
}

export interface ResponseGetChartbeat {
  chartbeat: {
    type: string;
    title: string;
    authors: string;
    sections: string;
    post_id: string;
  };
}
