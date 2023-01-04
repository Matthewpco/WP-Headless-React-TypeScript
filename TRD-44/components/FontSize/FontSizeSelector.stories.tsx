import React from 'react';
import { Story } from '@storybook/react';
import { FontSizeSelector } from './FontSizeSelector';
import { FontSizeSelectorProps } from './FontSizeSelectorProps';

export default {
  component: FontSizeSelector,
  title: 'Components/FontSizeSelector',
};

const Template: Story<FontSizeSelectorProps> = (args) => (
  <FontSizeSelector {...args} />
);

const fallbackArgs: FontSizeSelectorProps = {};

export const DefaultFontSizeSelector = Template.bind({});
DefaultFontSizeSelector.args = {
  ...fallbackArgs,
};
