import React from 'react';
import { BrandStudioAdvertiser } from './BrandStudioAdvertiser';

export interface AdvertiserData {
  content: string;
  advertiser: string;
  number_of_posts: string;
}

export const pipeAdvertiser = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    const node = nodes[index];

    try {
      const data: AdvertiserData = JSON.parse(
        node.props?.children,
      );

      nodes.splice(
        index,
        1,
        <BrandStudioAdvertiser
          key={`advertiser_${index}`}
          content={data?.content}
          advertiser={data?.advertiser}
          postCount={parseInt(data?.number_of_posts, 10)}
        />,
      );
    } catch {
      nodes.splice(index, 1, <div key={`error_${index}`} />);
    }
  }
};
