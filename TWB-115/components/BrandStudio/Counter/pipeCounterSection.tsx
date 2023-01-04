import React from 'react';
import {
  BrandStudioCounterSection,
  CounterSectionColumn,
} from './BrandStudioCounterSection';

interface CounterSectionData {
  background_color: string;
  title: string;
  animate_time: string;
  columns: CounterSectionColumn[];
  light_mode: string;
}

export const pipeCounterSection = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    const node = nodes[index];

    try {
      const data: CounterSectionData = JSON.parse(
        node.props?.children,
      );

      nodes.splice(
        index,
        1,
        <BrandStudioCounterSection
          key={`counter_${index}`}
          backgroundColor={data.background_color}
          title={data.title}
          animationTime={data.animate_time}
          columns={data.columns}
          lightMode={data.light_mode}
        />,
      );
    } catch {
      nodes.splice(index, 1, <div key={`error_${index}`} />);
    }
  }
};
