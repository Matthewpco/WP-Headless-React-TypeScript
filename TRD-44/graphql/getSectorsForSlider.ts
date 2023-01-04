import { gql } from '@apollo/client';

export const getSectorsForSlider = gql`
  query getSectorsForSlider {
    sectors(where: { orderby: COUNT, order: DESC }) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export interface SectorForSlider {
  id: string;
  name: string;
  slug: string;
}

export interface ResponseGetSectorsForSlider {
  sectors: {
    nodes: SectorForSlider[];
  };
}
