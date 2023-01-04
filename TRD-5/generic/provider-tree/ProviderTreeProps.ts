import { ComponentType } from 'react';

export interface ProviderWithProps<T> {
  provider: ComponentType<T>;
  props?: T;
}

export interface ProviderTreeProps {
  providers: ProviderWithProps<unknown>[];
}
