import React from 'react';
import { Story } from '@storybook/react';
import { TrendingArticles, TrendingArticlesProps } from './TrendingArticles';

export default { component: TrendingArticles, title: 'Components/TrendingArticles' };

const Template: Story<TrendingArticlesProps> = (args) => <TrendingArticles {...args} />;

const fallbackArgs = {
  title: 'Trending',
  articlesData: [
    {
      img: [{
        src: 'https://s14.therealdeal.com/trd/up/2022/02/ft_NY_BK-Lux-Contracts-2-250x179.jpg',
        alt: 'title',
      }],
      title: 'What to make of Stephen Ross betting $1M on mayor’s race',
      link: '#',
    },
    {
      img: [{
        src: 'https://s14.therealdeal.com/trd/up/2022/02/ft_NY_BK-Lux-Contracts-2-250x179.jpg',
        alt: 'title',
      }],
      title: 'What to make of Stephen Ross betting $1M on mayor’s race',
      link: '#',
    },
    {
      img: [{
        src: 'https://s14.therealdeal.com/trd/up/2022/02/ft_NY_BK-Lux-Contracts-2-250x179.jpg',
        alt: 'title',
      }],
      title: 'What to make of Stephen Ross betting $1M on mayor’s race',
      link: '#',
    },
    {
      img: [{
        src: 'https://s14.therealdeal.com/trd/up/2022/02/ft_NY_BK-Lux-Contracts-2-250x179.jpg',
        alt: 'title',
      }],
      title: 'What to make of Stephen Ross betting $1M on mayor’s race',
      link: '#',
    },
  ],
};

export const DefaultArticleTile = Template.bind({});
DefaultArticleTile.args = {
  ...fallbackArgs,
};
