import React from 'react';
import { Story } from '@storybook/react';
import { Header, HeaderProps } from './Header';

export default { component: Header, title: 'Components/Header' };

const Template: Story<HeaderProps> = (args) => (
  <Header {...args} />
);

const fallbackArgs = {
  logoUrl: 'https://therealdeal.com/wp-content/plugins/trd-core/assets/images/trd-ny-logo.svg',
  displayBurgerIcon: true,
  displayCategoryDropdown: false,
  displayCityDropdown: false,
};

export const DefaultHeader = Template.bind({});
DefaultHeader.args = {
  ...fallbackArgs,
};
