import React, { PropsWithChildren } from 'react';
import { Story } from '@storybook/react';
import { CheckboxLabel, CheckboxLabelProps } from './CheckboxLabel';

export default { component: CheckboxLabel, title: 'Components/Checkbox' };

const Template: Story<CheckboxLabelProps> = (args) => (
  <CheckboxLabel {...args} />
);

const fallbackArgs: PropsWithChildren<CheckboxLabelProps> = {
  checked: false,
  onChange: () => undefined,
  children: 'Checkbox',
};

export const DefaultCheckbox = Template.bind({});
DefaultCheckbox.args = {
  ...fallbackArgs,
};
