import React from 'react';
import { ImageCarousel } from './ImageCarousel';

export interface ImageCarouselItem {
  alt: string;
  name: string;
  src: string;
}

export interface ImageCarouselData {
  slides: ImageCarouselItem[];
}

export const pipeImageCarousel = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    const node = nodes[index];
    const ulNode = node.props.children.find(
      (item: any) => item?.props?.className === 'trd-gallery-slides',
    );

    let finalString = '';
    ulNode?.props?.children?.forEach?.((item: any) => {
      if (typeof item === 'string') {
        finalString += item.trim();
      }

      const ulChildren = item?.props?.children;

      if (typeof ulChildren === 'string') {
        finalString += ulChildren.trim();
      }
    });

    finalString = finalString
      .replaceAll(/[”“″]/gi, '"')
      .replaceAll(',]}', ']}');

    try {
      const data: ImageCarouselData = JSON.parse(finalString);

      nodes.splice(
        index,
        1,
        <ImageCarousel key={`ImageCarousel_${index}`} items={data.slides} />,
      );
    } catch (e) {
      nodes.splice(index, 1, <div key={`error_${index}`} />);
    }
  }
};
