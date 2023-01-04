import React from 'react';
import { Story } from '@storybook/react';
import { PublishedDate, PublishedDateProps } from './PublishedDate';

export default { component: PublishedDate, title: 'Components/PublishedDate' };

const Template: Story<PublishedDateProps> = (args) => (
  <PublishedDate {...args} />
);

const fallbackArgs = {
  date: new Date(),
};

export const DefaultCategoryCityLabel = Template.bind({});
DefaultCategoryCityLabel.args = {
  ...fallbackArgs,
};
