import React from 'react';
import { BrandStudioForm } from './BrandStudioForm';

export interface FormSectionData {
  formID: number;
}

export const pipeBrandStudioForm = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    const node = nodes[index];

    try {
      const data: FormSectionData = JSON.parse(
        node.props?.children,
      );

      nodes.splice(
        index,
        1,
        <BrandStudioForm
          key={`BrandStudioForm_${index}`}
          formId={data.formID}
        />,
      );
    } catch {
      nodes.splice(index, 1, <div key={`error_${index}`} />);
    }
  }
};
