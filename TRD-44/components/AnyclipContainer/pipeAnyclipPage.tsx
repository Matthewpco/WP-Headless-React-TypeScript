import React from 'react';
import { AnyclipContainer } from './AnyclipContainer';

export interface AnyclipData {
  src: string;
  container_id: string;
  folder_name: string;
}

// Changes the reference array
export const pipeAnyclipPage = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    const node = nodes[index];

    try {
      const data: AnyclipData = JSON.parse(node.props?.children);
      nodes.splice(
        index,
        1,
        <AnyclipContainer
          key={`AnyclipContainer_${index}`}
          src={data.src}
          containerId={data.container_id}
          folderName={data.folder_name}
        />,
      );
    } catch {
      nodes.splice(index, 1, <div key={`error_${index}`} />);
    }
  }
};
