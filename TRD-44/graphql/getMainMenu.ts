import { gql } from '@apollo/client';

export const getMainMenu = gql`
  query getMainMenu {
    menu(id: "Main menu", idType: NAME) {
      menuItems(where: { parentId: "0" }) {
        nodes {
          url
          label
          childItems {
            nodes {
              label
              url
              childItems {
                nodes {
                  label
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

export interface MainMenuItem {
  id: string;
  parentId: string | null;
  label: string;
  url: string;
  childItems?: {
    nodes?: MainMenuItem[];
  };
}

interface MainMenuBlock {
  menuItems: {
    nodes: MainMenuItem[];
  };
}

export interface ResponseGetMainMenu {
  menu: MainMenuBlock;
}
