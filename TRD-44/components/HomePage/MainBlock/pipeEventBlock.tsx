import React from 'react';
import { AdUnitHomePage } from '../../Ad/units/AdUnitHomePage';

// Changes the reference array
export const pipeEventBlock = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    const node = nodes[index];

    nodes.splice(
      index,
      1,
      <React.Fragment key={`EventsBlock_${index}`}>
        <AdUnitHomePage id={`event-${index}`} />
        {node}
      </React.Fragment>,
    );
  }
};
