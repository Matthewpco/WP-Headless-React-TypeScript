import React from 'react';
import {
  CategoryMarketBlock,
  Market,
} from '../CategoryMarketBlock/CategoryMarketBlock';
import { TopStories } from '../../../graphql/getHomePage';
import { AdUnitHomePage } from '../../Ad/units/AdUnitHomePage';

interface CategoryBlockData {
  posts: TopStories[];
  title: string;
  markets: Market[];
  slug: string;
  sectionId: string;
}

// Changes the reference array
export const pipeCategoryBlock = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    const node = nodes[index];

    try {
      const data: CategoryBlockData = JSON.parse(node.props?.children);

      nodes.splice(
        index,
        1,
        <React.Fragment key={`CategoryMarketBlock_${index}`}>
          <AdUnitHomePage id={index.toString()} />
          <CategoryMarketBlock
            category={data.title}
            articles={data.posts}
            markets={data.markets}
            slug={data.slug}
            id={data.sectionId}
          />
        </React.Fragment>,
      );
    } catch {
      nodes.splice(index, 1, <div key={`error_${index}`} />);
    }
  }
};
