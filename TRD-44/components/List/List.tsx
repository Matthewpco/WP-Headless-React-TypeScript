import React, { ReactElement } from 'react';

export type ListProps<T> = {
  items: T[];
  render: (item: T, index: number, items: T[]) => ReactElement;
};

export const List = <T extends {}>({
  items,
  render,
}: ListProps<T>): ReactElement => <>{items.map(render)}</>;
