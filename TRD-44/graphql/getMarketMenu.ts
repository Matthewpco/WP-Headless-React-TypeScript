import { gql } from '@apollo/client';
import { HeaderDropdownMenuItem } from '.';

export const getMarketMenu = gql`
  query getMarketMenu {
    marketsMenu: menu(id: "Markets Menu", idType: NAME) {
      menuItems(where: { parentId: "0" }) {
        nodes {
          id
          url
          label
        }
      }
    }
  }
`;

export interface ResponseGetMarketMenu {
  marketsMenu: {
    menuItems: {
      nodes: HeaderDropdownMenuItem[];
    };
  };
}
