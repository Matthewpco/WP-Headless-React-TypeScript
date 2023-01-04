import React from 'react';
import { Story } from '@storybook/react';
import { Button, ButtonProps } from './Button';

export default { component: Button, title: 'Components/Button' };

const Template: Story<ButtonProps> = ({ ref, ...args }) => <Button {...args} />;

const fallbackArgs: ButtonProps = {
  bordered: false,
  color: 'primary',
  children: 'Button',
  fullWidth: false,
  rounded: false,
  size: 'medium',
};

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  ...fallbackArgs,
};
