import React from 'react';
import { Story } from '@storybook/react';
import { NewsletterSmall, NewsletterSmallProps } from './NewsletterSmall';

export default {
  component: NewsletterSmall,
  title: 'Components/NewsletterSmall',
};

const Template: Story<NewsletterSmallProps> = (args) => (
  <NewsletterSmall {...args} />
);

const fallbackArgs: NewsletterSmallProps = {
  market: 'ny',
  marketTitle: 'New York',
};

export const DefaultNewsletterSmall = Template.bind({});
DefaultNewsletterSmall.args = {
  ...fallbackArgs,
};
