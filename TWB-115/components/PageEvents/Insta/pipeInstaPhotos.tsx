import React from 'react';
import { InstaPhotos } from './InstaPhotos';

export interface InstaPhotosItem {
  id: string;
  mediaUrl: string;
  type: 'IMAGE' | 'VIDEO';
}

export interface InstaPhotosData {
  title: string;
  userName: string;
  medias: InstaPhotosItem[];
}

// Changes the reference array
export const pipeInstaPhotos = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    const node = nodes[index];

    try {
      const data: InstaPhotosData = JSON.parse(
        node.props?.children,
      );

      nodes.splice(
        index,
        1,
        <InstaPhotos
          title={data?.title}
          medias={
            data?.medias?.filter(({ type }) => type === 'IMAGE')?.slice(0, 5) ??
            []
          }
          key={`insta_${index}`}
        />,
      );
    } catch {
      nodes.splice(index, 1, <div key={`error_${index}`} />);
    }
  }
};
