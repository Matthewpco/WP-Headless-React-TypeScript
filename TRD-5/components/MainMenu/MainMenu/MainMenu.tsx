import React from 'react';
import stylesMenu from './MainMenu.module.scss';
import { CoreMenu } from '../CoreMenu/CoreMenu';
import { MainMenuItem } from '../../../graphql';

export type MainMenuProps = {
  data: MainMenuItem[];
};

export const MainMenu = ({ ...props }: MainMenuProps) => (
  <CoreMenu styles={stylesMenu} data={props.data} />
);
