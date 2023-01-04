import React, { FC } from 'react';
import parse from 'html-react-parser';
import { ResponseGetStylesWp } from '../../graphql';
import { StylesData } from '../../graphql/getStylesWp';
import { List } from '../List';

export interface StylesWpProps {
  stylesWp: ResponseGetStylesWp;
}

const renderItem = (item: StylesData, index: number) => {
  const idx = index.toString();

  if (item.type === 'URI') {
    return <link rel="stylesheet" href={item.styles} key={idx} />;
  }

  return (
    <React.Fragment key={idx}>
      {parse(`<style>${item.styles}</style>`)}
    </React.Fragment>
  );
};

export const StylesWp: FC<StylesWpProps> = ({ stylesWp }) => (
  <List items={stylesWp?.stylesWP ?? []} render={renderItem} />
);
