import React from 'react';
import { Story } from '@storybook/react';
import { Dropdown, DropdownProps } from './Dropdown';

export default { component: Dropdown, title: 'Components/Dropdown' };

const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />;

const fallbackArgs: DropdownProps = {
  items: [
    { label: 'All Cities', url: '/All_Cities' },
    { label: 'New York', url: '/New_York' },
    { label: 'Tri-State', url: '/Tri-State' },
    { label: 'Los Angeles', url: '/Los_Angeles' },
    { label: 'Chicago', url: '/Chicago' },
    { label: 'South Florida', url: '/South_Florida' },
    { label: 'Texas', url: '/Texas' },
    { label: 'San Francisco', url: '/San_Francisco' },
  ],
  initialValue: { label: 'New York', url: '/New_York' },
};

export const DefaultDropdown = Template.bind({});
DefaultDropdown.args = {
  ...fallbackArgs,
};
