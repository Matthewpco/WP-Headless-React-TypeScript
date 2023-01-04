import React from 'react';
import { Story } from '@storybook/react';
import { ArticleTile, ArticleTileProps } from './ArticleTile';

export default { component: ArticleTile, title: 'Components/ArticleTile' };

const Template: Story<ArticleTileProps> = (args) => <ArticleTile {...args} />;

const fallbackArgs = {
  imgSrc: 'https://s14.therealdeal.com/trd/up/2022/02/ft_NY_BK-Lux-Contracts-2-250x179.jpg',
  imgAlt: 'title',
  title: 'What to make of Stephen Ross betting $1M on mayor’s race',
  href: '#',
};

export const DefaultArticleTile = Template.bind({});
DefaultArticleTile.args = {
  ...fallbackArgs,
};
