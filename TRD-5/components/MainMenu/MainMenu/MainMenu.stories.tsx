import React from 'react';
import { Story } from '@storybook/react';
import { MainMenu, MainMenuProps } from './MainMenu';

export default { component: MainMenu, title: 'Components/MainMenu' };

const Template: Story<MainMenuProps> = (args) => <MainMenu {...args} />;

const fallbackArgs = {
  data: [
    {
      label: 'Markets',
      url: '#',
      childItems: {
        nodes: [
          {
            label: 'New York',
            url: '#',
          },
          {
            label: 'Chicago',
            url: '#',
          },
          {
            label: 'San Francisco',
            url: '#',
          },
          {
            label: 'Tri-State',
            url: '#',
          },
          {
            label: 'South Florida',
            url: '#',
          },
          {
            label: 'Los Angeles',
            url: '#',
          },
          {
            label: 'Texas',
            url: '#',
          },
        ],
      },
    },
    {
      label: 'News',
      url: '#',
      childItems: {
        nodes: [
          {
            label: 'Residential',
            url: '#',
          },
          {
            label: 'Commercial',
            url: '#',
          },
          {
            label: 'Development',
            url: '#',
          },
          {
            label: 'Landlords',
            url: '#',
          },
          {
            label: 'Politics',
            url: '#',
          },
          {
            label: 'Proptech',
            url: '#',
          },
          {
            label: 'Finance',
            url: '#',
          },
          {
            label: 'Construction',
            url: '#',
          },
        ],
      },
    },
    {
      label: 'Magazine',
      url: '#',
      childItems: {
        nodes: [
          {
            label: 'Current Issue',
            url: '#',
          },
          {
            label: 'Issue archives',
            url: '#',
          },
          {
            label: 'Special Issue Archive',
            url: '#',
          },
        ],
      },
    },
    {
      label: 'TRD PRO',
      url: '#',
    },
    {
      label: 'Events',
      url: '#',
      childItems: {
        nodes: [
          {
            label: 'TRD Events',
            url: '#',
          },
          {
            label: 'Industry Events',
            url: '#',
          },
          {
            label: 'South Florida Showcase',
            url: '#',
          },
        ],
      },
    },
    {
      label: 'Podcast + Video',
      url: '#',
      childItems: {
        nodes: [
          {
            label: 'Podcast',
            url: '#',
            childItems: {
              nodes: [
                {
                  label: 'Deconstruct ',
                  url: '#',
                },
              ],
            },
          },
          {
            label: 'Video',
            url: '#',
            childItems: {
              nodes: [
                {
                  label: 'All Videos',
                  url: '#',
                },
                {
                  label: 'Master Classes',
                  url: '#',
                },
                {
                  label: 'The RE-Interview',
                  url: '#',
                },
                {
                  label: 'Coffee Talk',
                  url: '#',
                },
                {
                  label: 'Real Estate Billionaires',
                  url: '#',
                },
                {
                  label: 'Building Biographies',
                  url: '#',
                },
              ],
            },
          },
        ],
      },
    },
    {
      label: 'Partners',
      url: '#',
      childItems: {
        nodes: [
          {
            label: 'Brand Studio',
            url: '#',
          },
          {
            label: 'Sponsored Content',
            url: '#',
          },
          {
            label: 'Advertise with us',
            url: '#',
          },
        ],
      },
    },
    {
      label: 'Shop',
      url: '#',
    },
  ],
};

export const DefaultMainMenu = Template.bind({});
DefaultMainMenu.args = {
  ...fallbackArgs,
};
