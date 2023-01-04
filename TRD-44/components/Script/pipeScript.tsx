import React from 'react';
import { CustomScript } from './CustomScript';

export interface ScriptData {
  type: 'text' | 'link';
  script_text?: string;
  script_link?: string;
}

export const pipeScript = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    const node = nodes[index];

    try {
      const data: ScriptData = JSON.parse(node.props?.children);

      nodes.splice(
        index,
        1,
        <CustomScript
          key={`Script_${index}`}
          id={`Script_${index}`}
          type={data.type}
          text={data.script_text}
          link={data.script_link}
        />,
      );
    } catch {
      nodes.splice(index, 1, <div key={`error_${index}`} />);
    }
  }
};
