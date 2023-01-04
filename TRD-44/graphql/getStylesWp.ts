import { gql } from '@apollo/client';

export const getStylesWp = gql`
  query getStylesWp {
    stylesWP {
      styles
      type
    }
  }
`;

export interface StylesData {
  styles: string;
  type: string;
}

export interface ResponseGetStylesWp {
  stylesWP: StylesData[];
}
