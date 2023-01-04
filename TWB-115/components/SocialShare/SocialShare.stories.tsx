import React from 'react';
import { Story } from '@storybook/react';
import { SocialShare } from './SocialShare';
import { SocialShareProps } from './SocialShareProps';

export default { component: SocialShare, title: 'Components/SocialShare' };

const Template: Story<SocialShareProps> = (args) => <SocialShare {...args} />;

const fallbackArgs: SocialShareProps = {
  sharedUrl: 'https://youtube.com/',
  sharedTitle: 'Check out my video',
};

export const DefaultSocialShare = Template.bind({});
DefaultSocialShare.args = {
  ...fallbackArgs,
};
