import { gql } from '@apollo/client';
import { HTMLAttributeAnchorTarget } from 'react';

export const getHeader = gql`
  query getHeader{
    firstHeaderMenu: menu(id: "header_first_menu", idType: LOCATION) {
      name
      menuItems(where: { parentId: "0" }){
        nodes {
          id
          target
          label
          url
        }
      }
    }
    secondHeaderMenu: menu(id: "header_second_menu", idType: LOCATION) {
      name
      menuItems(where: { parentId: "0" }){
        nodes {
          id
          target
          label
          url
        }
      }
    }
    themeSettings {
      logo {
        id
        title
        url
      }
      logoDarkMode {
        id
        title
        url
      }
      logoHero {
        id
        title
        url
      }
    }
  }
`;

export interface HeaderDropdownMenuItem {
  id: string;
  url: string;
  target?: HTMLAttributeAnchorTarget;
  label: string;
}

export interface HeaderDropdownMenu {
  name: string;
    menuItems: {
      nodes: HeaderDropdownMenuItem[];
  };
}
interface Logo {
  id: number;
  title: string;
  url: string;
}

export interface ResponseGetHeader {
  firstHeaderMenu: HeaderDropdownMenu;
  secondHeaderMenu: HeaderDropdownMenu;
  themeSettings: {
    logo: Logo;
    logoDarkMode: Logo;
    logoHero: Logo;
  };
}
