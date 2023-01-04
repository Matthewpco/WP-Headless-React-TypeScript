import React from 'react';
import { HubSpot } from './HubSpot';

export interface HubSpotData {
  region: string;
  portal_id: string;
  form_id: string;
  section_id: string;
}

export const pipeHubSpot = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    const node = nodes[index];

    try {
      const data: HubSpotData = JSON.parse(
        node.props?.children,
      );

      const id = `hubspot_${index}`;

      nodes.splice(
        index,
        1,
        <HubSpot
          key={id}
          id={id}
          region={data?.region}
          portalId={data?.portal_id}
          formId={data?.form_id}
          sectionId={data?.section_id}
        />,
      );
    } catch {
      nodes.splice(index, 1, <div key={`error_${index}`} />);
    }
  }
};
