import React from 'react';
import { Story } from '@storybook/react';
import { Newsletter, NewsletterProps } from './Newsletter';

export default { component: Newsletter, title: 'Components/Newsletter' };

const Template: Story<NewsletterProps> = (args) => <Newsletter {...args} />;

const fallbackArgs: NewsletterProps = {};

export const DefaultNewsletter = Template.bind({});
DefaultNewsletter.args = {
  ...fallbackArgs,
};
