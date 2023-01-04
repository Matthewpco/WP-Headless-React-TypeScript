import { gql } from '@apollo/client';
import { HTMLAttributeAnchorTarget } from 'react';
import { IdSharable } from '../components/SocialLinks';

export const getFooter = gql`
  query getFooter{
    menu(id: "Footer Menu", idType: NAME) {
      menuItems(where: { parentId: "0" }) {
        nodes {
          id
          url
          target
          label
        }
      }
    }
    themeSettings {
      address
      addressLink
      email
      footerReservedText
      phone
      socialLinks {
        icon
        url
      }
    }
  }
`;

export interface FooterMenuItem {
  id: string;
  url: string;
  target?: HTMLAttributeAnchorTarget;
  label: string;
}

interface FooterMenuBlock {
  menuItems: {
    nodes: FooterMenuItem[];
  };
}

export interface SocialLinkItem {
  icon: IdSharable;
  url: string;
}

export interface ResponseGetFooter {
  menu: FooterMenuBlock;
  themeSettings: {
    address: string;
    addressLink: string;
    email: string;
    footerReservedText: string;
    phone: string;
    socialLinks: SocialLinkItem[];
  };
}
