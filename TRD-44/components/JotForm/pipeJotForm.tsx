import React from 'react';
import { JotForm } from './JotForm';

export interface JotFormData {
  script_link: string;
}

export const pipeJotForm = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    const node = nodes[index];

    try {
      const data: JotFormData = JSON.parse(
        node.props?.children,
      );

      nodes.splice(
        index,
        1,
        <JotForm key={`jotform_${index}`} id={data.script_link} />,
      );
    } catch {
      nodes.splice(index, 1, <div key={`error_${index}`} />);
    }
  }
};
