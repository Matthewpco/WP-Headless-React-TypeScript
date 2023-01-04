import React from 'react';
import { Story } from '@storybook/react';
import { CategoryCityLabel, CategoryCityLabelProps } from './CategoryCityLabel';

export default { component: CategoryCityLabel, title: 'Components/CategoryCityLabel' };

const Template: Story<CategoryCityLabelProps> = (args) => <CategoryCityLabel {...args} />;

const fallbackArgs = {
  category: 'Politics',
  categoryColor: '#D93831',
  city: 'New York',
  cityColor: '#D93831',
};

export const DefaultCategoryCityLabel = Template.bind({});
DefaultCategoryCityLabel.args = {
  ...fallbackArgs,
};
