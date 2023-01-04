import React from 'react';
import { Story } from '@storybook/react';
import { Input, InputProps } from './Input';

export default { component: Input, title: 'Components/Input' };

const Template: Story<InputProps> = (args) => <Input {...args} />;

const fallbackArgs: InputProps = {
  color: 'primary',
  fullWidth: false,
  rounded: false,
  size: 'medium',
};

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  ...fallbackArgs,
};
