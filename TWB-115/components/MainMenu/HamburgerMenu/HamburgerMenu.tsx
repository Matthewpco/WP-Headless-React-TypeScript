import React from 'react';
import stylesHamburger from './HamburgerMenu.module.scss';
import { CoreMenu } from '../CoreMenu/CoreMenu';
import { MainMenuItem } from '../../../graphql';
import SearchIcon from '../../../assets/icons/search.svg';

export type MenuProps = {
  data: MainMenuItem[];
  className?: string;
  onSearch: () => void;
  onLinkClick: () => void;
};

export const HamburgerMenu = ({ ...props }: MenuProps) => (
  <CoreMenu
    styles={stylesHamburger}
    data={props.data}
    className={props.className}
    onLinkClick={props.onLinkClick}
  >
    <label htmlFor="queryly_toggle">
      <div className={stylesHamburger.searchWrapper} onClick={props.onSearch}>
        <SearchIcon />
        <p>search</p>
      </div>
    </label>
  </CoreMenu>
);
