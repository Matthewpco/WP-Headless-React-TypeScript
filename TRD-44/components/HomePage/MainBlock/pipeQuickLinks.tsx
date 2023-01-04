import React from 'react';
import { QuickLinks, Links } from '../QuickLinks/QuickLinks';

// Changes the reference array
export const pipeQuickLinks = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    const node = nodes[index];

    try {
      const data: Links = JSON.parse(node.props?.children);
      nodes.splice(
        index,
        1,
        <QuickLinks key={`QuickLinks_${index}`} links={data.links} />,
      );
    } catch {
      nodes.splice(index, 1, <div key={`error_${index}`} />);
    }
  }
};
