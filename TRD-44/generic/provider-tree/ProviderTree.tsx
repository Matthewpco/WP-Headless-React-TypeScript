import React, { FC, ReactElement } from 'react';
import { ProviderTreeProps, ProviderWithProps } from './ProviderTreeProps';

const reducer = (
  prev: ReactElement,
  { provider: Provider, props }: ProviderWithProps<object>,
) => <Provider {...props}>{prev}</Provider>;

export const ProviderTree: FC<ProviderTreeProps> = ({ providers, children }) =>
  [...providers].reverse().reduce(reducer, children as ReactElement);
